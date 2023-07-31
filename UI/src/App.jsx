import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Layout from "./components/Layout";
import CourseList from "./pages/Course/CourseList";
import CourseDetail from "./pages/Course/CourseDetail";
import CreateCourse from "./pages/Course/CreateCourse";
import UpdateCourse from "./pages/Course/UpdateCourse";
import DeleteCourse from "./pages/Course/DeleteCourse";
import ModuleList from "./pages/Module/ModuleList";
import ModuleDetail from "./pages/Module/ModuleDetail";
import CreateModule from "./pages/Module/CreateModule"
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
              <Route path="courses/createcourse" element={<CreateCourse />} />
              <Route path="courses/updatecourse/:id" element={<UpdateCourse />} />
              <Route path="courses/deletecourse/:id" element={<DeleteCourse />} />
              <Route path="modules/:id" element={<ModuleList />} />
              <Route path="modules/:id" element={<ModuleDetail />} />
              <Route path="modules/createmodule/:id" element={<CreateModule />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ExamProvider>
    </>
  );
}

export default App;
