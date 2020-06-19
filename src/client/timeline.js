import React from 'react';
import Axios from 'axios';
import Moment from 'moment';
import Header from './header';
import Footer from './footer';
import Posts from './posts/posts';
import Categories from './categories/categories';
import AddSelectCategories from './categories/AddSelectCategories';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';


class Timeline extends React.Component{
    constructor(){
        super();
        this.state = {
            username : localStorage.getItem('username'),
            category : 0,
            description : "",
            date : "",
            time : "",
            postimage : "",
            getposts : {},
            getcategories : {},
            newcategory :"",
            categoryimage : "",
        }
    }

    logout = () => {
      localStorage.clear();
      this.setState({navigate:true}); // just use for re render
    }
    
    onSelectChange = (event) => {
        this.setState({category:event.target.value});
        console.log(event.target.value);
    }
    
    onDescriptionChange = (event) => {
        this.setState({description:event.target.value});
        console.log(event.target.value,this.state.getposts);
    }
    
    onFileChange = (event) => {
        this.setState({postimage:event.target.files[0]});
        console.log("post image",this.state.postimage);
    }

    checkBeforeUploadPost = () => {
      let back =true;
      if ( this.state.category == 0){
        document.querySelector('#categoryRequired').style.display="inline";
        back = false;
      }else{
          document.querySelector('#categoryRequired').style.display="none";
      }

      if ( this.state.description === ''){
        document.querySelector('#descriptionRequired').style.display="inline";
        back = false;
      }else{
        document.querySelector('#descriptionRequired').style.display="none";
      }

      if ( this.state.postimage === ''){
        document.querySelector('#fileRequired').style.display="inline";
        back = false;
      }else{
        document.querySelector('#fileRequired').style.display="none";
      }

      return back;
    }

    uploadPost =async () => {
      if(this.checkBeforeUploadPost()){
        await this.setState({date : Moment().format("DD MMM YYYY")});
        await this.setState({time : Moment().format("hh:mm a")})
        const file = new FormData(); 
        file.append('image', this.state.postimage);
        file.append('username', this.state.username);
        file.append('category', this.state.category);
        file.append('description', this.state.description);
        file.append('date',this.state.date);
        file.append('time',this.state.time);
        file.append('totallikes',0);
        console.log('data',file);

        console.log(this.state);
        Axios.post('http://localhost:3001/post/post',file).then((resp) => {
            this.fetchposts();
            console.log("sete",this.state.getposts);
        })
      } else{

      }
    }

    onNewCategory = (event) => {
      this.setState({newcategory:event.target.value});
    }

    onCategoryImage = (event) => {
      this.setState({categoryimage:event.target.files[0]});
    }

    checkBeforeUploadAddCategory = () => {
      let back = true;
      if ( this.state.newcategory == ''){
        document.querySelector('#category1Required').style.display="inline";
        back = false;
      }else{
          document.querySelector('#category1Required').style.display="none";
      }

      if ( this.state.categoryimage == ''){
        document.querySelector('#file1Required').style.display="inline";
        back = false;
      }else{
          document.querySelector('#file1Required').style.display="none";
      }
      return back;
    }

    addCategory =  () => {
      if( this.checkBeforeUploadAddCategory()){
        const file = new FormData();
         file.append('category',this.state.newcategory);
        file.append('image',this.state.categoryimage);
        Axios.post('http://localhost:3001/category/put',file).then((resp) => {
        console.log("category",resp.data=='');
        if(resp.data==""){
          document.querySelector('#categoryAdded').innerText="category is already added";
        }else{
          document.querySelector('#categoryAdded').innerText="category is added";
          this.fetchcategories();
        }
      })
      }
    }

    myUpload = async() =>{
        await Axios.post('http://localhost:3001/post/myuploads',this.state).then((resp) => {
          this.setState({getposts:resp.data});
          // console.log("myuploads",resp.data,this.state);
        })
    }

    postOfCategory = async(category) => {
      console.log("category",category);
      await Axios.post('http://localhost:3001/post/postofcategory',{'category':category}).then(resp => {
        this.setState({getposts:resp.data});
      })
    }

    timeline = () => {
      this.fetchposts();
    }


    fetchposts = async () =>{
      await  Axios.post('http://localhost:3001/post/getposts',this.state).then(async(resp)=>{
        //   console.log("response data",newpost);
      await this.setState({getposts:resp.data});
       
      for (let j=0;j<this.state.getposts.length;j++){
        let l=0;
        this.state.getposts[j].totallikes=l;
        for (let i=0;i<this.state.getposts[j].likes.length;i++ ){
            this.state.getposts[j].likes[i].likes==1 ? l++ :l=l ;
        this.state.getposts[j].totallikes=l;
        }
      }
        this.setState({username : localStorage.getItem('username')});  // just use for render
      //  console.log("fetchposts",this.state.getposts);
       })
    }

    fetchcategories = async () => {
      await  Axios.post('http://localhost:3001/category/getcategories',this.state).then((resp)=>{
              
        if (resp.data.length==0){
          this.setState({getcategories:[1]})
        }else{
          this.setState({getcategories:resp.data});
        }
        console.log("fetchcategories",this.state.getcategories);
     })
    }

    async componentDidMount(){
       await this.fetchposts();
     await this.fetchcategories();
    }

