import React, { useEffect, useState } from 'react'
import FilterSection from './FilterSection'
import ProductCard from './ProductCard'
import { Box, Divider, Drawer, FormControl, IconButton, InputLabel, MenuItem, Pagination, Select, useMediaQuery, useTheme } from '@mui/material'
import { FilterAlt } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '../../../state/store'
import { fetchAllProducts } from '../../../state/customer/productSlice'
import { useParams, useSearchParams } from 'react-router-dom'

const Product = () => {

    const theme = useTheme()
    const isLarge = useMediaQuery(theme.breakpoints.up("lg"))
    // const [sort, setSort] = useState()
    // const [page, setPage] = useState(1);
    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    const { category } = useParams()
    const { product } = useAppSelector(store => store)

    const [sort, setSort] = useState(searchParams.get("sort") || "");
    const [page, setPage] = useState(Number(searchParams.get("page") || "1"));
    const [showMobileFilter, setShowMobileFilter] = useState(false);

    const handleSortChange = (event: any) => {
        // setSort(event.target.value)

        //new
        const newSort = event.target.value;
        setSort(newSort);

        const newParams = new URLSearchParams(searchParams)

        newParams.set("sort", newSort);
        newParams.set("page", "1");
        setSearchParams(newParams);
    }

    const handlePageChange = (value: number) => {
        setPage(value);
        //new
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", value.toString());
        setSearchParams(newParams);
    }

    useEffect(() => {
        const [minPrice, maxPrice] = searchParams.get("price")?.split("-") || [];
        const color = searchParams.get("color") || "";
        const minDiscount = searchParams.get("discount") ? Number(searchParams.get("discount")) : undefined;
        // const pageNumber = page - 1;

        //new
        const sort = searchParams.get("sort") || "";
        const pageNumber = Number(searchParams.get("page") || "1") - 1;


        const newFilter = {
            // color: color || "",
            category: category || "",
            color,
            minPrice: minPrice ? Number(minPrice) : undefined,
            maxPrice: maxPrice ? Number(maxPrice) : undefined,
            minDiscount,
            sort,
            pageNumber,
        }

        dispatch(fetchAllProducts(
            // category: category || "",
            // sort: sort || "",
            newFilter
        ))

    }, [category, searchParams])

    useEffect(() => {
        const urlPage = Number(searchParams.get("page") || "1");
        setPage(urlPage); // Sync local state with URL
    }, [searchParams]);

    return (
        <div className=' mt-10'>
            {/* <div>
                <h1 className='text-2xl sm:text-3xl text-center font-bold text-gray-700 px-4 uppercase mb-6'>women's saree</h1>
            </div> */}
            {product.products.length > 0 && category && (
                <div>
                    <h1 className='text-2xl sm:text-3xl text-center font-bold text-gray-700 px-4 uppercase mb-6'>
                        {category?.replace(/_/g, ' ')}
                    </h1>
                </div>
            )}
            <div className='lg:flex'>
                <aside className='hidden lg:block w-[20%]'>
                    <FilterSection />
                </aside>
                <div className='w-full lg:w-[80%] space-y-5 '>
                    <div className='flex justify-between items-center px-4 sm:px-6'>
                        {/* <div className='relative w-[50%] '>
                            {
                                !isLarge && (<IconButton>
                                    <FilterAlt />
                                </IconButton>)
                            }
                            {
                                !isLarge && (<Box>
                                    <FilterSection />
                                </Box>)
                            }
                        </div> */}
                        {/* Filter toggle button (mobile only) */}
                        {!isLarge && (
                            <IconButton onClick={() => setShowMobileFilter(true)}>
                                <FilterAlt />
                            </IconButton>
                        )}
                        <FormControl size='small' sx={{
                            minWidth: "150px"
                        }}>
                            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={sort}
                                label="Sort"
                                onChange={handleSortChange}
                            >
                                <MenuItem value={"price_low"}>Price : Low - High</MenuItem>
                                <MenuItem value={"price_high"}>Price : High-Low</MenuItem>
                                {/* <MenuItem value={30}>Thirty</MenuItem> */}
                            </Select>
                        </FormControl>
                    </div>

                    {/* Filter Drawer (Mobile) */}
                    <Drawer
                        anchor='left'
                        open={showMobileFilter}
                        onClose={() => setShowMobileFilter(false)}
                    >
                        <Box width={260} role="presentation">
                            <FilterSection />
                        </Box>
                    </Drawer>

                    <Divider />

                    {/* Product Grid */}
                    <section className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 px-4 sm:px-6'>
                        {product.products.map((item, index) => <ProductCard key={index} item={item} />)}
                    </section>

                    {/* Pagination */}
                    <div className='flex justify-center py-10 '>
                        <Pagination
                            page={page}
                            onChange={(e, value) => handlePageChange(value)}
                            count={10}
                            variant="outlined"
                            color='primary'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product