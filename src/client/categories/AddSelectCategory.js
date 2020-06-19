import React from 'react';


class Category extends React.Component{
    constructor(props){
        super(props);
        
    }
    render(){
        // console.log("ADDselectCategory",this.props.category);
        return(
            <option>
                {this.props.category}
            </option>
        );
    }
}

export default Category; 