import { AddPhotoAlternate, Close } from '@mui/icons-material'
import { CircularProgress, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { uploadToCloudinary } from '../../../util/UploadToCloudnary'
import { color } from '../../../data/filter/color'
// import { sizes } from '../../../data/filter/sizes'

const AddProducts = () => {

    const [uploadImage, setUploadingImage] = React.useState(false);
    const [snackbar, setOpenSnackbar] = useState(false)

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            mrPrice: '',
            sellingPrice: '',
            quantity: '',
            color: '',
            images: [],
            category: '',
            category2: '',
            category3: '',
            sizes: ""
        },
        onSubmit: (values) => {
            console.log(values);
        }
    })

    const handleImageChange = async (event: any) => {
        const file = event.target.files[0];
        setUploadingImage(true);
        const image = await uploadToCloudinary(file);
        formik.setFieldValue("images", [...formik.values.images, image]);
        setUploadingImage(false);
    }

    const handleRemoveImage = (index: number) => {
        const updateImage = [...formik.values.images];
        updateImage.splice(index, 1);
        formik.setFieldValue("images", updateImage);
    }

    const childCategory = (category: any, parentCategoryId: any) => {
        return category.filter((child: any) => {
            return child.parentCategory === parentCategoryId;
        })
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className='space-y-4 p-4'>
                <Grid container spacing={2}>
                    <Grid className="flex flex-wrap gap-5" size={{ xs: 12 }}>
                        <input
                            type="file"
                            accept='image/*'
                            id="fileInput"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                        <label className='relative' htmlFor="fileInput">
                            <span className='w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400'>
                                <AddPhotoAlternate className='text-gray-700' />
                            </span>
                            {
                                uploadImage && (
                                    <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center'>
                                        <CircularProgress />
                                    </div>
                                )
                            }
                        </label>
                        <div className='flex flex-wrap gap-2'>
                            {
                                formik.values.images.map((image, index) => (
                                    <div className='relative'>
                                        <img
                                            className='w-24 h-24 object-cover'
                                            key={index}
                                            src={image}
                                            // alt={`Product Image ${index + 1}`}
                                            alt=''
                                        />
                                        <IconButton
                                            onClick={() => handleRemoveImage(index)}
                                            className=''
                                            size='small'
                                            color='error'
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0,
                                                outline: 'none',
                                            }}
                                        >
                                            <Close sx={{
                                                fontSize: '1rem',
                                            }} />
                                        </IconButton>

                                    </div>
                                ))}
                        </div>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            id="title"
                            name='title'
                            label="Product Title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            multiline
                            rows={4}
                            fullWidth
                            id="description"
                            name='description'
                            label="Product Description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4, lg: 3 }}>
                        <TextField
                            fullWidth
                            id="mr_price"
                            name='mrPrice'
                            label="Market Price"
                            type='number'
                            value={formik.values.mrPrice}
                            onChange={formik.handleChange}
                            error={formik.touched.mrPrice && Boolean(formik.errors.mrPrice)}
                            helperText={formik.touched.mrPrice && formik.errors.mrPrice}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4, lg: 3 }}>
                        <TextField
                            fullWidth
                            id="selling_price"
                            name='sellingPrice'
                            label="Selling Price"
                            type='number'
                            value={formik.values.sellingPrice}
                            onChange={formik.handleChange}
                            error={formik.touched.sellingPrice && Boolean(formik.errors.sellingPrice)}
                            helperText={formik.touched.sellingPrice && formik.errors.sellingPrice}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4, lg: 4 }}>
                        <FormControl
                            fullWidth
                            error={formik.touched.color && Boolean(formik.errors.color)}
                            required
                        >
                            <InputLabel id="color-label">Color</InputLabel>
                            <Select
                                labelId='color-label'
                                id='color'
                                name='color'
                                value={formik.values.color}
                                onChange={formik.handleChange}
                                label="Color"
                            >
                                <MenuItem >
                                    <em>None</em>
                                </MenuItem>
                                {
                                    color.map((color, index) => <MenuItem >
                                        <div className='flex gap-3'>
                                            <span
                                                style={{
                                                    backgroundColor: color.hex,
                                                }}
                                                className={`h-5 w-5 rounded-full ${color.name === 'White' ? 'border' : ''}`}
                                            >
                                            </span>
                                            <p>{color.name}</p>
                                        </div>
                                    </MenuItem>)
                                }
                            </Select>
                            {
                                formik.touched.color && formik.errors.color && (
                                    <FormHelperText>
                                        {formik.errors.color}
                                    </FormHelperText>
                                )
                            }
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4, lg: 4 }}>
                        <FormControl
                            fullWidth
                            error={formik.touched.category && Boolean(formik.errors.category)}
                            required
                        >
                            <InputLabel id="category-label">Category</InputLabel>
                            <Select
                                labelId='category-label'
                                id='category'
                                name='category'
                                value={formik.values.category}
                                onChange={formik.handleChange}
                                label="Category"
                            >
                                <MenuItem >
                                    <em>None</em>
                                </MenuItem>
                                {
                                    color.map((color, index) => <MenuItem >
                                        <div className='flex gap-3'>
                                            <span
                                                style={{
                                                    backgroundColor: color.hex,
                                                }}
                                                className={`h-5 w-5 rounded-full ${color.name === 'White' ? 'border' : ''}`}
                                            >
                                            </span>
                                            <p>{color.name}</p>
                                        </div>
                                    </MenuItem>)
                                }
                            </Select>
                            {
                                formik.touched.color && formik.errors.color && (
                                    <FormHelperText>
                                        {formik.errors.color}
                                    </FormHelperText>
                                )
                            }
                        </FormControl>
                    </Grid>

                </Grid>
            </form>
        </div>
    )
}

export default AddProducts