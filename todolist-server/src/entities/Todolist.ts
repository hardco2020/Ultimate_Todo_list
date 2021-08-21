import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Todo{
    @Field()
    @PrimaryKey()
    id!: number;

    @Field( ()=> String )
    @Property({ type: 'date'})
    createdAt = new Date();

    @Field( ()=> String )
    @Property({ type: 'date', onUpdate:()=> new Date() }) //make sure every time update this update
    updatedAt = new Date();

    @Field()
    @Property({type:'text'})
    title!: string;


}