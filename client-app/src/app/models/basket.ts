interface BasketItem {
    productId: number;
    name: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    brand: string;
    type: string;
}

interface Basket {
    id: string;
    buyerId: string;
    items: BasketItem[];
}

export {
  Basket,
  BasketItem
}