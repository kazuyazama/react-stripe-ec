import { createContext, useState } from "react";

const addCartItem = (cartItems, product) => {
  //product-card.jsのidとcart-dropdownのoidが一致していたら(同じ商品か判定)
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === product.id
  );

  //一致していたら,mapで展開してcartItemsの配列を展開して個々に比較して、cartItemに数量を足していく?
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === product.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...product, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (product) => {
    //productはproduct-cardから渡ってきた個々のプロダクト
    //cartItemsはcard-dropddownで定義した初期値は空の配列
    setCartItems(addCartItem(cartItems, product));
  };

  const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
