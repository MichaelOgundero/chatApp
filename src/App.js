import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Login from "./components/chatAppComponents/login.component"
import Register from "./components/chatAppComponents/register.component"
import UserPage from "./components/chatAppComponents/userPage.component"

function App() {
  return(
    <Router>
      <div>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register}/>
        <Route path="/user/:user" component={UserPage}/>
      </div>
    </Router>
  )
}

export default App;

