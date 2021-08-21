import { Todo } from "../entities/Todolist";
import { MyContext } from "../type";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class TodoResolver{
    @Query( ()=> [Todo] ) //typescript style
    todos( @Ctx() {em}: MyContext):Promise<Todo[]> {
        return em.find(Todo,{});
    }

    @Query( ()=> Todo, { nullable:true } ) //typescript style
    todo(  
        //the former id is for naming in server
        //the latter id is for using in 18 row for syntax
        @Arg('id') id: number, 
        @Ctx() {em}: MyContext):Promise<Todo|null> {
        return em.findOne(Todo,{ id });
    }
    // Query is for searching
    // Mutation is for updating inserting deleting
    @Mutation( ()=> Todo) //typescript style
    async createTodo(  
        @Arg('title') title: string, 
        @Ctx() {em}: MyContext):Promise<Todo> {
        const todo = em.create(Todo,{title});
        await em.persistAndFlush(todo);
        return todo;
    }

    @Mutation( ()=> Todo,{nullable:true}) //typescript style
    async updateTodo(  
        @Arg('id') id: number,
        @Arg('title',()=>String,{nullable:true}) title: string, 
        @Ctx() {em}: MyContext
    ):Promise<Todo | null> {
            const todo = await em.findOne(Todo,{id});
            if(!todo){
                return null;
            }
            if(typeof title!=='undefined'){
                todo.title = title
                await em.persistAndFlush(todo)
            }
            return todo;
        }
    
    @Mutation( ()=> Boolean) //typescript style
    async deleteTodo(  
        @Arg('id') id: number,
        @Ctx() {em}: MyContext
    ):Promise<boolean> {
            try{
                await em.nativeDelete(Todo,{ id });
                return true;
            }catch(err){
                return false; //try catch does'nt really work here since I can't get wrong message inside nativeDelete
            }
        }

}