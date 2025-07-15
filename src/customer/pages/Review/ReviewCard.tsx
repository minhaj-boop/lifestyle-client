
import { Delete } from '@mui/icons-material'
import { Avatar, Box, Grid, IconButton, Rating } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'

const ReviewCard = () => {
    return (
        <div className='flex justify-between '>
            <Grid container spacing={9} >
                <Grid size={{
                    xs: 1,
                }}>
                    <Box>
                        <Avatar className='text-white' sx={{
                            width: 56,
                            height: 56,
                            bgcolor: "#9155FD",

                        }}>
                            M
                        </Avatar>
                    </Box>
                </Grid>
                <Grid size={{ xs: 9 }}>
                    <div className='space-y-2'>
                        <div className=''>
                            <p className='font-semibold text-lg '>Minhaj</p>
                            <p className='opacity-70'>2025-07-01</p>
                        </div>
                    </div>
                    <Rating
                        readOnly
                        value={4.5}
                        precision={0.5}
                    />
                    <p>value for money product, great product</p>
                    <div>
                        <img className='w-24 h-24 object-cover' src="https://www.aarong.com/media/catalog/product/0/5/0550000148498_2.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=667&width=500&canvas=500:667&dpr=2%202x" alt="" />
                    </div>
                </Grid>

            </Grid>
            <div>
                <IconButton>
                    <Delete sx={{
                        color: red[700]
                    }} />
                </IconButton>
            </div>
        </div>
    )
}

export default ReviewCard