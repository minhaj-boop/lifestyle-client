import { Radio } from '@mui/material'
import React from 'react'

const AddressCard = () => {

    const handleChange = (event: any) => {

    }

    return (
        <div className='p-5 border rounded-md flex'>
            <div className=''>
                <Radio
                    checked={true}
                    onChange={handleChange}
                    value=""
                    name='radio-button '
                />
            </div>
            <div className='space-y-3 pt-3'>
                <h1>Minhaj</h1>
                <p className='w-[320px]'>15, Yemen road, Yemen</p>
                <p><strong>Mobile: </strong>090076021</p>
            </div>
        </div>
    )
}

export default AddressCard