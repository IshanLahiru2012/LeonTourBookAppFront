import { useGetUser, useUpdateUser } from "../api/UserApi";
import UserProfileForm from "../forms/UserProfileForm"

const UserProfilePage = () => {
    const {currentUser, isLoading: isGetLoading} = useGetUser();
    const {updateUser, isLoading: isUpdateLoading} = useUpdateUser();

    if(isGetLoading){
        return(
            <>
                <span>Loading...</span>
            </>
        )
    }
    if(!currentUser){
        return(
            <>
                <span>Unable to Load User Pofile</span>
            </>
        )
    }
    return (
        <>
            <UserProfileForm currentUser={currentUser} onSave={updateUser} isLoading={isUpdateLoading}/>
        </>
    )
}

export default UserProfilePage;