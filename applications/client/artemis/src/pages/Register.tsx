const Register = ():JSX.Element =>{
    return(
        <div>
            Register
            <div className="register-container">
                Reigster
                <br/>
                <div className="username-container">
                    <input type="text" name="username" placeholder='username' required />
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
                <input type="checkbox" required>I agree to Artemis Privacy Policy</input>
                <input type="checkbox" required>I agree to Artemis Terms of Service</input>
                <div className="submit-container">
                    <button>Register</button>
                </div>



            </div>
        </div>
    )
}

export { Register };