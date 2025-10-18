import { Box, useMediaQuery, useTheme } from '@mui/material'
import { menLevelTwo } from '../../../data/category/levelTwo/menLevelTwo'
import { womenLevelTwo } from '../../../data/category/levelTwo/womenLeveltwo'
import { electronicsLevelTwo } from '../../../data/category/levelTwo/electronicsLevelTwo'
import { furnitureLevelTwo } from '../../../data/category/levelTwo/furnitureLevelTwo'
import { menLevelThree } from '../../../data/category/levelThree/menLevelThree'
import { womenLevelThree } from '../../../data/category/levelThree/womenLevelThree'
import { electronicsLevelThree } from '../../../data/category/levelThree/electronicsLevelThree'
import { furnitureLevelThree } from '../../../data/category/levelThree/furnitureLevelThree'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

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

    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const theme = useTheme()
    const isLarge = useMediaQuery(theme.breakpoints.up("lg"))

    const childCategory = (category: any, parentCategoryId: any) => {
        return category.filter((child: any) => child.parentCategoryId === parentCategoryId)
    }

    const toggleAccordion = (index: number) => {
        if (isLarge) return;
        setOpenIndex(prev => (prev === index ? null : index))
    }

    return (
        <Box className="bg-white shadow-md max-h-[70vh] overflow-y-auto">
            <div className={`grid ${isLarge ? 'grid-cols-5' : 'grid-cols-1'} gap-2 p-2`}>
                {categoryTwo[selectedCategory]?.map((item, index) => (
                    <div key={item.categoryId} className="bg-gray-50 rounded p-3">
                        <div
                            onClick={() => toggleAccordion(index)}
                            className="text-black font-semibold cursor-pointer flex justify-between items-center"
                        >
                            {item.name}
                            {!isLarge && (
                                <span className="text-xl">{openIndex === index ? '−' : '+'}</span>
                            )}
                        </div>

                        <ul
                            className={`mt-3 text-sm space-y-2 ${isLarge || openIndex === index ? 'block' : 'hidden'
                                }`}
                        >
                            {childCategory(categoryThree[selectedCategory], item.categoryId).map((child: any) => (
                                <li
                                    key={child.categoryId}
                                    onClick={() => {
                                        setShowCategorySheet(false)
                                        navigate('/products/' + child.categoryId)
                                    }}
                                    className="cursor-pointer text-black hover:text-primary-color"
                                >
                                    {child.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </Box>
    )
}

export default CategorySheet