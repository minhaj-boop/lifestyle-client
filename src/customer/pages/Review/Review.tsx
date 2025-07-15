import React from 'react'
import ReviewCard from './ReviewCard'
import { Divider } from '@mui/material'

const Review = () => {
    return (
        <div className='p-5 lg:px-20 flex flex-col lg:flex-row gap-20'>
            <section className='w-full md:w-1/2 lg:w-[30%] space-y-2'>
                <img src="https://www.aarong.com/media/catalog/product/0/5/0550000148498_3.jpg" alt="" />
                <div>
                    <div>
                        <p className='font-bold text-xl'>Meow Clothing</p>
                        <p className='text-lg text-gray-600 '>Women's Saari</p>
                    </div>
                    <div className='price flex items-center gap-3 mt-5 text-xl'>
                        <span className='font-semibold text-gray-800'>
                            BDT 400
                        </span>
                        <span className="line-through text-gray-400">
                            BDT 999
                        </span>
                        <span className="text-primary-color font-semibold">
                            60%
                        </span>
                    </div>
                </div>
            </section>
            <section className=' space-y-5 w-full'>
                {[1, 1, 1, 1, 1, 1].map(() => <div className='space-y-3'>
                    <ReviewCard />
                    <Divider />
                </div>)}
            </section>
        </div>
    )
}

export default Review