import React from 'react';
import AddSelectCategory from './AddSelectCategory';

class AddSelectCategories extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            getcategories : this.props.getcategories
        }
    }

    render(){
        if(this.props.getcategories != this.state.getcategories){
            this.setState( {getcategories:this.props.getcategories});
            console.log("categories",this.props.getcategories);
        }
        const showcategories=[];
        const defaultcategory = () => {
            showcategories.push(<option value="0">Select Categories</option>);
            showcategories.push(<option value="Cats">CATS</option>);
            showcategories.push(<option value="Dogs">DOGS</option>);
            showcategories.push(<option value="Birds">BIRDS</option>);
            showcategories.push(<option value="Rabbits">RABBITS</option>);
            showcategories.push(<option value="Others">OTHERS</option>);
        }
        const category = () => {
            defaultcategory();
            // console.log("category",this.state.getcategories)
            // console.log("length",this.state.getcategories.length);
            if (this.props.getcategories[0] != 1)
            {
                for(let i=0;i<this.state.getcategories.length ;i++ ) {
                    // console.log("add category",this.state.getcategories[i]);
                    showcategories.push(
                        <AddSelectCategory category = {this.state.getcategories[i].category} ></AddSelectCategory>
                    );
                }
            }
            return showcategories
        }
        return(
            // <li>category</li>
            <select onChange={this.props.selectcategories}>  {category()} </select>
        );

    }
}

export default AddSelectCategories;