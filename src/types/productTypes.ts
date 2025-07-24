import { Seller } from "./sellerTypes";

export interface Product {
    id?:number;
    title: string;
    description: string;
    mrPrice: number;
    sellingPrice: number;
    discountPercent: number;
    quantity: number;
    color: string;
    images: string[];
    numRating?:number; 
    category?:Category;
    seller?: Seller;
    createdAt?: Date;
    sizes: string[];

}

export interface Category {
    id?: number;
    name: string;
    categoryId: number;
    parentCategory?: Category;
    lavel: number;
}

