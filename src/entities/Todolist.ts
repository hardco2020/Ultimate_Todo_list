import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Todolist{
    @PrimaryKey()
    id!: number;

    @Property({ type: 'date'})
    createdAt = new Date();
    @Property({ type: 'date', onUpdate:()=> new Date() }) //make sure every time update this update
    updatedAt = new Date();

    @Property({type:'text'})
    title!: string;


}