import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const App = () => {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFullHits, setIsFullHits] = useState(false);

  useEffect(() => {
    async function fetchImages() {
      try {
        setIsLoading(true);
        const response = await axios.get('https://pixabay.com/api/', {
          params: {
            q,
            page,
            key: '19455332-d5e97e52b6c9cba374c4e4b27',
            image_type: 'photo',
            orientation: 'horizontal',
            per_page: 12,
          },
        });

        const { hits } = response.data;
        if (!hits.length) {
          throw new Error();
        }
        setImages(prevImages => [...prevImages, ...hits]);
        setIsLoading(false);
        if (hits.length < 12) {
          setIsFullHits(false);
          Notify.warning(
            'Sorry, there are no more available images. Please enter new query.'
          );
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
      fetchImages();
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
    </div>
  );
};
export default App;
