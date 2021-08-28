import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listMyOrders, deleteOrder } from '../actions/orderActions';

function OrdersScreen(props) {
  const myOrderList = useSelector(state => state.myOrderList);
  const { loading, orders} = myOrderList;

  const orderDelete = useSelector(state => state.orderDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;
 console.log(loadingDelete, errorDelete);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listMyOrders());
    return () => {
      //
    };
  }, [successDelete,  dispatch]);

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  }
  return loading ? <div>Loading...</div> :
    <div className="content content-margined">

      <div className="order-header">
        <h3>Orders</h3>
      </div>
      <div className="order-list">

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>TOTAL</th>
              <th>USER</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (<tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user.name}</td>
              <td>
                <Link to={"/orders/" + order._id} className="button secondary" >Details</Link>
                {' '}
                <button type="button" onClick={() => deleteHandler(order)} className="button secondary">Delete</button>
              </td>
            </tr>))}
          </tbody>
        </table>

      </div>
    </div>
}
export default OrdersScreen;