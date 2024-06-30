import '../../assets/styles/UserLogin.css'

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function UserLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="container">
            <div className="form-container">
                <h2>Login Here</h2>
                <form action="">
                    <div>
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
                <div className="text-center">
                    <p>
                        <Link to="/userSignup">Don't Have an Account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default UserLogin;
