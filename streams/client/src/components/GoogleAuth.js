import React from 'react';
import { connect } from 'react-redux';
import { environment } from '../environment';
import { signin, signout } from '../actions';

class GoogleAuth extends React.Component {
  state = { isSignedIn: null };

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: environment.clientId,
          scope: 'https://www.googleapis.com/auth/userinfo.email',
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedin) => {
    if (isSignedin) {
      this.props.signin();
    } else {
      this.props.signout();
    }
  };

  onSignin = () => {
    this.auth.signIn();
  };

  onSignout = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    }

    if (this.state.isSignedIn) {
      return (
        <button onClick={this.onSignout} className="ui red google button">
          <i className="google icon" />
          Signout
        </button>
      );
    }

    if (!this.state.isSignedIn) {
      return (
        <button onClick={this.onSignin} className="ui red google button">
          <i className="google icon" />
          Signin with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default connect(null, { signin, signout })(GoogleAuth);
