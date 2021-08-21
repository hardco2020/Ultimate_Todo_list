"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoResolver = void 0;
const Todolist_1 = require("../entities/Todolist");
const type_graphql_1 = require("type-graphql");
let TodoResolver = class TodoResolver {
    todos({ em }) {
        return em.find(Todolist_1.Todo, {});
    }
    todo(id, { em }) {
        return em.findOne(Todolist_1.Todo, { id });
    }
    async createTodo(title, { em }) {
        const todo = em.create(Todolist_1.Todo, { title });
        await em.persistAndFlush(todo);
        return todo;
    }
    async updateTodo(id, title, { em }) {
        const todo = await em.findOne(Todolist_1.Todo, { id });
        if (!todo) {
            return null;
        }
        if (typeof title !== 'undefined') {
            todo.title = title;
            await em.persistAndFlush(todo);
        }
        return todo;
    }
    async deleteTodo(id, { em }) {
        try {
            await em.nativeDelete(Todolist_1.Todo, { id });
            return true;
        }
        catch (err) {
            return false;
        }
    }
};
__decorate([
    type_graphql_1.Query(() => [Todolist_1.Todo]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "todos", null);
__decorate([
    type_graphql_1.Query(() => Todolist_1.Todo, { nullable: true }),
    __param(0, type_graphql_1.Arg('id')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "todo", null);
__decorate([
    type_graphql_1.Mutation(() => Todolist_1.Todo),
    __param(0, type_graphql_1.Arg('title')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "createTodo", null);
__decorate([
    type_graphql_1.Mutation(() => Todolist_1.Todo, { nullable: true }),
    __param(0, type_graphql_1.Arg('id')),
    __param(1, type_graphql_1.Arg('title', () => String, { nullable: true })),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "updateTodo", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('id')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "deleteTodo", null);
TodoResolver = __decorate([
    type_graphql_1.Resolver()
], TodoResolver);
exports.TodoResolver = TodoResolver;
//# sourceMappingURL=todo.js.map