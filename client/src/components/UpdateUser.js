import React, { useState } from "react";
import Navbaar2 from "./Navbaar2";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateUser = () => {
    const { id } = useParams("");
    const [inpval, setInp] = useState({
        name: "",
        age: "",
        email: "",
        password: ""
    })

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
    ///get user detail
   
    console.log(id);
    useEffect(() => {
    const getdata = async () => {


        const res = await fetch(`/getuser/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },

        });
        const data = await res.json();
        console.log(data);
        if (res.status === 422 || !data) {

            console.log("error");
        } else {
            setInp(data);
            console.log("Get Data")
        }
    }
    
        getdata();
    },[])

    const navigate=useNavigate();
    const updateuser = async (e) => {
        e.preventDefault();
        const { name, email, age, password } = inpval;
            
        const res = await fetch(`/updateuser/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, age, password
            })
        });

        const data = await res.json();
        console.log(data);
        if (res.status === 422 || !data) {
            alert("error");
            console.log("error");
        } else {
            navigate(`/read/${id}`)
            alert("Updation successfull")
            console.log("Update Data")
        }
    }




    return (
        <form>
            <Navbaar2 />
            <h3>Update</h3>

            <div className="form-group">
                <label>User name</label>
                <input type="text" name="name" value={inpval.name} onChange={setData} className="form-control" placeholder="Username" />
            </div>

            <div className="form-group">
                <label>Age</label>
                <input type="text" name="age" value={inpval.age} onChange={setData} className="form-control" placeholder="Age" />
            </div>

            <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={inpval.email} onChange={setData} className="form-control" placeholder="Enter email" />
            </div>

            {/* <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" value={inpval.password} onChange={setData} className="form-control" placeholder="Enter password" />
            </div> */}

            <button type="submit" onClick={updateuser} className="btn btn-dark btn-lg btn-block">update</button>
            {/* <p className="forgot-password text-right">
                    Already registered <a href="#">log in?</a>
                </p> */}
        </form>
    );
}
export default UpdateUser