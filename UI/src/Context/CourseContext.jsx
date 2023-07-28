import {createContext, useState} from "react";

const CourseContext = createContext();

const CourseProvider = ({children}) => {

    const [course, setCourse] = useState(null);

    return (
        <>
            <CourseContext.Provider value={{course, setCourse}}>
                {children}
            </CourseContext.Provider>
        </>
    )
}

export default CourseContext;