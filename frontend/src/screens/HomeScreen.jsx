import React from 'react'
import { Container } from 'react-bootstrap'
import ProductTable from '../components/ProductTable'

function HomeScreen() {
  return (
    <Container>
        <h1 className='text-center'>Home Screen</h1>
        <ProductTable/>
    </Container>
  )
}

export default HomeScreen