import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

// Admin components
import StatsCard from './StatsCard';
import RecentActivityCard from './RecentActivityCard';

const Dashboard = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    newsCount: 0,
    eventsCount: 0,
    admissionsCount: 0,
    galleryItemsCount: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      fetchDashboardData();
    }
  }, [isAuthenticated, navigate]);

  const fetchDashboardData = async () => {
    // This would be replaced with actual API calls
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data for demonstration
      setStats({
        newsCount: 24,
        eventsCount: 12,
        admissionsCount: 85,
        galleryItemsCount: 156
      });
      
      setRecentActivity([
        { id: 1, type: 'news', title: 'Annual Science Fair Winners Announced', date: '2025-02-28T10:30:00Z', user: 'Sarah Johnson' },
        { id: 2, type: 'event', title: 'Parent-Teacher Conference', date: '2025-02-27T14:15:00Z', user: 'Michael Smith' },
        { id: 3, type: 'admission', title: 'New Student Registration (John Doe)', date: '2025-02-26T09:45:00Z', user: 'Admin User' },
        { id: 4, type: 'gallery', title: 'Sports Day Photo Album', date: '2025-02-25T16:20:00Z', user: 'Admin User' },
        { id: 5, type: 'news', title: 'School Awarded Excellence in Education Certificate', date: '2025-02-24T11:10:00Z', user: 'Sarah Johnson' }
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-30">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {user?.name || 'Administrator'}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button 
            onClick={fetchDashboardData} 
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md mr-2"
          >
            Refresh Data
          </button>
        </div>
      </div>
      
     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard 
          title="News Articles" 
          count={stats.newsCount} 
          icon="📰" 
          linkTo="/admin/news"
          color="bg-blue-500"
        />
        <StatsCard 
          title="Upcoming Events" 
          count={stats.eventsCount} 
          icon="🗓️" 
          linkTo="/admin/events"
          color="bg-green-500"
        />
        <StatsCard 
          title="Admission Applications" 
          count={stats.admissionsCount} 
          icon="📝" 
          linkTo="/admin/admissions"
          color="bg-amber-500"
        />
        <StatsCard 
          title="Gallery Items" 
          count={stats.galleryItemsCount} 
          icon="🖼️" 
          linkTo="/admin/gallery"
          color="bg-purple-500"
        />
      </div>
      

      {/* Admin Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 col-span-1 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          {recentActivity.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {recentActivity.map(activity => (
                <RecentActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No recent activity found</p>
          )}
          <div className="mt-4 text-center">
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              View All Activity
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Link 
              to="/admin/news/create" 
              className="block w-full text-left px-4 py-3 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium transition"
            >
              Add New News Article
            </Link>
            <Link 
              to="/admin/events/create" 
              className="block w-full text-left px-4 py-3 rounded-md bg-green-50 hover:bg-green-100 text-green-700 font-medium transition"
            >
              Create New Event
            </Link>
            <Link 
              to="/admin/gallery/upload" 
              className="block w-full text-left px-4 py-3 rounded-md bg-purple-50 hover:bg-purple-100 text-purple-700 font-medium transition"
            >
              Upload to Gallery
            </Link>
            <Link 
              to="/admin/admissions/review" 
              className="block w-full text-left px-4 py-3 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-700 font-medium transition"
            >
              Review Admissions
            </Link>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium text-gray-700 mb-3">System Information</h3>
            <div className="bg-gray-50 rounded-md p-4 text-sm">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Last Backup:</span>
                <span className="font-medium">March 1, 2025</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Database Status:</span>
                <span className="text-green-600 font-medium">Healthy</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">System Version:</span>
                <span className="font-medium">v2.3.1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Upcoming Events Preview */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Upcoming Events</h2>
          <Link to="/admin/events" className="text-blue-600 hover:text-blue-800 font-medium">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Parent-Teacher Conference</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">Mar 15, 2025</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">Main Hall</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Published
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">Edit</a>
                  <a href="#" className="text-red-600 hover:text-red-900">Delete</a>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Science Fair</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">Mar 22, 2025</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">Science Building</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Draft
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">Edit</a>
                  <a href="#" className="text-red-600 hover:text-red-900">Delete</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;