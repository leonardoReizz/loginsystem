import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Lottie from "react-lottie"
import styles from "./styles.module.sass";
import congratulationImg  from "../../assets/congratulation.svg";
import { defaultOptionsCongrats } from "../../utils/lottieOptions";


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
                        options={defaultOptionsCongrats}
                        height={250}
                        width={250}
                        isStopped={false}
                        isPaused={false}
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