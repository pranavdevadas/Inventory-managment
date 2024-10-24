import React from 'react'
import Sidebar from "../../components/adminComponents/Sidebar";
import OrderTable from '../../components/adminComponents/OrderTable';


function AdminOrderScreen() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        <h1 className="text-center">Orders</h1>
        <OrderTable/>
      </div>
    </div>
  )
}

export default AdminOrderScreen