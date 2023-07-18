import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imagegallery/Imagegallery';
import Button from './button/Button';
import Loader from './loader/Loader';
import Modal from './modal/Modal';
import { fetchData } from 'services/api';
import css from './app.module.css';

//object settings for library 'toast'

const messageObj = {
  position: 'top-center',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
};

export const App = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (query === '') {
      return;
    }
    try {
      // setIsLoading(true);

      console.log(query, page);
      const funcFetch = async () => {
        const response = await fetchData(query, page);
        console.log('response.data', response.data);
        const { totalHits, hits } = response.data;
        console.log(totalHits, hits);
      };
      if (query !== '' && page === 1) {
        funcFetch();
      }

      // if (hits.length === 0) {
      //   return toast.error('Nothing was found for your search', messageObj);
      // }

      // setTotal(totalHits);
      // setPosts(hits);
      // toast.info(`We found ${totalHits} images for your request`, messageObj);
      // setPage(prevState => {
      //   console.log(prevState !== page);
      // });
    } catch (error) {
      console.log(error.message);
      toast.error('Server error, please try again or later', messageObj);
    } finally {
      // setIsLoading(false);
    }
  }, [query, page]);

  // async componentDidUpdate(prevProps, prevState) {
  //   const { query, page, posts } = this.state;

  //   if (prevState.query !== query || prevState.page !== page) {
  //     try {
  //       this.setState({ isLoading: true });
  //       const response = await fetchData(query, page);
  //       const { totalHits, hits } = response.data;
  //       if (hits.length === 0) {
  //         return toast.error('Nothing was found for your search', messageObj);
  //       }
  //       if (prevState.query !== query || posts.length === 0) {
  //         this.setState({ total: totalHits, posts: hits });
  //         toast.info(
  //           `We found ${totalHits} images for your request`,
  //           messageObj
  //         );
  //         return;
  //       }

  //       if (prevState.page !== page) {
  //         return this.setState({ posts: [...prevState.posts, ...hits] });
  //       }
  //     } catch (error) {
  //       toast.error('Server error, please try again or later', messageObj);
  //     } finally {
  //       this.setState({ isLoading: false });
  //     }
  //   }
  // }

  const clickMouse = (largeFormat, alt) => {
    setUrl(largeFormat);
    setTags(alt);
    openModal();
  };

  const fetchToServer = searchValue => {
    setQuery(searchValue);
    setPage(1);
    setPosts([]);
  };

  const loadMoreImg = () => {
    setPage(prevState => prevState + 1);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={fetchToServer} />
      {posts.length > 0 && (
        <ImageGallery dataPosts={posts} mouse={clickMouse} />
      )}
      {isLoading && <Loader />}
      {posts.length < total && <Button moreImg={loadMoreImg} />}
      {isOpen && <Modal onClose={closeModal} url={url} tags={tags} />}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};
