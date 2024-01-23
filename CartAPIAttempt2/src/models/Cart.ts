export interface CartItem {
    price: number,
    quantity: number,
    id: number,
    product: string,
    customer_id?: number,
}