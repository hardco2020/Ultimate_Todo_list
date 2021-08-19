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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todolist = void 0;
const core_1 = require("@mikro-orm/core");
let Todolist = class Todolist {
    constructor() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
};
__decorate([
    core_1.PrimaryKey(),
    __metadata("design:type", Number)
], Todolist.prototype, "id", void 0);
__decorate([
    core_1.Property({ type: 'date' }),
    __metadata("design:type", Object)
], Todolist.prototype, "createdAt", void 0);
__decorate([
    core_1.Property({ type: 'date', onUpdate: () => new Date() }),
    __metadata("design:type", Object)
], Todolist.prototype, "updatedAt", void 0);
__decorate([
    core_1.Property({ type: 'text' }),
    __metadata("design:type", String)
], Todolist.prototype, "title", void 0);
Todolist = __decorate([
    core_1.Entity()
], Todolist);
exports.Todolist = Todolist;
//# sourceMappingURL=Todolist.js.map