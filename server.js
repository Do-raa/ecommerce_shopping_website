const express = require('express') ; 
const connectDB = require ('./config/connectDB')
const userRoute = require('./routes/userRoute') ;  
const productsRoute = require('./routes/productsRoute');  
const orderRoute = require('./routes/orderRoute'); 
const path = require('path')

const app = express();  
app.use(express.json())
connectDB();  


app.use("/api/users" , userRoute) 
app.use("/api/products" , productsRoute) 
app.use("/api/orders" , orderRoute)   

// heroku production 

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
    });
  }
  
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{console.log(`server is running on http://localhost:5000`)})