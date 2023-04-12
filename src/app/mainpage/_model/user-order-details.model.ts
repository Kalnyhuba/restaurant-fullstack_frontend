import { OrderItem } from "./order-item.model";

export interface UserOrdersDetails {
    id: number,
    fullName: string,
    fullAddress: string,
    contactNumber: string,
    orderStatus: string,
    amount: number,
    items: OrderItem[],
    user: any
}