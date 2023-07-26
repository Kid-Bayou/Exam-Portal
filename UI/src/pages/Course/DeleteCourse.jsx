
function DeleteCourse() {
    return (
        <>
            <div className="delete-button" onClick={() => 
                { if (window.confirm
                ('Are you sure you wish to delete this item?')) 
                this.onCancel(item) } } />
        </>
    )
}

export default DeleteCourse