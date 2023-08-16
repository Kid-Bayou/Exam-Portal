import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ExamLayout from "./components/ExamLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import SignUp from "./pages/account/SignUp";
import LogIn from "./pages/account/Login";
import CourseList from "./pages/admin/course/CourseList";
import CourseDetail from "./pages/admin/course/CourseDetail";
import CreateCourse from "./pages/admin/course/CreateCourse";
import UpdateCourse from "./pages/admin/course/UpdateCourse";
import DeleteCourse from "./pages/admin/course/DeleteCourse";
import ModuleList from "./pages/admin/module/ModuleList";
import ModuleDetail from "./pages/admin/module/ModuleDetail";
import DeleteModule from "./pages/admin/module/DeleteModule";
import CreateModule from "./pages/admin/module/CreateModule";
import UpdateModule from "./pages/admin/module/UpdateModule";
import QuestionList from "./pages/admin/question/QuestionList";
import CreateQuestion from "./pages/admin/question/CreateQuestion";
import UpdateQuestion from "./pages/admin/question/UpdateQuestion";
import DeleteQuestion from "./pages/admin/question/DeleteQuestion";
import CreateChoice from "./pages/admin/choice/CreateChoice";
import UpdateChoice from "./pages/admin/choice/UpdateChoice";
import DeleteChoice from "./pages/admin/choice/DeleteChoice";
import Exam from "./pages/examTaker/examination/Exam";
import { ExamProvider } from "./context/ExamContext";
import UserDashboard from "./pages/examTaker/Dashboard/Layout";
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

            <Route path="/userdashboard" element={<UserDashboard />}>
              <Route index element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ExamProvider>
    </>
  );
}

export default App;
