import Image from 'next/image'
import Blob from '@logos/blob.svg';
import HeroImage from '../images/8440.jpg';
import Link from 'next/link';

export default function Home() {
  return (
    <main className=''>
      <div>
        <div>
          <Image
            priority
            src={Blob}
            alt='Blob'
            className='absolute top-40 -z-50 left-72 blur-[150px] dark:opacity-50 opacity-20'
          />
        </div>


        <div className="my-20 lg:py-12 sm:py:20 lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto max-w-2xl">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-6xl">
                  Chat with Anyone, anywhere, in any language.
                </h1>
              </div>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                You speak your language, they speak their language. &nbsp;
                <span className="text-indigo-600 dark:text-indigo-500">
                  Let AI handle the translation.
                </span>
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href={"/chat"}
                  className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white dark:text-white shadow-sm 
              hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  Get Started
                </Link>
                <Link
                  href={"/pricing"}
                  className='text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300'
                >
                  View Pricing <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            <div className="mt-16 flex items-center">
              <div className="rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl lg:p-4">
                <div className="w-[80vw] lg:h-[90vh] overflow-hidden ">
                  <Image
                    src={HeroImage}
                    alt="App screenshot"
                    className="h-full w-full shadow-2xl lg:object-cover object-scale-down object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
