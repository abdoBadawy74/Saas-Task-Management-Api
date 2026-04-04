import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    LayoutDashboard, CheckSquare, Users, Bell,
    LogOut, Shield, ChevronLeft, ChevronRight,
    Activity, Menu, X
} from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/tasks', icon: CheckSquare, label: 'Tasks' },
    { to: '/teams', icon: Users, label: 'Teams' },
    { to: '/activities', icon: Activity, label: 'Activities' },
    { to: '/notifications', icon: Bell, label: 'Notifications' },
];

const adminItems = [
    { to: '/admin/dashboard', icon: Shield, label: 'Admin Dashboard' },
    { to: '/admin/users', icon: Users, label: 'Users' },
    { to: '/admin/tasks', icon: CheckSquare, label: 'All Tasks' },
    { to: '/admin/teams', icon: Users, label: 'All Teams' },
    { to: '/activities', icon: Activity, label: 'Activities' },
];

export default function Sidebar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Desktop: collapsed state (icons only vs full)
    const [collapsed, setCollapsed] = useState(false);

    // Mobile: drawer open/closed
    const [mobileOpen, setMobileOpen] = useState(false);

    const items = user?.role === 'admin' ? adminItems : navItems;

    // Close mobile drawer on route change
    const handleNavClick = () => setMobileOpen(false);

    // Close on outside click / escape
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') setMobileOpen(false);
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, []);

    // Prevent body scroll when mobile drawer is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // ── Shared nav content ─────────────────────────────────────────────────
    const NavContent = ({ isDrawer = false }) => (
        
        <>
            {/* Logo */}
            <div className="flex items-center gap-3 p-5 border-b border-slate-700/50 flex-shrink-0">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br
                                from-indigo-500 to-purple-600 flex items-center justify-center
                                shadow-lg shadow-indigo-500/25">
                    <CheckSquare className="w-5 h-5 text-white" />
                </div>
                {(!collapsed || isDrawer) && (
                    <span className="font-bold text-white text-lg truncate">
                        TaskManager
                    </span>
                )}
                {/* Close button — mobile drawer only */}
                {isDrawer && (
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="ml-auto p-1.5 rounded-lg text-slate-400
                                   hover:text-white hover:bg-slate-700 transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Nav links */}
            <nav className="flex-1 p-3 flex flex-col gap-1 overflow-y-auto">
                {items.map(({ to, icon: Icon, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        onClick={handleNavClick}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-xl
                             transition-all duration-200
                             ${!collapsed || isDrawer ? '' : 'justify-center'}
                             ${isActive
                                ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-400 border border-indigo-500/20'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800'}`
                        }
                    >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        {(!collapsed || isDrawer) && (
                            <span className="text-sm font-medium truncate">{label}</span>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* User + logout */}
            <div className="p-3 border-t border-slate-700/50 flex-shrink-0">
                {(!collapsed || isDrawer) && (
                    <div className="flex items-center gap-3 px-3 py-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500
                                        to-purple-600 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-bold">
                                {user?.name?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-white text-sm font-medium truncate">
                                {user?.name}
                            </p>
                            <p className="text-slate-400 text-xs truncate capitalize">
                                {user?.role}
                            </p>
                        </div>
                    </div>
                )}

                {/* Collapsed avatar — desktop only */}
                {collapsed && !isDrawer && (
                    <div className="flex justify-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500
                                        to-purple-600 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                                {user?.name?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    </div>
                )}

                <button
                    onClick={handleLogout}
                    className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl
                                text-slate-400 hover:text-red-400 hover:bg-red-500/10
                                transition-all duration-200
                                ${collapsed && !isDrawer ? 'justify-center' : ''}`}
                >
                    <LogOut className="w-5 h-5 flex-shrink-0" />
                    {(!collapsed || isDrawer) && (
                        <span className="text-sm font-medium">Logout</span>
                    )}
                </button>
            </div>
        </>
    );

    return (
        <>
            {/* ── Mobile hamburger button (shown in Navbar area) ───────── */}
            <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-xl
                           bg-slate-800 border border-slate-700 text-slate-400
                           hover:text-white transition-all shadow-lg"
            >
                <Menu className="w-5 h-5" />
            </button>

            {/* ── Mobile backdrop ──────────────────────────────────────── */}
            {mobileOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* ── Mobile drawer — slides in from left ─────────────────── */}
            <div className={`md:hidden fixed top-0 left-0 h-full w-72 z-50
                             bg-slate-900 border-r border-slate-700/50
                             flex flex-col
                             transition-transform duration-300 ease-in-out
                             ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <NavContent isDrawer={true} />
            </div>

            {/* ── Desktop sidebar ──────────────────────────────────────── */}
            <aside className={`hidden md:flex flex-col relative bg-slate-900
                               border-r border-slate-700/50 transition-all duration-300
                               ${collapsed ? 'w-20' : 'w-64'}`}>

                {/* Collapse toggle */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="absolute -right-3 top-8 w-6 h-6 rounded-full bg-slate-700
                               border border-slate-600 flex items-center justify-center
                               text-slate-400 hover:text-white transition-colors z-10"
                >
                    {collapsed
                        ? <ChevronRight className="w-3 h-3" />
                        : <ChevronLeft className="w-3 h-3" />}
                </button>

                <NavContent isDrawer={false} />
            </aside>
        </>
    );
}