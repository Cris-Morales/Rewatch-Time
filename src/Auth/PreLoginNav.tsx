import React from 'react';

const PreLoginNav = ({ setAuthMode, setShowModal }): JSX.Element => {
  return (
    <div className='auth-selector mr-8'>
      <button
        className='auth-event-login'
        onClick={() => {
          setAuthMode(true);
          setShowModal(true);
        }}>
        Login
      </button>
      <button
        className='auth-event-signup'
        onClick={() => {
          setAuthMode(false);
          setShowModal(true);
        }}>
        Sign Up
      </button>
    </div>
  );
};

export default PreLoginNav;
