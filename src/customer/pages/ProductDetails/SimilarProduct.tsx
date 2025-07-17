import React from 'react'
import SimilarProductCard from './SimilarProductCard'

const SimilarProduct = () => {
    return (
        <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-between gap-4 gap-y-8'>
            {[1, 1, 1, 1, 1, 1, 1, 1].map((item) => <SimilarProductCard />)}
        </div>
    )
}

export default SimilarProduct