    render(){

        if(localStorage.getItem('email') == null){
          return <Redirect to="/login"/>
        }

        return(
          <div>
            <Header />
  <div className="container">
    <div className="content">
      <div className="content_rgt">
      <div className="rght_btn"> 
<a onClick={this.logout} style={{textAlign:"center"}}> Log Out </a>  </div>
        <div className="rght_btn">
        <br/>
          {/* <p> {this.state.getcategories.length}</p> */}
          
          { this.state.getcategories.length>0  ?  <AddSelectCategories selectcategories={this.onSelectChange} getcategories={this.state.getcategories}></AddSelectCategories> : console.log('lengthcategories',this.state.getcategories) }
          <span id="categoryRequired"> category required* </span><br/><br/>
          <input type="text" placeholder="Description" onChange={this.onDescriptionChange}/>
          <span id="descriptionRequired"> description required* </span><br/>
          <br/>
          <input type="file" name='file'  onChange={this.onFileChange} />
          <span id="fileRequired"> file required* </span><br/>
          {" "}
          <span className="rght_btn_icon">
          <img src="images/btn_iconb.png" alt="up" />
          </span>{" "}
          <span className="btn_sep">
          <img src="images/btn_sep.png" alt="sep" />
          </span>{" "}
            <a href='#'></a><button type="" onClick={this.uploadPost}> Upload Post  </button>
          {" "}
        </div>
        
        <div className="rght_btn">
          {" "}
          <br/>
          <input type="text" placeholder="Categories" onChange={this.onNewCategory}/><br/>
          <span id="category1Required"> Category Required* </span><br/>
          <input type="file" onChange={this.onCategoryImage}/>
          <span id="file1Required"> Image Required* </span><br/>
          <span className="rght_btn_icon">
            <img src="images/btn_icona.png" alt="up" />
          </span>{" "}
          <span className="btn_sep">
            <img src="images/btn_sep.png" alt="sep" />
          </span>{" "}
         
          <a href="#"><button type="button" onClick={this.addCategory}>Add Categories</button></a><br/>
          <span id="categoryAdded"></span>
          {" "}
        </div>
        <div className="rght_cate">
          <div className="rght_cate_hd" id="rght_cat_bg">
            Categories
          </div>
          <div className="rght_list">
                        {/* <Categories getcategories={this.state.getcategories}></Categories> */}
            {/* {console.log("getcategories",this.state.getcategories)} */}
              {/* { this.state.getcategories[0] != 1  ?  <Categories getcategories={this.state.getcategories}></Categories> : console.log('lengthcategories',this.state.getcategories) } */}
              <Categories getcategories={this.state.getcategories} postOfCategory={this.postOfCategory}></Categories>
             
            
          </div>
        </div>
        <div className="rght_cate">
          <div className="rght_cate_hd" id="opn_cat_bg">
            Featured
          </div>
          <div className="sub_dwn">
            <div className="feat_sec">
              <div className="feat_sec_img">
                <img src="images/feat_img1.png" alt="image" />
              </div>
              <div className="feat_txt">Lorem Ipusum Text</div>
            </div>
            <div className="feat_sec">
              <div className="feat_sec_img">
                <img src="images/feat_img2.png" alt="image" />
              </div>
              <div className="feat_txt">Lorem Ipusum Text</div>
              <div className="btm_rgt">
                <div className="btm_arc">Dogs</div>
              </div>
            </div>
            <div className="feat_sec">
              <div className="feat_sec_img">
                <img src="images/feat_img3.png" alt="image" />
              </div>
              <div className="feat_txt">Lorem Ipusum Text</div>
              <div className="btm_rgt">
                <div className="btm_arc">Rabbits</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content_lft">
        <div className="contnt_1">
          <div className="list_1">
            <ul>
              <li>
                <input type="checkbox" className="chk_bx" />
                Friends
              </li>
              <li>
                <input type="checkbox" className="chk_bx" />
                Flaged
              </li>
            </ul>
          </div>
          <div className="timeline_div">
            <div className="timeline_div1">
              <div className="profile_pic">
                <img src="images/timeline_img1.png" />
                <div className="profile_text">
                  <a href="#">Change Profile Pic</a>
                </div>
              </div>
              <div className="profile_info">
                <div className="edit_div">
                  <a href="#">
                    Edit <img src="images/timeline_img.png" />
                  </a>
                </div>
                <div className="profile_form">
                  <ul>
                    <li>
                      <div className="div_name1">Name :</div>
                      <div className="div_name2">Stefiney Gibbs</div>
                    </li>
                    <li>
                      <div className="div_name1">Sex :</div>
                      <div className="div_name2">Female</div>
                    </li>
                    <li>
                      <div className="div_name1">Description :</div>
                      <div className="div_name3">
                        This is an example of a comment. You can create as many
                        comments like this one or sub comments as you like and
                        manage all of your content inside Account.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="timeline_div2">
              <ul>
                <li>
                  <a href="#" className="active" onClick={this.timeline}>
                    Timeline{" "}
                  </a>
                </li>
                <li>
                  <a href="#">About </a>
                </li>
                <li>
                  <a href="#">Album</a>
                </li>
                <li>
                  <a href="#"> Pets</a>
                </li>
                <li>
                  <a href="#" onClick={this.myUpload}>My Uploads </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      <div> {this.state.getposts.length}</div>
        { this.state.getposts.length>0  ?  <Posts   getposts={this.state.getposts}></Posts> : console.log('length',this.state.getposts) }
    

      </div>
    </div>
    <div className="clear" />
  </div>
  <Footer>

  </Footer>
</div>

        );
    }
}

export default Timeline;