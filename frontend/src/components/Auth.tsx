import { Link } from "react-router-dom";
import { SignupInput } from "@anish_kumar113/narrify-common"
import { useState } from "react";
import { LabelledInput } from "./LabelledInput";

const Auth = ({type}:{type: 'signup' | 'signin'}) => {

    const[postInput,setPostInput]=useState<SignupInput>({
        email:"",
        name:'',
        password:''
    })
    
    return (
        <div className="h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="px-10">
                    <div className="text-3xl font-extrabold">
                        Create an account
                    </div>
                    <div className="font-light text-md text-slate-400">
                        {type==='signup'? 'Already have an account':"Don't have an account"} 
                        <Link to={type ==='signup'?'/signin':'/signup'} className='underline ml-2'>{type === 'signup'?'Sign In':'Sign Up'}</Link>
                    </div>
                </div>
                <div className="pt-8">
                    <LabelledInput label='Username' type='text' placeholder='Harkirat Singh' onchange={(e)=>setPostInput({...postInput,name:e.target.value})} />
                    <LabelledInput label='Email' type='email' placeholder='user@gmail.com' onchange={(e)=>setPostInput({...postInput,email:e.target.value})} />
                    <LabelledInput label='Password' type='password' placeholder='password' onchange={(e)=>setPostInput({...postInput,password:e.target.value})} />
                    <button type="button" className="w-full mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === 'signup' ? 'Sign Up' : 'Sign In'}</button>
                </div>
            </div>
        </div>
    );
};
export { Auth };
