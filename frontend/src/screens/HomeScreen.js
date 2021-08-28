import React ,{useEffect,useState} from 'react'; 
import {Link} from 'react-router-dom'; 
import {useSelector , useDispatch} from 'react-redux'; 
import {listProducts} from '../actions/productActions'


export default function HomeScreen(props) { 

    const productList = useSelector(state => state.productList); 
    const { products, loading, error} = productList; 
    const dispatch = useDispatch(); 
    const [search, setSearch] = useState("");
   
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
  
    useEffect(() => {  
        dispatch(listProducts());
    }, [dispatch])
    return (  loading? <div>Loading...</div> : 
              error? <div>{error}</div> :
        <div>  
          <div className="search-box">
          <input className="box" type="text" placeholder="Search..." 
                    onChange={(e)=>{setSearch(e.target.value)}}/>
          </div>
              <ul className="products">  
             { 
             products.filter((product) => {
            return   product.name.toLowerCase().includes(search.toLowerCase())   
            }).map(product=>
                <li key={product._id}>
                   <div className="product">  
                   { userInfo && !userInfo.isAdmin? 
                   <Link to={'/product/'+ product._id}>
                      <img className="product-image" src={product.image} alt="product" />
                  </Link> :
                     <Link to='/'>
                       <img className="product-image" src={product.image} alt="product" />
                  </Link> 
                    } 
                   </div> 
                   <div className="product-name">  
                   {userInfo && !userInfo.isAdmin? <div><Link to={'/product/'+ product._id}>{product.name}</Link></div>
                    :<div> <Link to='/'>{product.name}</Link> </div> }
                      
                   </div> 
                   <div className="price">{product.price} TND</div> 
                </li>)
             }
             

             </ul> 
        </div>
    )
}
