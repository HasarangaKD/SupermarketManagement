import { Link } from "react-router-dom";
import "./styles/CartItem.css";

const CartItem = ({ item, qtyChangeHandler, removeHandler }) => {
  return (
    <div className="cartitem">
      <div className="cartitem__image">
        <img src={item.imageURL} style={{ width: "300px", height: "300px" }} />
      </div>
      <Link to={`/product/${item.product}`} className="cartitem__name">
        <p>{item.name}</p>
      </Link>

      <p className="cartitem__price">Rs.{item.price}.00</p>

      <select
        value={item.qty}
        onChange={(e) => qtyChangeHandler(item.product, e.target.value)}
      >
        {[...Array(item.countInStock).keys()].map((x) => (
          <option key={x + 1} value={x + 1}>
            {x + 1}
          </option>
        ))}
      </select>

      <button className="cartitem__deleteBtn">
        <i
          class="fa fa-trash-o"
          aria-hidden="true"
          onClick={() => removeHandler(item.product)}
        ></i>
      </button>
    </div>
  );
};

export default CartItem;
