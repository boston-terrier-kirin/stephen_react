import React from 'react';

class ImageCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { spans: 0 };
    this.imageRef = React.createRef();
  }

  componentDidMount() {
    // このタイミングではimgがロードされていないため、clientHeightは0になっている。
    // console.log(this.imageRef.current.clientHeight);

    this.imageRef.current.addEventListener('load', this.setSpans);
  }

  setSpans = () => {
    const height = this.imageRef.current.clientHeight;
    const spans = Math.ceil(height / 200);

    this.setState({ spans });
  };

  render() {
    const { urls, description } = this.props.image;
    return (
      <div>
        <img
          ref={this.imageRef}
          src={urls.regular}
          alt={description}
          style={{ gridRowEnd: `span ${this.state.spans}` }}
        />
      </div>
    );
  }
}

export default ImageCard;
