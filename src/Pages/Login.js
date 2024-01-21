import React from "react";
import { auth, provider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import "./login.css"


function Login({setIsAuth}) {

    let navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("IsAuth", true);
            setIsAuth(true);
            navigate("/dashboard");
        });
    }
    return(
        <div className="loginPage">
            <button className="login-with-google-btn" onClick={signInWithGoogle} class="loginButton">
            Click Here To Login To Google!
            </button>
        </div>
    )
}

export default Login;