import React from 'react'
import { AddPhotoAlternate, Close } from '@mui/icons-material'
import { Button, CircularProgress, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { uploadToCloudinary } from '../../../util/UploadToCloudnary'
import { color } from '../../../data/filter/color'
import { useAppDispatch } from '../../../state/store'
import { createProduct } from '../../../state/seller/sellerPorductSlice'
import { sizes } from '../../../data/filter/size'
import { menLevelTwo } from '../../../data/category/levelTwo/menLevelTwo'
import { menLevelThree } from '../../../data/category/levelThree/menLevelThree'
import { womenLevelTwo } from '../../../data/category/levelTwo/womenLeveltwo'
import { furnitureLevelTwo } from '../../../data/category/levelTwo/furnitureLevelTwo'
import { electronicsLevelTwo } from '../../../data/category/levelTwo/electronicsLevelTwo'
import { womenLevelThree } from '../../../data/category/levelThree/womenLevelThree'
import { furnitureLevelThree } from '../../../data/category/levelThree/furnitureLevelThree'
import { electronicsLevelThree } from '../../../data/category/levelThree/electronicsLevelThree'
import { mainCategory } from '../../../data/category/mainCategory'
import { useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';


const getLevelTwo = (category: string) => {
    switch (category) {
        case 'men': return menLevelTwo;
        case 'women': return womenLevelTwo;
        case 'furniture': return furnitureLevelTwo;
        case 'electronics': return electronicsLevelTwo;
        default: return [];
    }
}

const getLevelThree = (category: string) => {
    switch (category) {
        case 'men': return menLevelThree;
        case 'women': return womenLevelThree;
        case 'furniture': return furnitureLevelThree;
        case 'electronics': return electronicsLevelThree;
        default: return [];
    }
}

type ProductFormProps = {
    initialValues?: any;            // Optional, for editing
    onSubmit: (values: any) => void;
    onClose: () => void;
    isEditMode?: boolean;
};


const ProductForm = ({ initialValues, onSubmit, onClose, isEditMode = true }: ProductFormProps) => {
    const [uploadImage, setUploadingImage] = useState(false);


    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: isEditMode && initialValues ? {
            title: initialValues.title || '',
            description: initialValues.description || '',
            mrPrice: initialValues.mrPrice || '',
            sellingPrice: initialValues.sellingPrice || '',
            quantity: initialValues.stock || '', // assuming quantity comes from stock
            color: initialValues.color || '',
            images: initialValues.images || [],
            category: initialValues.category?.parentCategory?.parentCategory?.categoryId || '',
            category2: initialValues.category?.parentCategory?.categoryId || '',
            category3: initialValues.category?.categoryId || '',
            sizes: initialValues.sizes || []
        } : {
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
            sizes: []
        },
        onSubmit: async (values) => {
            onSubmit(values)
        }
    })

    const handleImageChange = async (event: any) => {
        const file = event.target.files[0];
        setUploadingImage(true);
        const image = await uploadToCloudinary(file);
        console.log('Uploaded Image URL:', image);
        formik.setFieldValue("images", [...formik.values.images, image]);
        setUploadingImage(false);
    }

    const handleRemoveImage = (index: number) => {
        const updateImage = [...formik.values.images];
        updateImage.splice(index, 1);
        formik.setFieldValue("images", updateImage);
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
                                formik.values.images.map((image: string, index: number) => (
                                    <div key={index} className='relative'>
                                        {image && (
                                            <img
                                                className='w-24 h-24 object-cover'
                                                src={image}
                                                // alt={`Product Image ${index + 1}`}
                                                alt=''
                                            />
                                        )}
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
                            helperText={formik.touched.title ? (formik.errors.title as string) : undefined}
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
                            helperText={formik.touched.description ? (formik.errors.description as string) : undefined}
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
                            helperText={formik.touched.mrPrice ? (formik.errors.mrPrice as string) : undefined}
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
                            helperText={formik.touched.sellingPrice ? (formik.errors.sellingPrice as string) : undefined}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4, lg: 3 }}>
                        <FormControl fullWidth required>
                            <InputLabel id="color-label">Color</InputLabel>
                            <Select
                                labelId="color-label"
                                id="color"
                                name="color"
                                value={formik.values.color}
                                onChange={formik.handleChange}
                                label="Color"
                                renderValue={(selected) => {
                                    const selectedColor = color.find(c => c.name === selected);
                                    return (
                                        <div className="flex items-center gap-2">
                                            <span
                                                style={{ backgroundColor: selectedColor?.hex }}
                                                className={`h-4 w-4 rounded-full ${selectedColor?.name === 'White' ? 'border' : ''}`}
                                            />
                                            {selectedColor?.name}
                                        </div>
                                    );
                                }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {color.map((c, index) => (
                                    <MenuItem key={index} value={c.name}>
                                        <div className='flex gap-3 items-center'>
                                            <span
                                                style={{ backgroundColor: c.hex }}
                                                className={`h-5 w-5 rounded-full ${c.name === 'White' ? 'border' : ''}`}
                                            />
                                            <p>{c.name}</p>
                                        </div>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4, lg: 3 }}>
                        <FormControl
                            fullWidth
                            error={formik.touched.sizes && Boolean(formik.errors.sizes)}
                            required
                        >
                            <InputLabel id="sizes-label">Sizes</InputLabel>
                            <Select
                                labelId="sizes-label"
                                id="sizes"
                                name="sizes"
                                multiple
                                value={formik.values.sizes}
                                onChange={(event) => {
                                    const {
                                        target: { value },
                                    } = event;
                                    formik.setFieldValue("sizes", typeof value === 'string' ? value.split(',') : value);
                                }}
                                label="Sizes"
                                renderValue={(selected) => (selected as string[]).join(', ')}
                            >
                                {sizes.map((size) => (
                                    <MenuItem key={size} value={size}>
                                        {size}
                                    </MenuItem>
                                ))}
                            </Select>
                            {formik.touched.sizes && formik.errors.sizes && (
                                <FormHelperText>{formik.errors.sizes as string}</FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4, lg: 3 }}>
                        <FormControl fullWidth required>
                            <InputLabel id="category-label">Main Category</InputLabel>
                            <Select
                                labelId="category-label"
                                id="category"
                                name="category"
                                value={formik.values.category}
                                onChange={formik.handleChange}
                                label="Category"
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                {mainCategory.map((item, index) => (
                                    <MenuItem key={`main-${item.categoryId}-${index}`} value={item.categoryId}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    </Grid>
                    <Grid size={{ xs: 12, md: 4, lg: 3 }}>
                        <FormControl fullWidth required>
                            <InputLabel id="category2-label">Second Category</InputLabel>
                            <Select
                                labelId="category2-label"
                                id="category2"
                                name="category2"
                                value={formik.values.category2}
                                onChange={formik.handleChange}
                                label="Second Category"
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                {getLevelTwo(formik.values.category).map((item: any, index) => (
                                    <MenuItem key={`level2-${item.categoryId}-${index}`} value={item.categoryId}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4, lg: 3 }}>
                        <FormControl fullWidth required>
                            <InputLabel id="category3-label">Third Category</InputLabel>
                            <Select
                                labelId="category3-label"
                                id="category3"
                                name="category3"
                                value={formik.values.category3}
                                onChange={formik.handleChange}
                                label="Third Category"
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                {getLevelThree(formik.values.category)
                                    .filter((item) => item.parentCategoryId === formik.values.category2)
                                    .map((item, index) => (
                                        <MenuItem key={`level3-${item.categoryId}-${index}`} value={item.categoryId}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid size={{ xs: 12, md: 4, lg: 3 }} className="mt-4">
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        fullWidth
                        disabled={uploadImage}
                    >
                        {isEditMode ? 'Update Product' : 'Add Product'}
                    </Button>
                </Grid>
            </form>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }} elevation={6} variant="filled">
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </div>
    )
}

export default ProductForm