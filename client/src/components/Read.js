import React, { useEffect , useState } from "react"
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent'
import Navbaar2 from "./Navbaar2";
import { useParams } from "react-router-dom";
const Read = () => {
    const { id } = useParams("");

    console.log(id);
    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);
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
            setUserdata(data);
            console.log("Get Data")
        }
    }
    useEffect(() => {
        getdata();
    },[])






    return (
        <div className="container mt-3">
            <Navbaar2 />
            <h1 style={{ fontWeight: 400 }}>welcome {getuserdata.name} </h1>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <div className="left_view">
                        <img src="../logo192.png" style={{ width: 100 }} alt="profile" />
                        <h3 className="mt-3">Name: <span style={{ fontWeight: 400 }}>{getuserdata.name} </span></h3>
                        <h3 className="mt-3">Age: <span>{getuserdata.age} </span></h3>
                        <h3 className="mt-3"> Email:<span style={{ fontWeight: 400 }}>{getuserdata.email}</span></h3>
                        
                    </div>
                    <div className="right_view col-lg-6 col-md-6 col-12">
                        <div className=".add_btn">
                            <button className="btn btn-primary mx-2">Update</button>
                            <button className="btn btn-danger" >Delete</button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )

}
export default Read