import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../../state/store'
import { paymentSuccess } from '../../../state/customer/orderSlice'

const PaymentSuccess = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { orderId } = useParams()
    const location = useLocation()

    const getQueryParam = (key: string) => {
        const query = new URLSearchParams(location.search)
        return query.get(key)
    }


    useEffect(() => {
        const paymentId = getQueryParam("paymentId")
        const paymentLinkId = getQueryParam("paymentLinkId")
        dispatch(paymentSuccess({
            jwt: localStorage.getItem('jwt') || "",
            paymentId: paymentId || "",
            paymentLinkId: paymentLinkId || ""
        }))
    }, [orderId])

    return (
        <div className='min-h-[90vh] flex justify-center items-center'>
            <div className='bg-primary-color text-white p-8 w-[90%] lg:w-[35%] border rounded-md h-[40vh] flex flex-col gap-7 items-center justify-center'>
                <h1 className='text-3xl font-semibold text-center'>Congratulations!</h1>
                <h1 className='text-2xl font-semibold text-center'>Your order has been successfully placed!</h1>
                <div>
                    <Button color='secondary' variant='contained' onClick={() => navigate("/")}>Shop more</Button>
                </div>
            </div>
        </div>
    )
}

export default PaymentSuccess