import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Blogs = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = 'Blogs | High Spirits Indian Restaurant';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Explore our blog for insights into Indian cuisine, chef tips, restaurant stories, and dining experiences at High Spirits.'
      );
    }
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://admin.highspirits.au/api/blogs?populate=featuredImage');
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        
        // Transform API data to match component format
        const posts = data.data.map((blog: any) => ({
          id: blog.id,
          title: blog.title,
          excerpt: blog.excerpt,
          author: blog.author,
          date: new Date(blog.publishedAt).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          image: blog.featuredImage?.url || 'https://images.unsplash.com/photo-1596040050519-e9e775e0a87f?w=600&h=400&fit=crop',
          category: 'Culinary',
          slug: blog.slug,
          content: blog.content,
        }));
        
        setBlogPosts(posts);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load blogs');
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <main className="bg-primary">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-44 pb-16 px-4 relative overflow-hidden">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-luxury mb-6">
              Blogs
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Dive into stories, recipes, and insights from the world of fine Indian dining
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-20 px-4">
        <div className="container mx-auto">
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full mx-auto mb-4"
                />
                <p className="text-muted-foreground">Loading blogs...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <p className="text-red-500 mb-4">Error loading blogs: {error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-all"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {!loading && !error && blogPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <Link
                  key={post.id}
                  to={`/blogs/${post.slug}`}
                  className="no-underline"
                >
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group bg-secondary/50 rounded-lg overflow-hidden border border-accent/20 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 flex flex-col h-full cursor-pointer"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden bg-secondary">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                          img.style.display = 'none';
                          const placeholder = document.createElement('div');
                          placeholder.innerHTML = `<svg class="w-12 h-12 text-accent/30" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 2c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8z"/><path d="M8 10l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
                          img.parentElement?.appendChild(placeholder);
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-playfair font-bold text-luxury mb-3 group-hover:text-accent transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 flex-grow line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="space-y-3 border-t border-accent/20 pt-4 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{post.date}</span>
                        </div>
                      </div>

                      {/* Read More */}
                      <div className="inline-flex items-center space-x-2 text-accent font-medium group-hover:space-x-3 transition-all duration-300">
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
          )}

          {!loading && !error && blogPosts.length === 0 && (
            <div className="flex justify-center items-center py-20">
              <p className="text-muted-foreground">No blogs available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 border-t border-accent/20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-luxury mb-6">
              Have a Question?
            </h2>
            <p className="text-muted-foreground mb-8">
              Couldn't find what you're looking for? Reach out to us and we'll be happy to help.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-all duration-300 hover:shadow-lg hover:shadow-accent/30"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Blogs;