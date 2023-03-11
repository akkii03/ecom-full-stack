import React, { useEffect, useState } from "react";
import axios from "axios";
import { product_Id_Api } from "./Apis/allApis";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";
import MetaData from "./MetaData";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(product_Id_Api(id))
      .then((res) => {
        setProduct(res.data.product);
        console.log(res.data.product);
        setLoading(false);
      })
      .catch((err) => toast.error(err.message));
  }, []);

  function handelQuantity(e) {
    console.log(e.target.value);
    setQuantity(e.target.value);
  }

  function handelMinus() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      toast.warning("🙏quantity can not be 0");
    }
  }

  function handelPlus() {
    if (product.stock > quantity) {
      setQuantity(quantity + 1);
    } else {
      toast.error("😔Quantity can not be greater than stock");
    }
  }

  if (product) {
    var options = {
      edit: false,
      color: "rgba(20,20,20,0.1)",
      activeColor: "red",
      size: window.innerWidth < 600 ? 20 : 25,
      value: product.ratings,
      isHalf: true,
    };
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="productDetails">
            <MetaData title={`${product.name} on A2Z Store`} />
            <ToastContainer />
            <div className="product_slider">
              <Carousel>
                {product.images &&
                  product.images.map((item, index) => {
                    return (
                      <img
                        className=" imagesSlider"
                        alt={item.url}
                        src={item.url}
                        key={index}
                      />
                    );
                  })}
              </Carousel>
            </div>
            <div className="product_details">
              <div className="detailsBlock-1">
                <h4>{product.name}</h4>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span>
                  (<spanc className="info">{product.numOfReviews}</spanc>{" "}
                  Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1 className="price mainPrice">₹{product.price}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button className="cart" onClick={handelMinus}>
                      <i class="fa-solid fa-minus"></i>
                    </button>
                    <input
                      type="number"
                      onChange={(e) => handelQuantity(e)}
                      value={quantity}
                    />
                    <button className="cart" onClick={handelPlus}>
                      <i class="fa-solid fa-plus"></i>
                    </button>
                  </div>
                  <button className="cartBtn">Add to Cart</button>
                </div>
              </div>
              <p>
                <span className="info">Status:</span>
                {"  "}
                {
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                }
              </p>
              <div className="detailsBlock-4">
                <span className="info"> Description:</span> {"  "}
                {product.description}
              </div>
              <button className="reviewBtn">Submit Review</button>
            </div>
          </div>
          <h3 className="reviewHeading">Review's</h3>

          <div className="reviews">
            {product.reviews.length > 0 ? (
              product.reviews.map((rev) => {
                return <ReviewCard review={rev} />;
              })
            ) : (
              <p className="noReview">👎 No Reviews Yet</p>
            )}
          </div>
        </>
      )}
    </>
  );
}
