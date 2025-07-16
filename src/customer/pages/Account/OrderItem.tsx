import { ElectricBolt } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import { teal } from '@mui/material/colors'
import React from 'react'

const OrderItem = () => {
    return (
        <div className='text-sm bg-white p-5 space-y-4 border rounded-md cursor-pointer'>
            <div className='flex items-center gap-5'>
                <div className=''>
                    <Avatar sx={{
                        bgcolor: teal[500]
                    }} sizes='small'>
                        <ElectricBolt />
                    </Avatar>
                </div>
                <div>
                    <h1 className='font-bold text-primary-color'>Pending</h1>
                    <p>Arriving By Mon, 15 Jul</p>
                </div>
            </div>
            <div className='p-5 bg-teal-50 flex gap-3'>
                <div>
                    <img className='w-[70px] object-cover' src="https://www.startech.com.bd/image/cache/catalog/laptop/apple/macbook-air/macbook-air-midnight/macbook-air-13-inch-m3-midnight-01-228x228.webp" alt="" />
                </div>
                <div className='w-full space-y-2'>
                    <h1 className='font-bold'>Apple</h1>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni pariatur aut minima in, incidunt debitis!</p>
                    <p><strong>Size : </strong>14 inch</p>
                </div>
            </div>
        </div>
    )
}

export default OrderItem