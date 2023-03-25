import { useState } from "react";
import { useNavigate,Navigate } from'react-router-dom';
import { useToasts } from "react-toast-notifications";
import { useAuth } from "../hooks";
import styles from '../styles/login.module.css';

const Signup =()=>{
    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [confirmPassword,setConfirmPassword]=useState();
    const [signingup,setSigningup]=useState();
    const {addToast} =useToasts();
    const auth=useAuth();
    const history = useNavigate();
    console.log(history);

    const handleFormSubmit=async(e)=>{
        e.preventDefault();
        setSigningup(true);
        let error=false;
        if(!name || !email || !password || !confirmPassword){
            addToast('Please fill all the fields',{
                appearance:'error',
                autoDismiss:true,
            });
            error=true;
        }
        if(password !== confirmPassword){
            addToast('Make sure Password and Confirm Password matches',{
                appearance:'error',
                autoDismiss:true,
            });
            error=true;
        }
        if(error){
            return setSigningup(false);
        }
        const response=await auth.signup(name ,email ,password, confirmPassword);

        if(response.success){

            history.push('./login');
            setSigningup(false);

            return addToast('user Registered successfully, please login now',{
                appearance:'success',
                autoDismiss:true,
            });
        }
        else{
            addToast(response.message,{
                appearance:'success',
                autoDismiss:true,
            });
        }
        setSigningup(false);
    };
    if(auth.user){
        return <Navigate to="/" />
    }
    return (
        <form className={styles.loginForm} onSubmit={handleFormSubmit}>
            <span className={styles.loginSignupHeader}>Signup</span>
            <div className={styles.field}>
                <input
                    placeholder="Name"
                    type="text"
                    required
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                    autoComplete="new-password"
                />
            </div>
            <div className={styles.field}>
                <input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    autoComplete="new-password"
                />
            </div>
            <div className={styles.field}>
                <input
                    placeholder="Confirm-password"
                    type="password"
                    required
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                />
            </div>
            <div className={styles.field}>
                <input
                    placeholder="Password"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e)=>{setConfirmPassword(e.target.value)}}
                />
            </div>
            <div className={styles.field}>
                <button disabled={signingup}>
                    {signingup ? 'Signing... up' : 'Signup'}
                </button>
            </div>
        </form>
    );

}
export default Signup;