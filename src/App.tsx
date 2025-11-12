
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner"
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCourse from "./pages/admin/AdminCourse";
import AdminAddCourse from "./pages/admin/AdminAddCourse";
import AdminEditCourse from "./pages/admin/AdminEditCourse";
import AdminEditGovExam from "./pages/admin/AdminEditGovExam";
import AdminAddGovExam from "./pages/admin/AdminAddGovExam";
import AdminGovExam from "./pages/admin/AdminGovExam";
import AdminAcademics from "./pages/admin/AdminAcademics";
import AdminAddAcademics from "./pages/admin/AdminAddAcademics";
import AdminEditAcademics from "./pages/admin/AdminEditAcademics";
import AdminMcq from "./pages/admin/AdminMcq";
import AdminAddMcq from "./pages/admin/AdminAddMcq";
import AdminEditMcq from "./pages/admin/AdminEditMcq";
import AdminBook from "./pages/admin/AdminBook";
import AdminAddBook from "./pages/admin/AdminAddBook";
import AdminEditBook from "./pages/admin/AdminEditBook";
import AdminMockTest from "./pages/admin/AdminMockTest";
import AdminAddMockTest from "./pages/admin/AdminAddMockTest";
import AdminEditMockTest from "./pages/admin/AdminEditMockTest";
import AdminCreateClass from "./pages/admin/AdminCreateClass";
import CourseBuilderPage from "./pages/admin/CourseBuilderPage";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import AdminLogin from "./pages/admin/Login";
import NotFound from "./pages/admin/NotFound";
import AdminCreateCourseSubject from "./pages/admin/AdminCreateCourseSubject";
import AdminAddStudy from "./pages/admin/AdminAddStudyMaterial";
 

function App() {

  return (
     <TooltipProvider> 
      <BrowserRouter>
      <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<AdminLogin/>}/>
          <Route path="/dashboard" element={<AdminDashboard/>}/>
          <Route path="/course" element={<AdminCourse/>}/>
          <Route path="/course-add" element={<AdminAddCourse/>}/>
          <Route path="/course/:id" element={<AdminEditCourse/>}/>
          <Route path="/course-subject" element={<AdminCreateCourseSubject/>}/>
          <Route path="/gov-exam" element={<AdminGovExam/>}/>
          <Route path="/gov-exam-add" element={<AdminAddGovExam/>}/>
          <Route path="/gov-exam/:id" element={<AdminEditGovExam/>}/>
          <Route path="/create-subject" element={<AdminCreateClass/>}/>
          <Route path="/academics" element={<AdminAcademics/>}/>
          <Route path="/academics-add" element={<AdminAddAcademics/>}/>
          <Route path="/academics/:id" element={<AdminEditAcademics/>}/>
          <Route path="/academics/class" element={<CourseBuilderPage/>}/>
          <Route path="/mcq" element={<AdminMcq/>}/>
          <Route path="/mcq-add" element={<AdminAddMcq/>}/>
          <Route path="/mcq/:id" element={<AdminEditMcq/>}/>
          <Route path="/book" element={<AdminBook/>}/>
          <Route path="/book-add" element={<AdminAddBook/>}/>
          <Route path="/book/:id" element={<AdminEditBook/>}/>
          <Route path="/mock" element={<AdminMockTest/>}/>
          <Route path="/mock-add/:id" element={<AdminAddMockTest/>}/>
          <Route path="/study-material-add/:id" element={<AdminAddStudy/>} />
          <Route path="/mock/:id" element={<AdminEditMockTest/>}/>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
}


export default App;
