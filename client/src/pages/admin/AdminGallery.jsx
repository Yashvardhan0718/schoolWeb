import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AdminGallery = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [galleryItems, setGalleryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [currentView, setCurrentView] = useState('grid');

  useEffect(() => {
    if (isAuthenticated) {
      fetchGalleryItems();
    }
  }, [isAuthenticated]);

  const fetchGalleryItems = async () => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data for demonstration
      setGalleryItems([
        {
          id: 1,
          title: 'Sports Day Photo Album',
          description: 'Pictures from the annual sports day event',
          thumbnailUrl: '/api/placeholder/300/200',
          imageCount: 24,
          category: 'events',
          uploadedBy: 'Admin User',
          uploadDate: '2025-02-25T16:20:00Z',
          isPublic: true,
          featured: true
        },
        {
          id: 2,
          title: 'Science Fair Projects',
          description: 'Student science fair exhibits and awards ceremony',
          thumbnailUrl: '/api/placeholder/300/200',
          imageCount: 36,
          category: 'academic',
          uploadedBy: 'Sarah Johnson',
          uploadDate: '2025-02-10T14:15:00Z',
          isPublic: true,
          featured: false
        },
        {
          id: 3,
          title: 'School Building and Facilities',
          description: 'Images of our campus buildings and facilities',
          thumbnailUrl: '/api/placeholder/300/200',
          imageCount: 15,
          category: 'campus',
          uploadedBy: 'Michael Smith',
          uploadDate: '2025-01-20T09:30:00Z',
          isPublic: true,
          featured: true
        },
        {
          id: 4,
          title: 'Drama Club Performance',
          description: 'Images from the winter drama performance',
          thumbnailUrl: '/api/placeholder/300/200',
          imageCount: 42,
          category: 'arts',
          uploadedBy: 'Emily Wilson',
          uploadDate: '2025-02-05T18:45:00Z',
          isPublic: false,
          featured: false
        },
        {
          id: 5,
          title: 'Staff Portraits',
          description: 'Professional portraits of our teaching staff',
          thumbnailUrl: '/api/placeholder/300/200',
          imageCount: 18,
          category: 'staff',
          uploadedBy: 'Admin User',
          uploadDate: '2025-01-15T11:30:00Z',
          isPublic: true,
          featured: false
        },
        {
          id: 6,
          title: 'Field Trip to Science Museum',
          description: 'Photos from the 8th grade field trip',
          thumbnailUrl: '/api/placeholder/300/200',
          imageCount: 30,
          category: 'fieldtrips',
          uploadedBy: 'Sarah Johnson',
          uploadDate: '2025-02-18T13:20:00Z',
          isPublic: true,
          featured: false
        }
      ]);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteGalleryItem = (id) => {
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      // In a real app, you would call an API here
      setGalleryItems(galleryItems.filter(item => item.id !== id));
    }
  };

  const toggleFeatured = (id) => {
    setGalleryItems(
      galleryItems.map(item => 
        item.id === id 
          ? { ...item, featured: !item.featured } 
          : item
      )
    );
  };

  const toggleVisibility = (id) => {
    setGalleryItems(
      galleryItems.map(item => 
        item.id === id 
          ? { ...item, isPublic: !item.isPublic } 
          : item
      )
    );
  };

  const filteredGalleryItems = galleryItems
    .filter(item => 
      (currentFilter === 'all' || 
       (currentFilter === 'featured' && item.featured) ||
       (currentFilter === 'public' && item.isPublic) ||
       (currentFilter === 'private' && !item.isPublic) ||
       currentFilter === item.category) &&
      (item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-30">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gallery Management</h1>
          <p className="text-gray-600 mt-1">Manage photo albums and media collections</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link 
            to="/admin/gallery/upload" 
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md mr-2"
          >
            Upload Photos
          </Link>
          <Link 
            to="/admin/gallery/create-album" 
            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md"
          >
            Create Album
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-wrap gap-2">
            <button 
              className={`px-3 py-1 rounded-md text-sm ${currentFilter === 'all' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setCurrentFilter('all')}
            >
              All
            </button>
            <button 
              className={`px-3 py-1 rounded-md text-sm ${currentFilter === 'featured' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setCurrentFilter('featured')}
            >
              Featured
            </button>
            <button 
              className={`px-3 py-1 rounded-md text-sm ${currentFilter === 'public' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setCurrentFilter('public')}
            >
              Public
            </button>
            <button 
              className={`px-3 py-1 rounded-md text-sm ${currentFilter === 'private' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setCurrentFilter('private')}
            >
              Private
            </button>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search gallery..."
              className="w-full px-4 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex justify-end">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                className={`px-4 py-2 text-sm font-medium rounded-l-md border ${
                  currentView === 'grid' 
                    ? 'bg-gray-200 text-gray-700 border-gray-300' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setCurrentView('grid')}
              >
                Grid
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-r-md border-t border-r border-b ${
                  currentView === 'list' 
                    ? 'bg-gray-200 text-gray-700 border-gray-300' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setCurrentView('list')}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Items */}
      {filteredGalleryItems.length > 0 ? (
        currentView === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGalleryItems.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={item.thumbnailUrl} 
                  alt={item.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                    <div className="flex space-x-1">
                      {item.featured && (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          Featured
                        </span>
                      )}
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        item.isPublic ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.isPublic ? 'Public' : 'Private'}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  <div className="mt-2 text-xs text-gray-500">
                    <p>{item.imageCount} photos • Uploaded by {item.uploadedBy}</p>
                    <p>Category: {item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>
                    <p>Upload date: {new Date(item.uploadDate).toLocaleDateString()}</p>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <Link 
                      to={`/admin/gallery/view/${item.id}`}
                      className="text-purple-600 hover:text-purple-900 text-sm font-medium"
                    >
                      View Album
                    </Link>
                    <div>
                      <button 
                        onClick={() => toggleVisibility(item.id)} 
                        className="text-gray-600 hover:text-gray-900 text-sm font-medium mr-3"
                      >
                        {item.isPublic ? 'Make Private' : 'Make Public'}
                      </button>
                      <button 
                        onClick={() => toggleFeatured(item.id)} 
                        className="text-blue-600 hover:text-blue-900 text-sm font-medium mr-3"
                      >
                        {item.featured ? 'Unfeature' : 'Feature'}
                      </button>
                      <button 
                        onClick={() => deleteGalleryItem(item.id)} 
                        className="text-red-600 hover:text-red-900 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Album
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
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
                {filteredGalleryItems.map(item => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-md object-cover" src={item.thumbnailUrl} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.title}</div>
                          <div className="text-sm text-gray-500">{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{item.description}</div>
                      <div className="text-sm text-gray-500">{item.imageCount} photos</div>
                      <div className="text-sm text-gray-500">Uploaded: {new Date(item.uploadDate).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-1">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.isPublic ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.isPublic ? 'Public' : 'Private'}
                        </span>
                        {item.featured && (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/admin/gallery/view/${item.id}`} className="text-purple-600 hover:text-purple-900 mr-3">
                        View
                      </Link>
                      <Link to={`/admin/gallery/edit/${item.id}`} className="text-blue-600 hover:text-blue-900 mr-3">
                        Edit
                      </Link>
                      <button 
                        onClick={() => toggleVisibility(item.id)} 
                        className="text-gray-600 hover:text-gray-900 mr-3"
                      >
                        {item.isPublic ? 'Make Private' : 'Make Public'}
                      </button>
                      <button 
                        onClick={() => toggleFeatured(item.id)} 
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        {item.featured ? 'Unfeature' : 'Feature'}
                      </button>
                      <button 
                        onClick={() => deleteGalleryItem(item.id)} 
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <div className="bg-white rounded-lg shadow-md py-8 text-center text-gray-500">
          <p>No gallery items found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;