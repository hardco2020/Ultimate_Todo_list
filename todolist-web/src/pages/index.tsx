import { withUrqlClient } from "next-urql"
import { dedupExchange,cacheExchange,fetchExchange,ssrExchange } from "urql";
// import { cacheExchange } from "@urql/exchange-graphcache";
import { Navbar } from "../components/Navbar"
import { useTodosQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient"

const Index = () => {
  const [{data}] = useTodosQuery();
  return(
    <>
    <Navbar/>
    <div>Hello world</div>
    <br></br>
    {!data ? (<div>Loading...</div>): data.todos.map((todo) => <div key={todo.id}>{todo.title}</div>)}
    </>
  )
};

export default withUrqlClient( (ssrExchange:any)=>({
  url:'https://localhost:4000/graphql',
  //for the cookie to workz
  fetchOptions:{
    credentials:"include" 
  },
  //for cache update
  exchanges: [dedupExchange,cacheExchange, ssrExchange, fetchExchange]
}))(Index);
