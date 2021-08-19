import { Query, Resolver } from "type-graphql";

@Resolver()
export class HelloResolver{
    @Query( ()=>String ) //typescript style
    hello(){
        return "by"
    }
    good(){
        return "12121212"
    }

}