import React,{useState} from 'react';
import './SignUp.css'
import axios from 'axios';


function SignUp(){

   


    const[isSignUpModal,setSignUpModal]=React.useState(true);
    
        const handleSignUpClick=(e)=>{
            setSignUpModal(!isSignUpModal)
            
        }
        const[signUpData,setSignUpData]=React.useState({
            name:'',
            email:'',
            password:''
        })
        
        const[emailValidate,setEmailValidate]=useState(false)
        
        const[passwordValidate,setPasswordValidate]=useState(false)

        const emailRegex = /\S+@\S+\.\S+/;
        
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        
        const signUpInputHandler=(e)=>{
            setSignUpData({...signUpData,[e.target.name]:e.target.value});
            
        }
        const signUpEmailValidate=(e)=>{
            
           
            if(emailRegex.test(signUpData.email)){
                setEmailValidate(true);
                
                
            }
            else{
                setEmailValidate(false);
                
            }
            
        }
        
        const signUpPasswordValidate=(e)=>{
            if(passwordRegex.test(signUpData.password)){
                setPasswordValidate(true)
            }
            else{
                setPasswordValidate(false)
            }
        }

        
        const signUpModalState = isSignUpModal ? "is-active" :"";
        
        const handleSignUpSubmit=async(e)=>{

            
            if(signUpData.name === ""||signUpData.email ===""||signUpData.password===""){
                return alert("Fields cannot be empty")
            }
            if(emailValidate  && passwordValidate === true){
                await axios.post('/user/register',{
                    name: signUpData.name,
                    email:signUpData.email,
                    password:signUpData.password
                }).then((response)=>{
                    alert(response.data.message+ " Please login")

                    setSignUpModal(false)

                    

                },(error)=>{
                    const statusCode = (error.message).split(" ").pop();
                    if(statusCode === "409"){
                        alert("User already exists")
                    }
                    if(statusCode ==="404")
                    {
                        alert("Invalid Credentials")
                    }
                })
            }
            else
            {
                alert("Please check your credentials and try again")
            }


        }
       

        return(
            <React.Fragment>
                <div className={`modal is-clipped ${signUpModalState} signUpModal`}>
                <div className="modal-background" />
                <div className="modal-card">
                                    <header className="modal-card-head">
                                        <p className="modal-card-title">Sign Up!</p>
                                        <button className="delete" aria-label="close" onClick={handleSignUpClick}></button>
                                    </header>
                                
                                    <section className="modal-card-body">
                                        <div className="field">
                                            <label className="label">Name</label>
                                            <div className="control">
                                                <input className="input" onChange={signUpInputHandler}  type="text" name="name" value={signUpData.name} placeholder="Full Name" />
                                            </div>
                                            <p className="help" >Please Enter your full name</p>
                                        </div>
                                        <div className="field">
                                            <label className="label">Email</label>
                                            <div className="control">
                                                <input className={`input `+(emailValidate ? "is-success": "is-danger")} type="text" placeholder="Email" name="email" value={signUpData.email} onChange={signUpInputHandler} onKeyUp={signUpEmailValidate}/>
                                                

                                            </div>
                                            {emailValidate ? <p className="help is-success" >This email is valid</p>:<p className="help is-danger">This email is invalid</p>}
                                        </div>
                                        <div className="field">
                                        <label className="label">Password </label>
                                            <p className="control has-icons-right">
                                                <input className={`input ` + (passwordValidate ? "is-success" :"is-danger")} onKeyUp={signUpPasswordValidate} name="password" value={signUpData.password} type="password" placeholder="Password" onChange={signUpInputHandler}/>
                                                <span className="icon is-small is-right">
                                                    <i className="fas fa-check"></i>
                                                </span>
                                                
                                            </p>
                                            <p className = "help">Password must contain an uppercase letter,lowercase letter,a number and a special character</p>
                                        </div>
                                    </section>
                                    <footer className="modal-card-foot">
                                        <button className="button is-link" onClick={handleSignUpSubmit}>Sign Up</button>
                                        <button className="button" onClick={handleSignUpClick} >Cancel</button>
                                    </footer>
                </div>
                </div>
                </React.Fragment>
        )


}

export default SignUp;