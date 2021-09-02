package dev.diltheyaislan.app.keycloak.provider.appdb.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.jboss.logging.Logger;

import dev.diltheyaislan.app.infrastructure.database.DbConnection;
import dev.diltheyaislan.app.keycloak.provider.appdb.entity.User;

public class UserRepository implements IUserRepository {

	private final Logger log = Logger.getLogger(UserRepository.class);

	private final String SQL_SELECT_BY_USERNAME = "SELECT id, keycloak_id, username, password, email, role, nom, prenom, datedenaissance, sexe, niveau, specialite, adresse, telephone FROM app_private.user_account INNER JOIN app.user_account ON app_private.user_account.id = app.user_account.user_id AND app_private.user_account.username = ? OR CAST(app_private.user_account.id AS text)=?";
	private final String SQL_SELECT_BY_EMAIL = "SELECT id, keycloak_id, username, password, email, role, nom, prenom, datedenaissance, sexe, niveau, specialite, adresse, telephone FROM app_private.user_account INNER JOIN app.user_account ON app_private.user_account.id = app.user_account.user_id AND app.user_account.email = ? OR CAST(app_private.user_account.id AS text)=?";
	private final String SQL_INSERT = "WITH ins_pvt_acc AS (INSERT INTO app_private.user_account (keycloak_id, username, password) VALUES (?, ?, ?) RETURNING id)," 
	+ "ins_ds_mdc AS (INSERT INTO app.dossier_medical (user_id) VALUES ((SELECT id FROM ins_pvt_acc)) RETURNING id)," 
	+ "ins_bio AS(INSERT INTO app.biometrique (id) VALUES ((SELECT id FROM ins_ds_mdc))),"
	+ "ins_atc_prs AS (INSERT INTO app.antecedents_personnelles (id) VALUES ((SELECT id FROM ins_ds_mdc))),"
	+ "ins_mdc_chgc AS (INSERT INTO app.medico_chirugicaux (id) VALUES ((SELECT id FROM ins_ds_mdc)))"
	+ "INSERT INTO app.user_account(user_id, email, nom, prenom, datedenaissance, sexe, niveau, specialite, adresse, telephone) "
	+ "VALUES ((SELECT id FROM ins_pvt_acc), ?, ?, ?, ?, CAST(? AS SEXE), ?, CAST(? AS SPECIALITE), ?, ?) RETURNING user_id AS id";
	private final String SQL_UPDATE = "WITH upd_pvt_acc AS (UPDATE app_private.user_account SET keycloak_id=?, password=? WHERE app_private.user_account.username = ? RETURNING id) UPDATE app.user_account set nom=?, prenom=?, telephone=?, email=?, sexe=CAST(? AS SEXE), specialite=CAST(? AS SPECIALITE), adresse=?, niveau=?, datedenaissance=? WHERE user_id = (SELECT id FROM upd_pvt_acc)";
	private final String SQL_DELETE = "DELETE FROM app_private.user_account WHERE username=?";
	private final String SQL_COUNT = "SELECT COUNT(*) AS count FROM app_private.user_account";
	private final String SQL_SELECT_ALL = "SELECT id, keycloak_id, username, password, email, role, nom, prenom, datedenaissance, sexe, niveau, specialite, adresse, telephone FROM app_private.user_account INNER JOIN app.user_account ON app_private.user_account.id = app.user_account.user_id";

	private DbConnection db = new DbConnection();

	private static UserRepository instance;

	private UserRepository() {

	}

	public static UserRepository getInstance() {
		if (instance == null) {
			instance = new UserRepository();
		}
		return instance;
	}
 
	@Override
	public String insert(User user) {
		
		if (getByUsername(user.getUsername()) != null) {
			return null;
		} 

		String insertedId = null;

		try {
			db.connect();
			db.createPreparedStatement(SQL_INSERT);

			db.getPreparedStatement().setString(1, user.getKeycloakId());
			db.getPreparedStatement().setString(2, user.getUsername());
			db.getPreparedStatement().setString(3, user.getPassword());
			db.getPreparedStatement().setString(4, user.getEmail());
			db.getPreparedStatement().setString(5, user.getLastName());
			db.getPreparedStatement().setString(6, user.getFirstName());
			db.getPreparedStatement().setDate(7, user.getBirthDate());
			db.getPreparedStatement().setString(8, user.getSexe());
			db.getPreparedStatement().setObject(9, user.getLevel(), java.sql.Types.INTEGER);
			db.getPreparedStatement().setString(10, user.getSpecialty());
			db.getPreparedStatement().setString(11, user.getAddress());
			db.getPreparedStatement().setString(12, user.getPhone());

			db.getPreparedStatement().executeUpdate();
			
			ResultSet rs = db.getPreparedStatement().getGeneratedKeys();
			if (rs.next()) {
				insertedId = rs.getString(1);
			}

			db.disconnect();
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}

		return insertedId;
	}

