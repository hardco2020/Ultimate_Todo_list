import React from 'react'
import {Form, Formik} from 'formik'
import { Box, Button} from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter  } from 'next/router'
import { Navbar } from '../components/Navbar';
interface registerProps {

}

// const REGISTER_MUT =`
// mutation register($username:String!,$password:String!){
//     register(options:{username:$username,password:$password}){
//       errors {
//         field
//         message
//       }
//       user{
//         id
//         createdAt
//         updatedAt
//         username
//       }
//     }
// }
// `

export const Register: React.FC<registerProps> = ({}) => {
        const router = useRouter(); 
        const [,register] = useRegisterMutation()
        return (
            <Wrapper variant="small">
                {/* <Navbar/> */}
                <Formik
                    initialValues={{username:"",password:""}}
                    onSubmit={async(values,{setErrors})=>{
                        const response = await  register(values) //because it's exactly the same or else have to be like 
                        if(response.data?.register.errors){
                            setErrors(toErrorMap(response.data.register.errors));
                        }
                        else if(response.data?.register.user){
                            router.push("/");
                        }
                        //register({username : values.username , password: values.password})
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