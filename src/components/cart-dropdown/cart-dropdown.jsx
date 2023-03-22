import { useContext } from "react";
import { CartContext } from "../../context/cart";
import Button from "../button/button";
import CartItem from "../cart-item/cart-item";
import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <>
      <div className="cart-dropdown-container">
        <p className="empty-message"></p>
        <div className="cart-items">
          {cartItems.length ? (
            cartItems.map((cartItem) => <CartItem cartItem={cartItem} />)
          ) : (
            <span className="empty-message">カートがない</span>
          )}
        </div>
        <Button>レジに行く</Button>
      </div>
    </>
  );
};

export default CartDropdown;
