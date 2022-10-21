import React from 'react'
import { useNavigate } from "react-router-dom";



const Navbaar2 = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token-info');
        navigate("/sign-in")

    };
   
     let result = localStorage.getItem(('token-info'))
     if (result !== null) {
         result = JSON.parse(result)
         console.log(result?.name);
     }
    return (

        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
                <h5>CRUD</h5>
                {/* <a className="navbar-brand" href={'/sign-in'}>
              CRUD
            </a> */}
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href={'/home'}>
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={'/chat'}>
                                Chatbox
                            </a>
                        </li>
                    </ul>

                </div>
               
                <h2>{result.name}</h2>
                <button className="btn btn-primary" onClickCapture={logout}>logout </button>
            </div>
        </nav>
    )
}
export default Navbaar2