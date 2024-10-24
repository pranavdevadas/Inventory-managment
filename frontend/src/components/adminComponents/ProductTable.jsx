import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import {
  useGetProductsQuery,
  useListUnlistMutation,
  useEditProductMutation,
} from "../../slice/adminApiSlice";
import { toast } from "react-toastify";
import { Modal, Button, Form } from "react-bootstrap";

function ProductTable() {
  const { data: products, error, refetch } = useGetProductsQuery();
  const [listUnlist] = useListUnlistMutation();
  const [editProduct] = useEditProductMutation();

  const [showModal, setShowModal] = useState(false);
  const [editProductData, setEditProductData] = useState(null);

  const handleListUnlist = async (productId, isListed) => {
    try {
      await listUnlist({ id: productId, isListed: !isListed }).unwrap();
      refetch();
      toast.success("Product Status Updated");
    } catch (error) {
      console.error("Failed to list/unlist product", error);
    }
  };

  const handleEditClick = (product) => {
    setEditProductData(product);
    setShowModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await editProduct({
        id: editProductData._id,
        ...editProductData,
      }).unwrap();
      setShowModal(false);
      toast.success("Product updated successfully!");
      refetch();
    } catch (error) {
      console.error("Failed to edit product", error);
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
                <td>{product.stock}</td>
                <td>
                  <button
                    className={`btn ${
                      product.isListed ? "btn-danger" : "btn-primary"
                    }`}
                    onClick={() =>
                      handleListUnlist(product._id, product.isListed)
                    }
                  >
                    {product.isListed ? "Unlist" : "List"}
                  </button>
                  <button
                    className="btn btn-success ms-2"
                    onClick={() => handleEditClick(product)}
                  >
                    Edit
                  </button>
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

      {/* Edit Product Modal */}
      {editProductData && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleEditSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editProductData.name}
                  onChange={(e) =>
                    setEditProductData({
                      ...editProductData,
                      name: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  value={editProductData.brand}
                  onChange={(e) =>
                    setEditProductData({
                      ...editProductData,
                      brand: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={editProductData.price}
                  onChange={(e) =>
                    setEditProductData({
                      ...editProductData,
                      price: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editProductData.description}
                  onChange={(e) =>
                    setEditProductData({
                      ...editProductData,
                      description: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="stock">
                <Form.Label>Stock Quantity</Form.Label>
                <Form.Control
                  type="number"
                  value={editProductData.stock}
                  onChange={(e) =>
                    setEditProductData({
                      ...editProductData,
                      stock: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="mt-3">
                Save Changes
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default ProductTable;
