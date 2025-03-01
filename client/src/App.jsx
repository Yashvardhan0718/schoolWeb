import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Page components
import Home from './pages/Home';
// import About from './pages/About';
// import VisionMission from './pages/VisionMission';
// import PrincipalMessage from './pages/PrincipalMessage';
// import News from './pages/News';
// import NewsDetail from './pages/NewsDetail';
// import Events from './pages/Events';
// import EventDetail from './pages/EventDetail';
// import Gallery from './pages/Gallery';
// import Admissions from './pages/Admissions';
// import Contact from './pages/Contact';
// import Login from './pages/Login';
// import Dashboard from './pages/admin/Dashboard';
// import NotFound from './pages/NotFound';

// Admin pages with lazy loading
// const AdminNews = React.lazy(() => import('./pages/admin/AdminNews'));
// const AdminEvents = React.lazy(() => import('./pages/admin/AdminEvents'));
// const AdminGallery = React.lazy(() => import('./pages/admin/AdminGallery'));
// const AdminAdmissions = React.lazy(() => import('./pages/admin/AdminAdmissions'));

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              {/*
              <Route path="/about" element={<About />} />
              <Route path="/vision-mission" element={<VisionMission />} />
              <Route path="/principal-message" element={<PrincipalMessage />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              
             
              <Route path="/admin/dashboard" element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Dashboard />
                </React.Suspense>
              } />
              <Route path="/admin/news" element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <AdminNews />
                </React.Suspense>
              } />
              <Route path="/admin/events" element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <AdminEvents />
                </React.Suspense>
              } />
              <Route path="/admin/gallery" element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <AdminGallery />
                </React.Suspense>
              } />
              <Route path="/admin/admissions" element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <AdminAdmissions />
                </React.Suspense>
              } />
              
           
              <Route path="*" element={<NotFound />} />
              */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;