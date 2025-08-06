
export interface Deal {
    id: number;
    discount: number;
    homeCategory: HomeCategory;
}

export interface HomeData {
    id: number;
    grid: HomeCategory[];
    shopByCategories: HomeCategory[];
    electricCategories: HomeCategory[];
    deals: Deal[];
    dealCategories: HomeCategory[];
}

export interface HomeCategory {
    id?:number;
    categoryId: string;
    section?: string;
    name?: string;
    image: string;
    parentCategoryId?: string;
}