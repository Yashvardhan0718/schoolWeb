import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AdminNews = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [newsArticles, setNewsArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');

  useEffect(() => {
    if (isAuthenticated) {
      fetchNewsArticles();
    }
  }, [isAuthenticated]);

  const fetchNewsArticles = async () => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data for demonstration
      setNewsArticles([
        { 
          id: 1, 
          title: 'Annual Science Fair Winners Announced', 
          summary: 'Congratulations to all participants in this year\'s science fair...', 
          date: '2025-02-28T10:30:00Z', 
          author: 'Sarah Johnson',
          status: 'published',
          featured: true
        },
        { 
          id: 2, 
          title: 'School Awarded Excellence in Education Certificate', 
          summary: 'We are proud to announce that our school has received recognition...', 
          date: '2025-02-24T11:10:00Z', 
          author: 'Sarah Johnson',
          status: 'published',
          featured: false
        },
        { 
          id: 3, 
          title: 'New STEM Program Launching Next Semester', 
          summary: 'We are excited to share our new Science, Technology, Engineering...', 
          date: '2025-02-20T09:15:00Z', 
          author: 'Michael Smith',
          status: 'draft',
          featured: false
        },
        { 
          id: 4, 
          title: 'Student Council Election Results', 
          summary: 'The results of this year\'s student council elections are in...', 
          date: '2025-02-18T14:45:00Z', 
          author: 'Admin User',
          status: 'published',
          featured: true
        },
        { 
          id: 5, 
          title: 'Fall Sports Season Signups', 
          summary: 'Registration for fall sports teams begins next week. Students interested...', 
          date: '2025-02-15T08:30:00Z', 
          author: 'Admin User',
          status: 'scheduled',
          featured: false
        }
      ]);
    } catch (error) {
      console.error('Error fetching news articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteArticle = (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      // In a real app, you would call an API here
      setNewsArticles(newsArticles.filter(article => article.id !== id));
    }
  };

  const toggleFeatured = (id) => {
    setNewsArticles(
      newsArticles.map(article => 
        article.id === id 
          ? { ...article, featured: !article.featured } 
          : article
      )
    );
  };

  const filteredNews = newsArticles
    .filter(article => 
      (currentFilter === 'all' || article.status === currentFilter) &&
      (article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       article.summary.toLowerCase().includes(searchTerm.toLowerCase()))
    );

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
          <h1 className="text-3xl font-bold text-gray-800">News Management</h1>
          <p className="text-gray-600 mt-1">Create, edit, and manage school news articles</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link 
            to="/admin/news/create" 
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
          >
            Create New Article
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex space-x-2 mb-4 md:mb-0">
            <button 
              className={`px-4 py-2 rounded-md ${currentFilter === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setCurrentFilter('all')}
            >
              All
            </button>
            <button 
              className={`px-4 py-2 rounded-md ${currentFilter === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setCurrentFilter('published')}
            >
              Published
            </button>
            <button 
              className={`px-4 py-2 rounded-md ${currentFilter === 'draft' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setCurrentFilter('draft')}
            >
              Drafts
            </button>
            <button 
              className={`px-4 py-2 rounded-md ${currentFilter === 'scheduled' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setCurrentFilter('scheduled')}
            >
              Scheduled
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full md:w-64 px-4 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* News Articles List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {filteredNews.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Featured
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredNews.map(article => (
                  <tr key={article.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{article.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{article.summary}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(article.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{article.author}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${article.status === 'published' ? 'bg-green-100 text-green-800' : 
                          article.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-purple-100 text-purple-800'}`}
                      >
                        {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => toggleFeatured(article.id)}
                        className={`px-2 py-1 rounded text-xs font-semibold
                          ${article.featured ? 
                            'bg-blue-100 text-blue-800 hover:bg-blue-200' : 
                            'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                      >
                        {article.featured ? 'Featured' : 'Not Featured'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/admin/news/edit/${article.id}`} className="text-blue-600 hover:text-blue-900 mr-3">
                        Edit
                      </Link>
                      <button 
                        onClick={() => deleteArticle(article.id)} 
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
        ) : (
          <div className="py-8 text-center text-gray-500">
            <p>No news articles found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNews;