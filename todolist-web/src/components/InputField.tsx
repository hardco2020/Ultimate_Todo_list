import { FormControl, FormLabel, Input, FormErrorMessage, useProps } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react'
import { InputHTMLAttributes } from 'react';


type InputFieldProps = InputHTMLAttributes<HTMLInputElement>&{ 
            name:string,
            label:string
    }
    //variant?: "small"| "regular" // to specify what would be passed into components and it's attribute

// ""=>false
// 'error message stuff" => true

export const InputField: React.FC<InputFieldProps> = ({label,size:_,...props}) => { //destrucutre label and size out of props
    const [field,{error}] = useField(props);
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor="name">{label}</FormLabel>
            <Input {...field} {...props} id={field.name} placeholder={props.placeholder} />
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    );
}