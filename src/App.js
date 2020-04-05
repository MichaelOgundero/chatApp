import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';


import Login from "./components/chatAppComponents/login.component"
import Register from "./components/chatAppComponents/register.component"
import UserPage from "./components/chatAppComponents/userPage.component"
import Messages from "./components/chatAppComponents/messages.component"

function App() {
  return(
    <Router>
      <div>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register}/>
        <Route path="/user/:user" component={UserPage}/>
        <Route path="/messages/:user" component={Messages}/>
      </div>
    </Router>
  )
}

export default App;

