import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../styles/AccountForms.module.scss';
import loginStyles from "../styles/Login.module.scss";
import { getEndpoint } from '../utils/apiEndpoints';
import { postDataAsync } from '../utils/postDataAsync';

const LogIn = (): JSX.Element => {

    // Check if credentials exist
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className={loginStyles.wrapper}>
            <form className={styles.formEle} onSubmit={async (e) => {
                e.preventDefault();
                const res = await postDataAsync(getEndpoint('login')!, {
                    email: email, password: password
                }, false)
                if(res.ok){
                    navigate("/dashboard/select");
                }
            }}>
                <br />
                <h1>Welcome</h1>
                <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                <a href="/">Forgot Password?</a>
                <div>New to Artemis? <a href="/register">Create an account</a></div>
                <button className={styles.button} type="submit">Sign In</button>
            </form>
        </div>
    )
}

export { LogIn };