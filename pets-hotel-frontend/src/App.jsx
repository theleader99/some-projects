import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginScreen from './Components/Login/loginScreen';
import locationForm from './Components/Location/locationForm';
import map from './Components/Location/fakeMap';

class App extends React.Component {
    render() {
      return (
        <BrowserRouter>
          <Switch>
            <Route path ='/login' component={LoginScreen} />
            <Route path ='/location' component = {locationForm}/> 
            <Route path = '/map' component = {map}/>
          </Switch>
        </BrowserRouter>
      );
    }
  }
  
  export default App;