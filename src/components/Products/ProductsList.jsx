import React, { useEffect, useState } from 'react'
import './ProductsList.css'
import ProductCard from './ProductCard'
import useData from '../../hooks/useData'
import ProductCardSkeleton from './ProductCardSkeleton'
import { NavLink, useSearchParams } from 'react-router-dom'
import { object } from 'zod/v4-mini'
import Pagination from '../Common/Pagination'
import SingleProduct from '../SingleProduct/SingleProductPage'
import useProductList from '../../hooks/useProductList'

const ProductsList = () => {
  
  const [ search, setSearch ] = useSearchParams();
  const category = search.get("category");
  const searchQuery = search.get("search");
  const [ sortBy , setSortBy ] = useState("");
  const [ sortedProducts, setSortedProducts ] = useState([])

  const { data , error , isLoading, fetchNextPage } =  useProductList({
    search: searchQuery,
    category,
    perPage:10,
  });
   

   
  const skeletons = [1,2,3,4,5,6,7,8];

  {/* for pagination */}
  // const handlePageChange = ( page ) => {
  //   const currentParams = Object.fromEntries([ ...search ])
  //   setSearch({ ...currentParams, page })
  // }


  

  useEffect(()=>{
    const handleScroll = () =>{
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    
      if ( scrollTop + clientHeight >= scrollHeight - 1 && 
          !isLoading && data && page < data.totalPages ){
        console.log( "Reached to bottom");
        fetchNextPage()
      }
    }

    window.addEventListener( "scroll", handleScroll );

    return ()=> window.removeEventListener( "scroll", handleScroll )
  },[ data , isLoading ])


  useEffect(()=>{
    if( data && data.products ){
      const products = [ ... data.products ]

      if( sortBy === "price desc"){
        setSortedProducts( products.sort(( a, b ) => b.price - a.price ))
      }
      else if( sortBy === "price asc"){
        setSortedProducts( products.sort(( a, b ) => a.price - b.price ))
      }
      else if( sortBy === "rate desc"){
         setSortedProducts( products.sort(( a, b ) => b.reviews.rate - a.reviews.rate ))
      }
      else if( sortBy === "rate asc"){
         setSortedProducts( products.sort(( a, b ) => a.reviews.rate - b.reviews.rate ))
      }else{
        setSortedProducts( products )
      }
    }
  }, [ sortBy , data ])

  return (
    <section className="products_list_section">
        <header className="align_center products_list_header">
            <h2>Products</h2>
            <select name="sort" id="" className="products_sorting" onChange={ e => setSortBy( e.target.value )}>
                <option value="">Relevance</option>
                <option value="price desc">Price HIGH to LOW</option>
                <option value="price asc">Price LOW to HIGH</option>
                <option value="rate desc">Price HIGH to LOW</option>
                <option value="rate asc">Price LOW to HIGH</option>
            </select>
        </header>

        <div className="products_list">
            { error && <em className='form_error'>{ error }</em>}
            { data?.products && 
               ( sortedProducts.map((product) => 
                  (
                        <ProductCard 
                          key={ product._id }
                          product= { product }
                          // id= { product._id}
                          // image = { product.images[0]}
                          // price = { product.price }
                          // title={ product.title }
                          // rating={ product.reviews.rate }
                          // ratingCounts={ product.reviews.count }
                          // stock={ product.stock }
                      
                  />
                 
               )))}            
        </div>
        {/* for pagination */}
        {/* { 
        data && (<Pagination 
                  totalPosts={ data.totalProducts} 
                  postsPerPage={ 8 } 
                  onClick={ handlePageChange}
                  currentPage={ page }/>)
        } */}
    </section>
  )
}

export default ProductsList