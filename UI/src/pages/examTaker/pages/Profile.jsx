function Profile() {
    
  const person = JSON.parse(localStorage.getItem("User"));
  console.log(person)
      return (
          <>
              <h1>Profile page.</h1>
              <p>Name: {person.firstName} {person.lastName}</p>
              <p>Email: {person.email}</p>
          </>
      )
  }
  
  export default Profile