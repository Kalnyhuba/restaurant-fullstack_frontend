import { Product } from "./product.model";

export interface ProductPage {
    content: Product[],
    empty: boolean,
    first: boolean,
    last: boolean,
    number: number,
    numberOfElements: number,
    pageable: any,
    size: number,
    sort: any,
    totalElements: number,
    totalPages: number
}