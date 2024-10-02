"use client"


import LoadingSpinner from './components/LoadingSpinner'

const Loading = () => {
    return (
        <div className='flex items-center justify-center p-10'>
            <LoadingSpinner />
        </div>
    )
}

export default Loading