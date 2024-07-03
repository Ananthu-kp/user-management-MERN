import '../../assets/styles/UserSignup.css'

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registration } from '../../redux/User/userThunk';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from 'react-redux';


function UserSignup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate()
    const userData = useSelector((state) => state.user.userData) 


    const handleSubmit = async(e) => {
        e.preventDefault()
        const response = await registration({
            username,
            email,
            phone,
            password,
            confirmPassword,
            toast
        });
        if (response === 'success') {
            setTimeout(() => {
                navigate('/userLogin');
            }, 2000)
        }
    }


    useEffect(() => {
        if (userData) {
            navigate('/')
        }
    }, [userData])

    return (
        <>
            <ToastContainer />
            <div className="container">
                <div className="form-container">
                    <h2>Create an account</h2>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input
                                id="username"
                                name="name"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="phone">Phone</label>
                            <input
                                id="phone"
                                name="phone"
                                type="number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <button type="submit">Sign Up</button>
                        </div>
                    </form>
                    <div className="text-center">
                        <p>
                            <Link to="/userLogin">Already have an account?</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserSignup;
