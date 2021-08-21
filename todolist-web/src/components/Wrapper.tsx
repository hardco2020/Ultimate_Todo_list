import { Box } from '@chakra-ui/react';
import React from 'react'

interface wrapperProps {
    variant?: "small"| "regular"
}

export const Wrapper: React.FC<wrapperProps> = ({
    children,
    variant
}) => {
    //mx=  margin "auto"?
    return ( 
        <Box 
            maxW={variant ==="regular"?"800px" :"400px"} 
            w="100%" 
            mt={8} 
            mx="auto"
        >  
            {children}
        </Box>
    );
}