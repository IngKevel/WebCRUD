import express from "express";
import {ApolloServer} from "apollo-server-express";
import {PingResolver} from "./resolvers/ping";
import {buildSchema} from "type-graphql";
import {PersonaResolver} from "./resolvers/PersonaResolver";

export async function startServer(){
    const app = express();

    const server = new ApolloServer({
        schema: await buildSchema({
        resolvers: [PingResolver, PersonaResolver],
        validate: false
        }),
        context: ({req, res}) => ({req, res})
    })
    
    server.applyMiddleware({app, path: '/graphql'});

    return app;
}