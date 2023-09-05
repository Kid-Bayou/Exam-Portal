function Profile() {
    
const person = JSON.parse(localStorage.getItem("User"));
console.log(person.id)
    return (
        <>
            <p>This is your profile page.</p>
            {person.id}
        </>
    )
}

export default Profile