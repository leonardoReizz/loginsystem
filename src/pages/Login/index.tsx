import { useEffect, useState } from "react";
import styles from "./styles.module.sass";
import loginImg from "../../assets/login-img.jpg";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { toastOptions } from "../../utils/toastOptions";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("loginsystem-user")
        if(user !== null){
            navigate("/");
        }
    }, [])
    

    function handleSignIn(){
        if(email.length <= 3) {
            toast.error("Invalid Email", toastOptions)
        } else if(password.length <= 2) {
            toast.error("Invalid Password", toastOptions)
        } else {
            const toastId = toast.loading("Loading...", toastOptions)
            axios.post("https://loginsystembackend.leonardo-reis.com/login",{
                email,
                pass: password
            })
            .then((res)=>{
                console.log(res)
                if(res.data.length === 0){
                    toast.dismiss(toastId)
                    toast.error("Email or Password Invalid.", toastOptions)
                }else{
                    localStorage.setItem("loginsystem-user", JSON.stringify(res.data[0]))
                    toast.dismiss(toastId)
                    navigate("/");
                }
                
            })
            .catch((err)=>{
                toast.dismiss(toastId);
                toast.error("Error", toastOptions)
            })
        }
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.limit}>
                    <div className={styles.content}>
                        <div className={styles.img}>
                            <img src={loginImg} alt="login-img" />
                        </div>
                        <div className={styles.form}>
                            <h1>Welcome!</h1>
                            <input 
                                placeholder="Email"
                                type="text" 
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}    
                                maxLength={72}
                            />
                            <input 
                                placeholder="Password"
                                type="password" 
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}    
                                maxLength={12}
                            />
                            <button
                                type="submit"
                                onClick={handleSignIn}
                            >
                                Login
                            </button>
                            <p>Not have an account yet? <Link to="/register">Create Now</Link></p>
                        </div>
                    </div>  
                </div>
                
            </div>
            <ToastContainer/>
        </>
    )
}