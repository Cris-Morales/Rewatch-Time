import React from 'react';
import { Element } from 'react-scroll';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './Home/Home';
import Navbar from './Navbar/Navbar';
import Generator from './Generator/Generator';
import EpisodeList from './EpisodeList/EpisodeList';
import Footer from './Footer/Footer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const App = (): JSX.Element => {
  return (
    <div className='main'>
      <div>
        <QueryClientProvider client={queryClient}>
          <Navbar />
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
