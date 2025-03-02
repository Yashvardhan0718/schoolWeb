import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiArrowLeft, FiShare2, FiChevronRight, FiChevronLeft } from 'react-icons/fi';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        // For development, using placeholder data
        // In production, use real API endpoints
        
        // Simulating API call for news detail
        setTimeout(() => {
          const mockNews = [
            {
              _id: '1',
              title: 'Annual Science Exhibition Showcases Student Innovation',
              content: `
                <p>The annual science exhibition featured over 50 innovative projects from students across all grades. The event drew large crowds including parents, educators from neighboring institutions, and representatives from local tech companies.</p>
                <p>This year's exhibition centered around the theme "Sustainable Innovation for the Future," challenging students to address real-world problems with environmentally conscious solutions. Projects ranged from renewable energy solutions to AI-powered educational tools and biodegradable packaging alternatives.</p>
                <p>Eighth-grader Maya Johnson won the Best Innovation award for her solar-powered water purification system designed for use in rural communities. "I was inspired by the global water crisis and wanted to create something that could help communities without reliable access to clean water," Maya explained.</p>
                <p>The high school division was dominated by a team of eleventh-grade students who developed a machine learning algorithm to predict crop yields based on weather patterns, soil conditions, and historical data. Their project garnered attention from agricultural technology companies, with two representatives offering summer internships to the team members.</p>
                <p>Education Institute Principal Dr. Sarah Williams expressed pride in the students' achievements. "What makes this exhibition special is that we're seeing young minds tackle complex global challenges with creativity and scientific rigor. These students aren't just learning science; they're using it to make a difference."</p>
                <p>The science department has already announced next year's theme, "Health Innovations," which will focus on medical and wellness technologies. Students have already begun brainstorming ideas for next year's exhibition.</p>
              `,
              image: 'https://source.unsplash.com/random/1200x600/?science',
              date: '2023-10-15',
              author: 'Admin Staff',
              category: 'Academic',
            },
            {
              _id: '2',
              title: 'Our Students Win National Debate Championship',
              content: `
                <p>Our debate team has brought home the trophy from the National Interschool Debate Championship. After months of preparation and preliminary rounds, our team of six students demonstrated exceptional critical thinking, research skills, and public speaking abilities to defeat 32 other schools from across the country.</p>
                <p>The team, consisting of Sophia Chen, Marcus Washington, Aiden Patel, Zoe Roberts, Daniel Kim, and Emma Thompson, tackled challenging topics including economic policy, international relations, and environmental regulations. Their final debate on climate policy was particularly praised by the judges for its depth of analysis and presentation quality.</p>
                <p>"This victory represents hundreds of hours of research, practice debates, and dedication," said debate coach Ms. Eleanor Richards. "The students showed remarkable resilience, especially when they had to argue positions they personally disagreed with—a true test of intellectual flexibility."</p>
                <p>Team captain Sophia Chen, a senior who has been accepted to Princeton University, attributed their success to teamwork and thorough preparation. "We made sure to understand all sides of each issue, anticipate counter-arguments, and practice responding to unexpected points. But most importantly, we supported each other throughout the entire process."</p>
                <p>The school administration has announced plans to expand the debate program next year, including the addition of a junior debate team for middle school students and increased funding for competition travel.</p>
                <p>The winning team will be honored at a special assembly next week, where they will demonstrate their skills in a friendly debate against a team of teachers.</p>
              `,
              image: 'https://source.unsplash.com/random/1200x600/?debate',
              date: '2023-10-10',
              author: 'Communications Team',
              category: 'Achievements',
            },
            {
              _id: '3',
              title: 'New Computer Lab Inauguration',
              content: `
                <p>State-of-the-art computer lab with 50 high-performance systems was inaugurated by the Education Minister yesterday. The new facility features the latest hardware and software, including specialized tools for programming, graphic design, and 3D modeling.</p>
                <p>The $500,000 investment represents our commitment to providing students with the technological skills they need for the future job market. Each workstation features a high-performance desktop computer with dual monitors, professional-grade graphics capabilities, and access to industry-standard software suites.</p>
                <p>"In today's digital economy, technological literacy is as fundamental as reading and writing," said Education Minister Dr. James Wilson during the ribbon-cutting ceremony. "This facility will help ensure students are prepared for the jobs of tomorrow, many of which haven't even been created yet."</p>
                <p>The lab has been designed with flexibility in mind, with modular furniture that can be reconfigured for different class needs—from traditional instruction to collaborative group work. A dedicated section includes specialized equipment for robotics programming and hardware development.</p>
                <p>Computer Science Department Head Ms. Priya Sharma outlined plans for expanded course offerings that will make use of the new lab. "We're introducing new electives in cybersecurity, app development, and data science starting next semester. These courses will give our students a competitive edge when applying to universities or entering the job market."</p>
                <p>The lab will also be available for after-school coding clubs and weekend technology workshops open to the broader community as part of the school's outreach program.</p>
              `,
              image: 'https://source.unsplash.com/random/1200x600/?computer',
              date: '2023-10-05',
              author: 'Admin Staff',
              category: 'Facilities',
            },
          ];
          
          const selectedNews = mockNews.find(item => item._id === id);
          
          // Get related news (excluding current one)
          const related = mockNews
            .filter(item => item._id !== id)
            .slice(0, 2);
          
          setNews(selectedNews);
          setRelatedNews(related);
          setLoading(false);
        }, 800);

        // In production, use the following:
        /*
        const response = await axios.get(`/api/news/${id}`);
        const relatedRes = await axios.get(`/api/news/related/${id}?limit=2`);
        
        setNews(response.data);
        setRelatedNews(relatedRes.data);
        setLoading(false);
        */
      } catch (error) {
        console.error('Error fetching news detail:', error);
        setLoading(false);
      }
    };

    fetchNewsDetail();
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="pt-16 flex justify-center items-center" style={{ minHeight: '50vh' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="pt-16 container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-secondary-900 mb-4">News article not found</h2>
        <p className="text-gray-600 mb-8">The news article you're looking for doesn't exist or has been removed.</p>
        <Link
          to="/news"
          className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          <FiArrowLeft className="mr-2" /> Back to News
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Page Header */}
      <section className="bg-primary-600 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block text-primary-100 mb-4">
            <Link to="/news" className="inline-flex items-center hover:underline">
              <FiArrowLeft className="mr-2" /> Back to News
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{news.title}</h1>
          <div className="flex justify-center items-center text-sm text-primary-100">
            <FiCalendar className="mr-2" />
            {new Date(news.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
            <span className="mx-2">•</span>
            <span>{news.category}</span>
            <span className="mx-2">•</span>
            <span>By {news.author}</span>
          </div>
        </div>
      </section>

      {/* News Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg overflow-hidden shadow-md mb-10"
            >
              {/* Featured Image */}
              <div className="h-96 overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="p-8">
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: news.content }}
                />
              </div>
              
              {/* Share Links */}
              <div className="px-8 pb-8 border-t border-gray-100 pt-6 flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-gray-700 mr-4">Share:</span>
                  <div className="flex space-x-2">
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                      <FiShare2 />
                    </button>
                    {/* You can add more social share buttons here */}
                  </div>
                </div>
                <Link
                  to="/news"
                  className="inline-flex items-center text-primary-600 hover:underline"
                >
                  Back to News <FiArrowLeft className="ml-2" />
                </Link>
              </div>
            </motion.div>
            
            {/* Navigation between articles */}
            <div className="flex justify-between mb-16">
              <button
                onClick={() => navigate(`/news/${parseInt(id) - 1}`)}
                disabled={parseInt(id) <= 1}
                className={`inline-flex items-center px-4 py-2 rounded-md ${
                  parseInt(id) <= 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-primary-600 hover:bg-primary-50 border border-primary-600'
                }`}
              >
                <FiChevronLeft className="mr-2" /> Previous Article
              </button>
              <button
                onClick={() => navigate(`/news/${parseInt(id) + 1}`)}
                className="inline-flex items-center px-4 py-2 rounded-md bg-white text-primary-600 hover:bg-primary-50 border border-primary-600"
              >
                Next Article <FiChevronRight className="ml-2" />
              </button>
            </div>

            {/* Related News */}
            {relatedNews.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-secondary-900 mb-6">Related News</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {relatedNews.map((item) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-md transition-shadow"
                    >
                      <Link to={`/news/${item._id}`}>
                        <div className="h-48 overflow-hidden">
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
                          <div className="text-primary-600 font-medium inline-flex items-center">
                            Read More <FiArrowLeft className="ml-1 rotate-180" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsDetail;