import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LanguageProvider } from "./contexts/LanguageContext";
import "./App.css"
import Layout from "./components/Layout"
import ErrorBoundary from "./components/ErrorBoundary"
import { ThemeProvider } from "./contexts/ThemeContext"
import { AdminProvider } from "./admin/contexts/AdminContext"
import { AdminDataProvider } from "./admin/contexts/AdminDataContext"
import { useAdminData } from "./admin/contexts/AdminDataContext"
import { ProtectedAdminRoute } from "./admin/ProtectedAdminRoute"

const Home                   = lazy(() => import("./pages/home/Home"))
const DarshanPage            = lazy(() => import("./pages/darshan/DarshanPage"))
const DonatePage             = lazy(() => import("./pages/donate/DonatePage"))
const Poojapage              = lazy(() => import("./pages/pooja/Poojapage"))
const PoojaDetailPage        = lazy(() => import("./pages/pooja/PoojaDetailPage"))
const GalleryPage            = lazy(() => import("./pages/gallery/GalleryPage"))
const EventsPage             = lazy(() => import("./pages/events/EventsPage"))
const ContactPage            = lazy(() => import("./pages/contact/ContactPage"))
const PrivacyPolicyPage      = lazy(() => import("./pages/legal/PrivacyPolicyPage"))
const TermsPage              = lazy(() => import("./pages/legal/TermsPage"))
const RefundPolicyPage       = lazy(() => import("./pages/legal/RefundPolicyPage"))
const AdminLogin             = lazy(() => import("./admin/pages/AdminLogin"))
const AdminDashboard         = lazy(() => import("./admin/pages/AdminDashboard"))
const PaymentsPage           = lazy(() => import("./admin/pages/PaymentsPage"))
const DonationsPage          = lazy(() => import("./admin/pages/DonationsPage"))
const PoojaBookingsPage      = lazy(() => import("./admin/pages/PoojaBookingsPage"))
const DarshanBookingsPage    = lazy(() => import("./admin/pages/DarshanBookingsPage"))
const PoojaManagePage        = lazy(() => import("./admin/pages/PoojaManagePage"))
const DarshanManagePage      = lazy(() => import("./admin/pages/DarshanManagePage"))
const DonationCausesManagePage = lazy(() => import("./admin/pages/DonationCausesManagePage"))
const EventsManagePage       = lazy(() => import("./admin/pages/EventsManagePage"))
const GalleryManagePage      = lazy(() => import("./admin/pages/GalleryManagePage"))
const HeroManagePage         = lazy(() => import("./admin/pages/HeroManagePage"))
const TempleSettingsPage     = lazy(() => import("./admin/pages/TempleSettingsPage"))
const ThemeControlsPage      = lazy(() => import("./admin/pages/ThemeControlsPage"))
const ContactsPage           = lazy(() => import("./admin/pages/ContactsPage"))

// Full-screen loader shown while site config is fetched from DB
function ConfigLoader({ children }) {
  const { loading } = useAdminData();
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-parchment gap-4">
        <div className="w-12 h-12 border-4 border-gold/30 border-t-maroon rounded-full animate-spin" />
        <p className="text-earth-medium text-sm font-medium">Loading temple data…</p>
      </div>
    );
  }
  return children;
}

function App() {
  return (
    <ErrorBoundary>
      <AdminDataProvider>
        <ThemeProvider>
        <AdminProvider>
          <LanguageProvider>
            <BrowserRouter>
              <ConfigLoader>
                <Suspense fallback={
                  <div className="min-h-screen flex items-center justify-center bg-parchment">
                    <div className="w-10 h-10 border-4 border-gold/30 border-t-maroon rounded-full animate-spin" />
                  </div>
                }>
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
                  <Route path="/admin/theme-controls"   element={<ProtectedAdminRoute><ThemeControlsPage /></ProtectedAdminRoute>} />
                  <Route path="/admin/contacts"          element={<ProtectedAdminRoute><ContactsPage /></ProtectedAdminRoute>} />

                  {/* 404 */}
                  <Route path="*" element={
                    <div className="min-h-screen flex flex-col items-center justify-center bg-parchment text-center px-4">
                      <div className="text-7xl mb-4">🛕</div>
                      <h1 className="font-serif text-3xl font-bold text-earth-dark mb-3">Page Not Found</h1>
                      <p className="text-earth-medium mb-6">The page you are looking for does not exist.</p>
                      <a href="/" className="bg-btn-bg text-btn-text px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-btn-bg-hover transition-colors">
                        Return to Home
                      </a>
                    </div>
                  } />
                </Routes>
                </Suspense>
              </ConfigLoader>
            </BrowserRouter>
          </LanguageProvider>
        </AdminProvider>
        </ThemeProvider>
      </AdminDataProvider>
    </ErrorBoundary>
  );
}

export default App;

