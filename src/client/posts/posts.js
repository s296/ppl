import React from 'react';
// import Post from './post';
import {Link} from 'react-router-dom';

class Posts extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            getposts : this.props.getposts
        }
    }
    
    render(){
        if(this.props.getposts != this.state.getposts){
            this.setState( {getposts:this.props.getposts});            
        }
        
        return(
            <p>
                {this.state.getposts.map((post,index) => (
                    <div className="contnt_2">
                        <div className="div_a">
                            <div className="div_title">
                                {post.description}
                            </div>
                            <div className="btm_rgt">
                                <div className="btm_arc"> {post.category} </div>
                            </div>
                            <div className="div_top">
                                <div className="div_top_lft">
                                <img src="images/img_6.png" />
                                    {post.username}
                                </div>
                                <div className="div_top_rgt">
                                <span className="span_date"> {post.date} </span>
                                <span className="span_time"> {post.time} </span>
                                </div>
                            </div>
                            <div className="div_image">
                                <Link to ={{pathname:'/singlepost',post}}>
                                    <img src={"http://localhost:3001/"+post.image} alt="pet" />
                                </Link>
                            </div>
                            <div className="div_btm">
                                <div className="btm_list">
                                    <ul>
                                        <li>
                                        <a href="#">
                                            <span className="btn_icon">
                                            <img src="images/icon_001.png" alt="share" />
                                            </span>
                                            Share
                                        </a>
                                        </li>
                                        <li>
                                        <a href="#">
                                            <span className="btn_icon">
                                            <img src="images/icon_002.png" alt="share" />
                                            </span>
                                            Flag
                                        </a>
                                        </li>
                                        <li>
                                        <a href="#">
                                            <span className="btn_icon">
                                            <img src="images/icon_003.png" alt="share" />
                                            </span>
                                            {post.totallikes} Likes
                                        </a>
                                        </li>
                                        <li>
                                        <a href="#">
                                            <span className="btn_icon">
                                            <img src="images/icon_004.png" alt="share" />
                                            </span>
                                            {post.comment.length} Comments
                                        </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </p>
        );
    }
}

export default Posts;