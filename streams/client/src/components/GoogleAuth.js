import React from 'react';
import { environment } from '../environment';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: environment.clientId,
        scope: 'https://www.googleapis.com/auth/userinfo.email',
      });
    });
  }

  render() {
    return <div>Google Auth</div>;
  }
}

export default GoogleAuth;
