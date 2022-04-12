import { useEffect, useState } from "react";
import { postDataAsync } from "../utils/postDataAsync";

const Register = (): JSX.Element => {
    const [username, setUsername] = useState<string>("");
    useEffect(()=>{
        console.log(username);
    },[username])

    return (
        <div>
            Register
            <form onSubmit={ async (e)=>{
                e.preventDefault();
                await postDataAsync("/backend",{
                    username: username
                });
            }}>
                <div className="register-container">
                    Reigster
                    <br />
                    <div className="username-container">
                        <input type="text" value={username} name="username" placeholder='username' required onChange={(e) => {
                            setUsername(e.target.value);
                        }} />
                    </div>
                    <div className="email-container">
                        <input type="email" name="email" placeholder='email' required />
                    </div>
                    <div className="password-container">
                        <input type="password" name="password" placeholder='password' required />
                    </div>
                    <div className="password2-container">
                        <input type="password" name="password" placeholder='confirm password' required />
                    </div>
                    <label>I agree to Artemis Privacy Policy<input type="checkbox" required></input></label>
                    <label>I agree to Artemis Terms of Service<input type="checkbox" required></input></label>
                    <div className="submit-container">
                        <button type="submit">Register</button>
                    </div>
                </div>
            </form>
            <footer>already joined? login</footer>
        </div>
    )
}

export { Register };