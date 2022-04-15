import React from 'react';
import unsplash from '../api/unsplash';
import SearchBar from './SearchBar';

class App extends React.Component {
  state = { images: [] };

  // babelがやってくれるので、コンストラクタは不要。
  // constructor(props) {
  //   super(props);
  //   this.state = { images: [] };
  // }

  // ここでもthis問題
  // async onSearchSubmit(term) {
  //   const res = await axios.get('https://api.unsplash.com/search/photos', {
  //     params: {
  //       query: term,
  //     },
  //     headers: {
  //       Authorization: `Client-ID ${environment.accessKey}`,
  //     },
  //   });
  //   // ここのthisはonSubmitになっている。
  //   console.log(this);
  //   this.setState({ images: res.data.results });
  // }

  onSearchSubmit = async (term) => {
    const res = await unsplash.get('/search/photos', {
      params: {
        query: term,
      },
    });

    // stateを変更するとrenderが呼ばれる。
    this.setState({ images: res.data.results });
  };

  render() {
    return (
      <div className="ui container" style={{ marginTop: '1rem' }}>
        <SearchBar onSubmit={this.onSearchSubmit} />
        Found: {this.state.images.length} images.
      </div>
    );
  }
}

export default App;
