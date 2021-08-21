import React from 'react'
import {Form, Formik} from 'formik'
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Wrapper } from '../components/wrapper';
import { InputField } from '../components/InputField';
interface registerProps {

}

export const Register: React.FC<registerProps> = ({}) => {
        return (
            <Wrapper variant="small">
                <Formik
                    initialValues={{username:"",password:""}}
                    onSubmit={(values)=>{
                        console.log(values)
                    }}
                >
                    {({isSubmitting})=>(
                        <Form>
                            <InputField
                                name="username"
                                label="Username"
                                placeholder="username"
                            />
                            <Box mt={4} >
                            <InputField
                                name="password"
                                label="Password"
                                placeholder="password"
                                type="password"
                            />
                            </Box>
                            <Button mt={4}  type="submit" colorScheme="teal" isLoading={isSubmitting} >Register</Button>
                        </Form>
                    )}
                </Formik>
            </Wrapper>
        );
}


export default Register;