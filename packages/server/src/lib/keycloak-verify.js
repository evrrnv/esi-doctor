const axios = require("axios").default
const { prop, path, find, compose, flip, curryN } = require("ramda")
const jwt = require('jsonwebtoken')
const jwkToPem = require("jwk-to-pem")

const cache = {};

const verifyOnline = ({ realm, authServerUrl }) => (
  accessToken,
  options = {}
) =>
  axios
    .get(
      `${authServerUrl}/auth/realms/${options.realm ||
        realm}/protocol/openid-connect/userinfo`,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    )
    .then(prop("data"))
    .then(makeUser);

const makeUser = ({
  sub,
  preferred_username,
  email_verified,
  resource_access,
  email,
  name,
  ...others
}) => ({
  id: sub,
  userName: preferred_username,
  emailVerified: email_verified,
  resourceAccess: resource_access,
  ...others
});

const verify = curryN(2)(jwt.verify);

const isTheRightKid = kid => publicKey => publicKey.kid === kid;

const findPublicKeyFromKid = publicKey => kid =>
  find(isTheRightKid(kid))(publicKey);

const getKid = path(["header", "kid"]);

const decode = compose(
  curryN(2),
  flip
)(jwt.decode);

const getUserFromPublicKey = token =>
  compose(
    makeUser,
    verify(token)
  );

const getUserFromJWK = token => jwk =>
  compose(
    getUserFromPublicKey(token),
    jwkToPem,
    findPublicKeyFromKid(jwk),
    getKid,
    decode({ complete: true })
  )(token);

const fetchPublicKeys = ({ realm, authServerUrl, useCache }) => {
  const url = `${authServerUrl}/auth/realms/${realm}/protocol/openid-connect/certs`;
  const key = url;
  if (useCache) {
    return cache[key]
      ? Promise.resolve(cache[key])
      : axios
          .get(url)
          .then(path(["data", "keys"]))
          .then(publicKey => {
            cache[key] = publicKey;
            return publicKey;
          });
  } else {
    return axios.get(url).then(path(["data", "keys"]));
  }
};

const verifyOffline = config => async (accessToken, options = {}) => {
  const { publicKey } = config;
  return publicKey
    ? getUserFromPublicKey(accessToken)(publicKey)
    : fetchPublicKeys({ ...config, ...options }).then(
        getUserFromJWK(accessToken)
      );
};

const Keycloak = config => ({
  verifyOnline: verifyOnline(config),
  verifyOffline: verifyOffline(config)
});


module.exports = Keycloak
