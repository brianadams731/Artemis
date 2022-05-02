import { useState } from 'react';
import { postDataAsync } from '../utils/postDataAsync'

import styles from '../styles/AccountForms.module.scss';
import regStyles from "../styles/Register.module.scss";
import { getEndpoint } from '../utils/apiEndpoints';
import { useNavigate } from 'react-router-dom';
 
const Register = (): JSX.Element => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
 
    const handleRegister = () => {
        let messages = [];
        // let check = /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W)/;

        if (password2 !== password) {
            messages.push("\nPasswords do not match");
        }

        if (username === '' || username === null || username.length < 3) {
            messages.push("\nUsername must be 3+ alphanumeric characters long");
        }

        if (password.length < 6) {
            messages.push('\nPassword must be 6+ characters long');
        }

        if (messages.length > 0) {
            if (messages.length > 1) {
                messages.join(', ');
                alert(messages);
            } else {
                alert(messages);
            }
        }
    }

    return (
        <div className={regStyles.wrapper}>
            <form className={`${styles.accountForm} ${styles.formEle}`} onSubmit={
                async (e) => {
                    e.preventDefault();
                    handleRegister();
                    const res = await postDataAsync(getEndpoint("register")!, {
                        username: username,
                        password: password,
                        email: email
                    }, false)
                    if(res.ok){
                        navigate("/");
                    }
                }
            }>
                <h2>Register</h2>
                <input type="text" value={username} placeholder='Username' onChange={(e) => setUsername(e.target.value)} required />
                <input type="email" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
                <input type="password" value={password2} placeholder='Confirm password' onChange={(e) => setPassword2(e.target.value)} required />
                <label><input type="checkbox" required />I agree to Artemis Privacy Policy</label>
                <label><input type="checkbox" required />I agree to Artemis Terms of Service</label>
                <button>Register</button>
                <footer>Have an account? <a href='/login'>Log In</a></footer>
            </form>
            
        </div>
    )
}

export { Register };