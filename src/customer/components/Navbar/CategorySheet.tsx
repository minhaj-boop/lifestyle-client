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
        // <Box sx={
        //     { zIndex: 1 }
        // } className="bg-white shadow-lg lg:h-[500px] overflow-y-auto ">
        //     <div className='flex text-sm flex-wrap'>
        //         {
        //             categoryTwo[selectedCategory]?.map((item, index) =>
        //                 <div className={`p-8 lg:w-[20%] ${index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
        //                     <p className='text-primary-color mb-5 font-semibold'>{item.name}</p>
        //                     <ul className='space-y-3 '>
        //                         {childCategory(categoryThree[selectedCategory], item.categoryId).map
        //                             ((item: any) => <div key={item}>
        //                                 <li onClick={() => {
        //                                     setShowCategorySheet(false)
        //                                     navigate("/products/" + item.categoryId,)
        //                                 }} className='hover:text-primary-color cursor-pointer'>
        //                                     {item.name}
        //                                 </li>
        //                             </div>)}

        //                     </ul>
        //                 </div>)
        //         }
        //     </div>
        // </Box>
        // <Box className="bg-white shadow-lg max-h-[80vh] overflow-y-auto text-sm">
        //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
        //         {categoryTwo[selectedCategory]?.map((item, index) => (
        //             <div key={item.categoryId} className="bg-gray-50 p-4 rounded shadow-sm">
        //                 {/* Accordion toggle for mobile */}
        //                 <div
        //                     onClick={() => toggleAccordion(index)}
        //                     className="font-semibold text-primary-color cursor-pointer flex justify-between items-center"
        //                 >
        //                     {item.name}
        //                     <span>{openIndex === index ? "−" : "+"}</span>
        //                 </div>

        //                 {/* Show children only when open (on mobile) or always on large screens */}
        //                 <ul className={`space-y-2 mt-3 ${openIndex === index ? 'block' : 'hidden'} lg:block`}>
        //                     {childCategory(categoryThree[selectedCategory], item.categoryId).map((child: any) => (
        //                         <li
        //                             key={child.categoryId}
        //                             onClick={() => {
        //                                 setShowCategorySheet(false)
        //                                 navigate('/products/' + child.categoryId)
        //                             }}
        //                             className="cursor-pointer hover:text-primary-color"
        //                         >
        //                             {child.name}
        //                         </li>
        //                     ))}
        //                 </ul>
        //             </div>
        //         ))}
        //     </div>
        // </Box>
        // <Box className="bg-white shadow-lg max-h-[80vh] overflow-y-auto text-sm">
        //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
        //         {categoryTwo[selectedCategory]?.map((item, index) => (
        //             <div key={item.categoryId} className="bg-gray-50 p-4 rounded shadow-sm">
        //                 {/* Title with accordion toggle on small screens only */}
        //                 <div
        //                     onClick={() => toggleAccordion(index)}
        //                     className="font-semibold text-primary-color cursor-pointer flex justify-between items-center"
        //                 >
        //                     {item.name}
        //                     {/* Show toggle only on small screens */}
        //                     {!isLarge && (
        //                         <span className="text-xl">
        //                             {openIndex === index ? "−" : "+"}
        //                         </span>
        //                     )}
        //                 </div>

        //                 {/* Show children: always on large, conditionally on small */}
        //                 <ul className={`space-y-2 mt-3 ${isLarge || openIndex === index ? 'block' : 'hidden'}`}>
        //                     {childCategory(categoryThree[selectedCategory], item.categoryId).map((child: any) => (
        //                         <li
        //                             key={child.categoryId}
        //                             onClick={() => {
        //                                 setShowCategorySheet(false)
        //                                 navigate('/products/' + child.categoryId)
        //                             }}
        //                             className="cursor-pointer hover:text-primary-color"
        //                         >
        //                             {child.name}
        //                         </li>
        //                     ))}
        //                 </ul>
        //             </div>
        //         ))}
        //     </div>
        // </Box>
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