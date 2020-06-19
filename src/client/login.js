// import './css/bootstrap.css';
// import './css/bootstrap-responsive.css';
import React from 'react';
import Axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import Header from './header';
import Footer from './footer';

class Login extends React.Component{
    constructor(props){
        super(props);
        console.log("login",this.props);
        this.state = {
            email : "",
            password : "",
            className1 : "",
            className2 : ""
        }
    }

    changed =async (event) =>{
        await this.setState( { [event.target.name]: event.target.value } );
        console.log("register",this.state);
    }

    checkBeforeSubmit = (event) => {
        let back = true;
        if ( this.state.email === ''){
            this.setState({className1 : 'incomplete'});
            back = false;
        }else{
            this.setState({className1 : ""});
        }
        
        if (this.state.password === '') {
            this.setState({className2 : 'incomplete'});
            back = false;
        } else {
            this.state.className2 = "";
        }

        return back;
    }

    submitted = (event) => {
        console.log("Submitted clicked");
        document.querySelector('#emailAndPasswordIncorrect').style.display="none";
        if (this.checkBeforeSubmit(event)){
            console.log("state",this.state);
            event.preventDefault();
            Axios.post('http://localhost:3001/user/login',this.state).then((resp) => {
            if(resp.data == "" ){
                document.querySelector('#emailAndPasswordIncorrect').style.display="inline";
                console.log("Error");
            }else{
                console.log("Resp data",resp.data);
                localStorage.setItem('username',resp.data.username);
                localStorage.setItem('email',resp.data.email);
                // ls.set('lname',resp.data[0].lname);
                this.props.history.push('/timeline');
            }
        })
        }else{
            event.preventDefault();
        }
    }

    render(){
        if(localStorage.getItem('email') != null){
            return <Redirect to="/timeline" path={true}/>
        } 

        return(
            <div>

                <div className="navbar navbar-inverse navbar-fixed-top">
                    <div className="navbar-inner">
                        <div className="container">
                            <button
                                type="button"
                                className="btn btn-navbar"
                                data-toggle="collapse"
                                data-target=".nav-collapse"
                            >
                            {" "}
                            <span className="icon-bar" /> <span className="icon-bar" />{" "}
                            <span className="icon-bar" />{" "}
                            </button>
                            <a className="brand" href>
                            PPL
                            </a>
                            <div className="pro_info pull-right">
                                <div className="pro_icn">
                                    <img src="images/pic_small.png" />
                                </div>
                                <div className="pro_txt">
                                    Me
                                    <b className="caret" />
                                </div>
                                <ul className="dropdown-menu" role="menu" aria-labelledby="dLabel">
                                    <li>
                                    <a tabIndex={-1} href="#">
                                        My Profile
                                    </a>
                                    </li>
                                    <li>
                                    <a tabIndex={-1} href="#">
                                        Message Box
                                    </a>
                                    </li>
                                    <li>
                                    <a tabIndex={-1} href="#">
                                        Change Language
                                    </a>
                                    </li>
                                    <li className="divider" />
                                    <li>
                                    <a tabIndex={-1} href="#">
                                        <input type="text" placeholder="search" />
                                    </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="nav-collapse collapse">
                                <ul className="nav">
                                    <li className="active">
                                    {" "}
                                    <a href>Home</a>{" "}
                                    </li>
                                    <li className>
                                    {" "}
                                    <a href>E-Coupons</a>{" "}
                                    </li>
                                    <li className>
                                    {" "}
                                    <a href>E-Brands</a>{" "}
                                    </li>
                                    <li className>
                                    {" "}
                                    <a href>Resuse Market</a>{" "}
                                    </li>
                                    <li className>
                                    {" "}
                                    <a href>Lost and Found</a>{" "}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <Header>

                </Header>
                
                <div className="container">
                    <div className="content">
                    <div className="content_rgt">
                        <div className="login_sec">
                        <h1>Log In</h1>
                        <ul>
                            <li>
                            <span>Email-ID</span>
                            <input type="text" placeholder="Enter your email" name="email" className={this.state.className1} onChange={this.changed} />
                            </li>
                            <li>
                            <span>Password</span>
                            <input type="text" placeholder="Enter your password" className={this.state.className2} name="password" onChange={this.changed} />
                            </li>
                            <li>
                            <input type="checkbox" />
                            Remember Me
                            </li>
                            <li>
                            <input type="submit" defaultValue="Log In" onClick={this.submitted} />
                            <span id="emailAndPasswordIncorrect"> Email ID or password is incorrect </span>
                            <Link to="/forgot"> Forgot Password </Link>
                            </li>
                        </ul>
                        <div className="addtnal_acnt">
                            I do not have any account yet.<Link to="/">Create My Account Now !</Link>
                        </div>
                        </div>
                    </div>
                    <div className="content_lft">
                        <h1>Welcome from PPL!</h1>
                        <p className="discrptn">
                        There are many variations of passages of Lorem Ipsum available, but
                        the majority have suffered alteration in some form, by injected
                        humour, or randomised words which don't look even slightly believable.
                        If you are going to use a passage of Lorem Ipsum, you need to be sure
                        there isn't anything embarrassing hidden in the middle of text.{" "}
                        </p>
                        <img src="images/img_9.png" alt />
                    </div>
                </div>
            
                <div className="clear" />
                    <Footer>

                    </Footer>
                </div>
            </div>
        );
    }
}

export default Login;