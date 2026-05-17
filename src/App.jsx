import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import Layout from "./components/Layout"
import Home from "./pages/home/Home"
import DarshanPage from "./pages/darshan/DarshanPage"
import DonatePage from "./pages/donate/DonatePage"
import Poojapage from "./pages/pooja/Poojapage"
import PoojaDetailPage from "./pages/pooja/PoojaDetailPage"
import GalleryPage from "./pages/gallery/GalleryPage"
import EventsPage from "./pages/events/EventsPage"
import ContactPage from "./pages/contact/ContactPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/darshan" element={<DarshanPage />} />
          <Route path="/pooja" element={<Poojapage />} />
          <Route path="/pooja/:poojaName" element={<PoojaDetailPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
