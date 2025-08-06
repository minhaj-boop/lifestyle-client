import React, { use, useEffect, useState } from 'react'
import StarIcon from '@mui/icons-material/Star';
import { teal } from '@mui/material/colors';
import { Button, Divider } from '@mui/material';
import { Add, AddShoppingCart, FavoriteBorder, LocalShipping, Remove, Shield, Wallet, WorkspacePremium } from '@mui/icons-material';
import SimilarProduct from './SimilarProduct';
import ReviewCard from '../Review/ReviewCard';
import { useAppDispatch, useAppSelector } from '../../../state/store';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../../state/customer/productSlice';
const dummy = [
  "https://www.aarong.com/media/catalog/product/0/5/0550000148498_1_1.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=667&width=500&canvas=500:667&dpr=2%202x",
  "https://www.aarong.com/media/catalog/product/0/5/0550000148498_2_1.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=667&width=500&canvas=500:667&dpr=2%202x",
  "https://www.aarong.com/media/catalog/product/0/5/0550000148498.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=667&width=500&canvas=500:667&dpr=2%202x",
  "https://www.aarong.com/media/catalog/product/0/5/0550000148498_1.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=667&width=500&canvas=500:667&dpr=2%202x",
  "https://www.aarong.com/media/catalog/product/0/5/0550000148498_2.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=667&width=500&canvas=500:667&dpr=2%202x"
]

const ProductDetails = () => {

  const [quantity, setQuantity] = useState(1)
  const dispatch = useAppDispatch()
  const { productId } = useParams()
  const { product } = useAppSelector(store => store)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    dispatch(fetchProductById(Number(productId)))
  }, [])

  const handleActiveImage = (index: number) => {
    setActiveImage(index)
  }

  return (
    <div className='px-5 lg:px-20 pt-10 '>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
        <section className="flex flex-col lg:flex-row gap-5">
          <div className='w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3'>
            {
              product.product?.images.map((item, index) => <img onClick={() => handleActiveImage(index)} className='lg:w-full w-[50px] cursor-pointer rounded-md' src={item} alt=''></img>)
            }
          </div>
          <div className='w-full lg:w-[85%]'>
            <img className='w-full rounded-md object-cover' src={product.product?.images[activeImage]} alt="" />
          </div>
        </section>
        <section>
          <h1 className='font-bold text-lg text-primary-color'>
            {product.product?.seller?.businessDetails.businessName}
          </h1>
          <p className=' text-gray-500 font-semibold'>{product.product?.title}</p>
          <div className='flex justify-between items-center py-2 border w-[180px] px-3 mt-5'>
            <div className='flex gap-1 items-center'>
              <span>4</span>
              <StarIcon sx={{
                color: "#8F1402",
                fontSize: "17px",

              }} />
            </div>
            <Divider orientation='vertical' flexItem />
            <span>
              234 ratings
            </span>
          </div>
          <div className=''>
            <div className='price flex items-center gap-3 mt-5 text-xl'>
              <span className='font-semibold text-gray-800'>
                BDT {product.product?.sellingPrice}
              </span>
              <span className="line-through text-gray-400">
                BDT {product.product?.mrPrice}
              </span>
              <span className="text-primary-color font-semibold">
                {product.product?.discountPercent}%
              </span>
            </div>
            <p className='text-sm'>Inclusive of all tax. Free shipping on above BDT 5000 shopping</p>
          </div>
          <div className='mt-7 space-y-3 '>
            <div className='flex items-center gap-4'>
              <Shield sx={{
                color: "#8F1402"
              }} />
              <p>Authentic & Quality Assured</p>
            </div>
            <div className='flex items-center gap-4'>
              <WorkspacePremium sx={{
                color: "#8F1402"
              }} />
              <p>100% moneyback gurantee</p>
            </div>
            <div className='flex items-center gap-4'>
              <LocalShipping sx={{
                color: "#8F1402"
              }} />
              <p>Free Shipping & Returns</p>
            </div>
            <div className='flex items-center gap-4'>
              <Wallet sx={{
                color: "#8F1402"
              }} />
              <p>Pay on delivery</p>
            </div>
          </div>
          <div className='mt-7 space-y-2 '>
            <h1>QUANTITY</h1>
            <div className='flex items-center gap-2 w-[140px] justify-between'>
              <Button disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)}>
                <Remove />
              </Button>
              <span>{quantity}</span>
              <Button onClick={() => setQuantity(quantity + 1)}>
                <Add />
              </Button>
            </div>
          </div>
          <div className='mt-2 flex items-center gap-5 '>
            <Button
              fullWidth
              variant='contained'
              startIcon={<AddShoppingCart />}
              sx={{
                py: "1rem"
              }}>
              Add To Bag
            </Button>
            <Button
              fullWidth
              variant='outlined'
              startIcon={<FavoriteBorder />}
              sx={{
                py: "1rem"
              }}>
              Add To Wishlist
            </Button>
          </div>
          <div className='mt-5 text-gray-500'>
            <p>{product.product?.description}</p>
          </div>
          <div className='mt-12 space-y-5'>
            <ReviewCard />
            <Divider />
          </div>
        </section>
      </div>

      <div className='mt-20 '>
        <h1 className='text-lg font-bold'>Similar Product</h1>
        <div className='pt-5'><SimilarProduct /></div>
      </div>

    </div>
  )
}

export default ProductDetails