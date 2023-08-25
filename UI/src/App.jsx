import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import ExamLayout from "./pages/examTaker/examination/ExamLayout";
import UserDashboard from "./pages/examTaker/dashboard/Layout";
import AdminDashboard from "./pages/admin/dashboard/Layout"

import Home from "./pages/Home";
import About from "./pages/About";
import SignUp from "./pages/account/SignUp";
import LogIn from "./pages/account/Login";
import Colors from "./pages/Colors"

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
import UpdateChoice from "./pages/admin/choice/UpdateChoice";
import DeleteChoice from "./pages/admin/choice/DeleteChoice";

import MainPage from "./pages/admin/UserManagement/MainPage"
import AHelp from "./pages/admin/Help"
import AProfile from "./pages/admin/Profile"
import Reports from "./pages/admin/Reports"

import Exam from "./pages/examTaker/examination/Exam";

import Profile from "./pages/examTaker/pages/Profile"
import UserHome from "./pages/examTaker/pages/Home"
import History from "./pages/examTaker/pages/History"
import Help from "./pages/examTaker/pages/Help"
import Notification from "./pages/examTaker/pages/Notification"
import Exams from "./pages/examTaker/pages/Exams"
import ExamDetails from "./pages/examTaker/pages/ExamsDetails"
import ExamDetails2 from "./pages/examTaker/pages/ExamDetails2"

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
              <Route path="colors" element={<Colors />} />
              <Route path="about" element={<About />} />
              <Route path="login" element={<LogIn />} />
              <Route path="signup" element={<SignUp />} />
            </Route>

            <Route path="/examination" element={<ExamLayout />}>
              <Route path=":id" element={<Exam />} />
            </Route>

            <Route path="/userdashboard" element={<UserDashboard />}>
              <Route index element={<UserHome />} />
              <Route path="history" element={<History />} />
              <Route path="exams" element={<Exams />} />
              <Route path="examdetail2/:id" element={<ExamDetails2 />} />
              <Route path="help" element={<Help />} />
              <Route path="notification" element={<Notification />} />
              <Route path="profile" element={<Profile />} />
              <Route path="examdetails/:id" element={<ExamDetails />} />
            </Route>

            <Route path="/admindashboard" element={<AdminDashboard />}>
              <Route index element={<UserHome />} />
              <Route path="courses" element={<CourseList />} />
              <Route path="courses/:id" element={<CourseDetail />} />
              <Route path="courses/createcourse" element={<CreateCourse />} />
              <Route path="courses/updatecourse/:id" element={<UpdateCourse />}/>
              <Route path="courses/deletecourse/:id" element={<DeleteCourse />} />
              <Route path="modules/:id" element={<ModuleList />} />
              <Route path="modules/moduledetail/:id" element={<ModuleDetail />} />
              <Route path="modules/createmodule/:id" element={<CreateModule />} />
              <Route path="modules/deletemodule/:id" element={<DeleteModule />} />
              <Route path="modules/updatemodule/:id" element={<UpdateModule />} />
              <Route path="questions/:id" element={<QuestionList />} />
              <Route path="questions/createquestion/:id" element={<CreateQuestion />} />
              <Route path="questions/updatequestion/:id" element={<UpdateQuestion />} />
              <Route path="questions/deletequestion/:id" element={<DeleteQuestion />} />
              <Route path="questions/updatechoice" element={<UpdateChoice />} />
              <Route path="questions/deletechoice/:id" element={<DeleteChoice />}/>
              <Route path="usermanagement" element={<MainPage />}/>
              <Route path="help" element={<AHelp />}/>
              <Route path="profile" element={<AProfile />}/>
              <Route path="reports" element={<Reports />}/>
            </Route>

          </Routes>
        </BrowserRouter>
      </ExamProvider>
    </>
  );
}

export default App;
