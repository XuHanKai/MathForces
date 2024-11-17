import React, {useState, useEffect} from 'react';
import { useParams, Link } from "react-router-dom";
import { useAuth } from './Auth'; // Import the useAuth hook
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const Profile = (props) => {
    const params = useParams();
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [name, setName] = useState()
    useEffect(() => {
        const { username } = params;
        setName(username);
        console.log(username);
        axios.post("http://localhost:5000/info", { name: username})
        .then(result => {
            console.log(result)
            if(result.data.status === "Success"){
                /** add auth = true here */
                const userInfo = {name: result.data.name, email: result.data.email};
                setUser(userInfo);
               
               
            }else{
               
                alert("User doesn't exist")

            }
       
        })
        .catch(err => console.log(err));
    }, [params]);


  return (
    <div>
      <h1>Profile</h1>
      <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
    </div>
  );
}

export default Profile;