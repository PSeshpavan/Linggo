import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'
import Blob from '@logos/blob.svg';
import Image from 'next/image';
import PricingCards from '../components/PricingCards';

const  RegisterPage = async () => {
    const session = await getServerSession(authOptions);

    return (
        <div className='isolate h-full overflow-hidden bg-gray-900 pb-40'>
            <div className="mx-auto max-w-7xl px-6 pb-12 pt-16 text-white text-center lg:px-8">
                <div className="mx-auto max-w-4xl">
                    <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
                        Lets handle your Membership {session?.user?.name?.split(" ")?.[0]}!
                    </p>
                </div>
                <div>
                    <Image
                        priority
                        src={Blob}
                        alt='Blob'
                        className='absolute top-52 -z-50 left-72 blur-[150px] dark:opacity-50 opacity-20'
                    />
                </div>
            </div>
            <PricingCards redirect = {false}/>
        </div>
    )
}

export default RegisterPage