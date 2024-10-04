import React from 'react'
import Logo from './Logo'
import DarkModeToggle from './DarkModeToggle'
import UserButton from './UserButton'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import Link from 'next/link'
import { MessagesSquareIcon } from 'lucide-react'
import CreateChatButton from './CreateChatButton'
import UpgradeBanner from './UpgradeBanner'
import LanguageSelect from './LanguageSelect'



// UPDATE!: To optimise we can statically generate the Landing Page and the Pricing Page 


const Header = async () => {
    const session = await getServerSession(authOptions);
    


    return (
        <header className='sticky top-0 z-50 bg-white dark:bg-gray-900'>

            <nav className='flex flex-col sm:flex-row items-center p-5 pl-2 bg-white dark:bg-gray-900 max-w-7xl mx-auto'>
                {/* LOGO */}
                <Logo />

                <div className='flex flex-1 items-center justify-end space-x-3 max-[450px]:space-x-2'>
                    {/* Language Select */}
                    <LanguageSelect />

                    {/* Session */}
                    {session ? (
                        <>
                            <Link
                                href={'/chat'} prefetch={false}>
                                <MessagesSquareIcon className='text-black dark:text-white' />
                                </Link>
                                <CreateChatButton />
                        </>
                    ) : (
                        <Link href={'/pricing'}>Pricing</Link>
                    )}

                    {/* Dark Mode */}
                        <DarkModeToggle />


                    {/* User Profile */}
                        <UserButton session={session} />

                </div>
            </nav>

            {/* Upgraded Banner */}
            <UpgradeBanner />

        </header>
    )
}

export default Header