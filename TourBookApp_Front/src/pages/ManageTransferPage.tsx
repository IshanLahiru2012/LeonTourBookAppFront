import { useCreateTransfer } from "../api/TransferApi";
import ManageTransfeForm from "../forms/manageTransfer/ManageTransferForm"

const ManageTransferPage = ()=>{
    const {crateTransfer, isLoading} = useCreateTransfer();
    return(
        <>
            <ManageTransfeForm onSave={crateTransfer} isLoading={isLoading}/>
        </>
    )
}
export default ManageTransferPage;