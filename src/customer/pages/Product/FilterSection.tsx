import { Button, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { teal } from '@mui/material/colors'
import React, { useState } from 'react'
import { color } from '../../../data/filter/color'
import { useSearchParams } from 'react-router-dom'
import { price } from '../../../data/filter/price'
import { discount } from '../../../data/filter/discount'

const FilterSection = () => {

    const [expandColor, setExpandColor] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams()

    const handleColorToggle = () => {
        setExpandColor(!expandColor)
    }

    const updateFilterParams = (e: any) => {
        const { value, name } = e.target;
        if (value) {
            searchParams.set(name, value);
        } else {
            searchParams.delete(name);
        }
        setSearchParams(searchParams);
    }

    const clearAllFilters = () => {
        searchParams.forEach((value: any, key: any) => {
            searchParams.delete(key);
        })
        setSearchParams(searchParams)
    }

    return (
        <div className='-z-50 space-y-5 bg-white'>
            <div className='flex items-center justify-between h-[40px] px-9 lg:border-r'>
                <p className="text-lg text-primary-color font-semibold">
                    Filters
                </p>
                <Button onClick={clearAllFilters} size='small' className='text-primary-color'>
                    Clear All
                </Button>
            </div>
            <Divider />
            <div className='px-9 space-y-6 '>
                <section>
                    <FormControl>
                        <FormLabel
                            className='text-2xl font-semibold '
                            id='color'
                            sx={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: "#8F1402",
                                paddingBottom: "14px"
                            }}
                        >Color</FormLabel>
                        <RadioGroup
                            aria-labelledby="color"
                            defaultValue=" "
                            name="color"
                            onChange={updateFilterParams}
                        >
                            {color.slice(0, expandColor ? color.length : 5).map((item) => <FormControlLabel key={item.name} value={item.name} control={<Radio />} label={
                                <div className='flex items-center gap-3'>
                                    <p>{item.name}</p>
                                    <p style={{
                                        backgroundColor: item.hex
                                    }}
                                        className={`h-5 w-5 rounded-full  ${item.name === "White" ? "border" : ""}`}>

                                    </p>
                                </div>
                            } />)}
                        </RadioGroup>
                    </FormControl>
                    <div>
                        <button onClick={handleColorToggle} className='text-primary-color cursor-pointer hover:text-secondary-color flex items-center '>
                            {expandColor ? "hide" : `+ ${color.length - 5} more`}
                        </button>
                    </div>
                </section>
                <Divider />
                <section>
                    <FormControl>
                        <FormLabel
                            className='text-2xl font-semibold '
                            id='price'
                            sx={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: "#8F1402",
                                paddingBottom: "14px"
                            }}
                        >Price</FormLabel>
                        <RadioGroup
                            aria-labelledby="price"
                            defaultValue=""
                            name="price"
                            onChange={updateFilterParams}
                        >
                            {price.map((item) =>
                                <FormControlLabel
                                    key={item.name}
                                    value={item.value}
                                    control={<Radio size='small' />}
                                    label={item.name}
                                />
                            )}
                        </RadioGroup>
                    </FormControl>
                </section>
                <Divider />
                <section>
                    <FormControl>
                        <FormLabel
                            className='text-2xl font-semibold '
                            id='discount'
                            sx={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: "#8F1402",
                                paddingBottom: "14px"
                            }}
                        >Discount</FormLabel>
                        <RadioGroup
                            aria-labelledby="discount"
                            defaultValue=" "
                            name="discount"
                            onChange={updateFilterParams}
                        >
                            {discount.map((item) =>
                                <FormControlLabel
                                    key={item.name}
                                    value={item.value}
                                    control={<Radio size='small' />}
                                    label={item.name}
                                />
                            )}
                        </RadioGroup>
                    </FormControl>
                </section>
            </div>
        </div>
    )
}

export default FilterSection