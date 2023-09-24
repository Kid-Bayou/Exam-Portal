function Home() {

    const person = JSON.parse(localStorage.getItem("User"));

    return (
      <>
        <div>
          <h1>Welcome, {person.firstName} {person.lastName}</h1>
          <p>We're thrilled to have you here on our Exam Portal.</p>
          <p>
            Explore your personalized dashboard, where you can access your exams,
            track your progress, and much more.
          </p>
          <p>
            Get ready to embark on your learning journey and excel in your exams!
          </p>
        </div>
      </>
    );
  }
  
  export default Home