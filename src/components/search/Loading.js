import React from 'react';
import { Spinner } from 'react-bootstrap'

const Loading = () => {
    return (
        <div className="mt-4">
            <Spinner role="status" className="spinner-grow spinner-grow-sm mx-2 ">
                <span className="sr-only">Loading...</span>
            </Spinner>
            <Spinner role="status" className="spinner-grow spinner-grow-sm mx-2">
                <span className="sr-only">Loading...</span>
            </Spinner>
            <Spinner role="status" className="spinner-grow spinner-grow-sm mx-2">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    );
};

export default Loading;
