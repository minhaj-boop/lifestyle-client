import { Box, Button, Grid, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { Dayjs } from 'dayjs';
import { useFormik } from 'formik'
import { createCoupon } from '../../../state/admin/adminCouponSlice';
import { useAppDispatch } from '../../../state/store';
import { toast } from 'react-toastify';


interface addNewCouponFormValues {
    couponCode: string;
    discountPercentage: number;
    validityStartDate: Dayjs | null;
    validityEndDate: Dayjs | null;
    minimumOrderAmount: number;
}

const AddNewCouponForm = () => {

    const dispatch = useAppDispatch();
    const jwt = localStorage.getItem("jwt");

    const formik = useFormik<addNewCouponFormValues>({
        initialValues: {
            couponCode: '',
            discountPercentage: 0,
            validityStartDate: null as Dayjs | null,
            validityEndDate: null as Dayjs | null,
            minimumOrderAmount: 0,
        },
        onSubmit: async (values, { resetForm }) => {
            const request = {
                code: values.couponCode,
                discountPercentage: values.discountPercentage,
                validityStartDate: values.validityStartDate?.toISOString(),
                validityEndDate: values.validityEndDate?.toISOString(),
                minimumOrderValue: values.minimumOrderAmount,
            };
            console.log(request);
            if (!jwt) {
                toast.error("Authentication failed. Please log in again.");
                return;
            }

            const result = await dispatch(createCoupon({ request, jwt }))


            if (createCoupon.fulfilled.match(result)) {
                toast.success("Coupon created successfully!");
                resetForm();
            } else {
                toast.error("Failed to create coupon. Please try again.");
            }

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
                                name="couponCode"
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
                                type='number'
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
                                // onChange={formik.handleChange}
                                onChange={(value) => formik.setFieldValue('validityStartDate', value)}
                                value={formik.values.validityStartDate}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <DatePicker
                                sx={{ width: '100%' }}
                                label="Validity End Date"
                                name='validityEndDate'
                                // onChange={formik.handleChange}
                                onChange={(value) => formik.setFieldValue('validityEndDate', value)}
                                value={formik.values.validityEndDate}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                name="minimumOrderAmount"
                                label="Minimum Order Amount"
                                type='number'
                                value={formik.values.minimumOrderAmount}
                                onChange={formik.handleChange}
                                error={formik.touched.minimumOrderAmount && Boolean(formik.errors.minimumOrderAmount)}
                                helperText={formik.touched.minimumOrderAmount && formik.errors.minimumOrderAmount}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Button type='submit' variant='contained' fullWidth sx={{ py: ".8rem" }}>Create Coupon</Button>
                        </Grid>
                    </Grid>
                </Box>
            </LocalizationProvider>
        </div>
    )
}

export default AddNewCouponForm