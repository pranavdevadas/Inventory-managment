import React from 'react';
import Sidebar from "../../components/adminComponents/Sidebar";
import AddProduct from '../../components/adminComponents/AddProduct';


function AdminProductScreen() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        <AddProduct/>
        
      </div>
    </div>
  );
}

export default AdminProductScreen;
