import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';

function WithListLoading(Component) {
  return function WihLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return (
      <LinearProgress />
    );
  };
}
export default WithListLoading;
