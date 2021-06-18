import axios from 'axios'
import React,{useState,useRef} from 'react'
import trash from '../../assets/trash.png';

function Users() {

    

        const [usersList,setUsersList] = useState([{
            
}]) 
        
        React.useEffect(()=>{
            axios.get('/user/list').then((response)=>{
                setUsersList(response.data.userList)
            

            
                
             })

        },[]);
        const handleDelete=async (index)=>{

           await axios.post('/user/listdelete',{
               _id:index._id
           }).then((response)=>{
            
               window.location.reload(true)
                
                
           },(error)=>{
               alert(error)
           })
            
        }

        
           return (
       <center><div className="box" style={{width:"100vw",height:'100vh',backgroundColor:"rgba(0,0,0,0.1"}}>

            <div className="table-container">
            <table className="table is-striped is-hoverable ">
                <thead>
                    <tr>
                        <th>SNo.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { usersList.length !== 0 ?usersList.map(function(user,index,array){
                        
                        
                        return(
                            <tr>
                                <th>{index+1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user._id}</td>
                                <td><center><a key={user} onClick={()=>handleDelete(user)}><img src={trash} style={{height:'auto',width:'20px'}} /></a></center></td>

                            </tr>
                        )
                        
                    }):<tr ><th rowSpan="5" style={{textAlign:'center',verticalAlign:'center'}}>No Users found</th></tr> }
                    
                    
                </tbody>
            </table>
            </div>
        </div></center>
    )
}

export default Users
