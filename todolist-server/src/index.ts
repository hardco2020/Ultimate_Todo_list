import "reflect-metadata"
import { MikroORM }  from '@mikro-orm/core';
import { COOKIE_NAME, __prod__ } from './constants';
//import { Todolist } from './entities/Todolist';
import microConfig from './mikro-orm.config';
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { TodoResolver } from './resolvers/todo';
import { UserResolver } from "./resolvers/user";
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis'
import { MyContext } from "./type";
import { Request , Response } from "express";
import fs from 'fs';
import https from 'https';
const main = async()=>{
    
    //connect to the database
    const orm = await MikroORM.init(microConfig);
    // // run the migration 
    await orm.getMigrator().up()
    // const todo = orm.em.create(Todolist,{title:"my first thing to do"})
    // await orm.em.persistAndFlush(todo);
    // const todos = await orm.em.find(Todolist,{});
    // console.table(todos)

    //create App
    const app = express();

    const corsOptions = {
        credentials:true,
        origin: ['https://studio.apollographql.com','http://localhost:3000']
    };

    const options = {
        key: fs.readFileSync('/Users/kai/Documents/SideProject/Ultimate_Todo_list/todolist-server/localhost-key.pem'),
        cert: fs.readFileSync('/Users/kai/Documents/SideProject/Ultimate_Todo_list/todolist-server/localhost.pem'),
      };
      
    const RedisStore = connectRedis(session)
    const redisClient = redis.createClient({
        port:6379,
        host:'localhost'
    })
    app.use(
        session({
            name: COOKIE_NAME,
            store: new RedisStore({  //ttl: how long it should last
                client: redisClient, 
                //disableTTL :true, //make sure session last forever
                //disableTouch: true, // make sure it does'nt have to update the last time it's ttl
            }),
            cookie:{
                maxAge: 1000*60*60*24*365*10, //10 years
                path: "/",
                //httpOnly:true, //javascript front end can't access
                sameSite:'none', // csrf
                secure: true
                //secure: __prod__ //cookie only works in https
            },
            saveUninitialized:false, //automatically create a empty session on default
            secret: 'some secret', //env
            resave: false,
        }) 
    )

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers:[HelloResolver,TodoResolver,UserResolver],
            validate:false,
        }),
        //context can be accessed through all resolver
        //take em so every resolver can query the database  
        context:({req,res}):MyContext=> ({ em: orm.em ,req,res}) //reach  request and reponse through  context
    });    
    await apolloServer.start();
    apolloServer.applyMiddleware({app,cors:corsOptions}); // if I want to apply cors, I have to go through here
    // app.listen(4000,()=>{
    //     console.log('server stared on localhost:4000')
    // }) 
    //with SSL 
    https.createServer(options,app).listen(4000,()=>{
        console.log('server stared on localhost:4000')
    })
    app.get('/products', (req:Request, res:Response,next) => {
        console.log(req.session);
        if(!req.session.userId){
            req.session.userId = 1
        }else{
            req.session.userId = req.session.userId +1
        }
        console.log(req.session.userId)
        res.send("hello")
    })
}

main().catch( (err)=> {
    console.error(err);
});

