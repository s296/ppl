import React from 'react';
import Axios from 'axios';
import Header from './header';
import Footer from './footer';
import{Link} from 'react-router-dom';

export class Forgot extends React.Component{

    handleSubmit = (e)=>{
        e.preventDefault();
        // console.log(document.getElementById('email').value!="");
        if (document.getElementById('email').value!="") {
            Axios({
                method: "post",
                url: "http://localhost:3001/user/forgotpassword",
                data: {email: document.getElementById('email').value}
            })
            .then(resp=>{
                console.log("Response from /forgotpassword: "+resp.data);
                if(resp.data == 0 ){
                    document.getElementById('message').innerHTML = "This account is not yet registered.Please register your account.";
                }
                // else if(resp.data == 3){
                //     document.getElementById('message').innerHTML = "This account is not yet verified. Please verify your account first.";
                // }
                else{
                    document.getElementById('message').innerHTML = "Link has been sent at your email for reset password.";
                    document.getElementById('mailbox').style.display = "block"
                } 
            })
        }
        else{
            document.getElementById('message').innerHTML = "Please enter your registered email id in email textBox";
        }

        document.getElementById('pop_forgt').style.display = "block";
        document.getElementById('submit').style.display = "none";
        document.getElementById('email').style.display = "none";
    }

    handleOK = (e)=>{
        e.preventDefault();
        document.getElementById('pop_forgt').style.display = "none";
        document.getElementById('submit').style.display = "block";
        document.getElementById('email').style.display = "block";
        document.getElementById('email').value = "";
    }

    render(){
        return (
            <div>
            
                <Header/>
                {/* <h1><Link to="/login" style={{float:'right'}}>Log Out</Link></h1> */}
                <div className="popup_sec" id="pop_forgt" style={{display: "none"}}>
                    <div className="clos_btn"><img src="images/clos.png" alt="" id="clos_pop" onClick={this.handleOK} /></div>
                    <div className="pop_hdr"><p id="message">A mail has been send to your e-mail Id for Reset Password Link</p></div>
                    <div className="man_contnt">
                    <span id="mailbox" style={{display: "none"}}>Please Check Your Mail Box!</span>
                    <input type="submit" value="OK" onClick={this.handleOK}/>
                    </div>
                </div>
        
               
                <div className="container">
                    <div className="content">
                    <div className="content_rgt">
                        <div className="register_sec">
                        <h1>Forgot Password</h1>
                        <ul>
                            <li><span>Enter E-mail ID</span><input type="text" id="email" placeholder="User@gmail.com" required /></li>
                            <li><input type="submit" defaultValue="Submit" onClick={this.handleSubmit} id="submit"/></li>
                        </ul>
                        {/* <Link to>log out</Link> */}
                        </div>
                    </div>
                    <div className="content_lft">
                        <h1>Welcome from PPL!</h1>
                        <p className="discrptn">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
                        <img src="images/img_9.png" alt="" /> </div>
                    </div>
                </div>
                <div className="clear" />
                <Footer/>
            </div>

        )
    }
}

export default Forgot;

// import React from 'react';

// class Forgot extends React.Component{
//     constructor(props){
//         super(props);
//     }

//     sendmail = () => {

//         const sgMail = require('@sendgrid/mail');
//         sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//         const msg = {
//           to: 'shubham.garg@daffodilsw.com',
//           from: 'garg10010@gmail.com',
//           subject: 'Sending with SendGrid is Fun',
//           text: 'and easy to do anywhere, even with Node.js',
//           html: '<strong>and easy to do anywhere, even with Node.js</strong>',
//         };
    
//     sgMail.send(msg) .then(() => {}, error => {
//         console.error(error);
     
//         if (error.response) {
//           console.error(error.response.body)
//         }
//       });
//     }

