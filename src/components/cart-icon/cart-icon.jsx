import "./cart-icon.styles.scss";
import CART_ICON from "../../assets/shopping-bag.svg";

const CartIcon = ({toggleCart}) => {

  return (
    <div onClick={toggleCart} className="cart-icon-container">
      <img className="shopping-icon" src={CART_ICON} alt="cart_icon" />
      <span className="item-count">1</span>
    </div>
  );
};

export default CartIcon;
