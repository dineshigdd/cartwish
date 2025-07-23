import React, { useEffect, useState } from 'react'
import './MyOrderPage.css'
import Table from '../Common/Table'
import useData from '../../hooks/useData'

const MyOrderPage = () => {
  // const [ order , setOrder ] = useState();

  const { data: orders, error , isLoading } = useData("/order")

  const getProductStringArr = order => {
    const productStringArr = order.products.map( p => `${ p.product.title } (${ p.quantity })`)

    return productStringArr.join(", ")
  }
  
  // useEffect(()=>{
  //    currentOrderAPI()
  //     .then(    
  //         // console.log( res.data[0].products )
  //       //  res =>  res.data[0].products.map( item=> setOrder( item )) 
  //       // res =>  setOrder( res.data[0].products)
  //          res =>  setOrder( res.data)
  //     )
  //     .catch(  err =>  console.log(err))
  // },[])
  

  return (
    <section className="align_center myorder_page">
 
          { orders && <Table headings={["Order", "Products", "Total","Status"]}> 
            <tbody>
                { orders.map( (order  , index )=>(               
                    <tr key={ order._id }>
                         <td>{ index + 1 }</td>
                         <td>{ getProductStringArr( order ) }</td>
                        <td>${ order.total }</td>
                        <td>{ order.status }</td>
                        
                    </tr>                
                ))} 
  
            </tbody>
        </Table>
      }
       
    </section>
  )
}

export default MyOrderPage