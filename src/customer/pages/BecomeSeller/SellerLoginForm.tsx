import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { useAppDispatch } from '../../../state/store'
import { sendLoginSignupOtp } from '../../../state/authSlice'
import { sellerLogin } from '../../../state/seller/sellerAuthSlice'
import { useNavigate } from 'react-router-dom'

const SellerLoginForm = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            otp: ''
        },
        onSubmit: async (values) => {
            try {
                console.log("Form Submitted", values)
                const resultAction = await dispatch(sellerLogin(values));
                if (sellerLogin.fulfilled.match(resultAction)) {
                    const { role } = resultAction.payload;
                    if (role === "ROLE_SELLER") {
                        navigate("/seller")
                    }
                } else {
                    // handle error (e.g., show toast)
                    console.error("Login failed:", resultAction.payload);
                }
            } catch (error) {

            }
        }
    })

    const handlSendOtp = () => {
        dispatch(sendLoginSignupOtp({ email: formik.values.email }))
    }



    return (
        <div className=''>
            <h1 className='text-center font-bold text-xl text-primary-color pb-5'>Login as a seller</h1>
            <div className='space-y-5'>
                <TextField
                    fullWidth
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    // onBlur={formik.hanldeBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                {true && <div className='space-y-2'>
                    <p className='font-medium text-sm  opacity-60'>Eneter otp sent to your email</p>
                    <TextField
                        fullWidth
                        name="otp"
                        label="OTP"
                        value={formik.values.otp}
                        onChange={formik.handleChange}
                        // onBlur={formik.hanldeBlur}
                        error={formik.touched.otp && Boolean(formik.errors.otp)}
                        helperText={formik.touched.otp && formik.errors.otp}
                    />
                </div>}
                <Button onClick={handlSendOtp} fullWidth variant='contained' sx={{ py: "11px" }}>Send otp</Button>
                <Button onClick={() => formik.handleSubmit()} fullWidth variant='contained' sx={{ py: "11px" }}>Login</Button>
            </div>
        </div>
    )
}

export default SellerLoginForm