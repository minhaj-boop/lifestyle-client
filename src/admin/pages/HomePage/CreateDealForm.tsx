import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../state/store'
import { createDeal } from '../../../state/admin/dealSlice'

const CreateDealForm = () => {

    const dispatch = useAppDispatch()
    const { customer } = useAppSelector(store => store)

    const formik = useFormik({
        initialValues: {
            disount: 0,
            catgory: ''
        },
        onSubmit: (values) => {
            console.log(values)
            const reqData = {
                discount: values.disount,
                category: {
                    id: values.catgory
                }
            }
            dispatch(createDeal(reqData))
        }
    })
    return (
        <Box component={"form"} onSubmit={formik.handleSubmit} className='space-y-6'>
            <Typography variant='h4' className='text-center'>
                Create Deal
            </Typography>
            <TextField
                fullWidth
                name="disount"
                label="Discount"
                value={formik.values.disount}
                onChange={formik.handleChange}
                error={formik.touched.disount && Boolean(formik.errors.disount)}
                helperText={formik.touched.disount && formik.errors.disount}
            />
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formik.values.catgory}
                    label="Category"
                    onChange={formik.handleChange}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <Button fullWidth type='submit' variant='contained' sx={{ py: ".9rem" }}>Create Deal</Button>
        </Box>
    )
}

export default CreateDealForm