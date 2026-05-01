import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/landing/Navbar";
import { Hero } from "./components/landing/Hero";
import { Destinations } from "./components/landing/Destinations";
import { Activities } from "./components/landing/Activities";
import { HowItWorks } from "./components/landing/HowItWorks";
import { Testimonials } from "./components/landing/Testimonials";
import { OperatorCTA } from "./components/landing/OperatorCTA";
import { Footer } from "./components/landing/Footer";

import DashboardSelect from "./pages/DashboardSelect";
import CustomerBookings from "./pages/customer/Bookings";
import CustomerWishlist from "./pages/customer/Wishlist";
import CustomerProfile from "./pages/customer/Profile";
import MitraOverview from "./pages/mitra/Overview";
import MitraProduk from "./pages/mitra/Produk";
import MitraJadwal from "./pages/mitra/Jadwal";
import MitraBooking from "./pages/mitra/Booking";
import AdminOverview from "./pages/admin/Overview";
import AdminMitra from "./pages/admin/Mitra";
import AdminBooking from "./pages/admin/Booking";
import AdminPembayaran from "./pages/admin/Pembayaran";
import BookingDetail from "./pages/shared/BookingDetail";
import ProductForm from "./pages/mitra/ProductForm";

const Landing = () => (
  <main data-testid="landing-page" className="bg-[#FAF8F5] text-[#0A1929] overflow-x-hidden">
    <Navbar />
    <Hero />
    <Destinations />
    <Activities />
    <HowItWorks />
    <Testimonials />
    <OperatorCTA />
    <Footer />
  </main>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<DashboardSelect />} />

          {/* Customer */}
          <Route
            path="/dashboard/customer"
            element={<Navigate to="/dashboard/customer/booking" replace />}
          />
          <Route path="/dashboard/customer/booking" element={<CustomerBookings />} />
          <Route
            path="/dashboard/customer/booking/:id"
            element={<BookingDetail role="customer" />}
          />
          <Route path="/dashboard/customer/wishlist" element={<CustomerWishlist />} />
          <Route path="/dashboard/customer/profil" element={<CustomerProfile />} />
          <Route path="/dashboard/customer/review" element={<CustomerBookings />} />

          {/* Mitra / Operator */}
          <Route
            path="/dashboard/mitra"
            element={<Navigate to="/dashboard/mitra/overview" replace />}
          />
          <Route path="/dashboard/mitra/overview" element={<MitraOverview />} />
          <Route path="/dashboard/mitra/produk" element={<MitraProduk />} />
          <Route
            path="/dashboard/mitra/produk/baru"
            element={<ProductForm mode="create" />}
          />
          <Route
            path="/dashboard/mitra/produk/:id/edit"
            element={<ProductForm mode="edit" />}
          />
          <Route path="/dashboard/mitra/jadwal" element={<MitraJadwal />} />
          <Route path="/dashboard/mitra/booking" element={<MitraBooking />} />
          <Route
            path="/dashboard/mitra/booking/:id"
            element={<BookingDetail role="mitra" />}
          />
          <Route path="/dashboard/mitra/statistik" element={<MitraOverview />} />
          <Route path="/dashboard/mitra/pengaturan" element={<MitraOverview />} />

          {/* Admin */}
          <Route
            path="/dashboard/admin"
            element={<Navigate to="/dashboard/admin/overview" replace />}
          />
          <Route path="/dashboard/admin/overview" element={<AdminOverview />} />
          <Route path="/dashboard/admin/mitra" element={<AdminMitra />} />
          <Route path="/dashboard/admin/produk" element={<AdminBooking />} />
          <Route path="/dashboard/admin/booking" element={<AdminBooking />} />
          <Route
            path="/dashboard/admin/booking/:id"
            element={<BookingDetail role="admin" />}
          />
          <Route path="/dashboard/admin/pembayaran" element={<AdminPembayaran />} />
          <Route path="/dashboard/admin/laporan" element={<AdminOverview />} />
          <Route path="/dashboard/admin/feri" element={<AdminBooking />} />
          <Route path="/dashboard/admin/pengaturan" element={<AdminOverview />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
