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
import { AdminProvider } from "./admin/contexts/AdminContext"
import { ProtectedAdminRoute } from "./admin/ProtectedAdminRoute"
import AdminLogin from "./admin/pages/AdminLogin"
import AdminDashboard from "./admin/pages/AdminDashboard"
import PaymentsPage from "./admin/pages/PaymentsPage"
import DonationsPage from "./admin/pages/DonationsPage"
import PoojaBookingsPage from "./admin/pages/PoojaBookingsPage"
import DarshanBookingsPage from "./admin/pages/DarshanBookingsPage"

function App() {
  return (
    <AdminProvider>
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

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/payments"
            element={
              <ProtectedAdminRoute>
                <PaymentsPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/donations"
            element={
              <ProtectedAdminRoute>
                <DonationsPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/pooja-bookings"
            element={
              <ProtectedAdminRoute>
                <PoojaBookingsPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/darshan-bookings"
            element={
              <ProtectedAdminRoute>
                <DarshanBookingsPage />
              </ProtectedAdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  )
}

export default App
