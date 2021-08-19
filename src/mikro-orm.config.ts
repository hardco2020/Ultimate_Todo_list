import { __prod__ } from "./constants";
import { Todolist } from "./entities/Todolist";
import { Options } from "@mikro-orm/core";
import path from "path";

const config : Options = {
    migrations:{
        path: path.join(__dirname,'./migrations'), // path to the folder with migrations
        pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    },
    entities:[Todolist],
    dbName : 'todolist',
    type : 'postgresql', //資料庫型態
    debug : !__prod__, //when not on production,debug is on
    port: 5433,
} 


export default config
