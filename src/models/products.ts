export interface Product {
    id: string;
    name: string;
    description: string;
    sku: string;
    image: string;
    tags: string[];
    price: number;
    stock: number;
    history: ProductHistory[];
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductHistory {
    date: Date;
    price: number;
    stock: number;
}