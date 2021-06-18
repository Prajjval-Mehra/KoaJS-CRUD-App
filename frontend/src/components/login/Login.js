import axios from 'axios';
import React,{ useState} from 'react';
import './Login.css';
import{  BrowserRouter as Router,useHistory } from 'react-router-dom';
import ProtectedRouter from '../../ProtectedRouter';
import Dashboard from '../dashboard/Dashboard';

function Login(){

   

    const[isLoginModal,setLoginModal]=useState(true)
    

  
    const handleLoginClick = () =>{
        setLoginModal(!isLoginModal)
    }
    const[loginData,setLoginData]= useState({
        email:'',
        password:''
    })
    const[emailValidate,setEmailValidate]=useState(false)
    const emailRegex = /\S+@\S+\.\S+/;
    const loginEmailValidate=(e)=>{
        if(emailRegex.test(loginData.email)){
            setEmailValidate(true);
            
            
        }
        else{
            setEmailValidate(false);
            
        }
        
    }
    const[loginSuccess,setLoginSuccess]=useState({
        _id:'',
        name:'',
        email:''
       
    })
    
    const loginInputHandler=(e)=>{
        setLoginData({...loginData,[e.target.name]:e.target.value})
    }
    
    let history = useHistory();
    const handleLoginSubmit=async (e)=>{
        // e.preventDefault();
        

        if(emailValidate === true && loginData.password !== ""){
            await axios.post('/user/login',{
                email:loginData.email,
                password:loginData.password
            }).then((response)=>{
                
                if(response.data.name === undefined){
                    alert(response.data.message)
                }else{
                        
                        setLoginSuccess({
                        _id:response.data._id,
                        name:response.data.name,
                        email:response.data.email
                    })
                   
                    
                    
                
                    
                    history.push("/dashboard")
                    
                }
            },(error)=>{
                const statusCode = (error.message).split(" ").pop();
                if(statusCode === "401"){
                    alert("Invalid Credentials")
                }
                if(statusCode === "404"){
                    alert("Account Not Found. Please check your credentials or sign up")
                }
            })
        }
        else{
            alert("Please check your credentials and try again")
        }
        
    }
    localStorage.setItem('loginSuccessData',JSON.stringify(loginSuccess))
  
    console.log(localStorage.setItem('loginSuccessData',JSON.stringify(loginSuccess)))
    
        
    


    const loginModalState = isLoginModal ? "is-active" :"";
    return(
        <React.Fragment>
            <Router>
            <div className={`modal is-clipped ${loginModalState}`}>
                <div className="modal-background" />
                <div className="modal-card">
                    <header className = "modal-card-head">
                        <p className="modal-card-title">Login</p>
                        <button className="delete" aria-label="close" onClick={handleLoginClick}></button>

                    </header>
                    <section className="modal-card-body">
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input className={`input ` + (emailValidate ? "is-success": "is-danger")} onChange={loginInputHandler} onKeyUp={loginEmailValidate} type="text" name="email" value={loginData.email} />
                        </div>
                        {emailValidate ? <p className="help is-success" >Email is Valid</p>:<p className="help is-danger">Please enter a valid email</p>}
                    </div>
                    <div className="field">
                        <label className="label">Password </label>
                            <p className="control ">
                                <input className="input" name="password" value={loginData.password} type="password" placeholder="Password" onChange={loginInputHandler}/>
                                
                                
                            </p>
                            
                    </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-link" onClick={handleLoginSubmit} >Login</button>
                        <button className="button" onClick={handleLoginClick} >Cancel</button>
                    </footer>
                </div>

                
                
            </div>
                
            </Router>
        </React.Fragment>

    )
}


export default Login;