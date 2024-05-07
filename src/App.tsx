import { BrowserRouter, Route, Routes } from "react-router-dom"
import ProjectPage from "./pages/project"
import DashbordPage from "./pages/dashboard"
import NotFoundPage from "./pages/404"
import ProjectsPage from "./pages/projects"
import CssBaseline from "@mui/material/CssBaseline"


const App = () => {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DashbordPage />} />
          <Route path='*' element={<DashbordPage />} />
          <Route path='/projects' element={<ProjectsPage />} />
          <Route path='/project/:id' element={<ProjectPage />} />
          <Route path='/notfound' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
