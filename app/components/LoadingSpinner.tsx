import { Oval } from 'react-loader-spinner'


import React from 'react'

const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center">
            <Oval
                visible={true}
                height="20"
                width="20"
                color="#fff"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}

export default LoadingSpinner


