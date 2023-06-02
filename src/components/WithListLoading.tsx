import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';

function WithListLoading(Component: React.FC<any>) {
    // @ts-ignore
    return function WihLoadingComponent({isLoading, ...props}) {
        if (!isLoading) return <Component {...props} />;
        return (
            <LinearProgress/>
        );
    };
}

export default WithListLoading;
