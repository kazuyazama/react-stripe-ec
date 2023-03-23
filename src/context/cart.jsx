import { createContext, useEffect, useState } from "react";

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

const removeCartItem = (cartItems, product) => {
  //product-card.jsのidとcart-dropdownのidが一致していたら(同じ商品か判定)
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === product.id
  );

  //一致した商品が1になったら削除する
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== product.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === product.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const deleteCartItem = (carItems, product) => {
  return carItems.filter((cartItem) => cartItem.id !== product.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemToCart: () => {},
  cartCount: 0,
  cartTotal:0,
  clearItemFromCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    //mapと使い方は似てる
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);


  useEffect(() => {
    //mapと使い方は似てる
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (product) => {
    //productはproduct-cardから渡ってきた個々のプロダクト
    //cartItemsはcard-dropddownで定義した初期値は空の配列
    setCartItems(addCartItem(cartItems, product));
  };

  const removeItemToCart = (product) => {
    //productはproduct-cardから渡ってきた個々のプロダクト
    //cartItemsはcard-dropddownで定義した初期値は空の配列
    setCartItems(removeCartItem(cartItems, product));
  };

  const clearItemFromCart = (product) => {
    //productはproduct-cardから渡ってきた個々のプロダクト
    //cartItemsはcard-dropddownで定義した初期値は空の配列
    setCartItems(deleteCartItem(cartItems, product));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    cartTotal,
    removeItemToCart,
    clearItemFromCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
