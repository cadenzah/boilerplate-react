import React from 'react';

const PageNotFound = (props) => {
    return (
        <>
            존재하지 않는 경로입니다: {props.location.pathname}
        </>
    );
};

export default PageNotFound;
