import React from 'react'
import LogoImage from '@logos/Logo.png'
import Link from 'next/link'
import { AspectRatio } from './ui/aspect-ratio'
import Image from 'next/image'

const Logo = () => {
    return <Link href='/' prefetch={false} className='overflow-hidden mix-blend-exclusion'>
        {/* <LogoImage /> */}
        <div className='flex items-center w-40 h-16 m-4 md:m-0'>
            <AspectRatio
                ratio={16 / 9}
                className='flex items-center justify-center'
            >
                <Image
                    priority
                    src={LogoImage}
                    alt='Linggo'
                    className=''
                />
            </AspectRatio>
        </div>
    </Link>
}

export default Logo