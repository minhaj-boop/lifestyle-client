import { Box, CircularProgress, IconButton, TextField } from '@mui/material'
import { useState } from 'react'
import { uploadToCloudinary } from '../../../util/UploadToCloudnary';
import { AddPhotoAlternate, Close } from '@mui/icons-material';

const BecomeSellerFormStep4 = ({ formik }: any) => {

    const [uploadImage, setUploadingImage] = useState(false);

    // const handleImageChange = async (event: any) => {
    //     const file = event.target.files[0];
    //     setUploadingImage(true);
    //     const image = await uploadToCloudinary(file);
    //     console.log('Uploaded Image URL:', image);
    //     formik.setFieldValue("images", [...formik.values.images, image]);
    //     setUploadingImage(false);
    // }

    // const handleRemoveImage = (index: number) => {
    //     const updateImage = [...formik.values.images];
    //     updateImage.splice(index, 1);
    //     formik.setFieldValue("images", updateImage);
    // }


    return (
        <Box>
            <div className='space-y-5 '>
                <TextField
                    fullWidth
                    name="businessDetails.businessName"
                    label="Business Name"
                    value={formik.values.businessDetails?.businessName}
                    onChange={formik.handleChange}
                    // onBlur={formik.hanldleBlur}
                    error={formik.touched.businessDetails?.businessName && Boolean(formik.errors.businessDetails?.businessName)}
                    helperText={formik.touched.businessDetails?.businessName && formik.errors.businessDetails?.businessName}
                />
                <TextField
                    fullWidth
                    name="businessDetails.businessEmail"
                    label="Business Email"
                    value={formik.values.businessDetails?.businessEmail}
                    onChange={formik.handleChange}
                    // onBlur={formik.hanldleBlur}
                    error={formik.touched.businessDetails?.businessEmail && Boolean(formik.errors.businessDetails?.businessEmail)}
                    helperText={formik.touched.businessDetails?.businessEmail && formik.errors.businessDetails?.businessEmail}
                />
                <TextField
                    fullWidth
                    name="businessDetails.businessMobile"
                    label="Business Mobile"
                    value={formik.values.businessDetails?.businessMobile}
                    onChange={formik.handleChange}
                    // onBlur={formik.hanldleBlur}
                    error={formik.touched.businessDetails?.businessMobile && Boolean(formik.errors.businessDetails?.businessMobile)}
                    helperText={formik.touched.businessDetails?.businessMobile && formik.errors.businessDetails?.businessMobile}
                />
                <TextField
                    fullWidth
                    name="businessDetails.businessAddress"
                    label="Business Address"
                    value={formik.values.businessDetails?.businessAddress}
                    onChange={formik.handleChange}
                    // onBlur={formik.hanldleBlur}
                    error={formik.touched.businessDetails?.businessAddress && Boolean(formik.errors.businessDetails?.businessAddress)}
                    helperText={formik.touched.businessDetails?.businessAddress && formik.errors.businessDetails?.businessAddress}
                />
                {/* <TextField
                    fullWidth
                    name="businessDetails.logo"
                    label="Business Logo URL"
                    value={formik.values.businessDetails?.logo}
                    onChange={formik.handleChange}
                    // onBlur={formik.hanldleBlur}
                    error={formik.touched.businessDetails?.logo && Boolean(formik.errors.businessDetails?.logo)}
                    helperText={formik.touched.businessDetails?.logo && formik.errors.businessDetails?.logo}
                /> */}
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Business Logo
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        id="logo-upload"
                        style={{ display: 'none' }}
                        onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            setUploadingImage(true);
                            const imageUrl = await uploadToCloudinary(file);
                            formik.setFieldValue("businessDetails.logo", imageUrl);
                            setUploadingImage(false);
                        }}
                    />
                    <label htmlFor="logo-upload">
                        <div className="w-24 h-24 border border-gray-300 rounded-md flex items-center justify-center cursor-pointer relative">
                            {uploadImage ? (
                                <CircularProgress size={24} />
                            ) : formik.values.businessDetails.logo ? (
                                <img
                                    src={formik.values.businessDetails.logo}
                                    alt="Business Logo"
                                    className="w-full h-full object-cover rounded-md"
                                />
                            ) : (
                                <AddPhotoAlternate className="text-gray-500" />
                            )}
                        </div>
                    </label>
                    {formik.touched.businessDetails?.logo && formik.errors.businessDetails?.logo && (
                        <p className="text-sm text-red-500 mt-1">{formik.errors.businessDetails.logo}</p>
                    )}
                    {formik.values.businessDetails.logo && (
                        <IconButton
                            onClick={() => formik.setFieldValue("businessDetails.logo", "")}
                            size="small"
                            color="error"
                            sx={{ mt: 1 }}
                        >
                            <Close fontSize="small" />
                        </IconButton>
                    )}
                </div>
                {/* <TextField
                    fullWidth
                    name="businessDetails.banner"
                    label="Business Banner URL"
                    value={formik.values.businessDetails?.banner}
                    onChange={formik.handleChange}
                    // onBlur={formik.hanldleBlur}
                    error={formik.touched.businessDetails?.banner && Boolean(formik.errors.businessDetails?.banner)}
                    helperText={formik.touched.businessDetails?.banner && formik.errors.businessDetails?.banner}
                /> */}
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Business Banner
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        id="banner-upload"
                        style={{ display: 'none' }}
                        onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            setUploadingImage(true);
                            const imageUrl = await uploadToCloudinary(file);
                            formik.setFieldValue("businessDetails.banner", imageUrl);
                            setUploadingImage(false);
                        }}
                    />
                    <label htmlFor="banner-upload">
                        <div className="w-full h-36 border border-gray-300 rounded-md flex items-center justify-center cursor-pointer relative">
                            {uploadImage ? (
                                <CircularProgress size={24} />
                            ) : formik.values.businessDetails.banner ? (
                                <img
                                    src={formik.values.businessDetails.banner}
                                    alt="Business Banner"
                                    className="w-full h-full object-cover rounded-md"
                                />
                            ) : (
                                <AddPhotoAlternate className="text-gray-500" />
                            )}
                        </div>
                    </label>
                    {formik.touched.businessDetails?.banner && formik.errors.businessDetails?.banner && (
                        <p className="text-sm text-red-500 mt-1">{formik.errors.businessDetails.banner}</p>
                    )}
                    {formik.values.businessDetails.banner && (
                        <IconButton
                            onClick={() => formik.setFieldValue("businessDetails.banner", "")}
                            size="small"
                            color="error"
                            sx={{ mt: 1 }}
                        >
                            <Close fontSize="small" />
                        </IconButton>
                    )}
                </div>
                <TextField
                    fullWidth
                    name="sellerName"
                    label="Seller Name"
                    value={formik.values.sellerName}
                    onChange={formik.handleChange}
                    // onBlur={formik.hanldleBlur}
                    error={formik.touched.sellerName && Boolean(formik.errors.sellerName)}
                    helperText={formik.touched.sellerName && formik.errors.sellerName}
                />
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
                <TextField
                    fullWidth
                    name="password"
                    label="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    // onBlur={formik.hanldeBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />

            </div>
        </Box>
    )
}

export default BecomeSellerFormStep4