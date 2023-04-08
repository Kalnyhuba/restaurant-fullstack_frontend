import { Product } from "./product.model";

export interface UserOrdersDetails {
    id: number,
    fullName: string,
    fullAddress: string,
    contactNumber: string,
    orderStatus: string,
    amount: number,
    products: Product[],
    user: any
}