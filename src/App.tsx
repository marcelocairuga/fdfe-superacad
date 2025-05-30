import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./layouts/layout";
import { Home } from "./pages/home/page";
import { Courses } from "./pages/courses/page";
import { Login } from "./pages/login/page";
import { Subjects } from "./pages/subjects/page";
import { NotFound } from "./pages/not-found/page";

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
               <Route index element={<Home />} />
               <Route path="/disciplinas" element={<Subjects />} />
               <Route path="/cursos" element={<Courses />} />
            </Route>
             <Route path="*" element={<NotFound />} />
         </Routes>
      </BrowserRouter>
   );  
}

export default App