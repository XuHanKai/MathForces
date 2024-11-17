import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useAuth } from './Auth'; // Import the useAuth hook
function Login() {    
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const { login } = useAuth(); // Access the login function from AuthContext
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(name);
        axios.post("http://localhost:5000/login", { name, password })
        .then(result => {
            console.log(result)
            if(result.data.status === "Success"){
                /** add auth = true here */
                const userInfo = { name: result.data.name, email: result.data.email }; 
     
                login(userInfo);  // Store the user info in the context
                navigate("/");  // Redirect to the home page
               
            }else{
                navigate("/register")
                alert("You are not registered to this service")

            }
       
        })
        .catch(err => console.log(err))
    }


  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-3 rounded w-25">
            <h2><center>Login</center></h2>
            <form onSubmit={handleSubmit}>
                
                <div className="mb-3">
                    <label htmlFor="name">
                        <strong>Username</strong>
                    </label>
                    <input type="text" 
                    placeholder='Enter Username' 
                    autoComplete='off' 
                    name='name' 
                    className='form-control rounded-0' 
                    onChange={(e) => setName(e.target.value)}

                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Password</strong>
                    </label>
                    <input type="password" 
                    placeholder='Enter Password' 
                    name='password' 
                    className='form-control rounded-0' 
                    onChange={(e) => setPassword(e.target.value)}

                    />
                </div>
                <button type="submit" className="btn btn-success w-100 rounded-0">
                    Login
                </button>
                </form>
                <p>Don't have an account?</p>
                <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Sign Up
                </Link>
            
        </div>
    </div>
  );
}

export default Login;