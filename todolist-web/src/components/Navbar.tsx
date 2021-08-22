import { Box, Button, Flex, Link } from '@chakra-ui/react';
import React from 'react'
import NextLink from 'next/link'
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
interface NavbarProps {

}

export const Navbar: React.FC<NavbarProps> = ({}) => {
    const [{fetching:logoutFetching},logout] = useLogoutMutation();
    const [{ data,fetching}] = useMeQuery()
    let body = null
    //data is loading
    if(fetching){
    //user not logged in
    }else if(!data?.me){
        body = (
            <>
            <NextLink href="/login">
                <Link color='white' mr={4}>
                    login
                </Link>
            </NextLink>
            <NextLink href="/register">
                <Link color='white'>
                    register
                </Link>
            </NextLink>
            </>
        )

    //user is  logged in
    }else{
        body = (
            <Flex>
                <Box mr={4}>
                    {data.me.username}
                </Box>
                <Button 
                    onClick ={()=>{
                        logout();
                    }}
                    isLoading={logoutFetching}
                >
                    Logout
                </Button>
            </Flex>
        )
    }
    return (
        <Flex bg='tan' p={4} >
            <Box>
                {body}
            </Box>
        </Flex>
    );
}