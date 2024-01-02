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
  const [loggedIn, setLoggedIn] = useState<boolean>(true); // default false

  // set login state with a query to ther backend
  // const initialLoginQueryResults = useQuery({
  //   queryKey: ['initialAuth'],
  //   queryFn: isLoggedIn,
  // });
  // console.log(initialLoginQueryResults) // will set the login state on success

  return (
    <div className='main'>
      <div>
        <QueryClientProvider client={queryClient}>
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
                setLoggedIn={setLoggedIn}
              />
            </Modal>
          ) : null}
          <Home />
          <Generator loggedIn={loggedIn} />
          <EpisodeList />
        </QueryClientProvider>
      </div>
      <Footer />
    </div>
  );
};

export default App;
