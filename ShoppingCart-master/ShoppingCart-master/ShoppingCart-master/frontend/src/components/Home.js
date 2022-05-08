import { useEffect } from "react";
import "./styles/NavBar.css";
import "./styles/HomeScreen.css";
import Product from "./Product";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//Actions
import { getProducts as listProducts } from "../Redux/actions/productActions";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const getProducts = useSelector((state) => state.getProducts);
  const { products, loading, error } = getProducts;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => qty + Number(item.qty), 0);
  };

  return (
    <div>
      <center>
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
            <li>
              <Link to="/delivery">Delivery</Link>
            </li>
          </ul>

          {/*hamburger menu*/}
          <div className="hamburger__menu">
            <div style={{ width: "30px" }}></div>
            <div style={{ width: "30px" }}></div>
            <div style={{ width: "30px" }}></div>
          </div>
        </nav>

        <div className="homescreen">
          <h2 className="homescreen__title">Latests Products</h2>

          <div className="homescreen__products">
            {loading ? (
              <h2>Loading...</h2>
            ) : error ? (
              <h2>{error}</h2>
            ) : (
              products.map((product) => {
                if (product.type === "lt") {
                  return (
                    <Product
                      key={product._id}
                      productId={product._id}
                      name={product.name}
                      price={product.price}
                      description={product.description}
                      imageURL={product.imageURL}
                    />
                  );
                }
              })
            )}
          </div>
        </div>
        <div className="homescreen">
          <h2 className="homescreen__title">Vegitables</h2>

          <div className="homescreen__products">
            {loading ? (
              <h2>Loading...</h2>
            ) : error ? (
              <h2>{error}</h2>
            ) : (
              products.map((product) => {
                if (product.type === "vg") {
                  return (
                    <Product
                      key={product._id}
                      productId={product._id}
                      name={product.name}
                      price={product.price}
                      description={product.description}
                      imageURL={product.imageURL}
                    />
                  );
                }
              })
            )}
          </div>
          <div className="homescreen">
            <h2 className="homescreen__title">Fruits</h2>

            <div className="homescreen__products">
              {loading ? (
                <h2>Loading...</h2>
              ) : error ? (
                <h2>{error}</h2>
              ) : (
                products.map((product) => {
                  if (product.type === "ft") {
                    return (
                      <Product
                        key={product._id}
                        productId={product._id}
                        name={product.name}
                        price={product.price}
                        description={product.description}
                        imageURL={product.imageURL}
                      />
                    );
                  }
                })
              )}
            </div>
          </div>
        </div>
      </center>
    </div>
  );
};

export default HomeScreen;
