import "./cart-icon.styles.scss";
import CART_ICON from "../../assets/shopping-bag.svg";
import { useContext } from "react";
import { CartContext } from "../../context/cart";

const CartIcon = ({ toggleCart }) => {
  const { cartCount } = useContext(CartContext);

  return (
    <div onClick={toggleCart} className="cart-icon-container">
      <img className="shopping-icon" src={CART_ICON} alt="cart_icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
