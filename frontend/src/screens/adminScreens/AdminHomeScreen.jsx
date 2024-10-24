import React from "react";
import Sidebar from "../../components/adminComponents/Sidebar";
import ProductTable from '../../components/adminComponents/ProductTable';


function AdminHomeScreen() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        <h1 className="text-center">Products</h1>
      <ProductTable/>
      </div>
    </div>
  );
}

export default AdminHomeScreen;
