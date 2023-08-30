import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Lottie from "react-lottie-player"
import styles from "./styles.module.sass";
import animationCongrats from "../../assets/congrats.json";

export function Home(){
    const navigate = useNavigate();
    useEffect(()=>{
        const user =  localStorage.getItem("loginsystem-user")
        if(user === null){
            navigate("/login");
        }
    },[])

    function handleLogout(){
        localStorage.removeItem("loginsystem-user");
        navigate("/login");
    }
    return (
        <>
            <div className={styles.container}>
                <div className={styles.content}>
                    <Lottie 
                        play={true}
                        loop={false}
                        animationData={animationCongrats}
                    />
                    <h2>Successfully Logged In</h2>
                    <button
                        type="button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    )
}