import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrrorNotice";


export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState("");

    const {setUserData} =  useContext(UserContext);
    const history = useHistory();

    const login = async (e)=>{
        e.preventDefault();
        try {
            const loginuser = {email, password};
            const loginRes = await Axios.post("http://localhost:5000/users/login",
            loginuser
            );
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            localStorage.setItem("auth-token",loginRes.data.token);
            history.push("/");
        } catch (error) {
            error.response.data.msg && setError(error.response.data.msg);
        }
    };

    return (
        <div className="page">
            <h2> Login </h2>
            {error && 
            (<ErrorNotice message={error} clearError={()=> setError(undefined)}/>
            )}
           <form className="form" onSubmit={login}>
                <label for="email">Email</label>
                <input type="email" id="register-email" onChange={(e)=> setEmail(e.target.value)} />
                    
                <label for="register-password">Password</label>
                <input type="password" id="register-password" onChange={(e)=> setPassword(e.target.value)} />
                <input type="submit" name="" value="Login"/>

            </form>        
        </div>
    )
}
