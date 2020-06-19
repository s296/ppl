// import './css/bootstrap.css';
// import './css/bootstrap-responsive.css';
import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import {Redirect} from 'react-router-dom';

class Register extends React.Component{
    constructor(props){
        super(props);
        console.log("register",this.props);
        this.state = {
            username:"",
            password:"",
            email:"",
            fname:"",
            lname:"",
            emailRegistered:false,
            termsAndCondition:false,
            className1 : "",
            className2 : "",
            className3 : "",
            className4 : "",
            classNmae5 : "",
            className6 : "",
        };
    }

    changed = (event) =>{
        this.setState( { [event.target.name]:event.target.value } );
        // console.log("register",this.state);
    }

    termsAndCondition =  (event) => {
      if(event.target.checked){
        this.setState({ termsAndCondition:true });
      } else{
        this.setState({ termsAndCondition:false });
      }
    }

    checkBeforeSubmit = (event) => {
        let back = true;
        if ( this.state.username === ''){
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
        
        if(this.state.email === ''){
            this.setState({className3 : 'incomplete'});
            back = false;
        }else {
            this.state.className3 = "";
        }

        if(this.state.fname === ''){
            this.setState({className4 : 'incomplete'});
            back = false;
        } else {
            this.state.className4 = "";
        }

        if(this.state.lname === ''){
            this.setState({className5 : 'incomplete'});
            back = false;
        } else {
            this.state.className5 = "";
        }

        if(this.state.termsAndCondition === false){
          document.querySelector('#tAndc').style.color="red";
          back = false;
      } else {
        document.querySelector('#tAndc').style.color="black";
      }
        return back;
    }

    submitted = (event) => {
        if ( this.checkBeforeSubmit(event)){
         event.preventDefault();
            //  console.log("asdd"); 
             axios.post("http://localhost:3001/user/signup",this.state).then((resp)=>{
                 console.log("data",resp.data);
                 if (resp.data == ''){
                    //  alert("phone number is already register");
                    document.querySelector('#emailRegistered').style.display="inline";
                    this.setState( {emailRegistered:true});
                 }
                 else{
                     alert("You have been successfully registered.");
                     this.props.history.push('/login');
                 }
             })           
         }else{
             event.preventDefault();
         }
     }

    render(){

      if(localStorage.getItem('email') != null){
        return <Redirect to="/timeline"/>
      }

        return(
            <div>
            
            {/* <Redirect to= "/login" path={true} /> */}
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
                  <div className="register_sec">
                    <h1>Create An Account</h1>
                    <ul>
                      <li>
                        <span>Username</span>
                        <input type="text" placeholder="Enter your username" className = {this.state.className1} name="username" onChange={this.changed} />
                      </li>
                      <li>
                        <span>Password</span>
                        <input type="text" placeholder="Enter your password" className = {this.state.className2} name="password" onChange={this.changed} />
                      </li>
                      <li>
                        <span>Email</span> <span id="emailRegistered"> Email ID is alredy registered </span>
                        <input type="text" placeholder="Enter your email" className = {this.state.className3} name="email" onChange={this.changed} />
                      </li>
                      <li>
                        <span>First Name</span>
                        <input type="text" placeholder="Enter your first name" className = {this.state.className4} name="fname" onChange={this.changed} />
                      </li>
                      <li>
                        <span>Last Name</span>
                        <input type="text" placeholder="Enter your last name" className = {this.state.className5} name="lname" onChange={this.changed} />
                      </li>
                      <li>
                        <input type="checkbox"  onClick={this.termsAndCondition}/><span id="tAndc">I agree to Term &amp; Conditions </span>
                      </li>
                      <li>
                        <input type="submit"  onClick={this.submitted} />
                      </li>
                    </ul>
                    <div className="addtnal_acnt">
                      I already have an account.<Link to="/login">Login My Account !</Link>
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
                  <img src="images/img_9.png" alt />{" "}
                </div>
              </div>
            </div>
            <div className="clear" />
            <Footer>

            </Footer>
            
          </div>
        );
    }
}

export default Register;