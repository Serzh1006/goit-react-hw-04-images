import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imagegallery/Imagegallery';
import Button from './button/Button';
import Loader from './loader/Loader';
import Modal from './modal/Modal';
import { fetchData } from 'services/api';
import css from './app.module.css';

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

export class App extends Component {
  state = {
    posts: [],
    isLoading: false,
    total: 0,
    page: 1,
    query: '',
    isOpen: false,
    url: '',
    tags: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page, posts } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });
        const response = await fetchData(query, page);
        const { totalHits, hits } = response.data;
        if (hits.length === 0) {
          return toast.warning('Nothing was found for your search', messageObj);
        }
        if (prevState.query !== query || posts.length === 0) {
          this.setState({ total: totalHits, posts: hits });
          toast.info(
            `We found ${totalHits} images for your request`,
            messageObj
          );
          return;
        }

        if (prevState.page !== page) {
          return this.setState({ posts: [...prevState.posts, ...hits] });
        }
      } catch (error) {
        toast.error('Server error, please try again or later', messageObj);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  clickMouse = (largeFormat, alt) => {
    this.setState({ url: largeFormat, tags: alt });
    this.openModal();
  };

  fetchToServer = searchValue => {
    this.setState({ query: searchValue, page: 1, posts: [] });
  };

  loadMoreImg = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = () => {
    this.setState({ isOpen: true });
  };

  closeModal = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { posts, isLoading, total, isOpen } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.fetchToServer} />
        {posts.length > 0 && (
          <ImageGallery dataPosts={posts} mouse={this.clickMouse} />
        )}
        {isLoading && <Loader />}
        {posts.length < total && <Button moreImg={this.loadMoreImg} />}
        {isOpen && (
          <Modal
            onClose={this.closeModal}
            url={this.state.url}
            tags={this.state.tags}
          />
        )}
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
  }
}
