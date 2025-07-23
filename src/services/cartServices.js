import apiClient from "../utils/api-client";


export function addToCartAPI( id , quantity ) {
    return apiClient.post(`/cart/${ id }`, { quantity })
}

export function getCartAPI(){
    return apiClient.get('/cart')
}


export function increaseProductAPI( id, quantity ){
    return apiClient.patch(`/cart/increase/${ id }`, { quantity })
 }

 export function decreaseProductAPI( id, quantity ){
    return apiClient.patch(`/cart/decrease/${ id }`,  { quantity })
 }


export function removeFromCartAPI(id){
    return apiClient.patch(`/cart/remove/${ id }`)
}