//     render(){
//         return (
//             <div>
//                 {/* <div className="popup_sec" id="pop_forgt">
//                     <div className="clos_btn">
//                     <img src="images/clos.png" alt id="clos_pop" />
//                     </div>
//                     <div className="pop_hdr">
//                     A mail has been send to your e-mail Id for Reset Password Link
//                     </div>
//                     <div className="man_contnt">
//                     <span>Please Check Your Mail Box!</span>
//                     <input type="submit" defaultValue="Ok" />
//                     </div>
//                 </div> */}
//                 <div className="navbar navbar-inverse navbar-fixed-top">
//                     <div className="navbar-inner">
//                     <div className="container">
//                         <button
//                         type="button"
//                         className="btn btn-navbar"
//                         data-toggle="collapse"
//                         data-target=".nav-collapse"
//                         >
//                         {" "}
//                         <span className="icon-bar" /> <span className="icon-bar" />{" "}
//                         <span className="icon-bar" />{" "}
//                         </button>
//                         <a className="brand" href>
//                         PPL
//                         </a>
//                         <div className="pro_info pull-right">
//                         <div className="pro_icn">
//                             <img src="images/pic_small.png" />
//                         </div>
//                         <div className="pro_txt">
//                             Me
//                             <b className="caret" />
//                         </div>
//                         <ul className="dropdown-menu" role="menu" aria-labelledby="dLabel">
//                             <li>
//                             <a tabIndex={-1} href="#">
//                                 My Profile
//                             </a>
//                             </li>
//                             <li>
//                             <a tabIndex={-1} href="#">
//                                 Message Box
//                             </a>
//                             </li>
//                             <li>
//                             <a tabIndex={-1} href="#">
//                                 Change Language
//                             </a>
//                             </li>
//                             <li className="divider" />
//                             <li>
//                             <a tabIndex={-1} href="#">
//                                 <input type="text" placeholder="search" />
//                             </a>
//                             </li>
//                         </ul>
//                         </div>
//                         <div className="nav-collapse collapse">
//                         <ul className="nav">
//                             <li className="active">
//                             {" "}
//                             <a href>Home</a>{" "}
//                             </li>
//                             <li className>
//                             {" "}
//                             <a href>E-Coupons</a>{" "}
//                             </li>
//                             <li className>
//                             {" "}
//                             <a href>E-Brands</a>{" "}
//                             </li>
//                             <li className>
//                             {" "}
//                             <a href>Resuse Market</a>{" "}
//                             </li>
//                             <li className>
//                             {" "}
//                             <a href>Lost and Found</a>{" "}
//                             </li>
//                         </ul>
//                         </div>
//                     </div>
//                     </div>
//                 </div>
//                 <div className="header">
//                     <div className="header_lft">
//                     <div className="logo">
//                         <a href="#">
//                         <img src="images/logo.png" />
//                         </a>
//                     </div>
//                     <div className="navigatn">
//                         <ul>
//                         <li>
//                             <a href="#" className="active">
//                             Home
//                             </a>
//                         </li>
//                         <li>
//                             <a href="#"> E-Coupons </a>
//                         </li>
//                         <li>
//                             <a href="#">E-Brands </a>
//                         </li>
//                         <li>
//                             <a href="#"> Resuse Market </a>
//                         </li>
//                         <li>
//                             <a href="#"> Lost and Found</a>
//                         </li>
//                         </ul>
//                     </div>
//                     </div>
//                     <div className="header_rgt">
//                     <div className="flag_div">
//                         <img src="images/flag.png" />
//                     </div>
//                     <input type="text" placeholder="Search" className="txt_box" />
//                     <div className="msg_box">
//                         <a href="#">
//                         <span className="msg_count">100</span>
//                         </a>
//                     </div>
//                     <div className="info_div">
//                         <div className="image_div">
//                         {" "}
//                         <img src="images/pic.png" />{" "}
//                         </div>
//                         <div className="info_div1">Me</div>
//                     </div>
//                     </div>
//                 </div>
//                 <div className="container">
//                     <div className="content">
//                     <div className="content_rgt">
//                         <div className="register_sec">
//                         <h1>Forgot Password</h1>
//                         <ul>
//                             <li>
//                             <span>Enter E-mail ID</span>
//                             <input type="text" placeholder="User@gmail.com" />
//                             </li>
//                             <li>
//                             <input type="submit" defaultValue="Submit" onClick={this.sendmail}/>
//                             </li>
//                         </ul>
//                         </div>
//                     </div>
//                     <div className="content_lft">
//                         <h1>Welcome from PPL!</h1>
//                         <p className="discrptn">
//                         There are many variations of passages of Lorem Ipsum available, but
//                         the majority have suffered alteration in some form, by injected
//                         humour, or randomised words which don't look even slightly believable.
//                         If you are going to use a passage of Lorem Ipsum, you need to be sure
//                         there isn't anything embarrassing hidden in the middle of text.{" "}
//                         </p>
//                         <img src="images/img_9.png" alt />{" "}
//                     </div>
//                     </div>
//                 </div>
//                 <div className="clear" />
//                 <div className="footr">
//                     <div className="footr_lft">
//                     <div className="footer_div1">
//                         Copyright © Pet-Socail 2014 All Rights Reserved
//                     </div>
//                     <div className="footer_div2">
//                         <a href="#">Privacy Policy </a>| <a href="#"> Terms &amp; Conditions</a>
//                     </div>
//                     </div>
//                     <div className="footr_rgt">
//                     <ul>
//                         <li>
//                         <a href="#">
//                             <img src="images/social_1.png" />
//                         </a>
//                         </li>
//                         <li>
//                         <a href="#">
//                             <img src="images/social_2.png" />
//                         </a>
//                         </li>
//                         <li>
//                         <a href="#">
//                             <img src="images/social_3.png" />
//                         </a>
//                         </li>
//                         <li>
//                         <a href="#">
//                             <img src="images/social_4.png" />
//                         </a>
//                         </li>
//                     </ul>
//                     </div>
//                 </div>
//             </div>

//         );
//     }
// }

// export default Forgot;
