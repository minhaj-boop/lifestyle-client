import { Box, Button, Divider } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import OrderStepper from './OrderStepper'
import { Payment } from '@mui/icons-material'

const OrderDetails = () => {

    const navigate = useNavigate()

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
                    <Button onClick={() => navigate(`/reviews/1/create`)}>Write Review</Button>
                </div>
            </section>
            <section className='border p-5'>
                <OrderStepper orderStatus={"DELIVERED"} />
            </section>
            <div className='border p-5 '>
                <h1 className='font-bold pb-3'>Delivery Address</h1>
                <div className='text-sm space-y-2'>
                    <div className='flex gap-5 font-medium'>
                        <p>Lorem ipsum dolor sit amet.</p>
                        <Divider flexItem orientation='vertical' />
                        <p>0101010101</p>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, mollitia.
                    </p>
                </div>
            </div>
            <div className='border space-y-4'>
                <div className='flex justify-between text-sm pt-5 px-5'>
                    <div className='space-y-1'>
                        <p className='font-bold'>Total Item Price</p>
                        <p>You sved <span className='text-teal-500 font-medium text-xs'>BDT 100.00</span>
                            on this item
                        </p>
                    </div>
                    <p className='font-medium'>BDT 100.00</p>
                </div>
                <div className='px-5'>
                    <div className='bg-teal-50 px-5 py-2 text-xs font-medium flex items-center gap-3'>
                        <Payment />
                        <p>Pay On Delivery</p>
                    </div>
                </div>

                <Divider />

                <div className='px-5 pb-5'>
                    <p className='text-xs'><strong>Sold by: </strong>Nike</p>
                </div>

                <div className='p-10'>
                    <Button
                        disabled={false}
                        // onClick={handleCancelOrder}
                        color='error'
                        sx={{
                            py: "0.7rem"
                        }}
                        className=''
                        variant='outlined'
                        fullWidth
                    >
                        {true ? "Order Canceled" : "Cancel Order"}
                    </Button>
                </div>
            </div>
        </Box>
    )
}

export default OrderDetails