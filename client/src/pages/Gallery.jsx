import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiImage, FiFilter, FiGrid, FiList } from 'react-icons/fi';

const Gallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [filteredGalleries, setFilteredGalleries] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'academic', name: 'Academic' },
    { id: 'sports', name: 'Sports' },
    { id: 'cultural', name: 'Cultural' },
    { id: 'events', name: 'Events' },
  ];

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        // Simulating API call for galleries
        setTimeout(() => {
          const mockGalleries = [
            {
              _id: '1',
              title: 'Annual Science Exhibition 2023',
              description: 'Showcasing innovative projects from our talented students',
              coverImage: 'https://source.unsplash.com/random/800x600/?science',
              category: 'academic',
              date: '2023-10-15',
              images: [
                'https://source.unsplash.com/random/800x600/?laboratory',
                'https://source.unsplash.com/random/800x600/?experiment',
                'https://source.unsplash.com/random/800x600/?chemistry',
                'https://source.unsplash.com/random/800x600/?biology',
              ],
            },
            {
              _id: '2',
              title: 'Annual Sports Day 2023',
              description: 'Celebrating athletic excellence and team spirit',
              coverImage: 'https://source.unsplash.com/random/800x600/?sports',
              category: 'sports',
              date: '2023-09-25',
              images: [
                'https://source.unsplash.com/random/800x600/?running',
                'https://source.unsplash.com/random/800x600/?football',
                'https://source.unsplash.com/random/800x600/?basketball',
                'https://source.unsplash.com/random/800x600/?athletics',
              ],
            },
            {
              _id: '3',
              title: 'Cultural Fest 2023',
              description: 'A vibrant celebration of art, music, and culture',
              coverImage: 'https://source.unsplash.com/random/800x600/?culture',
              category: 'cultural',
              date: '2023-08-10',
              images: [
                'https://source.unsplash.com/random/800x600/?dance',
                'https://source.unsplash.com/random/800x600/?music',
                'https://source.unsplash.com/random/800x600/?art',
                'https://source.unsplash.com/random/800x600/?performance',
              ],
            },
            {
              _id: '4',
              title: 'Teacher\'s Day Celebration',
              description: 'Honoring our dedicated faculty members',
              coverImage: 'https://source.unsplash.com/random/800x600/?teacher',
              category: 'events',
              date: '2023-09-05',
              images: [
                'https://source.unsplash.com/random/800x600/?classroom',
                'https://source.unsplash.com/random/800x600/?education',
                'https://source.unsplash.com/random/800x600/?lecture',
                'https://source.unsplash.com/random/800x600/?graduation',
              ],
            },
            {
              _id: '5',
              title: 'Annual Debate Competition',
              description: 'Showcasing critical thinking and oratory skills',
              coverImage: 'https://source.unsplash.com/random/800x600/?debate',
              category: 'academic',
              date: '2023-07-20',
              images: [
                'https://source.unsplash.com/random/800x600/?speech',
                'https://source.unsplash.com/random/800x600/?conference',
                'https://source.unsplash.com/random/800x600/?presentation',
                'https://source.unsplash.com/random/800x600/?meeting',
              ],
            },
            {
              _id: '6',
              title: 'Independence Day Celebrations',
              description: 'Patriotic festivities and cultural performances',
              coverImage: 'https://source.unsplash.com/random/800x600/?flag',
              category: 'events',
              date: '2023-08-15',
              images: [
                'https://source.unsplash.com/random/800x600/?patriotic',
                'https://source.unsplash.com/random/800x600/?national',
                'https://source.unsplash.com/random/800x600/?celebration',
                'https://source.unsplash.com/random/800x600/?parade',
              ],
            },
          ];
          
          setGalleries(mockGalleries);
          setFilteredGalleries(mockGalleries);
          setLoading(false);
        }, 800);

        // In production, use the following:
        /*
        const res = await axios.get('/api/galleries');
        setGalleries(res.data);
        setFilteredGalleries(res.data);
        setLoading(false);
        */
      } catch (error) {
        console.error('Error fetching galleries:', error);
        setLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredGalleries(galleries);
    } else {
      setFilteredGalleries(galleries.filter(gallery => gallery.category === selectedCategory));
    }
  }, [selectedCategory, galleries]);

  const [selectedGallery, setSelectedGallery] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (gallery, index = 0) => {
    setSelectedGallery(gallery);
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === selectedGallery.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? selectedGallery.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-primary-600 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Photo Gallery
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-1 bg-white mx-auto mb-6"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-primary-100 text-lg max-w-2xl mx-auto"
          >
            Explore memorable moments and events captured at our institution
          </motion.p>
        </div>
      </section>

      {/* Gallery Control Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="flex items-center">
              <FiFilter className="text-gray-500 mr-2" />
              <h3 className="text-secondary-900 font-medium mr-4">Filter by:</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <h3 className="text-secondary-900 font-medium mr-4">View:</h3>
              <div className="flex bg-white rounded-lg overflow-hidden border border-gray-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${
                    viewMode === 'grid'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FiGrid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${
                    viewMode === 'list'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FiList size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Items */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : filteredGalleries.length === 0 ? (
            <div className="text-center py-12">
              <FiImage size={60} className="mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-500 mb-2">No galleries found</h2>
              <p className="text-gray-500">
                No galleries match the selected category. Please try another filter.
              </p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGalleries.map((gallery) => (
                <motion.div
                  key={gallery._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-md transition-shadow"
                  onClick={() => openLightbox(gallery)}
                >
                  <div className="h-56 overflow-hidden cursor-pointer">
                    <img
                      src={gallery.coverImage}
                      alt={gallery.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="px-3 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded-full">
                        {categories.find(cat => cat.id === gallery.category)?.name || gallery.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(gallery.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                      {gallery.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {gallery.description}
                    </p>
                    <div className="flex -mx-1 mt-4">
                      {gallery.images.slice(0, 4).map((image, index) => (
                        <div 
                          key={index} 
                          className="px-1 w-1/4 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            openLightbox(gallery, index);
                          }}
                        >
                          <div className="h-16 bg-gray-100 rounded overflow-hidden">
                            <img 
                              src={image} 
                              alt={`${gallery.title} - ${index + 1}`} 
                              className="w-full h-full object-cover hover:scale-110 transition-transform"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredGalleries.map((gallery) => (
                <motion.div
                  key={gallery._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row">
                    <div 
                      className="md:w-1/3 h-56 md:h-auto overflow-hidden cursor-pointer"
                      onClick={() => openLightbox(gallery)}
                    >
                      <img
                        src={gallery.coverImage}
                        alt={gallery.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="px-3 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded-full">
                          {categories.find(cat => cat.id === gallery.category)?.name || gallery.category}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(gallery.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                        {gallery.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {gallery.description}
                      </p>
                      <div className="flex -mx-1 mt-4">
                        {gallery.images.slice(0, 4).map((image, index) => (
                          <div 
                            key={index} 
                            className="px-1 w-16 cursor-pointer"
                            onClick={() => openLightbox(gallery, index)}
                          >
                            <div className="h-16 bg-gray-100 rounded overflow-hidden">
                              <img 
                                src={image} 
                                alt={`${gallery.title} - ${index + 1}`} 
                                className="w-full h-full object-cover hover:scale-110 transition-transform"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && selectedGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="absolute top-4 right-4 z-10">
            <button 
              onClick={closeLightbox}
              className="text-white p-2 hover:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="absolute top-1/2 left-4 z-10">
            <button 
              onClick={prevImage}
              className="text-white p-2 hover:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          </div>
          <div className="absolute top-1/2 right-4 z-10">
            <button 
              onClick={nextImage}
              className="text-white p-2 hover:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
          <div className="max-w-4xl max-h-screen p-4">
            <img 
              src={selectedGallery.images[currentImageIndex]} 
              alt={`${selectedGallery.title} - ${currentImageIndex + 1}`} 
              className="max-w-full max-h-[80vh] mx-auto"
            />
            <div className="text-white text-center mt-4">
              <h3 className="text-xl font-medium">{selectedGallery.title}</h3>
              <p className="text-gray-300 mt-2">{currentImageIndex + 1} of {selectedGallery.images.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;