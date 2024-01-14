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
import { isLoggedIn } from './authQueries';

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
  // set login state with a query to the backend
  const userLoginID = useQuery({
    queryKey: ['isLoggedIn'],
    queryFn: isLoggedIn,
  });

  const id: string = userLoginID.data?.id ?? '';

  if (userLoginID.isSuccess) {
    console.log(userLoginID.data.id);
    setLoggedIn(true);
  }

  // if (loginUsername.isLoading) {
  //   // return loading components
  // }

  // if (loginUsername.isError) {
  //   // error feedback perhaps
  //   console.log('error');
  // }

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
