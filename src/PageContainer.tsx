import React from 'react';
import { Element } from 'react-scroll';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './Home/Home';
import Navbar from './Navbar/Navbar';
import Generator from './Generator/Generator';
import EpisodeList from './EpisodeList/EpisodeList';
import Footer from './Footer/Footer';
import { useState } from 'react';
import Modal from './Modal';
import AuthModal from './Auth/AuthModal';
import { useQuery } from '@tanstack/react-query';
import { fetchUsername } from './authQueries';

const PageContainer = ({
  showModal,
  setShowModal,
  authMode,
  setAuthMode,
  loggedIn,
  setLoggedIn,
  username,
  setUsername,
}): JSX.Element => {
  // set login state with a query to ther backend
  const loginUsername = useQuery({
    queryKey: ['username'],
    queryFn: fetchUsername,
  });

  if (loginUsername.isLoading) {
    console.log('loading username');
  }

  if (loginUsername.isError) {
    console.log('user not logged in');
  }

  if (loginUsername.data) {
    setLoggedIn(true);
    setUsername(loginUsername.data.username);
  }

  return (
    <div>
      <Navbar
        showModal={showModal}
        setShowModal={setShowModal}
        authMode={authMode}
        setAuthMode={setAuthMode}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
      {showModal ? (
        <Modal>
          <AuthModal
            showModal={showModal}
            setShowModal={setShowModal}
            authMode={authMode}
            setAuthMode={setAuthMode}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          />
        </Modal>
      ) : null}
      <Home />
      <Generator loggedIn={loggedIn} />
      <EpisodeList />
    </div>
  );
};

export default PageContainer;
