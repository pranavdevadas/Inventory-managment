import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import {
  useGetListedProductsQuery,
  useCreateOrderMutation,
} from "../slice/userApiSlice";
import { toast } from "react-toastify";
import { Modal, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";

function ProductTable() {
  const { data: products, error, refetch } = useGetListedProductsQuery();
  const [createOrder] = useCreateOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const [orderModalVisible, setOrderModalVisible] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOrderClick = (product) => {
    setSelectedProduct(product);
    setOrderModalVisible(true);
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOrder({
        productId: selectedProduct._id,
        userId: userInfo._id,
        quantity: orderQuantity,
      }).unwrap();
  
      toast.success(`Order placed for ${orderQuantity} ${selectedProduct.name}(s)`);
      setOrderModalVisible(false);
      setOrderQuantity(1);
      setSelectedProduct(null); 
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  };

  if (error) {
    return <div>Error fetching products: {error.message}</div>;
  }

  return (
    <>
      <Table striped bordered hover className="mt-2">
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Description</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products && products.length > 0 ? (
            products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>Rs.{product.price.toFixed(2)}</td>
                <td>{product.description}</td>
                <td>{product.stock > 0 ? product.stock : "Out of Stock"}</td>
                <td>
                  {product.stock > 0 ? (
                    <Button
                      variant="success"
                      onClick={() => handleOrderClick(product)}
                    >
                      Order Now
                    </Button>
                  ) : (
                    <button className="btn btn-secondary" disabled>
                      Out of Stock
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No products available.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {selectedProduct && (
        <Modal
          show={orderModalVisible}
          onHide={() => setOrderModalVisible(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Order Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Ordering: {selectedProduct.name}</h5>
            <Form onSubmit={handleOrderSubmit}>
              <Form.Group controlId="orderQuantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  value={orderQuantity}
                  onChange={(e) => setOrderQuantity(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="mt-3">
                Place Order
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default ProductTable;
