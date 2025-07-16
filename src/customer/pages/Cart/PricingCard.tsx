import { Divider } from '@mui/material'
import React from 'react'

const PricingCard = () => {
    return (
        <>
            <div className='space-y-3 p-5'>
                <div className='flex justify-between items-center '>
                    <span>Subtotal</span>
                    <span>999</span>
                </div>
                <div className='flex justify-between items-center '>
                    <span>Discount</span>
                    <span>600</span>
                </div>
                <div className='flex justify-between items-center '>
                    <span>Shipping</span>
                    <span>100</span>
                </div>
            </div>
            <Divider />
            <div className='flex justify-between items-center p-5 text-primary-color '>
                <span>Total</span>
                <span>400</span>
            </div>
        </>
    )
}

export default PricingCard