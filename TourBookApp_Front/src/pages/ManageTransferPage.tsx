import ManageTransfeForm from "../forms/manageTransfer/ManageTransferForm"

const ManageTransferPage = ()=>{
    return(
        <>
        <ManageTransfeForm onSave={function (transferFromData: FormData): void {
                throw new Error("Function not implemented.");
            } } isLoading={false}/>
        </>
    )
}
export default ManageTransferPage;