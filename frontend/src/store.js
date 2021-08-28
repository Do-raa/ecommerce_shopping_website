import {createStore , combineReducers, applyMiddleware, compose} from 'redux'; 
import { productDeleteReducer, productDetailsReducer, productListReducer, productSaveReducer } from './reducers/productReducers';  
import {userSigninReducer, userRegisterReducer, userUpdateReducer} from './reducers/userReducers'; 
import { orderCreateReducer, myOrderListReducer, orderDeleteReducer} from './reducers/orderReducers';
import thunk from 'redux-thunk';
import {cartReducer} from './reducers/cartReducers'; 
import Cookie from 'js-cookie'; 



const cartItems = Cookie.getJSON('cartItems') || [];  
const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = {cart: {cartItems, shipping:{}, payment:{}} ,userSignin: {userInfo}};  
const reducer = combineReducers({ 
    productList : productListReducer, 
    productDetails : productDetailsReducer, 
    cart: cartReducer, 
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer, 
    userUpdate: userUpdateReducer,  
    productSave: productSaveReducer, 
    productDelete: productDeleteReducer, 
    orderCreate: orderCreateReducer, 
    myOrderList: myOrderListReducer, 
    orderDelete: orderDeleteReducer,
    
}) 
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose ;
const store = createStore (reducer , initialState , composeEnhancer(applyMiddleware(thunk))); 

export default store;