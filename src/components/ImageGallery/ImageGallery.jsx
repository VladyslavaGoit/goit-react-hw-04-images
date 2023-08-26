import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images }) => {
  return (
    <div className="container">
      {images && (
        <ul className="gallery">
          {images.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              miniUrl={webformatURL}
              largeUrl={largeImageURL}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ImageGallery;
