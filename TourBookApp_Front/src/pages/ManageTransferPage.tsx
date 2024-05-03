import { useCreateTransfer, useGetTransfer, useUpdateTransfer } from "../api/TransferApi";
import ManageTransfeForm from "../forms/manageTransfer/ManageTransferForm"

const ManageTransferPage = ()=>{
    const {crateTransfer, isLoading: isCreateLoading} = useCreateTransfer();
    const {transfer} = useGetTransfer();
    const {updateTransfer, isLoading: isUploadLoading} = useUpdateTransfer();

    const isEditing = !!transfer;

    return(
        <>
            <ManageTransfeForm 
                transfer={transfer} 
                onSave={isEditing ? updateTransfer: crateTransfer} 
                isLoading={isCreateLoading|| isUploadLoading}/>
        </>
    )
}
export default ManageTransferPage;