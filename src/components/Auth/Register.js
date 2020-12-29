import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrrorNotice";

export default function Register() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setPasswordCheck] = useState();
    const [displayName, setdisplayName] = useState();
    const [error, setError] = useState("");

    const {setUserData} =  useContext(UserContext);
    const history = useHistory();

    const submit = async (e)=>{
        e.preventDefault();
        try {
            const newUser = {email, password, confirmpassword, displayName};
            const RegisterResponse = await Axios.post(
            "http://localhost:5000/users/register",
                newUser
                );
            const loginRes = await Axios.post("http://localhost:5000/users/login",
            {email,
            password,
            });
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
            <h2> Register</h2>
            {error && 
            (<ErrorNotice message={error} clearError={()=> setError(undefined)}/>
            )}
            <form className="form" onSubmit={submit}>
                <label for="email">Email</label>
                <input type="email" id="register-email" onChange={(e)=> setEmail(e.target.value)} />
                    
                    <label for="register-password">Password</label>
                    <input type="password" id="register-password" onChange={(e)=> setPassword(e.target.value)} />
                    <input type="password" onChange={(e)=> setPasswordCheck(e.target.value)}  placeholder="Verify Password"/>

                    <label for="register-display-name">Display Name</label>
                    <input type="text" id="register-display-name" onChange={(e)=> setdisplayName(e.target.value)} />
                    <input type="submit" name="" value="Register"/>
            </form>        
        </div>
    )
}
