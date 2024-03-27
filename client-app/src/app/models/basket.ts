export interface BasketItem {
    productId: number;
    name: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    brand: string;
    type: string;
}

export interface Basket {
    id: string;
    buyerId: string;
    items: BasketItem[];
    paymentIntentId?: string;
    clientSecret?: string;
}