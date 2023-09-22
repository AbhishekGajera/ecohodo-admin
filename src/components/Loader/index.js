import { CircularProgress } from '@mui/material';
import React from 'react';

const Loader = () => {
    return <div className="text-center">
    <CircularProgress color="success" size={40} />
  </div>;
}


export default Loader;