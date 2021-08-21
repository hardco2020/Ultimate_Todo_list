import { User } from "../entities/User";
import { MyContext } from "../type";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import argon2 from "argon2";

// export {};
// declare module Express {
//     export interface Session {
//       userId: number ;
//     }
// }


@InputType()
class UsernamePasswordInput{
    @Field()
    username:string
    @Field()
    password:string
}

@ObjectType()
class FieldError{
    @Field()
    field:string; //what field is wrong
    @Field()
    message:string; //explain to user pass to UI
}

@ObjectType()
class UserResponse{
    @Field( ()=>[FieldError],{nullable:true})
    errors?: FieldError[];
    @Field( ()=> User,{nullable:true})
    user?: User;
}

@Resolver()
export class UserResolver{  
    @Query(()=>User,{nullable:true})
    async me(
        @Ctx() { req,em }:MyContext
    ){
        //console.log(req.session.userId)
        if(!req.session.userId){
            return null
        }
        const user = await em.findOne(User,{id: req.session.userId});
        return user;
    }
    @Mutation( ()=> UserResponse ) //typescript style
    async register(
        @Arg('options') options:UsernamePasswordInput,
        @Ctx() {em} : MyContext
    ):Promise<UserResponse>{
        if(options.username.length<=2){
            return{
                errors:[{
                    field: 'username',
                    message: "length must be greater than 2 ",
                }]
            }
        }
        if(options.password.length<=8){
            return{
                errors:[{
                    field: 'password',
                    message: "length must be greater than 8",
                }]
            }
        }
        const hashedPassword = await argon2.hash(options.password)
        const user = em.create(User,{
            username:options.username,
            password:hashedPassword
        })
        try{
            await em.persistAndFlush(user);
        }catch(err){
            // console.log(err.code)  
            // console.log("message",err.message) // To see what's the error code is to do error handling
            if(err.code == '23505' ){
                return{
                    errors:[
                        {
                            field:"username",
                            message:"username already taken",
                        }
                    ]
                }
            }
        }
        return {user};
    }

    @Mutation( ()=> UserResponse ) //typescript style
    async login(
        @Arg('options') options:UsernamePasswordInput,
        @Ctx() { em , req } : MyContext
    ):Promise<UserResponse>{
        try{   
            const user = await em.findOneOrFail(User,{ username:options.username })
            const valid = await argon2.verify(user.password,options.password)
            if(!valid){
                return{
                    errors:[{
                        field: 'password',
                        message: "Incorrect password",
                    }]
                }
            }
            //store user id session 
            //keep user logged in
            req.session.userId = user.id
            return {
                user
            };
        }
        catch(err){
            return{
                    errors:[{
                        field: 'username',
                        message: "The username does'nt exist",
                    }]
            }
        }
    }
    

}