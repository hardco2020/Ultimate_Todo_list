import "reflect-metadata"
import { MikroORM }  from '@mikro-orm/core';
import { __prod__ } from './constants';
//import { Todolist } from './entities/Todolist';
import microConfig from './mikro-orm.config';
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { TodoResolver } from './resolvers/todo';
import { UserResolver } from "./resolvers/user";

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
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers:[HelloResolver,TodoResolver,UserResolver],
            validate:false
        }),
        //context can be accessed through all resolver
        //take em so every resolver can query the database  
        context:()=> ({ em: orm.em })
    });    
    await apolloServer.start();
    apolloServer.applyMiddleware({app});
    app.listen(4000,()=>{
        console.log('server stared on localhost:4000')
    })
}

main().catch( (err)=> {
    console.error(err);
});

