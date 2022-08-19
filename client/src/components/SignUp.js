import React,{useState} from "react";
import Navbaar from "./Navbar";
const SignUp = () => {
    
    const [inpval,setInp]=useState({
        name:"",
        age:"",
        email:"",
        password:""
    })






    const setData=(e)=>{
        console.log(e.target.value);
        const {name,value}=e.target
        setInp((preval)=>{
            return{
                ...preval,
                [name]:value
            }
        })
    }

    const addinpdata =async(e)=>{
            e.preventDefault();
            const{name,email,age,password}=inpval;

        const res =await fetch("/register",{
            method:"POST",
            headers:{
                  "Content-Type":"application/json"  
                    },
                    body:JSON.stringify({
                    name,email,age,password            
                    })
        });
        
        const data =await res.json();
        console.log(data);
        if(res.status===422 || !data){
            alert("error");
            console.log("error");
        }else{
            alert("data added")
            console.log("dataadded")
        }
    }




    return (
        <form>
            <Navbaar />
            <h3>Register</h3>

            <div className="form-group">
                <label>User name</label>
                <input type="text" name="name" value={inpval.name} onChange={setData} className="form-control" placeholder="Username" />
            </div>

            <div className="form-group">
                <label>Age</label>
                <input type="text" name="age" value={inpval.age}  onChange={setData} className="form-control" placeholder="Age" />
            </div>

            <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={inpval.email}  onChange={setData} className="form-control" placeholder="Enter email" />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" value={inpval.password}  onChange={setData} className="form-control" placeholder="Enter password" />
            </div>

            <button type="submit" onClick={addinpdata} className="btn btn-dark btn-lg btn-block">Register</button>
            {/* <p className="forgot-password text-right">
                    Already registered <a href="#">log in?</a>
                </p> */}
        </form>
    );
}
export default SignUp