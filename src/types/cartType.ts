// src/types/CartItem.ts
export type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string
    unit?: string
  };

  
 export type Items = {
    category: string
    icon: string
    items: CartItem[]
 } 

 export  type CartContextType = {
    cart: CartItem[];
    updateCart: (item: CartItem) => void
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    total: number;
  };
  