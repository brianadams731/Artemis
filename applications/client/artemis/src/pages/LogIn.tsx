import { useState } from 'react';

const LogIn = ():JSX.Element =>{

    // Check if credentials exist
    
    return(
        <div>
            Log In
            <div className='login-container'>
                Welcome
                <br/>
                <div className="username-container">
                    <input type="text" name="username" placeholder='username' required />
                </div>
                <div className="password-container">
                    <input type="password" name="password" placeholder='password' required />
                </div>
                <div>
                    {/* <a>Forgot password?</a> */}
                </div>
                <div className="submit-container">
                    <button>Sign In</button>
                </div>
                
            </div>
        </div>
    )
}

export { LogIn };