import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import ApplyLeave from './pages/ApplyLeave';
import EditLeave from './pages/EditLeave';
import LeaveDetails from './pages/LeaveDetails';
import AdminDashboard from './pages/AdminDashboard';
import { getCurrentUser } from './services/authService';

// Home helper component: redirects logged-in user to appropriate dashboard
function HomeRedirect() {
    const user = getCurrentUser();
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return user.role === 'admin' ? (
        <Navigate to="/admin" replace />
    ) : (
        <Navigate to="/dashboard" replace />
    );
}

function App() {
    return (
        <Router>
            <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
                <Navbar />
                <main>
                    <Routes>
                        {/* Root redirect */}
                        <Route path="/" element={<HomeRedirect />} />

                        {/* Public Auth Routes */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Protected User Routes */}
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <UserDashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/apply-leave"
                            element={
                                <ProtectedRoute>
                                    <ApplyLeave />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/leaves/:id"
                            element={
                                <ProtectedRoute>
                                    <LeaveDetails />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/leaves/:id/edit"
                            element={
                                <ProtectedRoute>
                                    <EditLeave />
                                </ProtectedRoute>
                            }
                        />

                        {/* Admin Route */}
                        <Route
                            path="/admin"
                            element={
                                <AdminRoute>
                                    <AdminDashboard />
                                </AdminRoute>
                            }
                        />

                        {/* Fallback route */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