	@Override
	public User getByUsername(String username) {
		User user = null;
		try {
			db.connect();
			db.createPreparedStatement(SQL_SELECT_BY_USERNAME);

			db.getPreparedStatement().setString(1, username);
			db.getPreparedStatement().setString(2, username);

			ResultSet rs = db.getPreparedStatement().executeQuery();

			if  (rs.next()) {
				user = new User();
				user.setId(rs.getString("id"));
				user.setFirstName(rs.getString("prenom"));
				user.setLastName(rs.getString("nom"));
				user.setEmail(rs.getString("email"));
				user.setUsername(rs.getString("username"));
				user.setPhone(rs.getString("telephone"));
				user.setKeycloakId(rs.getString("keycloak_id"));
				user.setSexe(rs.getString("sexe"));
				user.setSpecialty(rs.getString("specialite"));
				user.setAddress(rs.getString("adresse"));
				user.setLevel(rs.getInt("niveau"));
				user.setBirthDate(rs.getDate("datedenaissance"));
				user.setPassword(rs.getString("password"));
				user.setRole(rs.getString("role"));
				
			}

			rs.close();
			db.disconnect();
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return user;
	}

	@Override
	public User getByEmail(String username) {
		User user = null;
		try {
			db.connect();
			db.createPreparedStatement(SQL_SELECT_BY_EMAIL);

			db.getPreparedStatement().setString(1, username);
			db.getPreparedStatement().setString(2, username);

			ResultSet rs = db.getPreparedStatement().executeQuery();

			if  (rs.next()) {
				user = new User();
				user.setId(rs.getString("id"));
				user.setFirstName(rs.getString("prenom"));
				user.setLastName(rs.getString("nom"));
				user.setEmail(rs.getString("email"));
				user.setUsername(rs.getString("username"));
				user.setPhone(rs.getString("telephone"));
				user.setKeycloakId(rs.getString("keycloak_id"));
				user.setSexe(rs.getString("sexe"));
				user.setSpecialty(rs.getString("specialite"));
				user.setAddress(rs.getString("adresse"));
				user.setLevel(rs.getInt("niveau"));
				user.setBirthDate(rs.getDate("datedenaissance"));
				user.setPassword(rs.getString("password"));
				user.setRole(rs.getString("role"));
			}

			rs.close();
			db.disconnect();
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return user;
	}

	@Override
	public void update(User user) {
		try {
			db.connect();
			db.createPreparedStatement(SQL_UPDATE);

			db.getPreparedStatement().setString(1, user.getKeycloakId());
			db.getPreparedStatement().setString(2, user.getPassword());
			db.getPreparedStatement().setString(3, user.getUsername());
			db.getPreparedStatement().setString(4, user.getLastName());
			db.getPreparedStatement().setString(5, user.getFirstName());
			db.getPreparedStatement().setString(6, user.getPhone());
			db.getPreparedStatement().setString(7, user.getEmail());
			db.getPreparedStatement().setString(8, user.getSexe());
			db.getPreparedStatement().setString(9, user.getSpecialty());
			db.getPreparedStatement().setString(10, user.getAddress());
			db.getPreparedStatement().setObject(11, user.getLevel(), java.sql.Types.INTEGER);
			db.getPreparedStatement().setDate(12, user.getBirthDate());

			db.getPreparedStatement().executeUpdate();
			db.disconnect();
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void remove(String username) {
		try {
			db.connect();
			db.createPreparedStatement(SQL_DELETE);

			db.getPreparedStatement().setString(1, username);

			db.getPreparedStatement().executeUpdate();
			db.disconnect();
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
	}

	@Override
	public int count() {
		int count = 0;
		try {
			db.connect();
			db.createPreparedStatement(SQL_COUNT);

			ResultSet rs = db.getPreparedStatement().executeQuery();

			if  (rs.next()) {
				count = rs.getInt("count");
			}

			rs.close();
			db.disconnect();
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return count;
	}

	@Override
	public List<User> getAll() {
		List<User> users = new ArrayList<>();
		try {
			db.connect();
			db.createPreparedStatement(SQL_SELECT_ALL);
			ResultSet rs = db.getPreparedStatement().executeQuery();

			log.infov("USERRR" + rs.toString());

			while (rs.next()) {
				User user = new User();
				user.setId(rs.getString("id"));
				user.setFirstName(rs.getString("prenom"));
				user.setLastName(rs.getString("nom"));
				user.setEmail(rs.getString("email"));
				user.setUsername(rs.getString("username"));
				user.setPhone(rs.getString("telephone"));
				user.setKeycloakId(rs.getString("keycloak_id"));
				user.setSexe(rs.getString("sexe"));
				user.setSpecialty(rs.getString("specialite"));
				user.setAddress(rs.getString("adresse"));
				user.setLevel(rs.getInt("niveau"));
				user.setBirthDate(rs.getDate("datedenaissance"));
				user.setPassword(rs.getString("password"));
				user.setRole(rs.getString("role"));
				users.add(user);
			}

			rs.close();
			db.disconnect();
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return users;
	}
}
