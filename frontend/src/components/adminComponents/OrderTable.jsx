import React from 'react';
import Table from "react-bootstrap/Table";
import { useGetOrdersQuery } from "../../slice/adminApiSlice";

function OrderTable() {
  const { data: orders, error, refetch } = useGetOrdersQuery();

  if (error) {
    return <div>Error fetching orders: {error.message}</div>;
  }

  return (
    <Table striped bordered hover className="mt-2">
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>User</th>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total Amount</th>
        </tr>
      </thead>
      <tbody>
        {orders && orders.length > 0 ? (
          orders.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td> {/* Format the date */}
              <td>{order.user?.name}</td> {/* Access the populated user name */}
              <td>{order.product?.name}</td> {/* Access the populated product name */}
              <td>{order.quantity}</td>
              <td>Rs.{order.price.toFixed(2)}</td>
              <td>Rs.{order.totalamount.toFixed(2)}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="text-center">
              No orders available.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default OrderTable;
