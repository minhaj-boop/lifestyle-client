import React from 'react'

const SimilarProductCard = () => {
    return (
        <div>
            <div className='group px-4 relative'>
                <div className='card'>
                    <img className=' card-media object-top ' src="https://www.aarong.com/media/catalog/category/Saree-women-SBC-08-07-2025-SM.png" alt="" />
                </div>
                <div className='details pt-3 space-y-1 group-hover-effect rounded-md '>
                    <div className='name '>
                        <h1>Nike</h1>
                        <p>Blue Shirt</p>
                    </div>
                    <div className='price flex items-center gap-3'>
                        <span className='font-semibold text-gray-800'>
                            ৳ 400
                        </span>
                        <span className="line-through text-gray-400">
                            ৳ 999
                        </span>
                        <span className="text-primary-color font-semibold">
                            60%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SimilarProductCard