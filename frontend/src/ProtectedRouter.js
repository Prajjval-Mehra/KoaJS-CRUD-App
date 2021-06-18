import React from 'react'
import { Switch,BrowserRouter as Router, Route,Redirect} from 'react-router-dom'
import Home from './components/home/Home';
import SignUp from './components/signUp/SignUp';
import Dashboard from './components/dashboard/Dashboard';

function ProtectedRouter ({isAuth:isAuth,component:Component, ...rest}){
    return(
        
            
            <Route {...rest} render={(props)=>{
                if(isAuth){
                return <Component />;

                } else {
                    return(
                    <Redirect to={{pathname:'/',state:{from:props.location}} }/>
                    ); 
                }
            }}
                />
           
    );
}

export default ProtectedRouter;