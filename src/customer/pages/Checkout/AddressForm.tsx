import { Box, Button, Grid, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup'

const addressFormSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    mobile: Yup.string().required("Mobile number is required"),
    pincode: Yup.string().required("Pincode is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    locality: Yup.string().required("Locality is required"),

})

const AddressForm = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            mobile: '',
            pincode: '',
            address: '',
            city: '',
            state: '',
            locality: ''
        },
        validationSchema: addressFormSchema,
        onSubmit: (values) => {

        }
    })
    return (
        <Box sx={{

            max: "auto"
        }}>
            <p className='text-xs font-bold text-center pc-5'>Coantact Details</p>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={4}>
                    <Grid size={{
                        xs: 12
                    }}>
                        <TextField
                            fullWidth
                            name="name"
                            label="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />

                    </Grid>
                    <Grid size={{
                        xs: 6
                    }}>
                        <TextField
                            fullWidth
                            name="mobile"
                            label="Mobile"
                            value={formik.values.mobile}
                            onChange={formik.handleChange}
                            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                            helperText={formik.touched.mobile && formik.errors.mobile}
                        />

                    </Grid>
                    <Grid size={{
                        xs: 6
                    }}>
                        <TextField
                            fullWidth
                            name="pincode"
                            label="Pincode"
                            value={formik.values.pincode}
                            onChange={formik.handleChange}
                            error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                            helperText={formik.touched.pincode && formik.errors.pincode}
                        />

                    </Grid>
                    <Grid size={{
                        xs: 12
                    }}>
                        <TextField
                            fullWidth
                            name="address"
                            label="Address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
                        />

                    </Grid>
                    <Grid size={{
                        xs: 6
                    }}>
                        <TextField
                            fullWidth
                            name="city"
                            label="City"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText={formik.touched.city && formik.errors.city}
                        />

                    </Grid>
                    <Grid size={{
                        xs: 6
                    }}>
                        <TextField
                            fullWidth
                            name="state"
                            label="State"
                            value={formik.values.state}
                            onChange={formik.handleChange}
                            error={formik.touched.state && Boolean(formik.errors.state)}
                            helperText={formik.touched.state && formik.errors.state}
                        />

                    </Grid>
                    <Grid size={{
                        xs: 12
                    }}>
                        <TextField
                            fullWidth
                            name="locality"
                            label="Locality"
                            value={formik.values.locality}
                            onChange={formik.handleChange}
                            error={formik.touched.locality && Boolean(formik.errors.locality)}
                            helperText={formik.touched.locality && formik.errors.locality}
                        />

                    </Grid>
                    <Grid size={{
                        xs: 12
                    }}>
                        <Button fullWidth type='submit' variant='contained' sx={{
                            py: "14px"
                        }}>
                            Add Address
                        </Button>
                    </Grid>
                </Grid>

            </form>
        </Box>
    )
}

export default AddressForm