import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/User/LoginPage';
import SignupPage from './Pages/User/SignupPage';
import HomePage from './Pages/User/HomePage';
import ProtectedRoute from './Components/User/ProtectedRoute';
import AdminLogin from './Pages/Admin/AdminLogin';
import AdminHome from './Pages/Admin/AdminHome';
import IsAdmin from './Components/Admin/IsAdmin';

function App() {

  return (
    <div>
      <Router>
        <Routes>

          <Route path='/userLogin' element={<LoginPage />} />

          <Route path='/userSignup' element={<SignupPage />} />

          <Route element={<ProtectedRoute />} >
            <Route path='/' element={<HomePage />} />
          </Route>

          <Route path='/admin' element={<AdminLogin />} />

          <Route path='/home' element={<IsAdmin> <AdminHome /> </IsAdmin>} />

        </Routes>
      </Router>
    </div>
  )
}

export default App
