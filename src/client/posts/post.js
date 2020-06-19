import React from 'react';

class Posts extends React.Component{
    constructor(props){
        super(props);
        
    }
    
    render(){
        return(
            <div className="contnt_2">
                <div className="div_a">
                    <div className="div_title">
                        {this.props.description}
                    </div>
                    <div className="btm_rgt">
                        <div className="btm_arc"> {this.props.category} </div>
                    </div>
                    <div className="div_top">
                        <div className="div_top_lft">
                        <img src="images/img_6.png" />
                            {this.props.username}
                        </div>
                        <div className="div_top_rgt">
                        <span className="span_date"> {this.props.date} </span>
                        <span className="span_time"> {this.props.time} </span>
                        </div>
                    </div>
                    <div className="div_image">
                        
                        <img src={"http://localhost:3001/"+this.props.image} alt="pet" />
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
                                0 Likes
                            </a>
                            </li>
                            <li>
                            <a href="#">
                                <span className="btn_icon">
                                <img src="images/icon_004.png" alt="share" />
                                </span>
                                4 Comments
                            </a>
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Posts;