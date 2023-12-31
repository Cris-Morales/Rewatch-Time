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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const App = (): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className='main'>
      <div>
        <QueryClientProvider client={queryClient}>
          <Navbar showModal={showModal} setShowModal={setShowModal} />
          {showModal ? (
            <Modal>
              <AuthModal showModal={showModal} setShowModal={setShowModal} />
            </Modal>
          ) : null}
          <Home />
          <Generator />
          <EpisodeList />
        </QueryClientProvider>
      </div>
      <Footer />
    </div>
  );
};

export default App;
