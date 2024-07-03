import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/User/LoginPage';
import SignupPage from './Pages/User/SignupPage';
import HomePage from './Pages/User/HomePage';
import ProtectedRoute from './Components/User/ProtectedRoute';

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

        </Routes>
      </Router>
    </div>
  )
}

export default App
