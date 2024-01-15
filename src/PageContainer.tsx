import React from 'react';
import Home from './Home/Home';
import Navbar from './Navbar/Navbar';
import Generator from './Generator/Generator';
import EpisodeList from './EpisodeList/EpisodeList';
import { useState, useEffect } from 'react';
import Modal from './Modal';
import AuthModal from './Auth/AuthModal';
import { useQuery, QueryCache } from '@tanstack/react-query';
import { isLoggedIn } from './authQueries';

const PageContainer = ({}): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<boolean>(true);
  const [username, setUsername] = useState<string | null>(null);
  var loggedInBool: boolean | null = null;
  const loggedInQuery = useQuery({
    queryKey: ['isLoggedIn'],
    queryFn: isLoggedIn,
    retry: 0,
  });

  if (loggedInQuery.isSuccess) {
    loggedInBool = true;
  }
  if (loggedInQuery.isError) {
    loggedInBool = false;
  }

  return (
    <div>
      <Navbar
        showModal={showModal}
        setShowModal={setShowModal}
        authMode={authMode}
        setAuthMode={setAuthMode}
        loggedInBool={loggedInBool}
        loggedInQuery={loggedInQuery}
      />
      {showModal ? (
        <Modal>
          <AuthModal
            showModal={showModal}
            setShowModal={setShowModal}
            authMode={authMode}
            setAuthMode={setAuthMode}
            loggedInBool={loggedInBool}
            loggedInQuery={loggedInQuery}
          />
        </Modal>
      ) : null}
      <Home />
      <Generator loggedInBool={loggedInBool} />
      <EpisodeList />
    </div>
  );
};

export default PageContainer;
