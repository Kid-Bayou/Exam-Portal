import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Layout from "./components/Layout";
import CourseList from "./pages/Course/CourseList";
import CourseDetail from "./pages/Course/CourseDetail";
import CreateCourse from "./pages/Course/CreateCourse";
import ModuleList from "./pages/Module/ModuleList";
import ModuleDetail from "./pages/Module/ModuleDetail";
import UpdateCourse from "./pages/Course/UpdateCourse";
import DeleteCourse from "./pages/Course/DeleteCourse";
import { ExamProvider } from "./Context/ExamContext";
import "./App.css";

function App() {
  return (
    <>
      <ExamProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="courses" element={<CourseList />} />
              <Route path="courses/:id" element={<CourseDetail />} />
              <Route path="modules" element={<ModuleList />} />
              <Route path="modules/:id" element={<ModuleDetail />} />
              <Route path="courses/createcourse" element={<CreateCourse />} />
              <Route path="courses/updatecourse" element={<UpdateCourse />} />
              <Route path="courses/deletecourse" element={<DeleteCourse />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ExamProvider>
    </>
  );
}

export default App;
