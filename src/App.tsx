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
import PageContainer from './PageContainer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const App = (): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<boolean>(true);
  const [loggedIn, setLoggedIn] = useState<boolean>(false); // default false
  const [username, setUsername] = useState<string>('');
  const [userID, setUserID] = useState<string>('');

  return (
    <div className='main'>
      <QueryClientProvider client={queryClient}>
        <PageContainer
          showModal={showModal}
          setShowModal={setShowModal}
          authMode={authMode}
          setAuthMode={setAuthMode}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          username={username}
          setUsername={setUsername}
          userID={userID}
          setUserID={setUserID}
        />
      </QueryClientProvider>
      <Footer />
    </div>
  );
};

export default App;
