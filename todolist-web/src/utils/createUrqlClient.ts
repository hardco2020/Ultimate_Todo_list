import { dedupExchange, fetchExchange } from "urql"
import { LogoutMutation, MeQuery, MeDocument, LoginMutation, RegisterMutation } from "../generated/graphql"
import Index from "../pages"
import { betterUpdateQuery } from "./betterUpdateQuery"
import { cacheExchange } from "@urql/exchange-graphcache"

 export const createUrqlClient = (ssrExchange:any)=>({
    url:'https://localhost:4000/graphql',
    //for the cookie to workz
    fetchOptions:{
      credentials:"include" as const,
    },
    //for cache update
    exchanges: [dedupExchange, cacheExchange({
      updates:{
        Mutation:{
          logout: (_result, args, cache, info) => {
            //me query
            betterUpdateQuery<LogoutMutation,MeQuery>(
              cache,
              {query:MeDocument},
              _result,
              ()=>({me : null})
            )
          },
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation,MeQuery>(
              cache,
              {query:MeDocument},
              _result,
              (result,query)=>{
                if(result.login.errors){
                  return query
                }else{
                 return{
                   me:result.login.user,
                 } 
                }
              }
            )
          },
  
          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation,MeQuery>(
              cache,
              {query:MeDocument},
              _result,
              (result,query)=>{
                if(result.register.errors){
                  return query
                }else{
                 return{
                   me:result.register.user,
                 } 
                }
              }
            )
          },
        }
      }
    }),
    ssrExchange,
    fetchExchange
   ],
 });