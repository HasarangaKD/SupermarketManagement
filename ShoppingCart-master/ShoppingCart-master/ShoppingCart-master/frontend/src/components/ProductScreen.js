import "./styles/ProductScreen.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Actions
import { getProductDetails } from "../Redux/actions/productActions";
import { addToCart } from "../Redux/actions/cartActions";

const ProductScreen = () => {
  const { id } = useParams();
  const history = useNavigate();

  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.getProductDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (product && id !== product._id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, product]);

  const addToCartHAndler = () => {
    dispatch(addToCart(product._id, qty));
    history("/cart");
  };

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => qty + Number(item.qty), 0);
  };

  return (
    <div>
      <nav className="navbar sticky-top">
        {/*logo*/}
        <div className="navbar__logo">
          <h2>
            HDSC <span style={{ color: "lightgreen" }}>Online</span>
          </h2>
        </div>

        {/*links*/}
        <ul className="navbar__links" style={{ marginLeft: "800px" }}>
          <li>
            <Link to="/cart" className="cart__link">
              <i class="fa fa-cart-plus" aria-hidden="true"></i>
              <span>
                Cart
                <span className="cartlogo__badge">{getCartCount()}</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/">Shop</Link>
          </li>
        </ul>

        {/*hamburger menu*/}
        <div className="hamburger__menu">
          <div style={{ width: "30px" }}></div>
          <div style={{ width: "30px" }}></div>
          <div style={{ width: "30px" }}></div>
        </div>
      </nav>
      <div className="productscreen">
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <>
            <div className="productscreen__left">
              <div className="left__image">
                <img
                  src={product.imageURL}
                  alt={product.name}
                  style={{ width: "300px", height: "300px" }}
                />
              </div>
              <div className="left__info">
                <p className="left__name">{product.name}</p>
                <p>Rs.{product.price}.00</p>
                <p>{product.description}</p>
              </div>
            </div>
            <div className="productscreen_right">
              <div className="right__info">
                <p>
                  Price: <span>Rs.{product.price}.00</span>
                </p>
                <p>
                  Status:{" "}
                  <span>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </p>
                <p>
                  Qty
                  <select value={qty} onChange={(e) => setQty(e.target.value)}>
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </p>
                <p>
                  <button type="button" onClick={addToCartHAndler}>
                    Add to Cart
                  </button>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductScreen;
