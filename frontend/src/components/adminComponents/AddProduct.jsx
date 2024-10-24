import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../FormContainer";
import { useAddProductMutation } from "../../slice/adminApiSlice";
import { toast } from "react-toastify";

function AddProduct() {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");

  const [addProduct, { isLoading }] = useAddProductMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const productData = { name, brand, price, description, stock };
      await addProduct(productData).unwrap();
      toast.success("Product added successfully!");
      setName("");
      setBrand("");
      setPrice("");
      setDescription("");
      setStock("");
    } catch (error) {
      console.error("Failed to add product: ", error);
      toast.error("Failed to add product.");
    }
  };

  return (
    <FormContainer>
      <h1>Add Product</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="brand">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="stock">
          <Form.Label>Stock Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Stock Quantity"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-3"
          disabled={isLoading}
        >
            Add Product
        </Button>
      </Form>
    </FormContainer>
  );
}

export default AddProduct;
