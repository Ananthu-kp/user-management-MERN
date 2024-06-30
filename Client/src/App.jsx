import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/User/LoginPage';
import SignupPage from './Pages/User/SignupPage';
import HomePage from './Pages/User/HomePage';

function App() {
  
  return (
    <div>
       <Router>
        <Routes>

          <Route path='/userLogin' element={<LoginPage/>} />

          <Route path='/userSignup' element={<SignupPage/>} />

          <Route path='/' element={<HomePage/>} />

        </Routes>
       </Router>
    </div>
  )
}

export default App
