"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const Todolist_1 = require("./entities/Todolist");
const path_1 = __importDefault(require("path"));
const config = {
    migrations: {
        path: path_1.default.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Todolist_1.Todolist],
    dbName: 'todolist',
    type: 'postgresql',
    debug: !constants_1.__prod__,
    port: 5433,
};
exports.default = config;
//# sourceMappingURL=mikro-orm.config.js.map