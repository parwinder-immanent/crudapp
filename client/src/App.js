import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import UpdateUser from './components/UpdateUser'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './components/Home'
import Read from './components/Read'
import RegisterAdd from './components/RegisterAdd'

function App() {
  return (
    <Router>
      <div className="App">
        

        <div className="outer">
          <div className="inner">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/home" element={<Home />} />
              <Route path="/read/:id" element={<Read />} />
              <Route path="/updateuser/:id" element={<UpdateUser />} />
              <Route path="/registeradd" element={<RegisterAdd />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App