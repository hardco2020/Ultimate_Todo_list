"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@mikro-orm/core");
const constants_1 = require("./constants");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const hello_1 = require("./resolvers/hello");
const todo_1 = require("./resolvers/todo");
const user_1 = require("./resolvers/user");
const redis_1 = __importDefault(require("redis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const main = async () => {
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    await orm.getMigrator().up();
    const app = express_1.default();
    const corsOptions = {
        credentials: true,
        origin: ['https://studio.apollographql.com', 'http://localhost:3000']
    };
    const options = {
        key: fs_1.default.readFileSync('/Users/kai/Documents/SideProject/Ultimate_Todo_list/todolist-server/localhost-key.pem'),
        cert: fs_1.default.readFileSync('/Users/kai/Documents/SideProject/Ultimate_Todo_list/todolist-server/localhost.pem'),
    };
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redisClient = redis_1.default.createClient({
        port: 6379,
        host: 'localhost'
    });
    app.use(express_session_1.default({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({
            client: redisClient,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            path: "/",
            sameSite: 'none',
            secure: true
        },
        saveUninitialized: false,
        secret: 'some secret',
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await type_graphql_1.buildSchema({
            resolvers: [hello_1.HelloResolver, todo_1.TodoResolver, user_1.UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ em: orm.em, req, res })
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: corsOptions });
    https_1.default.createServer(options, app).listen(4000, () => {
        console.log('server stared on localhost:4000');
    });
    app.get('/products', (req, res, next) => {
        console.log(req.session);
        if (!req.session.userId) {
            req.session.userId = 1;
        }
        else {
            req.session.userId = req.session.userId + 1;
        }
        console.log(req.session.userId);
        res.send("hello");
    });
};
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=index.js.map