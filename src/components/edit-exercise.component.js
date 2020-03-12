import React, {Component} from 'react';
import DatePicker from 'react-datepicker'


export default class EditExercises extends Component{
    constructor(props){
        super(props);
    
        this.state = {
            username: "",
            description: "",
            duration: "",
            date: new Date(),
            users: []
            
        }
    
        this._isMounted = false;
    
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
    }
    
    componentDidMount(){//called before anything loads in the page
        this._isMounted = true;
        this._isMounted && this.getUsers();
    }
    
    
    async getUsers(){
        const editResponse = await fetch(`http://localhost:5000/exercises/${this.props.match.params.id}`)
        const editBody = await editResponse.json().catch(err=>console.log(err));
        this._isMounted && this.setState({
            username: editBody.username,
            description: editBody.description,
            duration: editBody.duration,
            date: new Date(editBody.date)
        })

        const response = await fetch('http://localhost:5000/users');
        const body = await response.json();
    
        if(body.length>0){
            this._isMounted && this.setState({
                users: body.map(user=>user.username),//drop down list of users
                username: body[0].username//username is automatically set to the first user in the db
            })
        }
    }
    
    onChangeUsername(e){
        this.setState({
            username: e.target.value
        })
    }
    
    onChangeDescription(e){
        this.setState({
            description: e.target.value
        })
    }
    
    onChangeDuration(e){
        this.setState({
            duration: e.target.value
        })
    }
    
    onChangeDate(date){
        this.setState({
            date: date
        })
    }
    
    async onSubmit(e){
        e.preventDefault();
    
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
    
        console.log(exercise);
    
        await fetch(`http://localhost:5000/exercises/update/${this.props.match.params.id}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(exercise)
        })
        .then(res=>res.json())
        .then(data=>console.log("success: ",data))
        .catch(err=>console.log('err: ',err))
    
    
    
        window.location = "/"//goes back to homepage
    }
    
    render(){
        return(
            <div>
                <p>You are on the update Exercises component</p>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        >
                            {
                                this.state.users.map(function(user){
                                    return <option
                                        key={user}
                                        value={user}>{user}

                                    </option>
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />
                    </div>
                    <div className="form-group">
                        <label>Duration in min: </label>
                        <input
                            type="text"
                            className = "form-control"
                            value={this.state.duration}
                            onChange = {this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>

                    </div>
                    <div className="form-group">
                        <input type="submit" value="edit Exercise log" className="btn btn-primary"/>
                    </div>
                </form>
            </div>

        )
    }
}