import { Add, Close, Remove } from '@mui/icons-material'
import { Button, Divider, IconButton } from '@mui/material'
import React, { useState } from 'react'

const CartItem = () => {
    // const =[quantity, setQuantity] = useState(1);

    const handleUpdateQuantity = () => {

    }


    return (
        <div className='border rounded-md relative'>
            <div className='p-5 flex gap-3'>
                <div>
                    <img className='w-[90px] rounded-md' src="https://www.aarong.com/media/wysiwyg/D-monsoon-microsite-megamenu-08-07-2025.png" alt="" />
                </div>
                <div className='space-y-2'>
                    <h1 className='font-semibold text-lg'> Minu Clothing</h1>
                    <p className='text-gray-600 font-medium text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <p className='text-gray-400'> <strong>Harum</strong> nisi dolore nulla.</p>
                    <p className='text-sm '>Quisquam deleniti et commodi minima blanditiis impedit voluptatum?</p>
                    <p className='text-sm text-gray-500'><strong>quantity : </strong>5</p>
                </div>
            </div>
            <Divider />
            <div className='flex justify-between items-center'>
                <div className='px-5 py-2 flex justify-between items-center'>
                    <div className='flex items-center gap-2 w-[140px] justify-between'>
                        <Button onClick={handleUpdateQuantity} disabled={true} >
                            <Remove />
                        </Button>
                        <span>{5}</span>
                        <Button onClick={handleUpdateQuantity}>
                            <Add />
                        </Button>
                    </div>
                </div>
                <div className='pr-5'>
                    <p className='text-gray-700 font-medium'>999</p>
                </div>
            </div>
            <div className='absolute top-1 right-1'>
                <IconButton color='primary'>
                    <Close />
                </IconButton>
            </div>
        </div>
    )
}

export default CartItem