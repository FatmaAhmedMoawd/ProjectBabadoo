import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '@/features/public-web/pages/LandingPage/LandingPage';
import PartnerPage from '@/features/public-web/pages/PartnerPage/PartnerPage';

// Placeholder components for the other domains
const BrandDashboardLayout = () => <div className="p-8 text-start" dir="rtl"><h1>لوحة تحكم البراند (app.babbadoo.app)</h1><p>يتطلب تسجيل الدخول</p></div>;
const AdminDashboardLayout = () => <div className="p-8 text-start" dir="rtl"><h1>لوحة تحكم الإدارة (admin.babbadoo.app)</h1><p>للمسؤولين فقط</p></div>;

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/partner" element={<PartnerPage />} />
        
        {/* Brand Routes (Simulating subdomain via path for dev preview) */}
        <Route path="/app/*" element={<BrandDashboardLayout />} />
        
        {/* Admin Routes (Simulating subdomain via path for dev preview) */}
        <Route path="/admin/*" element={<AdminDashboardLayout />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
