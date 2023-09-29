export interface ProductParams {
    search: string | null;
    minStock: number | null;
    maxStock: number | null;
    minPrice: number | null;
    maxPrice: number | null;
    sort: 'asc' | 'desc' | null;
    sortBy: string | null;
    page: number | null;
}