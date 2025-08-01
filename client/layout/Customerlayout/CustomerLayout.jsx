import React, { useState } from 'react';
import CustomerHeader from '../../components/CustomerComponents/CustomerHeader';
import { Outlet } from 'react-router-dom';

const CustomerLayout = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <CustomerHeader setSearchQuery={setSearchQuery} />
      <Outlet context={{ searchQuery }} />
    </div>
  );
};

export default CustomerLayout;
