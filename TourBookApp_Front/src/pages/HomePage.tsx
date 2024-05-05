import { useNavigate } from 'react-router-dom';
import carType from '../assets/carType.png'
import SearchBar, { SearchFrom } from '../components/SearchBar';
const HomePage = ()=>{

    const navigate = useNavigate();

    const handleSearchSubmit = (searchFormValues:SearchFrom)=>{
        navigate({
            pathname: `/search/${searchFormValues.searchQuery}`
        })
    }

    return(
        <>
        <div className="flex flex-col gap-12 px-3">
            <div className="flex flex-col gap-4 bg-white rounded-lg shadow-md py-8 -mt-16 text-center ">
                <h1 className="text-3xl font-bold tracking-tighter text-emerald-500">
                    Find Your Tour Transfer
                </h1>
                <span className="text-lg">Vehicle is just a click away !</span>
                <SearchBar onSubmit={handleSearchSubmit} placeHolder="Search by City or Town"/>
            </div>
            <div className='grid md:grid-cols-2 gap-4 px-2'>
                <img src={carType}></img>
                <div className='flex flex-col items-center justify-center text-center'>
                    <span className='font-bold text-3xl tracking-tighter'>
                        just a tap - book your perfect ride 
                    </span>
                    <span>
                        Unlock your journey with ease - reserve your ride in seconds with our intuitive tour booking app!
                    </span>
                </div>
            </div>

        </div>

        </>
    )

}

export default HomePage;