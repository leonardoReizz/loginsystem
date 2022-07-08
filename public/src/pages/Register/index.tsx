import { useEffect, useState } from "react";
import styles from "./styles.module.sass";
import loginImg from "../../assets/login-img.jpg";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { toastOptions } from "../../utils/toastOptions";
import axios from "axios";


export function Register(){
    const [email, setEmail] = useState("")
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("loginsystem-user")
        if(user !== null){
            navigate("/");
        }
    }, [])

    function handleRegister(){
        if(name.length <= 3){
            toast.error("Invalid Name.", toastOptions)
        }else if(email.length <= 6) {
            toast.error("Invalid Email.", toastOptions);
        } else if(password.length <= 7) {
            toast.error("Password must be at least 8 characters long.", toastOptions);
        } else if(confirmPassword != password){
            toast.error("Passwords do not match.", toastOptions);
        } else if(!ValidateEmail(email)){
            toast.error("Enter a Valid Email", toastOptions);
        }else{
            const toastId = toast.loading("Loading...", toastOptions);
            axios.post("https://loginsystembackend.vercel.app/register", {
                fullName : name,
                email,
                pass : password
            })
            .then((res)=>{
                toast.dismiss(toastId);
                navigate("/login")
            })
            .catch((err)=>{
                toast.dismiss(toastId);
                if(err.response.status === 400){
                    toast.error(err.response.data.msg, toastOptions);
                }else{
                    toast.error("Error.", toastOptions);
                }
            })
        }
    }

    function ValidateEmail(mail: string){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
        return (true)
    }
        return (false)
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
                            <h1>Register Now!</h1>
                            <input 
                                placeholder="Name"
                                type="text" 
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                                maxLength={52}
                            />
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
                            <input 
                                placeholder="Confirm Password"
                                type="password" 
                                value={confirmPassword}
                                onChange={(e)=>setConfirmPassword(e.target.value)}    
                                maxLength={12}
                            />
                            <button
                                type="submit"
                                onClick={handleRegister}
                            >
                                Register
                            </button>

                            <p>Already have an account? <Link to="/login">Sign In</Link></p>
                        </div>
                    </div>  
                </div>
            </div>
            <ToastContainer />
        </>
    )
}