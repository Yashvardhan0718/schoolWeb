import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AdminAdmissions = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [statistics, setStatistics] = useState({
    total: 0,
    pending: 0,
    underReview: 0,
    approved: 0,
    rejected: 0,
    waitlisted: 0
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchApplications();
    }
  }, [isAuthenticated]);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data for demonstration
      const mockApplications = [
        {
          id: 1,
          studentName: 'John Doe',
          grade: '9th Grade',
          applicationDate: '2025-02-01T10:15:00Z',
          status: 'pending',
          parentName: 'Robert & Mary Doe',
          contactEmail: 'rdoe@example.com',
          contactPhone: '(555) 123-4567',
          currentSchool: 'Lincoln Middle School',
          documents: ['Application Form', 'Transcripts', 'Recommendation Letter'],
          notes: 'Interested in science program'
        },
        {
          id: 2,
          studentName: 'Emma Johnson',
          grade: '6th Grade',
          applicationDate: '2025-01-28T14:30:00Z',
          status: 'under_review',
          parentName: 'Thomas & Sarah Johnson',
          contactEmail: 'sjohnson@example.com',
          contactPhone: '(555) 987-6543',
          currentSchool: 'Washington Elementary',
          documents: ['Application Form', 'Transcripts'],
          notes: 'Sibling already enrolled in 8th grade'
        },
        {
          id: 3,
          studentName: 'Michael Smith',
          grade: '11th Grade',
          applicationDate: '2025-01-15T09:45:00Z',
          status: 'approved',
          parentName: 'James & Patricia Smith',
          contactEmail: 'psmith@example.com',
          contactPhone: '(555) 456-7890',
          currentSchool: 'Transfer from Jefferson High',
          documents: ['Application Form', 'Transcripts', 'Recommendation Letters', 'Test Scores'],
          notes: 'Excellent academic record, interested in advanced placement courses'
        },
        {
          id: 4,
          studentName: 'Sophia Garcia',
          grade: '7th Grade',
          applicationDate: '2025-02-10T11:20:00Z',
          status: 'pending',
          parentName: 'Carlos & Elena Garcia',
          contactEmail: 'egarcia@example.com',
          contactPhone: '(555) 789-0123',
          currentSchool: 'Madison Middle School',
          documents: ['Application Form', 'Transcripts'],
          notes: 'Interested in arts program'
        },
        {
          id: 5,
          studentName: 'William Taylor',
          grade: '10th Grade',
          applicationDate: '2025-01-20T16:10:00Z',
          status: 'waitlisted',
          parentName: 'Daniel & Susan Taylor',
          contactEmail: 'staylor@example.com',
          contactPhone: '(555) 234-5678',
          currentSchool: 'Roosevelt High School',
          documents: ['Application Form', 'Transcripts', 'Test Scores'],
          notes: 'Strong extracurricular activities record'
        },
        {
          id: 6,
          studentName: 'Olivia Martinez',
          grade: '9th Grade',
          applicationDate: '2025-01-05T13:40:00Z',
          status: 'rejected',
          parentName: 'Anthony & Maria Martinez',
          contactEmail: 'mmartinez@example.com',
          contactPhone: '(555) 345-6789',
          currentSchool: 'Lincoln Middle School',
          documents: ['Application Form', 'Transcripts', 'Test Scores'],
          notes: 'Application incomplete, missing recommendation letters'
        },
        {
          id: 7,
          studentName: 'Ethan Wilson',
          grade: '6th Grade',
          applicationDate: '2025-02-15T10:30:00Z',
          status: 'pending',
          parentName: 'Brian & Jennifer Wilson',
          contactEmail: 'jwilson@example.com',
          contactPhone: '(555) 567-8901',
          currentSchool: 'Washington Elementary',
          documents: ['Application Form', 'Transcripts'],
          notes: 'Interested in sports programs'
        }
      ];

      setApplications(mockApplications);

      // Calculate statistics
      const stats = {
        total: mockApplications.length,
        pending: mockApplications.filter((app) => app.status === 'pending').length,
        underReview: mockApplications.filter((app) => app.status === 'under_review').length,
        approved: mockApplications.filter((app) => app.status === 'approved').length,
        rejected: mockApplications.filter((app) => app.status === 'rejected').length,
        waitlisted: mockApplications.filter((app) => app.status === 'waitlisted').length
      };

      setStatistics(stats);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const changeApplicationStatus = (id, newStatus) => {
    setApplications(applications.map((app) => (app.id === id ? { ...app, status: newStatus } : app)));

    // Update statistics after status change
    const updatedApplications = applications.map((app) =>
      app.id === id ? { ...app, status: newStatus } : app
    );

    const updatedStats = {
      total: updatedApplications.length,
      pending: updatedApplications.filter((app) => app.status === 'pending').length,
      underReview: updatedApplications.filter((app) => app.status === 'under_review').length,
      approved: updatedApplications.filter((app) => app.status === 'approved').length,
      rejected: updatedApplications.filter((app) => app.status === 'rejected').length,
      waitlisted: updatedApplications.filter((app) => app.status === 'waitlisted').length
    };

    setStatistics(updatedStats);
  };

  const deleteApplication = (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      // In a real app, you would call an API here
      const updatedApplications = applications.filter((app) => app.id !== id);
      setApplications(updatedApplications);

      // Update statistics after deletion
      const updatedStats = {
        total: updatedApplications.length,
        pending: updatedApplications.filter((app) => app.status === 'pending').length,
        underReview: updatedApplications.filter((app) => app.status === 'under_review').length,
        approved: updatedApplications.filter((app) => app.status === 'approved').length,
        rejected: updatedApplications.filter((app) => app.status === 'rejected').length,
        waitlisted: updatedApplications.filter((app) => app.status === 'waitlisted').length
      };

      setStatistics(updatedStats);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'under_review':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'waitlisted':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status) => {
    switch (status) {
      case 'under_review':
        return 'Under Review';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const filteredApplications = applications.filter(
    (app) =>
      (currentFilter === 'all' || app.status === currentFilter) &&
      (app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.contactEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.grade.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
      </div>
    );
  }

return (
    <div className="container mx-auto px-4 py-8 pt-30">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Admissions Management</h1>
                <p className="text-gray-600 mt-1">Review and process student admission applications</p>
            </div>
            <div className="mt-4 md:mt-0">
                <Link
                    to="/admin/admissions/new"
                    className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md"
                >
            Create New Application
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm font-medium text-gray-500">Total</p>
          <p className="text-2xl font-bold text-gray-800">{statistics.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm font-medium text-yellow-500">Pending</p>
          <p className="text-2xl font-bold text-gray-800">{statistics.pending}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm font-medium text-blue-500">Under Review</p>
          <p className="text-2xl font-bold text-gray-800">{statistics.underReview}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm font-medium text-green-500">Approved</p>
          <p className="text-2xl font-bold text-gray-800">{statistics.approved}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm font-medium text-red-500">Rejected</p>
          <p className="text-2xl font-bold text-gray-800">{statistics.rejected}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm font-medium text-purple-500">Waitlisted</p>
          <p className="text-2xl font-bold text-gray-800">{statistics.waitlisted}</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
            <button
              className={`px-3 py-1 rounded-md text-sm ${
                currentFilter === 'all' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setCurrentFilter('all')}
            >
              All
            </button>
            <button
              className={`px-3 py-1 rounded-md text-sm ${
                currentFilter === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setCurrentFilter('pending')}
            >
              Pending
            </button>
            <button
              className={`px-3 py-1 rounded-md text-sm ${
                currentFilter === 'under_review' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setCurrentFilter('under_review')}
            >
              Under Review
            </button>
            <button
              className={`px-3 py-1 rounded-md text-sm ${
                currentFilter === 'approved' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setCurrentFilter('approved')}
            >
              Approved
            </button>
            <button
              className={`px-3 py-1 rounded-md text-sm ${
                currentFilter === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setCurrentFilter('rejected')}
            >
              Rejected
            </button>
            <button
              className={`px-3 py-1 rounded-md text-sm ${
                currentFilter === 'waitlisted' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setCurrentFilter('waitlisted')}
            >
              Waitlisted
            </button>
          </div>
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search by Name, Email, Grade..."
              className="w-full px-3 py-1 border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-amber-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M13.293 14.707a1 1 0 01-1.414 1.414l-3.586-3.586a5 5 0 111.414-1.414l3.586 3.586zM9 13a4 4 0 100-8 4 4 0 000 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm text-gray-600">Student Name</th>
              <th className="px-4 py-2 text-left text-sm text-gray-600">Grade</th>
              <th className="px-4 py-2 text-left text-sm text-gray-600">Application Date</th>
              <th className="px-4 py-2 text-left text-sm text-gray-600">Status</th>
              <th className="px-4 py-2 text-left text-sm text-gray-600">Parent Name</th>
              <th className="px-4 py-2 text-left text-sm text-gray-600">Contact Email</th>
              <th className="px-4 py-2 text-left text-sm text-gray-600">Contact Phone</th>
              <th className="px-4 py-2 text-left text-sm text-gray-600">Current School</th>
              <th className="px-4 py-2 text-left text-sm text-gray-600">Documents</th>
              <th className="px-4 py-2 text-left text-sm text-gray-600">Notes</th>
              <th className="px-4 py-2 text-left text-sm text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app) => (
              <tr key={app.id} className="border-b border-gray-200">
                <td className="px-4 py-2 text-sm text-gray-800">{app.studentName}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{app.grade}</td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {new Date(app.applicationDate).toLocaleString()}
                </td>
                <td className={`px-4 py-2 text-sm ${getStatusBadgeClass(app.status)}`}>
                  {formatStatus(app.status)}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">{app.parentName}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{app.contactEmail}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{app.contactPhone}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{app.currentSchool}</td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  <ul>
                    {app.documents.map((doc, index) => (
                      <li key={index}>{doc}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">{app.notes}</td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  <div className="flex items-center gap-2">
                    <button
                      className="text-xs text-gray-600 hover:text-gray-800"
                      onClick={() => changeApplicationStatus(app.id, 'approved')}
                    >
                      Approve
                    </button>
                    <button
                      className="text-xs text-gray-600 hover:text-gray-800"
                      onClick={() => changeApplicationStatus(app.id, 'rejected')}
                    >
                      Reject
                    </button>
                    <button
                      className="text-xs text-red-600 hover:text-red-800"
                      onClick={() => deleteApplication(app.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAdmissions;