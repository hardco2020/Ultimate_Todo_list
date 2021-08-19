import { MikroORM }  from '@mikro-orm/core';
import { __prod__ } from './constants';
import { Todolist } from './entities/Todolist';
import microConfig from './mikro-orm.config';
const main = async()=>{
    //connect to the database
    const orm = await MikroORM.init(microConfig);
    // run the migration 
    await orm.getMigrator().up()
    // const todo = orm.em.create(Todolist,{title:"my first thing to do"})
    // await orm.em.persistAndFlush(todo);
    // const todos = await orm.em.find(Todolist,{});
    // console.table(todos)
}

main().catch( (err)=> {
    console.error(err);
});

