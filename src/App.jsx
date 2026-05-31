import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import "./App.css"
import Layout from "./components/Layout"
import ErrorBoundary from "./components/ErrorBoundary"
import Home from "./pages/home/Home"
import DarshanPage from "./pages/darshan/DarshanPage"
import DonatePage from "./pages/donate/DonatePage"
import Poojapage from "./pages/pooja/Poojapage"
import PoojaDetailPage from "./pages/pooja/PoojaDetailPage"
import GalleryPage from "./pages/gallery/GalleryPage"
import EventsPage from "./pages/events/EventsPage"
import ContactPage from "./pages/contact/ContactPage"
import PrivacyPolicyPage from "./pages/legal/PrivacyPolicyPage"
import TermsPage from "./pages/legal/TermsPage"
import RefundPolicyPage from "./pages/legal/RefundPolicyPage"
import { AdminProvider } from "./admin/contexts/AdminContext"
import { AdminDataProvider } from "./admin/contexts/AdminDataContext"
import { useAdminData } from "./admin/contexts/AdminDataContext"
import { ProtectedAdminRoute } from "./admin/ProtectedAdminRoute"
import AdminLogin from "./admin/pages/AdminLogin"
import AdminDashboard from "./admin/pages/AdminDashboard"
import PaymentsPage from "./admin/pages/PaymentsPage"
import DonationsPage from "./admin/pages/DonationsPage"
import PoojaBookingsPage from "./admin/pages/PoojaBookingsPage"
import DarshanBookingsPage from "./admin/pages/DarshanBookingsPage"
import PoojaManagePage from "./admin/pages/PoojaManagePage"
import DarshanManagePage from "./admin/pages/DarshanManagePage"
import DonationCausesManagePage from "./admin/pages/DonationCausesManagePage"
import EventsManagePage from "./admin/pages/EventsManagePage"
import GalleryManagePage from "./admin/pages/GalleryManagePage"
import HeroManagePage from "./admin/pages/HeroManagePage"
import TempleSettingsPage from "./admin/pages/TempleSettingsPage"
import ContactsPage from "./admin/pages/ContactsPage"

// Full-screen loader shown while site config is fetched from DB
function ConfigLoader({ children }) {
  const { loading } = useAdminData();
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDF8F3] gap-4">
        <div className="w-12 h-12 border-4 border-[#D4A853]/30 border-t-[#8B1A1A] rounded-full animate-spin" />
        <p className="text-[#6B4423] text-sm font-medium">Loading temple data…</p>
      </div>
    );
  }
  return children;
}

function App() {
  return (
    <ErrorBoundary>
      <AdminDataProvider>
        <AdminProvider>
          <LanguageProvider>
            <BrowserRouter>
              <ConfigLoader>
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
                    <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/refund-policy" element={<RefundPolicyPage />} />
                  </Route>

                  <Route path="/admin/login" element={<AdminLogin />} />

                  {/* Bookings & Finance */}
                  <Route path="/admin/dashboard"       element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
                  <Route path="/admin/payments"         element={<ProtectedAdminRoute><PaymentsPage /></ProtectedAdminRoute>} />
                  <Route path="/admin/donations"        element={<ProtectedAdminRoute><DonationsPage /></ProtectedAdminRoute>} />
                  <Route path="/admin/pooja-bookings"   element={<ProtectedAdminRoute><PoojaBookingsPage /></ProtectedAdminRoute>} />
                  <Route path="/admin/darshan-bookings" element={<ProtectedAdminRoute><DarshanBookingsPage /></ProtectedAdminRoute>} />

                  {/* Content Management */}
                  <Route path="/admin/manage-poojas"    element={<ProtectedAdminRoute><PoojaManagePage /></ProtectedAdminRoute>} />
                  <Route path="/admin/manage-darshan"   element={<ProtectedAdminRoute><DarshanManagePage /></ProtectedAdminRoute>} />
                  <Route path="/admin/manage-donations" element={<ProtectedAdminRoute><DonationCausesManagePage /></ProtectedAdminRoute>} />
                  <Route path="/admin/manage-events"    element={<ProtectedAdminRoute><EventsManagePage /></ProtectedAdminRoute>} />
                  <Route path="/admin/manage-gallery"   element={<ProtectedAdminRoute><GalleryManagePage /></ProtectedAdminRoute>} />
                  <Route path="/admin/manage-hero"      element={<ProtectedAdminRoute><HeroManagePage /></ProtectedAdminRoute>} />

                  {/* Site Settings */}
                  <Route path="/admin/temple-settings"  element={<ProtectedAdminRoute><TempleSettingsPage /></ProtectedAdminRoute>} />
                  <Route path="/admin/contacts"          element={<ProtectedAdminRoute><ContactsPage /></ProtectedAdminRoute>} />

                  {/* 404 */}
                  <Route path="*" element={
                    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDF8F3] text-center px-4">
                      <div className="text-7xl mb-4">🛕</div>
                      <h1 className="font-serif text-3xl font-bold text-[#2D1810] mb-3">Page Not Found</h1>
                      <p className="text-[#6B4423] mb-6">The page you are looking for does not exist.</p>
                      <a href="/" className="bg-[#8B1A1A] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#6B1414] transition-colors">
                        Return to Home
                      </a>
                    </div>
                  } />
                </Routes>
              </ConfigLoader>
            </BrowserRouter>
          </LanguageProvider>
        </AdminProvider>
      </AdminDataProvider>
    </ErrorBoundary>
  );
}

export default App;
