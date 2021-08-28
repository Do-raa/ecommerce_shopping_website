import React from 'react'

export default function checkoutSteps(props) {
    return (
        <div className="checkout-steps">
              <div className={props.step1 ? 'active' : ''} >Signin</div>
              <div className={props.step2 ? 'active' : ''} >Let's Shop!</div>
              <div className={props.step3 ? 'active' : ''} >Payment</div>
              <div className={props.step4 ? 'active' : ''} >Place Order</div>
        </div>
    )
}
