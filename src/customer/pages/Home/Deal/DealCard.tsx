import React from 'react'

const DealCard = () => {
    return (
        <div className='w-[13rem] cursor-pointer '>
            <img className='border-x-[7px] border-t-[7px] border-pink-600 w-full h-[12rem] object-cover object-top' src="https://www.startech.com.bd/image/cache/catalog/dslr-camera/canon/eos-250d/canon-eos-250d-dslr-camera-body-only-500x500.webp" alt="" />
            <div className='border-4 border-black bg-black text-white p-2 text-center'>
                <p className='text-lg font-semibold'>Smart Watch</p>
                <p className='text-2xl font-bold'>20% OFF</p>
                <p className='text-balance text-lg'>shop now</p>
            </div>
        </div>
    )
}

export default DealCard