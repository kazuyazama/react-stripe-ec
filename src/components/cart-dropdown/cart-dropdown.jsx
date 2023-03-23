import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cart";
import Button from "../button/button";
import CartItem from "../cart-item/cart-item";
import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);

  const navigate = useNavigate();

  return (
    <>
      <div className="cart-dropdown-container">
        <p className="empty-message"></p>
        <div className="cart-items">
          {cartItems.length ? (
            cartItems.map((cartItem) => (
              <CartItem key={cartItem.id} cartItem={cartItem} />
            ))
          ) : (
            <span className="empty-message">カートにアイテムがありません</span>
          )}
        </div>
        <Button onClick={() => navigate("/checkout")}>レジに進む</Button>
      </div>
    </>
  );
};

export default CartDropdown;
