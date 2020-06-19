import './css/style.css';
import './css/bootstrap.css';
import './css/bootstrap-responsive.css';

import React from 'react';
import './App.css';
import Register from './register';
import Login from './login';
import Timeline from './timeline';
import { Route , Switch} from 'react-router-dom';
import SinglePost from './singlePost';
import Forgot from './forgot';

class App extends React.Component {
  constructor(){
    super();
  }

  render(){
    return(
      <Switch>
        <Route exact path="/"  component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/timeline"  component={Timeline} />
        <Route exact path="/singlepost" component={SinglePost}/>
        <Route path="/forgot" component = {Forgot} />
      </Switch>
    );
  }

}


export default App;
