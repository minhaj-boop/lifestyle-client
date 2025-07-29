import React, { useState } from 'react'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Button } from '@mui/material';

const Auth = () => {

    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className='flex justify-center h-[90vh] items-center'>
            <div className="max-w-md h-[85vh] rounded-md shadow-lg">
                <img className='w-full object-cover h-[15vh] rounded-t-md ' src="https://res.cloudinary.com/dioqmvlql/image/upload/v1753380254/login_banner_kizhek.jpg" alt="" />
                <div className='mt-8 px-10'>
                    {isLogin ? <LoginForm /> : <RegisterForm />}
                    <div className='flex items-center gap-1 justify-center mt-5 '>
                        <p>{isLogin && "Don't "} have an account ?</p>
                        <Button size='small' onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Create account" : "Login"}</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth