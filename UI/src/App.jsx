import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ExamLayout from "./components/ExamLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import SignUp from "./pages/account/SignUp";
import LogIn from "./pages/account/Login";
import CourseList from "./pages/course/CourseList";
import CourseDetail from "./pages/course/CourseDetail";
import CreateCourse from "./pages/course/CreateCourse";
import UpdateCourse from "./pages/course/UpdateCourse";
import DeleteCourse from "./pages/course/DeleteCourse";
import ModuleList from "./pages/module/ModuleList";
import ModuleDetail from "./pages/module/ModuleDetail";
import DeleteModule from "./pages/module/DeleteModule";
import CreateModule from "./pages/module/CreateModule";
import UpdateModule from "./pages/module/UpdateModule";
import QuestionList from "./pages/question/QuestionList";
import CreateQuestion from "./pages/question/CreateQuestion";
import UpdateQuestion from "./pages/question/UpdateQuestion";
import DeleteQuestion from "./pages/question/DeleteQuestion";
import CreateChoice from "./pages/choice/CreateChoice";
import UpdateChoice from "./pages/choice/UpdateChoice";
import DeleteChoice from "./pages/choice/DeleteChoice";
import Exam from "./pages/examination/Exam";
import { ExamProvider } from "./context/ExamContext";
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
              <Route path="login" element={<LogIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="courses" element={<CourseList />} />
              <Route path="courses/:id" element={<CourseDetail />} />
              <Route path="courses/createcourse" element={<CreateCourse />} />
              <Route
                path="courses/updatecourse/:id"
                element={<UpdateCourse />}
              />
              <Route
                path="courses/deletecourse/:id"
                element={<DeleteCourse />}
              />
              <Route path="modules/:id" element={<ModuleList />} />
              <Route
                path="modules/moduledetail/:id"
                element={<ModuleDetail />}
              />
              <Route
                path="modules/createmodule/:id"
                element={<CreateModule />}
              />
              <Route
                path="modules/deletemodule/:id"
                element={<DeleteModule />}
              />
              <Route
                path="modules/updatemodule/:id"
                element={<UpdateModule />}
              />
              <Route path="questions/:id" element={<QuestionList />} />
              <Route
                path="questions/createquestion/:id"
                element={<CreateQuestion />}
              />
              <Route
                path="questions/updatequestion/:id"
                element={<UpdateQuestion />}
              />
              <Route
                path="questions/deletequestion/:id"
                element={<DeleteQuestion />}
              />
              <Route path="questions/updatechoice" element={<UpdateChoice />} />
              <Route
                path="questions/deletechoice/:id"
                element={<DeleteChoice />}
              />
            </Route>

            <Route path="/examination" element={<ExamLayout />}>
              <Route index element={<Exam />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ExamProvider>
    </>
  );
}

export default App;
