import axios from 'axios';

const fetchLinks = {
  URL: 'https://pixabay.com/api/',
  KEY: '36524518-a58dcdc8b7630db8edc13e4de',
};

export const fetchData = async (searchValue, page) => {
  const response = await axios.get(
    `${fetchLinks.URL}?key=${fetchLinks.KEY}&q="${searchValue}"
  &image_type=photo&orientation=horizontal&safesearch="true"&per_page=12&page=${page}`
  );
  return response;
};
