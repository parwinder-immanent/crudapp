import React,{ useEffect,useState} from "react";
import Navbaar2 from "./Navbaar2";
import { NavLink } from "react-router-dom";

const Home = () => {
    
    const [ getuserdata,setUserdata] = useState([]);
   

    const getdata = async (e) => {


        const res = await fetch("/getdata ", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },

        });
        const data = await res.json();
        console.log(data);
        if (res.status === 422 || !data) {

            //console.log("error");
        } else {
            setUserdata(data);
            //console.log("Get Data")
        }
    }
    useEffect(() => {
        getdata();
    }, [])
//////////DELETE USER/////////
const deleteuser = async (id) => {
    const res2 = await fetch(`/deleteuser/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },

    });
    const deletedata = await res2.json();
    //console.log(deletedata);
    if (res2.status === 422 || !deletedata) {

        console.log("error");
    } else {
        //console.log("Get Data")
        getdata();
    }
}
useEffect(() => {
    getdata();
}, [])
//////search bar
const searchHandle = async (event) => {

    let key = event.target.value;
    console.log(key)
    if (key) {
        let res2 = await fetch(`/search/${key}`);
        res2 = await res2.json();
        console.log(res2);
        if (res2) {

            setUserdata(res2)
        } else {
            console.log("hol")
            getdata();
        }
    }
}
    



    return (
        <div className="mt-5">
            <Navbaar2 />
            <div className="container">
            <div className="mt-s">
            <h1 style={{ fontWeight: 400 }}>welcome </h1>
                </div>
                <div className="add_btn mt-2 mb-2">
                    <NavLink to="/registeradd" className="btn btn-primary"> Add data</NavLink>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">UserName</th>
                            <th scope="col">Email</th>
                            <th scope="col">Age</th>
                            <th scope="col">Password</th>
                            <th scope="col">
                                <form className="d-flex" role="search">
                                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"onChange={searchHandle}  />
                                    <button className="btn btn-outline-success" type="submit" onSubmit={searchHandle} >Search</button>
                                </form>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            getuserdata.map((element, id) => {
                                return ( 
                                    <> 
                                        <tr>
                                            <th scope="row">{id + 1}</th>
                                            <td>{element.name}</td>
                                            <td>{element.email}</td>
                                            <td>{element.age}</td>
                                            <td>{element.password}</td>
                                            <td className="d-flex justify-content-between">
                                                <NavLink to={`/read/${element._id}`}> <button className="btn btn-success">Read</button></NavLink>
                                                <NavLink to={`/updateuser/${element._id}`}><button className="btn btn-primary">Update</button></NavLink>
                                                <button className="btn btn-danger" onClick={() => deleteuser(element._id)}>Delete</button>
                                            </td>
                                        </tr>

                                    </> 
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Home