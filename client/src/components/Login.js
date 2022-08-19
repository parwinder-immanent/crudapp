import React,{useState} from "react";
import Navbaar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Login = () => {
    
    const [inpval, setInp] = useState({

        email: "",
        password: ""
    })


const navigate=useNavigate();



    const setData = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target
        setInp((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }

    const submitData = async (e) => {
        e.preventDefault();

        const { email, password } = inpval;
        console.log(inpval)
        const res = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();

        localStorage.setItem('token-info', JSON.stringify(data));
        
        console.log(data);
        if (res.status === 404 || !data.email) {

            alert("error");
            console.log("error");

        }
        else {

           navigate("/home")
            alert(" Login successful")
            console.log("login sucessfull")
        }
    }
    
        return (
            <form>
            <Navbaar />
                <h3>Log in</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={inpval.name} onChange={setData} className="form-control" placeholder="Username" />
           </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={inpval.password} onChange={setData} className="form-control" placeholder="Password" />
            </div>

                {/* <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div> */}

                <button type="submit" onClick={submitData} className="btn btn-dark btn-lg btn-block">Sign in</button>
                {/* <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p> */}
            </form>
        );
    }
export default Login