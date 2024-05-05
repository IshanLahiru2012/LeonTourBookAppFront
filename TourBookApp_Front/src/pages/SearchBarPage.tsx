import { useParams } from "react-router-dom";

const SearchBarPage = ()=>{
    const {city} = useParams();

    return(
        <span>
            User search for {city}
        </span>
    )
}

export default SearchBarPage;