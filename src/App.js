import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

//import Navbar from "./components/chatAppComponents/chatNavbar.component"
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

//import 'bootstrap/dist/css/bootstrap.min.css';

/*import Navbar from "./components/navbar.component";
import ExerciseList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";*/

 /* return (
    <Router>
      <div className="container">
        <Navbar/>
        <br/>

        <Route path="/" exact component={ExerciseList}/>
        <Route path="/edit/:id" component={EditExercise}/>
        <Route path="/create" component={CreateExercise}/>
        <Route path="/user" component={CreateUser}/>
      </div>
     

    </Router>

  );*/