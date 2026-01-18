import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('about');
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  // Project likes state
  const [likes, setLikes] = useState({
    carskart: 42,
    canvaskart: 38,
    movieverse: 51
  });

  const projects = [
    {
      id: 'carskart',
      title: 'CarsKart',
      description: 'A dedicated car browsing and rental platform designed to connect car owners and customers in one seamless ecosystem. Features car listing, browsing, booking, and secure rental management.',
      tech: 'React • TailwindCSS • Framer Motion • Node.js • Express • MongoDB • JWT',
      image: '../images/carskart.png',
      url: 'https://carskart-bookyourcars.onrender.com/',
      gradient: 'from-orange-500/20 to-red-500/20'
    },
    {
      id: 'canvaskart',
      title: 'CanvasKart',
      description: 'An e-commerce platform for artists to showcase, sell, and manage paintings online. Provides a visually rich shopping experience with detailed artwork pages and secure purchasing.',
      tech: 'MERN Stack • TailwindCSS • Framer Motion • JWT',
      image: '../images/canvaskart.png',
      url: 'https://canvascart-frontend.onrender.com/',
      gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
      id: 'movieverse',
      title: 'MovieVerse',
      description: 'Interactive movie discovery platform where users explore movies, watch trailers, read reviews, and filter by genres, ratings, and popularity with a clean browsing experience.',
      tech: 'MERN Stack • TailwindCSS • Framer Motion • TMDB • OMDB API',
      image: '../images/movieverse.png',
      url: 'https://movieverse-frontend-xvf2.onrender.com/',
      gradient: 'from-red-500/20 to-yellow-500/20'
    }
  ];

  const skills = {
    frontend: ['React.js', 'HTML', 'CSS', 'TailwindCSS', 'Framer Motion'],
    backend: ['Node.js', 'Express.js', 'MongoDB', 'MySQL', 'JWT', 'Postman'],
    languages: ['JavaScript', 'Java', 'Python', 'C'],
    interests: ['Database Management Systems', 'Web Development', 'Computer Networks', 'Object-Oriented Programming']
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLike = (projectId) => {
    setLikes(prev => ({
      ...prev,
      [projectId]: prev[projectId] + 1
    }));
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#0a0e27] text-white overflow-x-hidden">
      {/* Subtle Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(96, 165, 250, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(96, 165, 250, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Fixed Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e27]/80 backdrop-blur-xl border-b border-blue-500/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <motion.div 
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            SR
          </motion.div>
          <div className="flex gap-8">
            {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`relative text-sm uppercase tracking-wider transition-colors ${
                  activeSection === item.toLowerCase() ? 'text-blue-400' : 'text-gray-400 hover:text-white'
                }`}
                whileHover={{ y: -2 }}
              >
                {item}
                {activeSection === item.toLowerCase() && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero / About Section */}
      <section id="about" className="relative min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: 3D Image */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative"
          >
            <motion.div
              className="relative w-full aspect-square rounded-2xl overflow-hidden"
              style={{
                transform: 'perspective(1000px) rotateY(-5deg)',
                boxShadow: '0 50px 100px -20px rgba(59, 130, 246, 0.5)'
              }}
              whileHover={{ 
                scale: 1.02,
                rotateY: 0,
                transition: { duration: 0.3 }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 mix-blend-overlay" />
              <img 
                src="../images/sruthi.jpg" 
                alt="Sruthi R"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
            </motion.div>
            {/* Floating accent */}
            <motion.div
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-50"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.7, 0.5]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.div>

          {/* Right: About Content */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.p 
                className="text-blue-400 text-sm uppercase tracking-widest mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Full Stack Developer
              </motion.p>
              <motion.h1 
                className="text-6xl lg:text-7xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Sruthi R
              </motion.h1>
            </motion.div>

            <motion.p
              className="text-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Crafting scalable web solutions with modern technologies. Passionate about creating seamless user experiences through clean code and thoughtful design.
            </motion.p>

            <motion.p
              className="text-gray-400 italic border-l-2 border-blue-500/50 pl-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              "Building innovative projects that drive both personal growth and organizational success"
            </motion.p>

            <motion.div
              className="flex gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.a
                href="../images/resume_2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold shadow-lg shadow-blue-500/50"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(59, 130, 246, 0.6)' }}
                whileTap={{ scale: 0.95 }}
              >
                View Resume
              </motion.a>
              <motion.button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 border border-blue-500/50 rounded-lg font-semibold hover:bg-blue-500/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              className="grid grid-cols-3 gap-6 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {[
                { label: 'Projects', value: '3+' },
                { label: 'CGPA', value: '8.08' },
                { label: 'Certifications', value: '2+' }
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">Tech Arsenal</h2>
            <p className="text-gray-400">Tools & technologies I work with</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, items], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.2 }}
              >
                <motion.div
                  className="relative p-8 rounded-2xl bg-gradient-to-br from-blue-950/50 to-cyan-950/30 border border-blue-500/20 h-full flex flex-col"
                  whileHover={{ 
                    y: -10,
                    boxShadow: '0 30px 60px -15px rgba(59, 130, 246, 0.4)'
                  }}
                  style={{
                    transform: 'perspective(1000px)',
                  }}
                >
                  <h3 className="text-2xl font-bold mb-6 capitalize bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    {category === 'interests' ? 'Area of Interest' : category}
                  </h3>
                  <div className="flex flex-wrap gap-3 flex-1">
                    {items.map((skill, i) => (
                      <motion.span
                        key={skill}
                        className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: categoryIndex * 0.2 + i * 0.05 }}
                        whileHover={{ 
                          scale: 1.1,
                          backgroundColor: 'rgba(59, 130, 246, 0.2)',
                          boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition-all duration-300" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-4">Featured Work</h2>
            <p className="text-gray-400">A selection of projects that showcase my expertise</p>
          </motion.div>

          <div className="space-y-32">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id}
                project={project}
                index={index}
                likes={likes[project.id]}
                onLike={() => handleLike(project.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl -z-10" />
            
            <motion.h2 
              className="text-6xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Let's Create Together
            </motion.h2>
            
            <motion.p
              className="text-xl text-gray-300 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Open to opportunities and collaborations. Let's build something amazing.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <motion.a
                href="mailto:sruthirangaraj03@gmail.com"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold text-lg shadow-lg shadow-blue-500/50"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(59, 130, 246, 0.6)' }}
                whileTap={{ scale: 0.95 }}
              >
                sruthirangaraj03@gmail.com
              </motion.a>
            </motion.div>

            <motion.div
              className="flex gap-6 justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              {[
                { name: 'GitHub', url: 'https://github.com/Sruthirangaraj03' },
                { name: 'LeetCode', url: 'https://leetcode.com/u/sruthir_12/' },
                { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sruthirangaraj03/' }
              ].map((social, i) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-blue-500/30 rounded-lg hover:bg-blue-500/10 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ scale: 1.05, borderColor: 'rgba(59, 130, 246, 0.8)' }}
                >
                  {social.name}
                </motion.a>
              ))}
            </motion.div>

            <motion.p
              className="text-gray-500 mt-16 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              © 2026 Sruthi R. Designed & Developed with passion.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ project, index, likes, onLike }) => {
  const [isLiked, setIsLiked] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  const handleLikeClick = () => {
    setIsLiked(true);
    onLike();
    setTimeout(() => setIsLiked(false), 600);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
        index % 2 === 1 ? 'lg:flex-row-reverse' : ''
      }`}
    >
      {/* Project Image */}
      <motion.div
        className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}
        initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          className="relative overflow-hidden rounded-2xl aspect-video group"
          whileHover={{ scale: 1.02 }}
          style={{
            transform: 'perspective(1000px)',
            boxShadow: '0 50px 100px -20px rgba(59, 130, 246, 0.3)'
          }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} mix-blend-overlay z-10`} />
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl z-20" />
          
          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
          >
            <motion.a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-black rounded-lg font-semibold"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              View Live →
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Project Info */}
      <motion.div
        className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}
        initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div>
          <motion.h3 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            {project.title}
          </motion.h3>
          <motion.p
            className="text-gray-300 text-lg leading-relaxed mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            {project.description}
          </motion.p>
          <motion.p
            className="text-sm text-blue-400 font-mono"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
          >
            {project.tech}
          </motion.p>
        </div>

        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <motion.a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-blue-500/50 rounded-lg hover:bg-blue-500/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Visit Project
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Portfolio;