import { Divider, IconButton } from '@mui/material'
import React from 'react'
import ProfileFieldCard from '../../../component/ProfileFieldCard'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../../state/store'
import { Edit } from '@mui/icons-material'

const Profile = () => {

    const dispatch = useDispatch()
    const { seller } = useAppSelector(store => store)

    return (
        <>
            <div className='flex justify-center py-10'>
                <div className='w-full lg:w-[70%]'>
                    <div className='flex items-center pb-3 justify-between'>
                        <h1 className='text-2xl font-bold text-gray-600'>Personal Details</h1>
                        <IconButton >
                            <Edit color='primary' />
                        </IconButton>
                    </div>
                    <div className='flex flex-col '>
                        {/* <div className=' w-[400] h-[400] rounded-md'>
                        <img className='rounded-md' width={200} src="https://res.cloudinary.com/dioqmvlql/image/upload/v1752747269/23938705_6859563_t2z5ur.jpg" alt="" />
                    </div> */}
                        <ProfileFieldCard keys="Name" value={seller?.profile.sellerName} />
                        <Divider />
                        <ProfileFieldCard keys="Email" value={seller?.profile.email} />
                        <Divider />
                        <ProfileFieldCard keys="Mobile" value={seller?.profile.mobile} />
                    </div>
                </div>
            </div>
            <div className='flex justify-center py-10'>
                <div className='w-full lg:w-[70%]'>
                    <div className='flex items-center pb-3 justify-between'>
                        <h1 className='text-2xl font-bold text-gray-600'>Business Details</h1>
                        <IconButton >
                            <Edit color='primary' />
                        </IconButton>
                    </div>
                    <div className='flex flex-col '>

                        <ProfileFieldCard keys="Business Name / Brand Name" value={seller.profile.businessDetails.businessName} />
                        <Divider />
                        <ProfileFieldCard keys="Business Email" value={seller.profile.businessDetails.businessEmail} />
                        <Divider />
                        <ProfileFieldCard keys="Mobile" value={seller?.profile.businessDetails.businessMobile} />
                        <ProfileFieldCard keys="Account Status" value={seller?.profile.accountStatus} />
                    </div>
                </div>
            </div>
            <div className='flex justify-center py-10'>
                <div className='w-full lg:w-[70%]'>
                    <div className='flex items-center pb-3 justify-between'>
                        <h1 className='text-2xl font-bold text-gray-600'>Pickup Address</h1>
                        <IconButton >
                            <Edit color='primary' />
                        </IconButton>
                    </div>
                    <div className='flex flex-col '>
                        <ProfileFieldCard keys="Address" value={seller.profile.pickupAddress.address} />
                        <Divider />
                        <ProfileFieldCard keys="City" value={seller.profile.pickupAddress.city} />
                        <Divider />
                        <ProfileFieldCard keys="State" value={seller?.profile.pickupAddress.state} />
                        <ProfileFieldCard keys="Mobile" value={seller?.profile.pickupAddress.mobile} />
                    </div>
                </div>
            </div>
            <div className='flex justify-center py-10'>
                <div className='w-full lg:w-[70%]'>
                    <div className='flex items-center pb-3 justify-between'>
                        <h1 className='text-2xl font-bold text-gray-600'>Bank Details</h1>
                        <IconButton >
                            <Edit color='primary' />
                        </IconButton>
                    </div>
                    <div className='flex flex-col '>
                        <ProfileFieldCard keys="Account Holder Name" value={seller.profile.bankDetails.accountHolderName} />
                        <Divider />
                        <ProfileFieldCard keys="Account Number" value={seller.profile.bankDetails.accountNumber} />
                        <Divider />
                        <ProfileFieldCard keys="IFSC CODE" value={seller?.profile.bankDetails.ifscCode} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile