import React from 'react';
import Header from './header';
import Footer from './footer';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';

class SinglePost extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props);
        this.state = {
          id : "",
          usercomment : localStorage.getItem('username'),
          username :"unknown",
          category :"pet",
          description:"unknown",
          date :"01 jan 0000",
          time:"12:00 am",
          image:"feat_img3.png",
          check:-1,
          comment : "",
          comments : 0,
          likes :0,
          totallikes :0,
          getcomments : [{user:'bharat',comment:'add comment'}],
          totalcomments : 1,
        }
    }
    logout = () => {
      localStorage.clear("token");
      this.setState({navigate:true});     // just use for re render
    }

    comment = (event) => {
      this.setState({comment:event.target.value})
    }

    addComment = () => {
      if(this.state.id != ""){
        // this.setState({id:this.props.location.pass});
          
          Axios.post('http://localhost:3001/post/addcomment',this.state).then((resp) => {
              console.log("fetch data with comment",resp.data);
              this.fetchData();
          })
      }
    }

    likes = () => {
      if(this.state.date !="01 jan 0000"){
          Axios.post('http://localhost:3001/post/addlike',this.state).then((resp) => {
            console.log("fetch data of like",resp.data[0].likes);
            this.setState({totallikes:resp.data[0].totallikes});
          })
      }  
    } 

    fetchData =async () => {
      // this.setState({id:this.props.location.pass})
      // console.log("fetch",this.state);

      await Axios.post('http://localhost:3001/post/singlepost',this.state).then((resp) =>{
        console.log("fetchdata",resp.data[0]);
        
        this.setState({totallikes:resp.data[0].totallikes});
        this.setState({username: resp.data[0].username});
        this.setState({category: resp.data[0].category});
        this.setState({description: resp.data[0].description});
        this.setState({date: resp.data[0].date});
        this.setState({time:resp.data[0].time});
        this.setState({image:resp.data[0].image});
        this.setState({getcomments:resp.data[0].comment});
        this.setState({totalcomments:resp.data[0].comment.length})
      })  
    }

   componentDidMount(){
      if (this.props.location.post != undefined){
          this.setState({id:this.props.location.post._id});
          // this.getcomments();
      }
      
    }
      
  render() {

    if(localStorage.getItem('email') == null){
      return <Redirect to="/login" path={true}/>
    }
  
    if (this.state.check  <=0 && this.props.location.post != undefined){
      this.state.check++;
      this.state.check==1 ? this.fetchData(): console.log("no fetch data"); 
      }

      
    return (
      <div>
        <Header></Header>
        {/* <h1 onClick={this.logout} style={{float:'right'}}> Log Out </h1> */}
        
        <div className="container">
          <div className="content">
            <div className="content_rgt">
            <div className="rght_btn"> <a onClick={this.logout} style={{textAlign:"center"}}> Log Out </a>  </div>
              <div className="rght_btn"> <span className="rght_btn_icon"><img src="images/btn_iconb.png" alt="up" /></span> <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span> <a href="#">Upload Post</a> </div>
              <div className="rght_btn"> <span className="rght_btn_icon"><img src="images/btn_icona.png" alt="up" /></span> <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span> <a href="#">Invite Friends</a> </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
                <div className="rght_list">
                  <ul>
                    <li><a href="#"><span className="list_icon"><img src="images/icon_01.png" alt="up" /></span> CATS</a></li>
                    <li><a href="#"><span className="list_icon"><img src="images/icon_02.png" alt="up" /></span> Dogs</a></li>
                    <li><a href="#"><span className="list_icon"><img src="images/icon_03.png" alt="up" /></span> Birds</a></li>
                    <li><a href="#"><span className="list_icon"><img src="images/icon_04.png" alt="up" /></span> Rabbit</a></li>
                    <li><a href="#"><span className="list_icon"><img src="images/icon_05.png" alt="up" /></span> Others</a></li>
                  </ul>
                </div>
              </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="opn_cat_bg">Featured</div>
                <div className="sub_dwn">
                  <div className="feat_sec">
                    <div className="feat_sec_img"><img src="images/feat_img1.png" alt="image" /></div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img"><img src="images/feat_img2.png" alt="image" /></div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Dogs</div>
                    </div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img"><img src="images/feat_img3.png" alt="image" /></div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Rabbits</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content_lft">
              <div className="contnt_2">
                <div className="div_a">
                  <div className="div_title">{this.state.description}</div>
                  <div className="btm_rgt">
                    <div className="btm_arc">{this.state.category}</div>
                  </div>
                  <div className="div_top">
                    <div className="div_top_lft"><img src="images/img_6.png" />{this.state.username}</div>
                    <div className="div_top_rgt"><span className="span_date">{this.state.date}</span><span className="span_time">{this.state.time}</span></div>
                  </div>
                  <div className="div_image"><img src={"http://localhost:3001/"+this.state.image} alt="pet" /></div>
                  <div className="div_btm">
                    <div className="btm_list">
                      <ul>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_001.png" alt="share" /></span>Share</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_002.png" alt="share" /></span>Flag</a></li>
                        <li><a href="#" onClick={this.likes}><span className="btn_icon"><img src="images/icon_003.png" alt="share" /></span>{this.state.totallikes} Likes</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_004.png" alt="share" /></span>{this.state.totalcomments} Comments</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="contnt_3">
                <ul>
                  {
                    this.state.getcomments.map((data,index)=>(
                    <li>
                      <div className="list_image">
                        <div className="image_sec"><img src="images/post_img.png" /></div>
                          <div className="image_name">{data.user}</div>
                      </div>
                      <div className="list_info">
                        {data.comment}
                      </div>
                      <input type="button" defaultValue="Reply" className="orng_btn" />
                    </li> 
                    ))
                  }
                  <li>
                    <div className="list_image">
                      <div className="image_sec"><img src="images/post_img.png" /></div>
                <div className="image_name">{this.state.usercomment}</div>
                    </div>
                    
                    <div className="cmnt_div">
                      <input type="text" placeholder="Add a Comment" className="cmnt_bx" onChange={this.comment}/>
                      <input type="submit" className="sub_bttn" defaultValue="Submit Comment" onClick={this.addComment}/>
                    </div>
                  </li>
                </ul>
                <div className="view_div"><a href="#">View more</a></div>
              </div>
            </div>
          </div>
          <div className="clear" />
        </div>
        <Footer></Footer>
      </div>
          );
        }
}

export default SinglePost;