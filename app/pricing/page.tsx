import React from 'react'
import PricingCards from '../components/PricingCards'
import Blob from '@logos/blob.svg';
import Image from 'next/image';


const PricingPage = () => {
    return (
        <div className="min-h-screen mt-20 text-white flex flex-col items-center justify-center">
                <div>
                    <Image
                        priority
                        src={Blob}
                        alt='Blob'
                        className='absolute top-52 -z-50 left-72 blur-[150px] dark:opacity-50 opacity-20'
                    />
                </div>
                <header className="text-center mb-12">
                    <p className="text-sm text-purple-400">Pricing</p>
                    <h1 className="text-4xl font-bold mt-2 text-black dark:text-white">The right price for you, whoever you are</h1>
                    <p className="text-lg text-muted-foreground mt-2">We're 99% sure we have a plan to match 100% of your needs</p>
                </header>
                <PricingCards redirect = {true}/>
            </div>
            )
}

            export default PricingPage