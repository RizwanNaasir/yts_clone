import React from 'react';
import Loading from "./Loading";

function WithListLoading(Component: React.FC<any>) {
    // @ts-ignore
    return function WihLoadingComponent({isLoading, ...props}) {
        if (!isLoading) return <Component {...props} />;
        return (
            <Loading/>
        );
    };
}

export default WithListLoading;
