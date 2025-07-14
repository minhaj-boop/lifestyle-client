import React from 'react'

const CategoryGrid = () => {
    return (
        <div className='grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600] px-5 lg:px-20'>
            <div className='col-span-3 row-span-12 text-white '>
                <img className='w-full h-full object-cover object-top rounded-md' src="https://www.aarong.com/media/catalog/product/0/4/0410000111978.jpg" alt="" />
            </div>
            <div className='col-span-2 row-span-6 text-white '>
                <img className='w-full h-full object-cover object-top rounded-md' src="https://www.aarong.com/media/catalog/category/SKD-women-SBC-08-07-2025-SM.png" alt="" />
            </div>
            <div className='col-span-4 row-span-6 text-white '>
                <img className='w-full h-full object-cover object-top rounded-md' src="https://www.aarong.com/media/wysiwyg/Category.jpg" alt="" />
            </div>
            <div className='col-span-3 row-span-12 text-white '>
                <img className='w-full h-full object-cover object-top rounded-md' src="https://www.aarong.com/media/catalog/product/1/4/1420000185802.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=400&width=300&canvas=300:400&dpr=2" alt="" />
            </div>
            <div className='col-span-4 row-span-6 text-white '>
                <img className='w-full h-full object-cover object-top rounded-md' src="https://www.aarong.com/media/wysiwyg/customer-service.jpg" alt="" />
            </div>
            <div className='col-span-2 row-span-6 text-white '>
                <img className='w-full h-full object-cover object-top rounded-md' src="https://www.aarong.com/media/catalog/category/SKD-women-SBC-08-07-2025-SM.png" alt="" />
            </div>
        </div>
    )
}

export default CategoryGrid