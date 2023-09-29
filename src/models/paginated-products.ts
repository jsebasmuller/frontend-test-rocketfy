import { Product } from "./products";

export interface PaginatedProducts {
    pagination: Paginate;
    products: Product[];
}

interface Paginate {
    page: number;
    totalPages: number;
    totalResults: number;
}