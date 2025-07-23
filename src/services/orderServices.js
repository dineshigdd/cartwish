import apiClient from "../utils/api-client";

export function checkoutAPI(){
    return apiClient.post("/order/checkout")
}

// export function currentOrderAPI(){
//     return apiClient.get("/order/")
// }