import React from 'react'
import HomeCategoryTable from './HomeCategoryTable'
import { useAppSelector } from '../../../state/store';

const ShopByCategoryTable = () => {
    const { customer } = useAppSelector(store => store);
    return (
        <div><HomeCategoryTable /></div>
    )
}

export default ShopByCategoryTable