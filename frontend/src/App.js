import './App.css';  
import React from 'react';
import {BrowserRouter , Route , Link,Switch} from 'react-router-dom'; 
import HomeScreen from './screens/HomeScreen'; 
import ProductScreen from './screens/ProductScreen'; 
import CartScreen from './screens/CartScreen'; 
import SigninScreen from './screens/SigninScreen'; 
import {useSelector} from 'react-redux'; 
import RegisterScreen from './screens/RegisterScreen'; 
import ProductsScreen from './screens/ProductsScreen'; 
import ShippingScreen from './screens/ShippingScreen'; 
import PaymentScreen from './screens/PaymentScreen'; 
import PlaceOrderScreen from './screens/PlaceOrderScreen'; 
import OrdersScreen from './screens/OrdersScreen'; 
import ProfileScreen from './screens/ProfileScreen'; 


function App() {  
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin; 
  

 
  return ( 
    <BrowserRouter>
    <div className="grid-container"> 

        <header className="header"> 
            <div className="brand">  
                <button>&#9776;</button> 
                <Link to='/'>Amazona</Link>
            </div>   
          
            <div className="header-links"> 
                {userInfo ? (
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="/profile">Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/products">Products</Link>
                  </li>
                </ul>
              </div>
            )}
               
            </div>
        </header>  
        
      

        <main className="main"> 
            <div className="content">  
            <Switch>   
            
            <Route path='/product/:id'  component={ProductScreen} />  
            <Route path='/cart/:id?' component={CartScreen} />
            <Route path='/' exact={true} component={HomeScreen} />
            <Route path='/signin'  component={SigninScreen} /> 
            <Route path='/register'  component={RegisterScreen} /> 
            <Route path='/products'  component={ProductsScreen} />  
            <Route path='/shipping'  component={ShippingScreen} /> 
            <Route path='/payment'  component={PaymentScreen} /> 
            <Route path='/placeorder'  component={PlaceOrderScreen} />  
            <Route path='/orders'  component={OrdersScreen} /> 
            <Route path="/profile" component={ProfileScreen} />    
            </Switch>   
            </div> 
         
        </main> 
       
        <footer className="footer">All right reserved</footer>
    </div>  
    </BrowserRouter>
  );
}

export default App;
