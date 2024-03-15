import express from 'express';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer'
import bodyParser from 'body-parser';
import {expressMiddleware} from '@apollo/server/express4'
import cors from 'cors';
import mongoose from 'mongoose';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import {useServer} from 'graphql-ws/lib/use/ws';
import { resolvers } from './resolvers/index.js';
import { typeDefs } from './schemas/index.js';
import 'dotenv/config';
import './firebaseCongif.js'
import {getAuth} from 'firebase-admin/auth';
const app = express();
const httpServer = http.createServer(app);
const URI = `mongodb+srv://tansang:${process.env.DB_PASSWORD}@cluster0.5beke5u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const PORT = process.env.PORT || 4000;




const schema = makeExecutableSchema({typeDefs, resolvers});
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
})
const serverCleanup = useServer({schema}, wsServer);

const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({httpServer}),
    {
      async serverWillStart(){
        return {
          async drainServer(){
            await serverCleanup.dispose();
          },
        };
      },
    },
  ]
});

await server.start();



mongoose.set('strictQuery', false);
const authorizationJWT = async (req, res, next) => {
    console.log("hahaha"+{ authorization: req.headers.authorization });
    const authorizationHeader = req.headers.authorization;
  
    if (authorizationHeader) {
      const accessToken = authorizationHeader.split(' ')[1];
  
      getAuth()
        .verifyIdToken(accessToken)
        .then((decodedToken) => {
          console.log({ decodedToken });
          res.locals.uid = decodedToken.uid;
          next();
        })
        .catch((err) => {
          console.log({ err });
          return res.status(403).json({ message: 'Forbidden', error: err });
        });
    } else {
      next();
      // return res.status(401).json({ message: 'Unauthorized' });
    }
  };

  
  app.use(
    cors(),
    authorizationJWT,
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        return { uid: res.locals.uid };
      },
    })
  );
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    console.log("Connected to DB");
    await new Promise((resolve) => httpServer.listen({port: PORT}, resolve));
    console.log('Server ready at http://localhost:4000');
})

