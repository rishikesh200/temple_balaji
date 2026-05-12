import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import Home from "./pages/home/Home"
import DarshanPage from "./pages/darshan/DarshanPage"
import DonatePage from "./pages/donate/DonatePage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/darshan" element={<DarshanPage />} />
        <Route path="/donate" element={<DonatePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
