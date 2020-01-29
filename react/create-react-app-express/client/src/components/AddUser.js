import React, { Component } from 'react';


class AddUser extends Component {
    
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  };
  
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/users/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: this.state.name,email: this.state.email,age: this.state.age }),
    });
    const body = await response.text();
    
    this.setState({ responseToPost: body });
  };
  
render() {
    return (
      <div className="App">        
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <p>
            Name: <input
              type="text"
              value={this.state.post}
              onChange={e => this.setState({ name: e.target.value })}
            />
          </p>
          <p>
            Email: <input
              type="email"
              value={this.state.post}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </p>
          <p>
            Age: <input
              type="number"
              value={this.state.post}
              onChange={e => this.setState({ age: e.target.value })}
            />
          </p>
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>                
      </div>
    );
  }
}

export default AddUser;