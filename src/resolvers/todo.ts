import { Todolist } from "../entities/Todolist";
import { MyContext } from "../type";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class TodoResolver{
    @Query( ()=> [Todolist] ) //typescript style
    todos( @Ctx() {em}: MyContext):Promise<Todolist[]> {
        return em.find(Todolist,{});
    }

    @Query( ()=> Todolist, { nullable:true } ) //typescript style
    todo(  
        //the former id is for naming in server
        //the latter id is for using in 18 row for syntax
        @Arg('id') id: number, 
        @Ctx() {em}: MyContext):Promise<Todolist|null> {
        return em.findOne(Todolist,{ id });
    }
    // Query is for searching
    // Mutation is for updating inserting deleting
    @Mutation( ()=> Todolist) //typescript style
    async createTodo(  
        @Arg('title') title: string, 
        @Ctx() {em}: MyContext):Promise<Todolist> {
        const todo = em.create(Todolist,{title});
        await em.persistAndFlush(todo);
        return todo;
    }

    @Mutation( ()=> Todolist,{nullable:true}) //typescript style
    async updateTodo(  
        @Arg('id') id: number,
        @Arg('title',()=>String,{nullable:true}) title: string, 
        @Ctx() {em}: MyContext
    ):Promise<Todolist | null> {
            const todo = await em.findOne(Todolist,{id});
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
                await em.nativeDelete(Todolist,{ id });
                return true;
            }catch(err){
                return false; //try catch does'nt really work here since I can't get wrong message inside nativeDelete
            }
        }

}