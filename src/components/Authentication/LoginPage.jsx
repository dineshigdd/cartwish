import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import './LoginPage.css'
import { login } from '../../services/userServices'


const schema = z.object({
    email: z.string().email({ message:"Please enter valid email address"}).min(3),
    password: z.string().min(8, { message: "Password should be at least 8 characters"}),
});

const LoginPage = () => {

    const { register , 
            handleSubmit, 
            formState: { errors }} = useForm({ resolver: zodResolver( schema )}); 
    
    const [ formError, setFormError ] = useState("")

    const onSubmit = async ( formData ) => {
       
        try{
            await login( formData );
        }catch( err ){
            if( err.response && err.response.status === 400 ){
                console.log( err.response.data.message )
                setFormError( err.response.data.message );
            }
        }
        
    }     
         

    return (
        <section className="align_center form_page">
            <form 
                className="authentication_form" 
                onSubmit={ handleSubmit( onSubmit ) }>
                <h2>Login Form</h2>
                <div className="form_inputs">
                    <div>
                        <label htmlFor="email">Email</label>
                        <input 
                            id='email' 
                            type="email"
                            
                            className='form_text_input' 
                            placeholder='Enter your email address'
                            { ...register("email") }
                        />
                        { errors.email && (
                            <em className='form_error'>
                                { errors.email.message }
                            </em> 
                        )}                       
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input 
                            id="password" 
                            type='password'                            
                            className='form_text_input' 
                            placeholder='Enter your password'
                            { ...register("password")}
                        />
                        { errors.password && (
                            <em className='form_error'>
                                { errors.password.message }
                            </em> 
                        )}
                    </div>                
                </div>
                { formError && <em className="form_error">{ formError }</em> }
                <button className='search_button form_submit'>Submit</button>
            </form>
    </section>
  ) 
}

export default LoginPage