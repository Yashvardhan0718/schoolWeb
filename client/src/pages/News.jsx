import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiArrowRight, FiSearch } from 'react-icons/fi';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // For development, using placeholder data
        // In production, use real API endpoints
        
        // Simulating API call for news
        setTimeout(() => {
          const mockNews = [
            {
              _id: '1',
              title: 'Annual Science Exhibition Showcases Student Innovation',
              content: 'The annual science exhibition featured over 50 innovative projects from students across all grades. The event drew large crowds including parents, educators from neighboring institutions, and representatives from local tech companies. Projects ranged from renewable energy solutions to AI-powered educational tools. Several students received offers for summer internships based on their impressive work.',
              image: 'https://source.unsplash.com/random/600x400/?science',
              date: '2023-10-15',
            },
            {
              _id: '2',
              title: 'Our Students Win National Debate Championship',
              content: 'Our debate team has brought home the trophy from the National Interschool Debate Championship. After months of preparation and preliminary rounds, our team of six students demonstrated exceptional critical thinking, research skills, and public speaking abilities to defeat 32 other schools from across the country. The final debate on climate policy was particularly praised by the judges for its depth of analysis.',
              image: 'https://source.unsplash.com/random/600x400/?debate',
              date: '2023-10-10',
            },
            {
              _id: '3',
              title: 'New Computer Lab Inauguration',
              content: 'State-of-the-art computer lab with 50 high-performance systems was inaugurated by the Education Minister. The new facility features the latest hardware and software, including specialized tools for programming, graphic design, and 3D modeling. This investment represents our commitment to providing students with the technological skills they need for the future job market.',
              image: 'https://source.unsplash.com/random/600x400/?computer',
              date: '2023-10-05',
            },
            {
              _id: '4',
              title: 'International Cultural Exchange Program Announced',
              content: 'We are excited to announce a new cultural exchange program with partner schools in Japan, Germany, and Brazil. Selected students will have the opportunity to spend a semester abroad, living with host families and experiencing different educational systems. This program aims to foster global citizenship and cross-cultural understanding among our student body.',
              image: 'https://source.unsplash.com/random/600x400/?international',
              date: '2023-09-28',
            },
            {
              _id: '5',
              title: 'Physical Education Program Receives National Recognition',
              content: 'Our comprehensive physical education program has been recognized as one of the best in the country by the National Sports Education Council. The award acknowledges our balanced approach to fitness, sports skill development, and promoting lifelong healthy habits. Special mention was made of our inclusive adaptations that ensure all students can participate regardless of physical ability.',
              image: 'https://source.unsplash.com/random/600x400/?sports',
              date: '2023-09-20',
            },
            {
              _id: '6',
              title: 'New Partnership with Local Business Community',
              content: 'We have established a new partnership program with twenty local businesses to provide internship opportunities for our senior students. This initiative will allow students to gain practical work experience in fields ranging from healthcare to engineering to finance. Each internship will include a mentorship component and potential scholarship opportunities.',
              image: 'https://source.unsplash.com/random/600x400/?business',
              date: '2023-09-15',
            },
            {
              _id: '7',
              title: 'Robotics Team Advances to International Competition',
              content: `After winning the regional and national championships, our robotics team has qualified for the International Robotics Olympiad to be held in Geneva next month. The team's innovative solution to this year's challenge of sustainable urban transportation impressed judges at every level of competition. The school is organizing fundraising activities to support the team's travel expenses.`,
              image: 'https://source.unsplash.com/random/600x400/?robotics',
              date: '2023-09-08',
            },
            {
              _id: '8',
              title: 'Alumni Achievement: Former Student Named in Forbes 30 Under 30',
              content: `We are proud to announce that our alumnus, Dr. Sarah Johnson (Class of 2016), has been named in this year's Forbes 30 Under 30 list for her groundbreaking research in renewable energy storage solutions. Dr. Johnson credits her interest in environmental science to the research projects she conducted during her time at our school. She will be returning next month to deliver a special lecture to our current students.`,
              image: 'https://source.unsplash.com/random/600x400/?achievement',
              date: '2023-09-01',
            },
            {
              _id: '9',
              title: 'New Arts Wing Construction Begins',
              content: 'Construction has begun on our new arts wing, which will include dedicated studios for visual arts, music practice rooms, a dance studio, and a 200-seat black box theater. This $3.5 million project, funded primarily through alumni donations, represents our commitment to providing comprehensive arts education. The facilities are expected to be ready for use by the beginning of the next academic year.',
              image: 'https://source.unsplash.com/random/600x400/?construction',
              date: '2023-08-25',
            },
          ];
          
          setNews(mockNews);
          setTotalPages(Math.ceil(mockNews.length / 6));
          setLoading(false);
        }, 800);

        // In production, use the following:
        /*
        const response = await axios.get(`/api/news?page=${currentPage}&search=${searchTerm}`);
        setNews(response.data.news);
        setTotalPages(response.data.totalPages);
        setLoading(false);
        */
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, [currentPage, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    // The actual search is handled in the useEffect
  };

  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const newsPerPage = 6;
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);
  const actualTotalPages = Math.ceil(filteredNews.length / newsPerPage);

  return (
    <div className="pt-16">
      {/* Page Header */}
      <section className="bg-primary-600 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">School News</h1>
          <p className="text-lg text-primary-100 max-w-3xl mx-auto">
            Stay updated with the latest happenings, achievements, and announcements from our institution.
          </p>
        </div>
      </section>

      {/* News Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="mb-12 max-w-md mx-auto">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow px-4 py-3 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-primary-600 text-white px-4 py-3 rounded-r-md hover:bg-primary-700 transition-colors"
              >
                <FiSearch className="text-xl" />
              </button>
            </form>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : currentNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentNews.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-md transition-shadow"
                >
                  <Link to={`/news/${item._id}`}>
                    <div className="h-52 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <FiCalendar className="mr-2" />
                        {new Date(item.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                      <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {item.content}
                      </p>
                      <div className="text-primary-600 font-medium inline-flex items-center">
                        Read More <FiArrowRight className="ml-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl text-gray-600">No news items found matching your search.</h3>
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Pagination */}
          {!loading && actualTotalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <nav className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-l-md border border-gray-300 ${
                    currentPage === 1 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Previous
                </button>
                
                {[...Array(actualTotalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 border-t border-b border-gray-300 ${
                      currentPage === i + 1
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, actualTotalPages))}
                  disabled={currentPage === actualTotalPages}
                  className={`px-4 py-2 rounded-r-md border border-gray-300 ${
                    currentPage === actualTotalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Sign Up */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Get the latest news and updates delivered directly to your inbox.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-l-md sm:rounded-r-none border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent mb-3 sm:mb-0"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary-600 text-white font-medium rounded-md sm:rounded-l-none hover:bg-primary-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default News;