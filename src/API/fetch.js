import axios from 'axios';

const baseURL = 'https://pixabay.com/api/';

export async function fetchImages(q, page) {
  const response = await axios.get(baseURL, {
    params: {
      q,
      page,
      key: '19455332-d5e97e52b6c9cba374c4e4b27',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
  return response.data;
}
