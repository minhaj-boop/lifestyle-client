import { Box, Button, Grid, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { Dayjs } from 'dayjs';
import { useFormik } from 'formik'
import React from 'react'


interface addNewCouponFormValues {
    couponCode: string;
    discountPercentage: number;
    validityStartDate: Dayjs | null;
    validityEndDate: Dayjs | null;
    minimumOrderAmount: number;
}

const AddNewCouponForm = () => {

    const formik = useFormik<addNewCouponFormValues>({
        initialValues: {
            couponCode: '',
            discountPercentage: 0,
            validityStartDate: null as Dayjs | null,
            validityEndDate: null as Dayjs | null,
            minimumOrderAmount: 0,
        },
        onSubmit: (values) => {

            const formattedValues = {
                ...values,
                validityStartDate: values.validityStartDate ? values.validityStartDate.toISOString() : null,
                validityEndDate: values.validityEndDate ? values.validityEndDate.toISOString() : null,
            }
            console.log(formattedValues);
        },
    })

    return (
        <div>
            <h1 className='text-2xl font-bold text-primary-color pb-5 text-center'>Create New Coupon</h1>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box component={"form"} onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                name="code"
                                label="Code"
                                value={formik.values.couponCode}
                                onChange={formik.handleChange}
                                error={formik.touched.couponCode && Boolean(formik.errors.couponCode)}
                                helperText={formik.touched.couponCode && formik.errors.couponCode}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                name="discountPercentage"
                                label="Discount Percentage"
                                value={formik.values.discountPercentage}
                                onChange={formik.handleChange}
                                error={formik.touched.discountPercentage && Boolean(formik.errors.discountPercentage)}
                                helperText={formik.touched.discountPercentage && formik.errors.discountPercentage}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <DatePicker
                                sx={{ width: '100%' }}
                                label="Validity Start Date"
                                name='validityStartDate'
                                onChange={formik.handleChange}
                                value={formik.values.validityStartDate}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <DatePicker
                                sx={{ width: '100%' }}
                                label="Validity End Date"
                                name='validityEndDate'
                                onChange={formik.handleChange}
                                value={formik.values.validityEndDate}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                name="minimumOrderAmount"
                                label="Minimum Order Amount"
                                value={formik.values.minimumOrderAmount}
                                onChange={formik.handleChange}
                                error={formik.touched.minimumOrderAmount && Boolean(formik.errors.minimumOrderAmount)}
                                helperText={formik.touched.minimumOrderAmount && formik.errors.minimumOrderAmount}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Button variant='contained' fullWidth sx={{ py: ".8rem" }}>Create Coupon</Button>
                        </Grid>
                    </Grid>
                </Box>
            </LocalizationProvider>
        </div>
    )
}

export default AddNewCouponForm