import React,{ useState } from 'react';
import './Dashboard.css'
import {useHistory,withRouter} from 'react-router-dom';
import bulmaDivier from '../../../node_modules/bulma-divider/dist/css/bulma-divider.min.css'
import axios from 'axios';
import editButton from '../../assets/edit-button.png'

function Dashboard(){

    let history = useHistory();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const userData =  JSON.parse(localStorage.getItem("loginSuccessData"));
    const [newPassword,setNewPasword]=useState({
        _id:userData._id,
        oldPassword:'',
         password:''
    })
    const [newName,setNewName]=useState({
        _id:userData._id,
        
        Name:''
    })
    const [passwordValidate,setPasswordValidate]=useState(false)
    const[changePasswordShow,setChangePasswordShow]=useState(false)
    const[userDeleteShow,setUserDeleteShow] = useState(false)
    const[changeNameShow,setChangeNameShow] = useState(true)

    const newPasswordInput=(e)=>{
        setNewPasword({...newPassword,[e.target.name]:e.target.value});
        
    }
    const newNameInput=(e)=>{
        setNewName({...newName,[e.target.name]:e.target.value});

    }
    const newPasswordValidate=()=>{
        if(passwordRegex.test(newPassword.password)){
            setPasswordValidate(true);
        }
        else{
            setPasswordValidate(false)
        }

    }

    const newPasswordSubmit=async(e)=>{

        if(newPassword.password ==="" || newPassword.oldPassword==="")
        {
            alert("Fields cannot be empty")
        }
        if(passwordValidate )
        {
            await axios.post('/user/changepassword',newPassword).then((response)=>{
                alert(response.data.message)
                
                if(response.data.message === "Password Successfully Changed"){
                    handleLogout();
                }
            },(error)=>{
                const statusCode = (error.message).split(" ").pop();
                
                if(statusCode === "401")
                {
                    alert("Wrong password entered")
                }
                else if(statusCode === "409")
                {
                    alert("Old password cannot be the same as new password")
                }
                
            })
        }

    }

    const deleteAccountSubmit=async(e)=>{

        
        if(newPassword.oldPassword!== "")
        {
            await axios.post('/user/deleteuser',{
                _id: newPassword._id,
                oldPassword: newPassword.oldPassword
            }).then((response)=>{
                if(response.status === 200)
                {
                    alert(response.data.message);
                    handleLogout();
                }
                else{
                    alert(response.data.message)
                }
            },(error)=>{
                const statusCode = (error.message).split(" ").pop();
                if(statusCode === "401")
                {
                    alert("Invalid Password")
                }
            })
        }else{
            alert("Please enter your password to delete the account")
        }
    }
    const newNameSubmit=async(e)=>{
        
        if(newName.Name === "")
        {
            alert("This field cannot be empty")
        }
        else if(newName.Name === userData.name){
            alert("New name cannot be the same as old name.")
        }
        else
        {
            await axios.post('/user/changename',newName).then((response)=>{
                if(response.status === 201)
                {   
                    alert("Name changed successfully")
                    handleLogout();
                }
                    
            },(error)=>{
                const statusCode = (error.message).split(" ").pop();
                alert(statusCode)
            })
        }
    }
    
       
       
       
    const handleLogout=()=>{
        setChangePasswordShow(false);
        setUserDeleteShow(false)
        localStorage.clear();
        
        history.push('/')
    }

    

    const handlePasswordChange=()=>{
        if(userDeleteShow === true)
            {
                setUserDeleteShow(!userDeleteShow)
            }
        setChangePasswordShow(!changePasswordShow)
        
    }
    const handleUserDelete=()=>{
        
        if(changePasswordShow === true){
            setChangePasswordShow(false)
        }
        
        setUserDeleteShow(!userDeleteShow)
        
        
    }
    const handleNameChange=()=>{
        if(userDeleteShow === true)
            {
                setUserDeleteShow(!userDeleteShow)
            }
        if(changePasswordShow === true){
            setChangePasswordShow(false)
        }
     setChangeNameShow(!changeNameShow)
    }
   
    
return(
        <div className="cardContainer">
            <div className="card">
                <header className="card-header" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <p className="card-header-title">
                        Welcome {userData.name} 
                    </p>
                </header>
            
                <div className="card-content">
                    <div className="content">
                        <h1>Account Details</h1><br />
                        <p style={{marginBottom:"8px",marginBottom:"10px"}}><b>Full Name   &nbsp;</b><a onClick={handleNameChange}><img src={editButton} alt="" style={{height:'auto',width:'15px'}}  /> </a></p>{changeNameShow ? <div style={{height:'25px',marginTop:"10px"}} ><p>{userData.name}</p><br/></div>:
                        <div style={{marginTop:"10px"}}>
                            <div className="field has-addons is-small">
                                <div className="control">
                                    <input className="input is-small" type="text" placeholder="Full Name" name="Name" value={newName.Name}  onChange={newNameInput} />
                                </div>
                                <div className="control ">
                                    <a className="button is-success is-small" onClick={newNameSubmit}>
                                        Submit
                                    </a>
                                </div>
                                <div className="control">
                                    <a className="button is-danger is-small" onClick={handleNameChange}>
                                        Cancel
                                    </a>
                                </div>
                            </div>
                        </div>}
                        
                        <p style={{marginBottom:"5px",paddingTop:"30px"}}><b>Email :</b></p><div>{userData.email}</div>
                        {changePasswordShow? <div>
                            <div className="is-divider" data-content="Change Password"></div>
                            <div className="field">
                                <label className="label">Current Password</label>
                                <div className="control">
                                    <input className="input is-small"type="password" name="oldPassword" value={newPassword.oldPassword} onChange={newPasswordInput}/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">New Password</label>
                                <div className="control">
                                    <input className={`input is-small ` + (passwordValidate ? "is-success" :"is-danger")} type="password" name="password"  onKeyUp={newPasswordValidate} value={newPassword.password} onChange={newPasswordInput}/>
                                </div>
                                <p className = "help">Password must contain an uppercase letter,lowercase letter,a number and a special character</p>
                            </div>
                            <div className="field is-grouped">
                                <p className="control">
                                    <button className="button is-success is-small" onClick={newPasswordSubmit}>Change Password</button>
                                </p>
                                <p className="control">
                                    <button className="button is-danger is-small" onClick={handlePasswordChange}>Cancel</button>
                                </p>
                            </div>
                        </div>:""}
                        {userDeleteShow ? <div>
                            <div className="is-divider" data-content="Delete Account"></div>
                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control">
                                    <input placeholder="Enter your password to delete the account" className="input is-small"type="password" name="oldPassword" value={newPassword.oldPassword} onChange={newPasswordInput}/>
                                </div>
                            </div>
                            <div className="field is-grouped">
                                <p className="control">
                                    <button className="button is-success is-small" onClick={deleteAccountSubmit}>Delete Account</button>
                                </p>
                                <p className="control">
                                    <button className="button is-danger is-small" onClick={handleUserDelete}>Cancel</button>
                                </p>
                            </div>


                        </div>:""}
                        
                    </div>
                </div>
                <footer className="card-footer">
                    
                    <a className="card-footer-item" onClick={handleUserDelete}>Delete</a>
                    <a className="card-footer-item" onClick={handlePasswordChange} >Change Password</a>
                    <a className="card-footer-item logout" onClick={handleLogout}>Logout</a>
                </footer>
            </div>
        </div>
    )
}

export default withRouter(Dashboard);