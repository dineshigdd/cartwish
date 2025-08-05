import { useInfiniteQuery } from "@tanstack/react-query"
import apiClient from "../utils/api-client"

const useProductList = ( query ) => {
    const fetchFuntion = ({ pageParam = 1 }) => {
        apiClient
            .get("/products" , { ...query, page: pageParam })
            .then( res => res.data );

    return useInfiniteQuery({
        queryKey: ["products", query ],
        queryFn: fetchFuntion,
        getNextPageParam: ( lastPage, allPages ) => {
            return lastPage.length > 0 ? allPages.length + 1 : null;
        }
    })}
}

export default useProductList;