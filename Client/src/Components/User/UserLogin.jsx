import '../../assets/styles/UserLogin.css'

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { userVerify } from '../../redux/User/userThunk';

function UserLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.userData)
    const navigate = useNavigate()


    const handleSubmit = async(e) => {
        e.preventDefault()
        dispatch(userVerify({ email, password, toast}))
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
                    <h2>Login Here</h2>
                    <form onSubmit={(e) => handleSubmit(e)}>
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
        </>
    );
}

export default UserLogin;
