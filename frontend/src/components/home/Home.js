import React,{useState,useRef} from 'react';
import Hero from '../../assets/hero-img.png'
import './Home.css';
import SignUp from '../signUp/SignUp';
import Login from '../login/Login';
import '../../ProtectedRouter';


function Home(){

    const aboutRef= useRef(null);

    const[isNavActive,setisNavActive]=useState(false)
    
    
    const[showSignUpModal, setShowSignUpModal] = useState(false);
    const[showLoginModal,setShowLoginModal] = useState(false);

        const handleSignUpModal=()=>{
            setShowSignUpModal(!showSignUpModal);
        }
        
        const handleLoginModal=()=>{
            setShowLoginModal(!showLoginModal)
            
        }
    
      const toAbout = () =>{
            aboutRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
        
        

        return(
            <React.Fragment>
                <nav className="navbar" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="https://bulma.io">
                            <h1 style={{fontSize:'30px'}}><b>LOGO</b></h1>
                        </a>

                        <a 
                            onClick={() => {
                                setisNavActive(!isNavActive)
                            }}
                            role="button" className={`navbar-burger burger ${isNavActive ? 'is-active' : ''}`} aria-label="menu" aria-expanded="true" data-target="navbarMain">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        </a>
                    </div>
                    <div className={`navbar-menu ${isNavActive ? 'is-active' : ''}`} id="navbarMain">
                        <div className="navbar-start">
                            
                            <a className="navbar-item" onClick={toAbout}>
                                About Us
                            </a>
                            
                            <a href="http://localhost:3000/users" className="navbar-item">
                                Users List
                            </a>
                        </div>
                        <div className="navbar-end">
                            <div className="navbar-item">
                                <div className="buttons">
                                
                                    <a className="button is-link" onClick={handleSignUpModal}>
                                        <strong>Sign up</strong>
                                    </a>
                                
                                <a className="button is-light" onClick={handleLoginModal} >
                                    Log in
                                </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <section className="hero is-white is-fullheight-with-navbar">
                    <div className="columns hero-body">
                        <div className="column is-half heroContent">
                            <p className="title is-size-1-mobile">Lorem Ipsum</p><br />
                            <p className="subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac odio lectus. Duis congue bibendum massa, at hendrerit nisl dignissim sodales. Sed ac lorem vel augue venenatis dictum. Etiam non iaculis magna, et elementum justo.</p>
                        </div>
                        <div className="column">
                            <center><img src={Hero} /></center>
                        </div>
                        
                    </div>

                </section>
                <section className="is-large aboutSection" ref={aboutRef}>
                    <div className="columns is-large">
                        <div className="column aboutContainer">
                            <h1 style={{fontSize:'35px',fontWeight:'bold'}}>About Us</h1>

                        </div>
                        <div className="column aboutTextContainer">
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis lacus at turpis efficitur semper et congue velit. Integer luctus fermentum dui eget auctor. Nullam ac libero euismod, ornare nisi quis, hendrerit nisi. Aenean luctus, diam id aliquam commodo, sem augue pharetra est, sed venenatis ex diam nec ante
                            </p>
                        </div>
                    </div>
                </section>
                <section className=" is-large contactSection">
                <div className="columns is-large">
                <div className="column aboutTextContainer aboutContainer">
                            <p>
                                <b>4034  Copperhead Road<br />
                                Windsor, Connecticut, 06095<br />
                                203-282-4989<br />
                                et9p7gez88g@temporary-mail.net
                                </b>
                            </p>
                        </div>
                        <div className="column aboutContainer">
                            <h1 style={{fontSize:'35px',fontWeight:'bold'}}>Contact Us</h1>

                        </div>
                        
                </div>
                </section>

                {showSignUpModal? <SignUp />: ""}    
                {showLoginModal?<Login />:""}
                
            
                


            </React.Fragment>

            

        )
}

export default Home;