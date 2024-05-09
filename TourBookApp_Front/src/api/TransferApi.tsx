import { useQuery } from "react-query";
import { TransferSearchResponse } from "../type";
import { SearchState } from "../pages/SearchPage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchTransfers = (searchState:SearchState, city?: string) =>{

    const createSearchRequest = async ():Promise<TransferSearchResponse>=>{

        const params = new URLSearchParams();
        params.set("searchQuery", searchState.searchQuery);
        params.set("page",searchState.page.toString());
        params.set("selectedCategory",searchState.selectedCategory.join(","));
        params.set("sortOption", searchState.sortOption);       

        const resp = await fetch(
            `${API_BASE_URL}/api/v1/transfer/public/search/${city}?${params.toString()}`
        );

        if(!resp){
            throw new Error("Failed to get transfer");
        }

        return resp.json();
    };

    const {data: searchResult, isLoading} = useQuery( ["searchTransfers", searchState],
                                                      createSearchRequest, {enabled: !!city });

    return{
        searchResult,
        isLoading
    }
}