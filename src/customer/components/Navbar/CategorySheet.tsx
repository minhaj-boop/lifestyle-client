import React, { use } from 'react'

import { Box } from '@mui/material'
import { menLevelTwo } from '../../../data/category/levelTwo/menLevelTwo'
import { womenLevelTwo } from '../../../data/category/levelTwo/womenLeveltwo'
import { electronicsLevelTwo } from '../../../data/category/levelTwo/electronicsLevelTwo'
import { furnitureLevelTwo } from '../../../data/category/levelTwo/furnitureLevelTwo'
import { menLevelThree } from '../../../data/category/levelThree/menLevelThree'
import { womenLevelThree } from '../../../data/category/levelThree/womenLevelThree'
import { electronicsLevelThree } from '../../../data/category/levelThree/electronicsLevelThree'
import { furnitureLevelThree } from '../../../data/category/levelThree/furnitureLevelThree'
import { useNavigate } from 'react-router-dom'

const categoryTwo: { [key: string]: any[] } = {
    men: menLevelTwo,
    women: womenLevelTwo,
    electronics: electronicsLevelTwo,
    furniture: furnitureLevelTwo
}

const categoryThree: { [key: string]: any } = {
    men: menLevelThree,
    women: womenLevelThree,
    electronics: electronicsLevelThree,
    furniture: furnitureLevelThree
}

const CategorySheet = ({ selectedCategory, setShowCategorySheet }: any) => {

    const navigate = useNavigate();

    const childCategory = (category: any, parentCategoryId: any) => {
        return category.filter((child: any) => child.parentCategoryId === parentCategoryId)
    }

    return (
        <Box sx={
            { zIndex: 1 }
        } className="bg-white shadow-lg lg:h-[500px] overflow-y-auto ">
            <div className='flex text-sm flex-wrap'>
                {
                    categoryTwo[selectedCategory]?.map((item, index) =>
                        <div className={`p-8 lg:w-[20%] ${index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                            <p className='text-primary-color mb-5 font-semibold'>{item.name}</p>
                            <ul className='space-y-3 '>
                                {childCategory(categoryThree[selectedCategory], item.categoryId).map
                                    ((item: any) => <div>
                                        <li onClick={() => {
                                            setShowCategorySheet(false)
                                            navigate("/products/" + item.categoryId,)
                                        }} className='hover:text-primary-color cursor-pointer'>
                                            {item.name}
                                        </li>
                                    </div>)}

                            </ul>
                        </div>)
                }
            </div>
        </Box>
    )
}

export default CategorySheet