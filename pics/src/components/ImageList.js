const ImageList = (props) => {
  const images = props.images.map((image) => (
    <img key={image.id} src={image.urls.regular} alt={image.alt_description} />
  ));

  return <div>{images}</div>;
};

export default ImageList;
