import { useState } from 'react';

import styles from '../styles/AccountForms.module.scss';
import { postDataAsync } from '../utils/postDataAsync';

const LogIn = ():JSX.Element =>{

    // Check if credentials exist
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
 
    return(
        <div>
            <div className='login-container'>
                <form className={styles.form} onSubmit={async (e) => 
                    { e.preventDefault(); await postDataAsync("/login", {username: username, password: password})}}>
                    <br/>
                    <h1>Welcome</h1>
                    <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <a href="/">Forgot Password?</a>
                    <div>New to Artemis? <a href="/register">Create an account</a></div>
                    <button className={styles.button} type="submit">Sign In</button>
                </form>
            </div>
        </div>
    )
}

export { LogIn };