import { Avatar, Box, Button, Drawer, IconButton, useMediaQuery, useTheme } from '@mui/material'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AddShoppingCart, FavoriteBorder, Storefront } from '@mui/icons-material';
import CategorySheet from './CategorySheet';
import { mainCategory } from '../../../data/category/mainCategory';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../state/store';

const Navbar = () => {
    const theme = useTheme();
    const isLarge = useMediaQuery(theme.breakpoints.up("lg"));

    const [selectedCategory, setSelectedCategory] = useState("men");
    const [showCategorySheet, setShowCategorySheet] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const navigate = useNavigate()

    const { auth } = useAppSelector(store => store)
    const { seller } = useAppSelector(store => store)

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    return (
        <>
            <Box className="sticky top-0 left-0 right-0 bg-white border-b" sx={{
                zIndex: 1000
            }}>
                <div className='flex items-center justify-between px-4 lg:px-20 h-[70px]'>
                    {/* Left Section */}
                    <div className='flex items-center gap-4 lg:gap-9'>
                        {/* Logo & Menu Icon */}
                        <div className='flex items-center gap-2'>
                            {!isLarge && <IconButton onClick={toggleDrawer(true)}>
                                <MenuIcon />
                            </IconButton>}
                            <h1 onClick={() => navigate("/")} className=' logo cursor-pointer text-lg sm:text-xl md:text-2xl text-primary-color'>Lifestyle</h1>
                        </div>

                        {/* Desktop Navigation */}
                        <ul className='hidden lg:flex items-center font-medium text-[#8F1402]'>
                            {mainCategory.map((item) => <li
                                key={item.categoryId}
                                onMouseLeave={() => {
                                    setShowCategorySheet(false)
                                }}
                                onMouseEnter={() => {
                                    setShowCategorySheet(true);
                                    setSelectedCategory(item.categoryId)
                                }}
                                className='mainCategory hover:text-primary-color hover:border-b-2 h-[70px] px-4 border-primary-color flex items-center'>{item.name}</li>)}

                        </ul>
                    </div>

                    {/* Right Section */}
                    <div className='flex gap-2 sm:gap-3 lg:gap-6 items-center '>
                        <IconButton>
                            <SearchIcon className='text-[#8F1402]' />
                        </IconButton>

                        {/* Auth / Seller / Login Button */}
                        {
                            auth.user ? (
                                <Button onClick={() => navigate("/account/orders")} className='flex items-center gap-2'>
                                    <Avatar sx={{ width: 29, height: 29 }} src='https://cdn.pixabay.com/photo/2018/03/20/04/49/natural-3242182_1280.jpg' />
                                    <h1 className='font-semibold hidden lg:block '>{auth.user?.fullName}</h1>
                                </Button>
                            ) : seller.profile ? (
                                <Button onClick={() => navigate("/seller")} className='flex items-center gap-2'>
                                    <Avatar sx={{ width: 29, height: 29 }} src='https://cdn.pixabay.com/photo/2018/03/20/04/49/natural-3242182_1280.jpg' />
                                    <h1 className='font-semibold hidden lg:block '>{seller.profile.businessDetails.businessName}</h1>
                                </Button>
                            ) : (
                                <Button onClick={() => navigate("/login")} variant='contained'>Login</Button>
                            )
                        }

                        {/* Wishlist & Cart */}
                        <IconButton onClick={() => navigate("/wishlist")}>
                            <FavoriteBorder className='text-[#8F1402]' sx={{ fontSize: 26 }} />
                        </IconButton>
                        <IconButton onClick={() => navigate("/cart")}>
                            <AddShoppingCart className='text-[#8F1402]' sx={{ fontSize: 26 }} />
                        </IconButton>

                        {/* Become Seller */}
                        {isLarge && !seller.profile && <Button onClick={() => navigate("/become-seller")} startIcon={<Storefront />} variant='outlined'>
                            Become Seller
                        </Button>}
                    </div>
                </div>

                {/* Hover Category Sheet (desktop only) */}
                {showCategorySheet && <div onMouseLeave={() => {
                    setShowCategorySheet(false)
                }}
                    onMouseEnter={() => {
                        setShowCategorySheet(true);
                    }}
                    className='categorySheet absolute top-[4.41rem] left-0 right-0 lg:left-20 lg:right-20 border bg-white shadow-sm'>
                    <CategorySheet selectedCategory={selectedCategory} setShowCategorySheet={setShowCategorySheet} />
                </div>}
            </Box>
            {/* Drawer for Mobile Navigation */}
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <div className="w-[280px] p-4 space-y-4 overflow-y-auto h-full">
                    <h2 className="text-lg font-bold mb-4">Categories</h2>

                    {mainCategory.map((item) => (
                        <div
                            key={item.categoryId}
                            className={`cursor-pointer py-2 px-2 rounded ${selectedCategory === item.categoryId ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'}`}
                            onClick={() =>
                                setSelectedCategory((prev) =>
                                    prev === item.categoryId ? "" : item.categoryId
                                )
                            }
                        >
                            {item.name}
                        </div>
                    ))}

                    {/* Show CategorySheet below selected category */}
                    {selectedCategory && (
                        <CategorySheet
                            selectedCategory={selectedCategory}
                            setShowCategorySheet={() => { }}
                        />
                    )}

                    {!seller.profile && (
                        <Button
                            fullWidth
                            onClick={() => {
                                setDrawerOpen(false);
                                navigate("/become-seller");
                            }}
                            startIcon={<Storefront />}
                            variant="outlined"
                        >
                            Become Seller
                        </Button>
                    )}
                </div>
            </Drawer>

            {/* <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <div className="w-[250px] p-4 space-y-4">
                    <h2 className="text-lg font-bold mb-4">Categories</h2>
                    {mainCategory.map((item) => (
                        <div
                            key={item.categoryId}
                            onClick={() => setSelectedCategory(item.categoryId)}
                            className={`cursor-pointer py-2 px-2 rounded ${selectedCategory === item.categoryId ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'}`}
                        >
                            {item.name}
                        </div>
                    ))}

                    <CategorySheet selectedCategory={selectedCategory} setShowCategorySheet={() => { }} />

                    {!seller.profile && (
                        <Button
                            fullWidth
                            onClick={() => {
                                setDrawerOpen(false);
                                navigate("/become-seller");
                            }}
                            startIcon={<Storefront />}
                            variant="outlined"
                        >
                            Become Seller
                        </Button>
                    )}
                </div>
            </Drawer> */}
            {/* <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <div className="w-[250px] p-4 space-y-4">
                    <h2 className="text-lg font-bold mb-4">Categories</h2>
                    {mainCategory.map((item) => (
                        <div
                            key={item.categoryId}
                            onClick={() => setSelectedCategory(item.categoryId)}
                            className={`cursor-pointer py-2 px-2 rounded ${selectedCategory === item.categoryId ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'}`}
                        >
                            {item.name}
                        </div>
                    ))}
                    <CategorySheet selectedCategory={selectedCategory} setShowCategorySheet={() => { }} />
                    {!seller.profile && (
                        <Button
                            fullWidth
                            onClick={() => {
                                setDrawerOpen(false);
                                navigate("/become-seller");
                            }}
                            startIcon={<Storefront />}
                            variant="outlined"
                        >
                            Become Seller
                        </Button>
                    )}
                </div>
            </Drawer> */}

            {/* <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <div className="w-[250px] p-4 space-y-4">
                    <h2 className="text-lg font-bold mb-4">Categories</h2>
                    {mainCategory.map((item) => (
                        <div
                            key={item.categoryId}
                            onClick={() => {
                                setDrawerOpen(false);
                                navigate(`/category/${item.categoryId}`);
                            }}
                            className="cursor-pointer py-2 px-2 hover:bg-gray-100 rounded"
                        >
                            {item.name}
                        </div>
                    ))}
                    {!seller.profile && (
                        <Button
                            fullWidth
                            onClick={() => {
                                setDrawerOpen(false);
                                navigate("/become-seller");
                            }}
                            startIcon={<Storefront />}
                            variant="outlined"
                        >
                            Become Seller
                        </Button>
                    )}
                </div>
            </Drawer> */}
        </>
    )
}

export default Navbar