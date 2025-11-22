import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import TopNavbar from '../components/TopNavbar';
import AddUserModal from '../components/AddUserModal';
import AddOrgModal from '../components/AddOrgModal';

const MainAdminPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showOrgModal, setShowOrgModal] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddOrgModal, setShowAddOrgModal] = useState(false);

  // Mock data
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active', joinDate: '2023-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'Active', joinDate: '2023-02-20' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive', joinDate: '2023-03-10' },
  ]);

  const [organizations, setOrganizations] = useState([
    { id: 1, name: 'Barangay San Antonio', type: 'Community', location: 'Manila', status: 'Active', contactPerson: 'Maria Santos', joinDate: '2023-01-10' },
    { id: 2, name: 'City Disaster Response', type: 'Government', location: 'Quezon City', status: 'Active', contactPerson: 'Juan dela Cruz', joinDate: '2023-02-15' },
    { id: 3, name: 'Community Aid Network', type: 'NGO', location: 'Makati', status: 'Active', contactPerson: 'Ana Reyes', joinDate: '2023-03-05' },
    { id: 4, name: 'Red Cross Philippines', type: 'International NGO', location: 'National', status: 'Active', contactPerson: 'Carlos Mendoza', joinDate: '2023-01-01' },
  ]);

  const analyticsData = {
    siteTraffic: [
      { month: 'Jan', visitors: 1200 },
      { month: 'Feb', visitors: 1500 },
      { month: 'Mar', visitors: 1800 },
      { month: 'Apr', visitors: 2200 },
      { month: 'May', visitors: 2800 },
      { month: 'Jun', visitors: 3200 },
    ],
    revenue: [
      { month: 'Jan', amount: 15000 },
      { month: 'Feb', amount: 18000 },
      { month: 'Mar', amount: 22000 },
      { month: 'Apr', amount: 25000 },
      { month: 'May', amount: 30000 },
      { month: 'Jun', amount: 35000 },
    ],
    performance: {
      totalUsers: 15420,
      activeUsers: 12850,
      totalDonations: 89234,
      avgSessionTime: '4m 32s'
    }
  };

  const handleNav = (name) => {
    if (name === 'Home') navigate('/homepage');
    if (name === 'Donation') navigate('/global-donations');
    if (name === 'Top Up') navigate('/top-up');
    if (name === 'Profile') navigate('/profile');
    if (name === 'Settings') navigate('/settings');
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleEditOrg = (org) => {
    setSelectedOrg(org);
    setShowOrgModal(true);
  };

  const handleDeleteOrg = (orgId) => {
    setOrganizations(organizations.filter(org => org.id !== orgId));
  };

  const handleAddUser = (userData) => {
    const newUser = {
      id: users.length + 1,
      ...userData,
      status: 'Active',
      joinDate: new Date().toISOString().split('T')[0]
    };
    setUsers([...users, newUser]);
  };

  const handleAddOrg = (orgData) => {
    const newOrg = {
      id: organizations.length + 1,
      ...orgData,
      status: 'Active',
      joinDate: new Date().toISOString().split('T')[0]
    };
    setOrganizations([...organizations, newOrg]);
  };

  const adminNavItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M3 9L12 2l9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      description: "Admin dashboard overview"
    },
    {
      id: 'users',
      name: 'User Management',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      description: "Manage users and accounts"
    },
    {
      id: 'organizations',
      name: 'Organization Management',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9l6 4" />
        </svg>
      ),
      description: "Manage organizations and groups"
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
      description: "View analytics and reports"
    },
    {
      id: 'settings',
      name: 'System Settings',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
      description: "Configure system settings"
    },
  ];

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-[#a50805] to-[#d32f2f] text-white p-8 rounded-xl shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome back, Admin!</h1>
              <p className="text-white/90 text-lg">Here's what's happening with your platform today.</p>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-white/90 text-sm">Last updated</p>
                  <p className="font-semibold">{new Date().toLocaleTimeString()}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full"></div>
      </div>

      <h2 className="text-3xl font-bold text-[#624d41]">Dashboard Overview</h2>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#a50805]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="bg-[#a50805] p-3 rounded-xl mr-4 group-hover:bg-[#d32f2f] transition-colors duration-300 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                  </svg>
                </div>
                <h3 className="text-[#624d41] font-semibold text-lg">Total Users</h3>
              </div>
              <div className="text-[#4caf50] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-[#a50805] mb-2 group-hover:scale-110 transition-transform duration-300 origin-left">{analyticsData.performance.totalUsers.toLocaleString()}</p>
            <div className="flex items-center text-[#b6b1b2] text-sm">
              <span className="inline-block w-2 h-2 bg-[#4caf50] rounded-full mr-2 animate-pulse"></span>
              <span>+12% from last month</span>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#4caf50]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="bg-[#4caf50] p-3 rounded-xl mr-4 group-hover:bg-[#66bb6a] transition-colors duration-300 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-[#624d41] font-semibold text-lg">Active Users</h3>
              </div>
              <div className="text-[#4caf50] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-[#4caf50] mb-2 group-hover:scale-110 transition-transform duration-300 origin-left">{analyticsData.performance.activeUsers.toLocaleString()}</p>
            <div className="flex items-center text-[#b6b1b2] text-sm">
              <span className="inline-block w-2 h-2 bg-[#4caf50] rounded-full mr-2 animate-pulse"></span>
              <span>+8% from last week</span>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff9800]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="bg-[#ff9800] p-3 rounded-xl mr-4 group-hover:bg-[#ffb74d] transition-colors duration-300 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                </div>
                <h3 className="text-[#624d41] font-semibold text-lg">Total Donations</h3>
              </div>
              <div className="text-[#ff9800] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-[#ff9800] mb-2 group-hover:scale-110 transition-transform duration-300 origin-left">₱{analyticsData.performance.totalDonations.toLocaleString()}</p>
            <div className="flex items-center text-[#b6b1b2] text-sm">
              <span className="inline-block w-2 h-2 bg-[#ff9800] rounded-full mr-2 animate-pulse"></span>
              <span>+15% from last month</span>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2196f3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="bg-[#2196f3] p-3 rounded-xl mr-4 group-hover:bg-[#42a5f5] transition-colors duration-300 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-[#624d41] font-semibold text-lg">Avg Session</h3>
              </div>
              <div className="text-[#2196f3] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-[#2196f3] mb-2 group-hover:scale-110 transition-transform duration-300 origin-left">{analyticsData.performance.avgSessionTime}</p>
            <div className="flex items-center text-[#b6b1b2] text-sm">
              <span className="inline-block w-2 h-2 bg-[#2196f3] rounded-full mr-2 animate-pulse"></span>
              <span>-2% from last week</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gradient-to-br from-white to-[#f8f9fa] border border-[#e9ecef] rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#624d41]">Recent Activity</h2>
          <div className="flex items-center text-[#b6b1b2] text-sm">
            <span className="inline-block w-2 h-2 bg-[#4caf50] rounded-full mr-2 animate-pulse"></span>
            <span>Live updates</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gradient-to-r hover:from-[#a50805]/5 hover:to-transparent transition-all duration-300 cursor-pointer group">
            <div className="bg-[#a50805] p-3 rounded-full group-hover:bg-[#d32f2f] transition-colors duration-300 shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="text-[#624d41] font-semibold text-left group-hover:text-[#a50805] transition-colors duration-300">New user registered: Sarah Wilson</p>
              <div className="flex items-center text-[#b6b1b2] text-sm text-left mt-1">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>2 hours ago</span>
              </div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg className="w-5 h-5 text-[#a50805]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gradient-to-r hover:from-[#4caf50]/5 hover:to-transparent transition-all duration-300 cursor-pointer group">
            <div className="bg-[#4caf50] p-3 rounded-full group-hover:bg-[#66bb6a] transition-colors duration-300 shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="text-[#624d41] font-semibold text-left group-hover:text-[#4caf50] transition-colors duration-300">Donation of ₱1,500 received</p>
              <div className="flex items-center text-[#b6b1b2] text-sm text-left mt-1">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>4 hours ago</span>
              </div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg className="w-5 h-5 text-[#4caf50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gradient-to-r hover:from-[#ff9800]/5 hover:to-transparent transition-all duration-300 cursor-pointer group">
            <div className="bg-[#ff9800] p-3 rounded-full group-hover:bg-[#ffb74d] transition-colors duration-300 shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="text-[#624d41] font-semibold text-left group-hover:text-[#ff9800] transition-colors duration-300">New organization added: Community Aid Network</p>
              <div className="flex items-center text-[#b6b1b2] text-sm text-left mt-1">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>6 hours ago</span>
              </div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg className="w-5 h-5 text-[#ff9800]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-[#e9ecef]">
          <button className="w-full text-[#a50805] hover:text-[#d32f2f] font-medium transition-colors duration-300 flex items-center justify-center space-x-2">
            <span>View All Activity</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-8">
      {/* Header with Stats */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold text-[#624d41]">User Management</h1>
          <p className="text-[#b6b1b2] mt-2">Manage user accounts, roles, and permissions</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="bg-gradient-to-br from-white to-[#f8f9fa] px-4 py-3 rounded-lg border border-[#e9ecef] shadow-sm">
            <div className="text-2xl font-bold text-[#a50805]">{users.length}</div>
            <div className="text-xs text-[#b6b1b2] uppercase tracking-wide">Total Users</div>
          </div>
          <div className="bg-gradient-to-br from-white to-[#f8f9fa] px-4 py-3 rounded-lg border border-[#e9ecef] shadow-sm">
            <div className="text-2xl font-bold text-[#4caf50]">{users.filter(u => u.status === 'Active').length}</div>
            <div className="text-xs text-[#b6b1b2] uppercase tracking-wide">Active</div>
          </div>
          <div className="bg-gradient-to-br from-white to-[#f8f9fa] px-4 py-3 rounded-lg border border-[#e9ecef] shadow-sm">
            <div className="text-2xl font-bold text-[#2196f3]">{users.filter(u => u.role === 'Admin').length}</div>
            <div className="text-xs text-[#b6b1b2] uppercase tracking-wide">Admins</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#b6b1b2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input
              type="text"
              placeholder="Search users by name or email..."
              className="w-full pl-10 pr-4 py-3 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] focus:border-transparent transition-all duration-200"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-3 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] bg-white">
              <option>All Roles</option>
              <option>Admin</option>
              <option>User</option>
            </select>
            <select className="px-4 py-3 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] bg-white">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Add User Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowAddUserModal(true)}
          className="bg-gradient-to-r from-[#a50805] to-[#d32f2f] text-white px-8 py-4 rounded-lg hover:from-[#d32f2f] hover:to-[#a50805] transition-all duration-300 font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <span>Add New User</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-gradient-to-br from-white to-[#f8f9fa] border border-[#e9ecef] rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef]">
              <tr>
                <th className="px-6 py-5 text-left text-[#624d41] font-semibold text-sm uppercase tracking-wider">User</th>
                <th className="px-6 py-5 text-left text-[#624d41] font-semibold text-sm uppercase tracking-wider">Contact</th>
                <th className="px-6 py-5 text-left text-[#624d41] font-semibold text-sm uppercase tracking-wider">Role</th>
                <th className="px-6 py-5 text-left text-[#624d41] font-semibold text-sm uppercase tracking-wider">Status</th>
                <th className="px-6 py-5 text-left text-[#624d41] font-semibold text-sm uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-5 text-left text-[#624d41] font-semibold text-sm uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e9ecef]">
              {users.map((user, index) => (
                <tr key={user.id} className="hover:bg-gradient-to-r hover:from-[#f8f9fa] hover:to-white transition-all duration-200 group">
                  <td className="px-6 py-4 text-left">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a50805] to-[#d32f2f] flex items-center justify-center text-white font-semibold text-sm">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-[#624d41] group-hover:text-[#a50805] transition-colors duration-200">
                          {user.name}
                        </div>
                        <div className="text-sm text-[#b6b1b2]">ID: {user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-left">
                    <div className="text-sm text-[#624d41]">{user.email}</div>
                    <div className="text-sm text-[#b6b1b2] flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      Email verified
                    </div>
                  </td>
                  <td className="px-6 py-4 text-left">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === 'Admin'
                        ? 'bg-gradient-to-r from-[#a50805] to-[#d32f2f] text-white shadow-md'
                        : 'bg-gradient-to-r from-[#b6b1b2] to-[#8b8580] text-white shadow-md'
                    }`}>
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-left">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === 'Active'
                        ? 'bg-gradient-to-r from-[#4caf50] to-[#66bb6a] text-white shadow-md'
                        : 'bg-gradient-to-r from-[#d32f2f] to-[#a50805] text-white shadow-md'
                    }`}>
                      <span className={`w-2 h-2 rounded-full mr-2 ${user.status === 'Active' ? 'bg-white animate-pulse' : 'bg-white'}`}></span>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-left text-sm text-[#624d41]">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1 text-[#b6b1b2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      {user.joinDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-left">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="bg-gradient-to-r from-[#2196f3] to-[#42a5f5] text-white px-4 py-2 rounded-lg hover:from-[#42a5f5] hover:to-[#2196f3] transition-all duration-200 text-sm font-medium flex items-center space-x-1 shadow-md hover:shadow-lg transform hover:scale-105"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="bg-gradient-to-r from-[#d32f2f] to-[#a50805] text-white px-4 py-2 rounded-lg hover:from-[#a50805] hover:to-[#d32f2f] transition-all duration-200 text-sm font-medium flex items-center space-x-1 shadow-md hover:shadow-lg transform hover:scale-105"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="bg-[#f8f9fa] px-6 py-4 border-t border-[#e9ecef]">
          <div className="flex items-center justify-between">
            <div className="text-sm text-[#b6b1b2]">
              Showing <span className="font-medium text-[#624d41]">{users.length}</span> of <span className="font-medium text-[#624d41]">{users.length}</span> users
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm border border-[#e9ecef] rounded hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                Previous
              </button>
              <button className="px-3 py-1 text-sm bg-[#a50805] text-white border border-[#a50805] rounded">
                1
              </button>
              <button className="px-3 py-1 text-sm border border-[#e9ecef] rounded hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrganizations = () => (
    <div className="space-y-8">
      {/* Header with Stats */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold text-[#624d41]">Organization Management</h1>
          <p className="text-[#b6b1b2] mt-2">Manage organizations, partnerships, and collaborations</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="bg-gradient-to-br from-white to-[#f8f9fa] px-4 py-3 rounded-lg border border-[#e9ecef] shadow-sm">
            <div className="text-2xl font-bold text-[#a50805]">{organizations.length}</div>
            <div className="text-xs text-[#b6b1b2] uppercase tracking-wide">Total Orgs</div>
          </div>
          <div className="bg-gradient-to-br from-white to-[#f8f9fa] px-4 py-3 rounded-lg border border-[#e9ecef] shadow-sm">
            <div className="text-2xl font-bold text-[#4caf50]">{organizations.filter(o => o.status === 'Active').length}</div>
            <div className="text-xs text-[#b6b1b2] uppercase tracking-wide">Active</div>
          </div>
          <div className="bg-gradient-to-br from-white to-[#f8f9fa] px-4 py-3 rounded-lg border border-[#e9ecef] shadow-sm">
            <div className="text-2xl font-bold text-[#2196f3]">{organizations.filter(o => o.type === 'Government').length}</div>
            <div className="text-xs text-[#b6b1b2] uppercase tracking-wide">Government</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#b6b1b2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input
              type="text"
              placeholder="Search organizations by name or location..."
              className="w-full pl-10 pr-4 py-3 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] focus:border-transparent transition-all duration-200"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-3 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] bg-white">
              <option>All Types</option>
              <option>Community</option>
              <option>Government</option>
              <option>NGO</option>
              <option>International NGO</option>
            </select>
            <select className="px-4 py-3 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] bg-white">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Add Organization Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowAddOrgModal(true)}
          className="bg-gradient-to-r from-[#a50805] to-[#d32f2f] text-white px-8 py-4 rounded-lg hover:from-[#d32f2f] hover:to-[#a50805] transition-all duration-300 font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
          <span>Add New Organization</span>
        </button>
      </div>

      {/* Organizations Table */}
      <div className="bg-gradient-to-br from-white to-[#f8f9fa] border border-[#e9ecef] rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef]">
              <tr>
                <th className="px-6 py-5 text-left text-[#624d41] font-semibold text-sm uppercase tracking-wider">Organization</th>
                <th className="px-6 py-5 text-left text-[#624d41] font-semibold text-sm uppercase tracking-wider">Type</th>
                <th className="px-6 py-5 text-left text-[#624d41] font-semibold text-sm uppercase tracking-wider">Location</th>
                <th className="px-6 py-5 text-left text-[#624d41] font-semibold text-sm uppercase tracking-wider">Contact</th>
                <th className="px-6 py-5 text-left text-[#624d41] font-semibold text-sm uppercase tracking-wider">Status</th>
                <th className="px-6 py-5 text-left text-[#624d41] font-semibold text-sm uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-5 text-left text-[#624d41] font-semibold text-sm uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e9ecef]">
              {organizations.map((org, index) => (
                <tr key={org.id} className="hover:bg-gradient-to-r hover:from-[#f8f9fa] hover:to-white transition-all duration-200 group">
                  <td className="px-6 py-4 text-left">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-12 h-12">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg ${
                          org.type === 'Community' ? 'bg-gradient-to-br from-[#4caf50] to-[#66bb6a]' :
                          org.type === 'Government' ? 'bg-gradient-to-br from-[#2196f3] to-[#42a5f5]' :
                          org.type === 'NGO' ? 'bg-gradient-to-br from-[#ff9800] to-[#ffb74d]' :
                          'bg-gradient-to-br from-[#9c27b0] to-[#ba68c8]'
                        }`}>
                          {org.name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase()}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-[#624d41] group-hover:text-[#a50805] transition-colors duration-200">
                          {org.name}
                        </div>
                        <div className="text-sm text-[#b6b1b2]">ID: {org.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-left">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium shadow-md ${
                      org.type === 'Community' ? 'bg-gradient-to-r from-[#4caf50] to-[#66bb6a] text-white' :
                      org.type === 'Government' ? 'bg-gradient-to-r from-[#2196f3] to-[#42a5f5] text-white' :
                      org.type === 'NGO' ? 'bg-gradient-to-r from-[#ff9800] to-[#ffb74d] text-white' :
                      'bg-gradient-to-r from-[#9c27b0] to-[#ba68c8] text-white'
                    }`}>
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                      </svg>
                      {org.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-left text-sm text-[#624d41]">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-[#b6b1b2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      {org.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-left">
                    <div className="text-sm text-[#624d41] font-medium">{org.contactPerson}</div>
                    <div className="text-sm text-[#b6b1b2] flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      Contact Person
                    </div>
                  </td>
                  <td className="px-6 py-4 text-left">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      org.status === 'Active'
                        ? 'bg-gradient-to-r from-[#4caf50] to-[#66bb6a] text-white shadow-md'
                        : 'bg-gradient-to-r from-[#d32f2f] to-[#a50805] text-white shadow-md'
                    }`}>
                      <span className={`w-2 h-2 rounded-full mr-2 ${org.status === 'Active' ? 'bg-white animate-pulse' : 'bg-white'}`}></span>
                      {org.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-left text-sm text-[#624d41]">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1 text-[#b6b1b2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      {org.joinDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-left">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditOrg(org)}
                        className="bg-gradient-to-r from-[#2196f3] to-[#42a5f5] text-white px-4 py-2 rounded-lg hover:from-[#42a5f5] hover:to-[#2196f3] transition-all duration-200 text-sm font-medium flex items-center space-x-1 shadow-md hover:shadow-lg transform hover:scale-105"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteOrg(org.id)}
                        className="bg-gradient-to-r from-[#d32f2f] to-[#a50805] text-white px-4 py-2 rounded-lg hover:from-[#a50805] hover:to-[#d32f2f] transition-all duration-200 text-sm font-medium flex items-center space-x-1 shadow-md hover:shadow-lg transform hover:scale-105"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="bg-[#f8f9fa] px-6 py-4 border-t border-[#e9ecef]">
          <div className="flex items-center justify-between">
            <div className="text-sm text-[#b6b1b2]">
              Showing <span className="font-medium text-[#624d41]">{organizations.length}</span> of <span className="font-medium text-[#624d41]">{organizations.length}</span> organizations
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm border border-[#e9ecef] rounded hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                Previous
              </button>
              <button className="px-3 py-1 text-sm bg-[#a50805] text-white border border-[#a50805] rounded">
                1
              </button>
              <button className="px-3 py-1 text-sm border border-[#e9ecef] rounded hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-8">
      {/* Header with Controls */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold text-[#624d41]">Analytics Dashboard</h1>
          <p className="text-[#b6b1b2] mt-2">Monitor platform performance and user engagement metrics</p>
        </div>
        <div className="flex items-center gap-4">
          <select className="px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805] bg-white">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Last 6 months</option>
            <option>Last year</option>
          </select>
          <button className="bg-gradient-to-r from-[#a50805] to-[#d32f2f] text-white px-6 py-2 rounded-lg hover:from-[#d32f2f] hover:to-[#a50805] transition-all duration-300 font-medium flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-105">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#a50805]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="bg-[#a50805] p-3 rounded-xl mr-4 group-hover:bg-[#d32f2f] transition-colors duration-300 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <h3 className="text-[#624d41] font-semibold text-lg">Total Users</h3>
              </div>
              <div className="text-[#4caf50] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-[#a50805] mb-2 group-hover:scale-110 transition-transform duration-300 origin-left">{analyticsData.performance.totalUsers.toLocaleString()}</p>
            <div className="flex items-center text-[#b6b1b2] text-sm">
              <span className="inline-block w-2 h-2 bg-[#4caf50] rounded-full mr-2 animate-pulse"></span>
              <span>+12% from last month</span>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#4caf50]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="bg-[#4caf50] p-3 rounded-xl mr-4 group-hover:bg-[#66bb6a] transition-colors duration-300 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                </div>
                <h3 className="text-[#624d41] font-semibold text-lg">Total Donations</h3>
              </div>
              <div className="text-[#4caf50] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-[#4caf50] mb-2 group-hover:scale-110 transition-transform duration-300 origin-left">₱{analyticsData.performance.totalDonations.toLocaleString()}</p>
            <div className="flex items-center text-[#b6b1b2] text-sm">
              <span className="inline-block w-2 h-2 bg-[#4caf50] rounded-full mr-2 animate-pulse"></span>
              <span>+15% from last month</span>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2196f3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="bg-[#2196f3] p-3 rounded-xl mr-4 group-hover:bg-[#42a5f5] transition-colors duration-300 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <h3 className="text-[#624d41] font-semibold text-lg">Site Traffic</h3>
              </div>
              <div className="text-[#2196f3] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-[#2196f3] mb-2 group-hover:scale-110 transition-transform duration-300 origin-left">{analyticsData.siteTraffic[analyticsData.siteTraffic.length - 1].visitors.toLocaleString()}</p>
            <div className="flex items-center text-[#b6b1b2] text-sm">
              <span className="inline-block w-2 h-2 bg-[#4caf50] rounded-full mr-2 animate-pulse"></span>
              <span>+8% from last month</span>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff9800]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="bg-[#ff9800] p-3 rounded-xl mr-4 group-hover:bg-[#ffb74d] transition-colors duration-300 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-[#624d41] font-semibold text-lg">Avg Session</h3>
              </div>
              <div className="text-[#ff9800] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-[#ff9800] mb-2 group-hover:scale-110 transition-transform duration-300 origin-left">{analyticsData.performance.avgSessionTime}</p>
            <div className="flex items-center text-[#b6b1b2] text-sm">
              <span className="inline-block w-2 h-2 bg-[#d32f2f] rounded-full mr-2 animate-pulse"></span>
              <span>-2% from last week</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Enhanced Site Traffic Chart */}
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-[#624d41]">Site Traffic Trends</h3>
              <p className="text-[#b6b1b2] text-sm">Monthly visitor growth</p>
            </div>
            <div className="flex items-center text-[#4caf50] font-medium">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
              <span>+18%</span>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2 mb-4">
            {analyticsData.siteTraffic.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center group cursor-pointer">
                <div className="relative w-full">
                  <div
                    className="bg-gradient-to-t from-[#a50805] to-[#d32f2f] w-full rounded-t transition-all duration-300 hover:from-[#d32f2f] hover:to-[#a50805] group-hover:shadow-lg"
                    style={{ height: `${(data.visitors / 3500) * 100}%` }}
                  ></div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#624d41] text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    {data.visitors.toLocaleString()} visitors
                  </div>
                </div>
                <span className="text-xs text-[#b6b1b2] mt-2 font-medium">{data.month}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#b6b1b2]">Monthly visitors</span>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#a50805] rounded mr-2"></div>
                <span className="text-[#624d41]">Visitors</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Revenue Chart */}
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-[#624d41]">Revenue Analytics</h3>
              <p className="text-[#b6b1b2] text-sm">Monthly earnings breakdown</p>
            </div>
            <div className="flex items-center text-[#4caf50] font-medium">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
              <span>+22%</span>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2 mb-4">
            {analyticsData.revenue.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center group cursor-pointer">
                <div className="relative w-full">
                  <div
                    className="bg-gradient-to-t from-[#4caf50] to-[#66bb6a] w-full rounded-t transition-all duration-300 hover:from-[#66bb6a] hover:to-[#4caf50] group-hover:shadow-lg"
                    style={{ height: `${(data.amount / 40000) * 100}%` }}
                  ></div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#624d41] text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    ₱{data.amount.toLocaleString()}
                  </div>
                </div>
                <span className="text-xs text-[#b6b1b2] mt-2 font-medium">{data.month}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#b6b1b2]">Monthly revenue (₱)</span>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#4caf50] rounded mr-2"></div>
                <span className="text-[#624d41]">Revenue</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-[#a50805] p-2 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div className="text-[#4caf50] font-medium text-sm">
              <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
              +2.1%
            </div>
          </div>
          <div className="text-3xl font-bold text-[#a50805] mb-2">98.5%</div>
          <p className="text-[#624d41] font-medium">System Uptime</p>
          <p className="text-[#b6b1b2] text-sm">Last 30 days</p>
          <div className="mt-3 bg-[#e9ecef] rounded-full h-2">
            <div className="bg-[#a50805] h-2 rounded-full" style={{ width: '98.5%' }}></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-[#2196f3] p-2 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div className="text-[#d32f2f] font-medium text-sm">
              <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
              -0.3s
            </div>
          </div>
          <div className="text-3xl font-bold text-[#2196f3] mb-2">2.3s</div>
          <p className="text-[#624d41] font-medium">Avg Load Time</p>
          <p className="text-[#b6b1b2] text-sm">Global average: 3.2s</p>
          <div className="mt-3 bg-[#e9ecef] rounded-full h-2">
            <div className="bg-[#2196f3] h-2 rounded-full" style={{ width: '72%' }}></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-[#ff9800] p-2 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              </svg>
            </div>
            <div className="text-[#4caf50] font-medium text-sm">
              <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
              +0.2
            </div>
          </div>
          <div className="text-3xl font-bold text-[#ff9800] mb-2">4.8/5</div>
          <p className="text-[#624d41] font-medium">User Rating</p>
          <p className="text-[#b6b1b2] text-sm">App Store reviews</p>
          <div className="mt-3 flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className={`w-4 h-4 ${star <= 4 ? 'text-[#ff9800]' : 'text-[#e9ecef]'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              </svg>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-[#4caf50] p-2 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div className="text-[#4caf50] font-medium text-sm">
              <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
              +5.7%
            </div>
          </div>
          <div className="text-3xl font-bold text-[#4caf50] mb-2">15.2K</div>
          <p className="text-[#624d41] font-medium">Daily Active Users</p>
          <p className="text-[#b6b1b2] text-sm">Peak: 18.3K yesterday</p>
          <div className="mt-3 bg-[#e9ecef] rounded-full h-2">
            <div className="bg-[#4caf50] h-2 rounded-full" style={{ width: '83%' }}></div>
          </div>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md">
          <h4 className="text-lg font-semibold text-[#624d41] mb-4">Top Traffic Sources</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[#624d41]">Direct</span>
              <span className="text-[#a50805] font-medium">45%</span>
            </div>
            <div className="w-full bg-[#e9ecef] rounded-full h-2">
              <div className="bg-[#a50805] h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#624d41]">Social Media</span>
              <span className="text-[#2196f3] font-medium">32%</span>
            </div>
            <div className="w-full bg-[#e9ecef] rounded-full h-2">
              <div className="bg-[#2196f3] h-2 rounded-full" style={{ width: '32%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#624d41]">Search Engines</span>
              <span className="text-[#4caf50] font-medium">23%</span>
            </div>
            <div className="w-full bg-[#e9ecef] rounded-full h-2">
              <div className="bg-[#4caf50] h-2 rounded-full" style={{ width: '23%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md">
          <h4 className="text-lg font-semibold text-[#624d41] mb-4">Device Breakdown</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#2196f3] rounded mr-3"></div>
                <span className="text-[#624d41]">Mobile</span>
              </div>
              <span className="text-[#624d41] font-medium">68%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#4caf50] rounded mr-3"></div>
                <span className="text-[#624d41]">Desktop</span>
              </div>
              <span className="text-[#624d41] font-medium">28%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#ff9800] rounded mr-3"></div>
                <span className="text-[#624d41]">Tablet</span>
              </div>
              <span className="text-[#624d41] font-medium">4%</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-6 rounded-xl border border-[#e9ecef] shadow-md">
          <h4 className="text-lg font-semibold text-[#624d41] mb-4">Quick Actions</h4>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg hover:bg-[#f8f9fa] transition-colors duration-200 flex items-center space-x-3">
              <svg className="w-5 h-5 text-[#a50805]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <span className="text-[#624d41]">Generate Report</span>
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-[#f8f9fa] transition-colors duration-200 flex items-center space-x-3">
              <svg className="w-5 h-5 text-[#2196f3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"></path>
              </svg>
              <span className="text-[#624d41]">Export Data</span>
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-[#f8f9fa] transition-colors duration-200 flex items-center space-x-3">
              <svg className="w-5 h-5 text-[#4caf50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span className="text-[#624d41]">Configure Alerts</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-[#624d41] mb-8">System Settings</h1>

      <div className="space-y-6">
        {/* Theme Settings */}
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-8 rounded-xl border border-[#e9ecef] shadow-md">
          <h2 className="text-2xl font-semibold text-[#624d41] mb-6">Theme Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#624d41] font-medium mb-3">Primary Color</label>
              <div className="flex items-center space-x-4">
                <input type="color" defaultValue="#a50805" className="w-12 h-12 rounded border border-[#e9ecef]" />
                <span className="text-[#624d41]">#a50805</span>
              </div>
            </div>
            <div>
              <label className="block text-[#624d41] font-medium mb-3">Secondary Color</label>
              <div className="flex items-center space-x-4">
                <input type="color" defaultValue="#d32f2f" className="w-12 h-12 rounded border border-[#e9ecef]" />
                <span className="text-[#624d41]">#d32f2f</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-8 rounded-xl border border-[#e9ecef] shadow-md">
          <h2 className="text-2xl font-semibold text-[#624d41] mb-6">Notification Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="bg-[#a50805] p-2 rounded-full">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-[#624d41] font-medium">Email Notifications</h3>
                  <p className="text-[#b6b1b2] text-sm">Send system alerts via email</p>
                </div>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-[#a50805] focus:ring-[#a50805]" />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="bg-[#a50805] p-2 rounded-full">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM4.868 12.683A17.925 17.925 0 0112 21c7.962 0 12-1.21 12-2.683m-12 2.683a17.925 17.925 0 01-7.132-8.317M12 21V9m0 0l3-3m-3 3L9 6m-3 8.317A17.925 17.925 0 013 12"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-[#624d41] font-medium">Push Notifications</h3>
                  <p className="text-[#b6b1b2] text-sm">Send push notifications to users</p>
                </div>
              </div>
              <input type="checkbox" className="w-5 h-5 text-[#a50805] focus:ring-[#a50805]" />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-gradient-to-br from-white to-[#f8f9fa] p-8 rounded-xl border border-[#e9ecef] shadow-md">
          <h2 className="text-2xl font-semibold text-[#624d41] mb-6">Security Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="bg-[#a50805] p-2 rounded-full">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-[#624d41] font-medium">Two-Factor Authentication</h3>
                  <p className="text-[#b6b1b2] text-sm">Require 2FA for admin accounts</p>
                </div>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-[#a50805] focus:ring-[#a50805]" />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="bg-[#a50805] p-2 rounded-full">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-[#624d41] font-medium">Session Timeout</h3>
                  <p className="text-[#b6b1b2] text-sm">Auto-logout after inactivity</p>
                </div>
              </div>
              <select className="border border-[#e9ecef] rounded px-3 py-1 text-[#624d41]">
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>2 hours</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="bg-[#a50805] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#d32f2f] hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Save Settings</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <TopNavbar user={user} />
      <div className="min-h-screen bg-white flex">
        {/* Admin Sidebar */}
        <div className="w-64 bg-gradient-to-b from-[#f8f9fa] to-white border-r border-[#e9ecef] shadow-lg">
          <div className="p-6">
            <h2 className="text-xl font-bold text-[#624d41] mb-6">Admin Panel</h2>
            <nav className="space-y-2">
              {adminNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-[#a50805] text-white shadow-md'
                      : 'text-[#624d41] hover:bg-[#f8f9fa] hover:shadow-sm'
                  }`}
                >
                  <div className="flex-shrink-0">
                    {item.icon}
                  </div>
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeSection === 'dashboard' && renderDashboard()}
          {activeSection === 'users' && renderUsers()}
          {activeSection === 'organizations' && renderOrganizations()}
          {activeSection === 'analytics' && renderAnalytics()}
          {activeSection === 'settings' && renderSettings()}
        </div>
      </div>


      {/* User Edit Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-[#624d41] mb-6">Edit User</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[#624d41] font-medium mb-2">Name</label>
                <input
                  type="text"
                  defaultValue={selectedUser.name}
                  className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805]"
                />
              </div>
              <div>
                <label className="block text-[#624d41] font-medium mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={selectedUser.email}
                  className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805]"
                />
              </div>
              <div>
                <label className="block text-[#624d41] font-medium mb-2">Role</label>
                <select
                  defaultValue={selectedUser.role}
                  className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805]"
                >
                  <option>User</option>
                  <option>Admin</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowUserModal(false)}
                className="px-6 py-2 text-[#624d41] border border-[#e9ecef] rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-[#a50805] text-white rounded-lg hover:bg-[#d32f2f] transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Organization Edit Modal */}
      {showOrgModal && selectedOrg && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-[#624d41] mb-6">Edit Organization</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[#624d41] font-medium mb-2">Organization Name</label>
                <input
                  type="text"
                  defaultValue={selectedOrg.name}
                  className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805]"
                />
              </div>
              <div>
                <label className="block text-[#624d41] font-medium mb-2">Type</label>
                <select
                  defaultValue={selectedOrg.type}
                  className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805]"
                >
                  <option>Community</option>
                  <option>Government</option>
                  <option>NGO</option>
                  <option>International NGO</option>
                </select>
              </div>
              <div>
                <label className="block text-[#624d41] font-medium mb-2">Location</label>
                <input
                  type="text"
                  defaultValue={selectedOrg.location}
                  className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805]"
                />
              </div>
              <div>
                <label className="block text-[#624d41] font-medium mb-2">Contact Person</label>
                <input
                  type="text"
                  defaultValue={selectedOrg.contactPerson}
                  className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a50805]"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowOrgModal(false)}
                className="px-6 py-2 text-[#624d41] border border-[#e9ecef] rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-[#a50805] text-white rounded-lg hover:bg-[#d32f2f] transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      <AddUserModal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        onSave={handleAddUser}
      />

      {/* Add Organization Modal */}
      <AddOrgModal
        isOpen={showAddOrgModal}
        onClose={() => setShowAddOrgModal(false)}
        onSave={handleAddOrg}
      />
    </>
  );
};

export default MainAdminPage;