import React, {Component} from 'react';

export default class CreateUsers extends Component{

    constructor(props){
        super(props);
    
        this.state = {
            username: ""  
        }
    
 
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
    }


    onChangeUsername(e){
        this.setState({
            username: e.target.value
        })
    }
    
    async onSubmit(e){
        e.preventDefault();
    
        const user = {
            username: this.state.username
        }
    
        console.log(user);

        await fetch('http://localhost:5000/users/add', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(user) 
        })
        .then(res=>res.json())
        .then(data=>console.log('Success:', data))
        .catch(err=>console.log('err', err))

        this.setState({
            username: '' //sets the userfield to null so we can add another user
        })
    }

    render(){
        return(
            <div>
                <p>You are on the craete users component</p>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}/>

                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}