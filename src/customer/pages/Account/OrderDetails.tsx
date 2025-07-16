import { Box, Button } from '@mui/material'
import React from 'react'

const OrderDetails = () => {
    return (
        <Box className="space-y-5" >
            <section className='flex flex-col gap-5 justify-center items-center'>
                <img className='w-[100px]' src="https://www.startech.com.bd/image/cache/catalog/laptop/apple/macbook-air/macbook-air-midnight/macbook-air-13-inch-m3-midnight-01-228x228.webp" alt="" />
                <div className='text-sm space-y-1 text-center'>
                    <h1 className='font-bold'>Apple</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, nostrum!</p>
                    <p><strong>Size: </strong>M</p>
                </div>
                <div>
                    <Button></Button>
                </div>
            </section>
            <section className='border p-5'>

            </section>
        </Box>
    )
}

export default OrderDetails