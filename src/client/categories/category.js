import React from 'react';


class category extends React.Component{
    constructor(props){
        super(props);
        
    }
    render(){
        return(
            <li>
            <a href="#">
              <span className="list_icon">
                <img src={"http://localhost:3001/"+this.props.image} alt="up" />
              </span>{" "}
              {this.props.category}
            </a>
          </li>
        );
    }
}

export default category;