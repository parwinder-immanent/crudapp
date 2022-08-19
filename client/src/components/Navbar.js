import React from 'react'
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import './App.css'


//import { BrowserRouter as Link } from 'react-router-dom'
const Navbaar = () => {

    

    return (
     
<nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <a className="navbar-brand" href={'/sign-in'}>
              CRUD
            </a>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href={'/sign-in'}>
                    Sign in
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href={'/sign-up'}>
                    Sign up
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
)
}
export default Navbaar