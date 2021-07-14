const path = require('path')
const { mergeResolvers, mergeTypeDefs } = require('@graphql-tools/merge')
const { loadFilesSync } = require('@graphql-tools/load-files')

const typesArray = loadFilesSync(path.join(__dirname, "./types"), { recursive: true })

const resolversArray = loadFilesSync(path.join(__dirname, "./resolvers"), { recursive: true })

module.exports = {
    typeDefs: mergeTypeDefs(typesArray),
    resolvers: mergeResolvers(resolversArray)
}