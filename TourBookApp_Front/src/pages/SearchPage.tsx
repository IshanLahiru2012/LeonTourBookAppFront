import { useParams } from "react-router-dom";
import { useSearchTransfers } from "../api/TransferApi";
import { Grid, Pagination } from "@mui/material";
import { green, yellow } from "@mui/material/colors";
import SearchResultDetail from "../components/SearchResultDetail";
import SearchResultCard from "../components/SearchResultCard";
import { useState } from "react";
import SearchBar, { SearchFrom } from "../components/SearchBar";
import VehicleFilter from "../components/VehicleFilter";
import SortOption from "../components/SortOption";

export type SearchState = {
    searchQuery: string;
    page: number;
    selectedCategory: string[];
    sortOption: string;
}

const SearchPage = ()=>{
    const {city} = useParams();
    const [searchState, setSearchState] = useState<SearchState>(
        {
            searchQuery:"",
            page: 1,
            selectedCategory: [],
            sortOption: "Best Match"
         }
    );

    const setSortOption = (sortOption: string)=>{
        setSearchState((prevState)=>({
            ...prevState,
            sortOption:sortOption,
            page:1
        }));
    }

    const setSelectedCategory =(selectedCategory: string[])=>{
        setSearchState((prevState)=>({
            ...prevState,
            page: 1,
            selectedCategory
        }));
    };

    const setPage = (event: React.ChangeEvent<unknown>, newPage:number)=>{
        setSearchState((prevState)=>({
            ...prevState,
            page: newPage
        }));
    };
    
    const setSearchQuery = (searchFormData:SearchFrom)=>{
        setSearchState((prevState)=>({
            ...prevState,
            searchQuery: searchFormData.searchQuery,
            page:1
        }));
    };

    const resetSearch =()=>{
        setSearchState((prevState)=>({
            ...prevState,
            searchQuery: "",
            page:1
        }));
    };

    const [isExpand, setIsExpand] = useState<boolean>(false);

    const {searchResult, isLoading} = useSearchTransfers(searchState,city);

    if(isLoading){
        return(
            <span>Loading ...</span>
        );
    };

    if(!searchResult?.data || !city){
        return(
            <Grid container justifyContent={"center"}>
                <span> No Search Results Found </span>
            </Grid>
        );
    };

    return(

       <>
       <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} lg={3}>
                <VehicleFilter 
                    onChange={setSelectedCategory } 
                    selectedCategories={searchState.selectedCategory}
                    isExpand={isExpand} 
                    onExpandHandle={ ()=> setIsExpand((prevExpaned)=> !prevExpaned)}/>
            </Grid>
            <Grid item xs={12} lg={9}>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                    <Grid item xs={12} lg={12}>
                        <SearchBar onSubmit={setSearchQuery}
                                    placeHolder="Search by vehicle category or Transfer name"
                                    onReset={resetSearch}
                                    searchQuery={searchState.searchQuery}/>

                    </Grid>
                    <Grid item xs={12} lg={8}>                                    
                        <SearchResultDetail total={searchResult.pagination.total} city={city}/>
                    </Grid>
                    <Grid item xs={12} lg={4} container justifyContent={"right"}>
                        <SortOption 
                                onChange={(value)=> setSortOption(value) } 
                                sortOption={searchState.sortOption} />
                    </Grid>
                    <Grid item xs={12} lg={12}>
                        {searchResult.data.map((transfer)=>(
                                <SearchResultCard transfer={transfer} key={transfer._id}/>
                        ))}  
                    </Grid>
                    <Grid item container justifyContent={"center"}>
                        <Pagination count={searchResult.pagination.pages} 
                                    page={searchResult.pagination.page} 
                                    onChange={setPage} />
                    </Grid>
                </Grid>
            </Grid>
            
       </Grid>

       </>
    )
}

export default SearchPage;