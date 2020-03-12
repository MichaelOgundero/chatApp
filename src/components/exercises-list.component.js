import React, {Component} from 'react';
import {Link} from 'react-router-dom'


const Exercise = props =>(//difference between a class and function component, a fucntion component doesnt have a state and lifecycle method, only accepts props and return jsx
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}>edit</Link> |
            <a href="#" onClick={()=>{props.deleteExercises(props.exercise._id)}}>delete</a>
        </td>

    </tr>

)




export default class ExercisesList extends Component{

    constructor(props){
        super(props);
        
        this.deleteExercise = this.deleteExercise.bind(this);

        this._isMounted = false;

        this.state = {exercises: []};
    }

    componentDidMount(){
        this._isMounted = true;
        this._isMounted && this.getExercises();
    }

    async getExercises(){
        const response = await fetch('http://localhost:5000/exercises/');
        const body = await response.json()
        
        this._isMounted && this.setState({
            exercises: body
        })
        
    }

    async deleteExercise(id){
        await fetch(`http:localhost:5000/exercises/${id}`, {
           method: "DELETE",
           headers: {
            "Accept": "application/json",
            "Content-Type": "application/json; charset=UTF-8"
           }
       })
       .then(res=>console.log(res.body));

       this.setState({
           exercises: this.state.exercises.filter(el=>el._id !== id)
       })

    }

    exerciseList(){

       return  this.state.exercises.map(currentExercise=>{
            return <Exercise exercise={currentExercise} deleteExercises={this.deleteExercise} key={currentExercise._id}/>;
        })
    }

    render(){
        return(
            <div>
                <p>You are on the Exercises List component</p>
                <table className="table">
                    <thead className = "thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}