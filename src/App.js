import React, { Component } from 'react';
import './App.css';
import FbBtn from './components/FbBtn/FbBtn.js';

class App extends Component {

  state = {
    username: null,
    userData: {}
  };

  onFacebookLogin = (loginStatus, resultObject) => {
    if (loginStatus === true) {
      this.setState({
        username: resultObject.user.name,
        userData: resultObject.user
      });
      console.log(this.state.resultObject)
    } else {
      alert('Facebook login error');
    }
  }

  render() {
    const { username } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Social Media Login</h1>
        </header>

        <div className="App-intro">
          {!username &&
            <div>
              <FbBtn onLogin={this.onFacebookLogin}>
                <button className='loginBtn'>Login with Facebook</button>
              </FbBtn>
            </div>
          }
          {username &&
            <p>Welcome back, {username}</p>
          }
          {this.state.userData.id ? `Id: ${this.state.userData.id}` : ""}
        </div>
      </div>
    );
  }
}

export default App;