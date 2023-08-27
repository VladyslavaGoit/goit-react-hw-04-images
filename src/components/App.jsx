import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImages } from 'API/fetch';

const App = () => {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFullHits, setIsFullHits] = useState(false);

  useEffect(() => {
    async function getImages() {
      try {
        setIsLoading(true);
        const { hits, totalHits } = await fetchImages(q, page);
        if (!hits.length) {
          throw new Error();
        }
        setImages(prevImages => [...prevImages, ...hits]);
        setIsLoading(false);
        setIsFullHits(page < Math.ceil(totalHits / 12));
        if (hits.length < 12) {
          setIsFullHits(false);
        } else {
          setIsFullHits(true);
        }
      } catch (error) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        setIsLoading(false);
        setIsFullHits(false);
      }
    }
    if (q) {
      getImages();
    }
  }, [q, page]);

  const handleSearchFormSubmit = searchName => {
    setQ(searchName);
    setImages([]);
    setPage(1);
  };

  const handleLoadeMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSearchFormSubmit} />
      {isLoading && (
        <div className="loaderBox">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#2d2974"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      )}
      <ImageGallery images={images} />
      {isFullHits && <Button loadeMore={handleLoadeMore} />}
      {!isFullHits &&
        images.length !== 0 &&
        Notify.warning(
          'Sorry, there are no more available images. Please enter new query.'
        )}
    </div>
  );
};
export default App;
