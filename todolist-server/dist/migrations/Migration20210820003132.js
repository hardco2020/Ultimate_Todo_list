"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20210820003132 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20210820003132 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" text not null, "password" text not null);');
        this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
        this.addSql('create table "todo" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" text not null);');
        this.addSql('drop table if exists "todolist" cascade;');
    }
}
exports.Migration20210820003132 = Migration20210820003132;
//# sourceMappingURL=Migration20210820003132.js.map