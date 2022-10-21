import React,{useState} from "react";
import Navbaar from "./Navbar";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
    
    const [inpval,setInp]=useState({
        name:"",
        age:"",
        email:"",
        password:"",
        image:""
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

    const handlephoto = (e) => {
        // e.target.files FileList
        console.log(e.target.files[0])
        setInp({...inpval,image:e.target.files[0]})
        // setINP((prevalue) => {
        //     return {
        //         ...prevalue, image: e.target.files[0] };
       
        //     })
    }




    const navigate=useNavigate();
    const addinpdata =async(e)=>{
            e.preventDefault();
            const{name,email,age,password}=inpval;

            const payload = new FormData();
            payload.append('name',name);
            payload.append('age', age);
            payload.append('email',email);
            payload.append('password',password);
 
            payload.append('image',inpval.image,inpval.image.name);
            const res = await fetch("/register", {
                method: "POST",
                body: payload
            });
        
        const data =await res.json();
        console.log(data);
        if(res.status===422 || !data){
            alert("error");
            console.log("error");
        }else{
            navigate("/")
            alert("data added")
            console.log("dataadded")
        }
    }




    return (
        <form encType="multiple/form-data">
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
            <div className="form-group">
                        <label className="form__label" for="firstName"> </label>
                        <input className="form__input" name="image" type="file" id="image" accept=".jpg, .png, .jpeg" onChange={handlephoto} />
                    </div>

            <button type="submit" onClick={addinpdata} className="btn btn-dark btn-lg btn-block">Register</button>
            {/* <p className="forgot-password text-right">
                    Already registered <a href="#">log in?</a>
                </p> */}
        </form>
    );
}
export default SignUp