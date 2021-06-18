import './App.css';
import React,{useState} from 'react';
import 'bulma/css/bulma.min.css';
import Home from './components/home/Home';

import {BrowserRouter as Router,Route,Redirect} from 'react-router-dom'
import ProtectedRouter from './ProtectedRouter';
import Dashboard from './components/dashboard/Dashboard';
import Users from './components/users/Users';


 function App() {

  
    
  const [isAuth,setIsAuth] = useState(true)
  


  return (
    
        <Router >
          <Route exact path='/' component={Home}></Route>
          <ProtectedRouter path="/dashboard" component={Dashboard} isAuth={isAuth} />
          <Route path='/users' component={Users} />
          
        </Router>
        
    
  );
}

export default App;
