import React from 'react'
import './ShopByCategory.css'

const ShopByCategoryCard = () => {
    return (
        <div className='flex gap-3 flex-col justify-center items-center group cursor-pointer'>
            <div className='custom-border w-[150px] h-[150px] rounded-full bg-primary-color lg:w-[249px] lg:h-[249px]'>
                <img className='group-hover:scale-95 transition-transform duration-700 object-cover object-top h-full w-full rounded-full' src="https://www.aarong.com/media/catalog/category/New-arrivals-women-SBC-08-07-2025-SM.png" alt="" />

            </div>
            <h1>Saree</h1>
        </div>
    )
}

export default ShopByCategoryCard