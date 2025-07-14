import React from 'react'
import { menLevelTwo } from '../../../data/levelTwo/menLevelTwo'
import { womenLevelTwo } from '../../../data/levelTwo/womenLeveltwo'
import { electronicsLevelTwo } from '../../../data/levelTwo/electronicsLevelTwo'
import { furnitureLevelTwo } from '../../../data/levelTwo/furnitureLevelTwo'
import { menLevelThree } from '../../../data/levelThree/menLevelThree'
import { womenLevelThree } from '../../../data/levelThree/womenLevelThree'
import { electronicsLevelThree } from '../../../data/levelThree/electronicsLevelThree'
import { furnitureLevelThree } from '../../../data/levelThree/furnitureLevelThree'
import { Box } from '@mui/material'

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
                                        <li onClick={() => setShowCategorySheet(false)} className='hover:text-primary-color cursor-pointer'>
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