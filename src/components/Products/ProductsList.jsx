import React, { useEffect } from 'react'
import './ProductsList.css'
import ProductCard from './ProductCard'
import useData from '../../hooks/useData'
import ProductCardSkeleton from './ProductCardSkeleton'
import { useSearchParams } from 'react-router-dom'
import { object } from 'zod/v4-mini'
import Pagination from '../Common/Pagination'

const ProductsList = () => {

  const [ search, setSearch ] = useSearchParams();
  const category = search.get("category")
  const page = search.get("page")

  const { data , error , isLoading } =  useData('/products' , {
      params :{
      category,
      perPage:10,//tells how many products would appear in a page
      page,
    },
  },[ category, page ]);
   console.log( data )
  const skeletons = [1,2,3,4,5,6,7,8];

  {/* for pagination */}
  // const handlePageChange = ( page ) => {
  //   const currentParams = Object.fromEntries([ ...search ])
  //   setSearch({ ...currentParams, page })
  // }

  const handlePageChange = ( page ) => {
      const currentParams = Object.fromEntries([ ...search ])
      setSearch({ ...currentParams, page : parseInt( currentParams.page ) + 1 })
    }

  useEffect(()=>{
    const handleScroll = () =>{
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    
      if ( scrollTop + clientHeight >= scrollHeight - 1 ){
        console.log( "Reached to bottom");
        handlePageChange();
      }
    }

    window.addEventListener( "scroll", handleScroll   )
  },[])

  return (
    <section className="products_list_section">
        <header className="align_center products_list_header">
            <h2>Products</h2>
            <select name="sort" id="" className="products_sorting">
                <option value="">Relevance</option>
                <option value="price desc">Price HIGH to LOW</option>
                <option value="price asc">Price LOW to HIGH</option>
                <option value="rate desc">Price HIGH to LOW</option>
                <option value="rate asc">Price LOW to HIGH</option>
            </select>
        </header>

        <div className="products_list">
            { error && <em className='form_error'>{ error }</em>}
            { isLoading 
              ? (skeletons.map( n => <ProductCardSkeleton key={ n } />))
              :  ( data?.products  && data.products.map( product =>
                  <ProductCard 
                      key={ product._id }
                      id= { product._id}
                      image = { product.images[0]}
                      price = { product.price }
                      title={ product.title }
                      rating={ product.reviews.rate }
                      ratingCounts={ product.reviews.count }
                      stock={ product.stock }

                  />
               ))}            
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