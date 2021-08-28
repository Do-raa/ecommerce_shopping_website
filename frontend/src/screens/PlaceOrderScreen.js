import React , { useEffect} from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; 
import CheckoutSteps from '../components/CheckoutSteps'; 
import {createOrder} from '../actions/orderActions';



function PlaceOrderScreen(props) {
   
  const cart = useSelector(state => state.cart);
  const { cartItems, shipping, payment } = cart; 

  const orderCreate = useSelector(state => state.orderCreate);
  const { success, order } = orderCreate; 
 const dispatch = useDispatch();
 if(!shipping.address){ 
     props.history.push('/shipping')
 }else if(!payment.paymentMethod){ 
    props.history.push('/payment')
}
 
const placeOrderHandler = () => {
  // create an order
  dispatch(createOrder({
    orderItems: cartItems, shipping, payment
  }));
}

useEffect(() => {
  if (success) {
    props.history.push("/order/" + order._id);
  }

}, [success, order, props.history]); 

  return <div> 
  <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
  
  <div className="placeorder">
    <div className="placeorder-info"> 
    <div> 
        <h3>Shipping</h3> 
        <div>{cart.shipping.address} , {cart.shipping.city} , {cart.shipping.postalCode} , {cart.shipping.country}</div>
         <div>   
               <h3>Payment</h3> 
               <div>Payment Method : {cart.payment.paymentMethod}</div>
         </div> 
         <div> 
              <ul className="cart-list-container">
        <li>
          <h3>
            Your purchases
          </h3>
          <div>
            Price
          </div>
        </li>
        {
          cartItems.length === 0 ?
            <div>
              Cart is empty
          </div>
            :
            cartItems.map(item =>
              <li>
                <div className="cart-image">
                  <img src={item.image} alt="product" />
                </div>
                <div className="cart-name">
                  <div>
                    <Link to={"/product/" + item.product}>
                      {item.name}
                    </Link>

                  </div>
                  <div>
                    Qty : {item.qty}
                  </div>
                </div>
                <div className="cart-price">
                  {item.price.toFixed(3)} TND
                </div>
              </li>
            )
        }
      </ul>
         </div>
    </div> 
  
     

    </div>
    <div className="placeorder-action">
      <h3>
        Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items)
        :
          ({cartItems.reduce((a, c) => a + c.price * c.qty, 0)} TND)
      </h3>
      <button type ='button' className="button primary full-width"  
      disabled={cart.cartItems.length === 0}
      onClick={placeOrderHandler} >Place Order</button>

    </div>
   </div>
  </div>
}

export default PlaceOrderScreen;