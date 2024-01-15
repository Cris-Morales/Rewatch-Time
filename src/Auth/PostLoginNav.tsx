import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUsername, logout } from '../authQueries';

const PostLoginNav = ({ loggedInQuery }): JSX.Element => {
  // query for username to display here, should probably create a module for this
  const usernameQueryResults = useQuery({
    queryKey: ['username'],
    queryFn: fetchUsername,
  });
  const logoutQuery = useQuery({
    queryKey: ['logout'],
    queryFn: logout,
    enabled: false,
  });

  if (usernameQueryResults.isLoading) {
    return (
      <div className='login-card'>
        <span className='flex items-center text-lg mx-2 w-72 justify-center border-2 border-gray-400 rounded-lg h-3/4'>
          Loading...
        </span>
        <button className='auth-event-logout'>Log Out</button>
      </div>
    );
  }

  // const queryResults = usernameQueryResults?.data?.username
  const queryResults =
    usernameQueryResults?.data?.username ?? 'Username Request Error';

  const handleLogOut = async () => {
    // document.cookie = `jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure`;
    await logoutQuery.refetch();
    console.log('check cookie: ', document.cookie);
    await loggedInQuery.refetch();
  };

  return (
    <div className='login-card'>
      <span
        className={`${
          queryResults === 'Username Request Error' ? 'text-red-600' : null
        } flex text-lg mx-2 w-72 text-center justify-center items-center border-2 border-gray-400 rounded-lg h-3/4`}>
        {queryResults}
      </span>
      <button
        className='auth-event-logout'
        onClick={() => {
          handleLogOut();
        }}>
        Log Out
      </button>
    </div>
  );
};

export default PostLoginNav;
