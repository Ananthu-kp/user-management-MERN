import '../../assets/styles/UserLogin.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../../redux/Admin/adminThunk';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = useSelector(state => state.admin.adminToken)

    useEffect(() => {
        if (token) navigate('/home')
    }, [token])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password, toast }));
    };
    return (
        <>
            <ToastContainer />
            <div className="container">
                <div className="form-container">
                    <h2>Admin Login</h2>
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
                </div>
            </div>
        </>
    )
}

export default Login
