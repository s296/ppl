import React from 'react';
// import Category from './category.js';
import Axios from 'axios';

class Categories extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            getcategories : []
        }
    }

    fff = () => {
      console.log("fff");
    }

    render(){
        let morecategories=[];
        if(this.props.getcategories != this.state.getcategories && this.props.getcategories.__proto__.constructor==Array && this.props.getcategories[0]!=[1]){
            this.setState( {getcategories:this.props.getcategories});
            // console.log("categories",this.props.getcategories);
        }
        // console.log("render categories",this.state.getcategories);

        
        if(this.state.getcategories.length!=0 ){
          morecategories=this.state.getcategories.map((category,index)=> (
            <li>
              <a href="#" onClick={() => this.props.postOfCategory(category.category)}>
                <span className="list_icon">
                  <img src={"http://localhost:3001/"+category.image} alt="up" />
                </span>{" "}
                {category.category}
              </a>
            </li>                    
          ))
        }
        

        return(
            // <li>category</li>
        // <div> {category()} </div>
        <ul> 
              <li  >
                <a href="#" onClick={() => this.props.postOfCategory("Cats")}>
                  <span className="list_icon">
                    <img src="images/icon_01.png" alt="up" />
                  </span>{" "}
                  CATS
                </a>
              </li>
              <li>
                <a href="#" onClick={() => this.props.postOfCategory("Dogs")}>
                  <span className="list_icon">
                    <img src="images/icon_02.png" alt="up" />
                  </span>{" "}
                  Dogs
                </a>
              </li>
              <li>
                <a href="#" onClick={() => this.props.postOfCategory("Birds")}>
                  <span className="list_icon">
                    <img src="images/icon_03.png" alt="up" />
                  </span>{" "}
                  Birds
                </a>
              </li>
              <li>
                <a href="#" onClick={() => this.props.postOfCategory("Rabbits")}>
                  <span className="list_icon">
                    <img src="images/icon_04.png" alt="up" />
                  </span>{" "}
                  Rabbits
                </a>
              </li>
            {/* {console.log(this.state.getcategories,"this.state.categories")} */}
            

            {morecategories}
                
            <li>
                <a href="#" onClick={() => this.props.postOfCategory("Others")}>
                  <span className="list_icon">
                    <img src="images/icon_05.png" alt="up" />
                  </span>{" "}
                  Others
                </a>
            </li>
        </ul>
        );

    }
}

export default Categories;