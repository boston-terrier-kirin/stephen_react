import React from 'react';
import ReactDOM from 'react-dom/client';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {
  // babelがやってくれるので、コンストラクタは不要。
  // constructor(props) {
  //   super(props);
  //   this.state = { lat: null, lng: null, errorMessage: '' };
  // }

  state = { lat: null, lng: null, errorMessage: '' };

  componentDidMount() {
    console.log('componentDidMount');

    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);

        this.setState({
          lat: position.coords.latitude,
        });
      },
      (err) => {
        this.setState({ errorMessage: err.message });
      }
    );
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  componentWillUnmounte() {
    console.log('componentWillUnmounte');
  }

  render() {
    console.log('render');

    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }

    return <Spinner message="Please accept location request." />;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
