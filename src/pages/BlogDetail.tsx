import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, ChefHat } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://admin.highspirits.au/api/blogs?populate=featuredImage');
        if (!response.ok) {
          throw new Error('Failed to fetch blog');
        }
        const data = await response.json();
        
        // Find the blog by slug
        const foundBlog = data.data.find((blog: any) => blog.slug === slug);
        if (!foundBlog) {
          throw new Error('Blog not found');
        }

        const formattedBlog = {
          id: foundBlog.id,
          title: foundBlog.title,
          excerpt: foundBlog.excerpt,
          author: foundBlog.author,
          date: new Date(foundBlog.publishedAt).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          image: foundBlog.featuredImage?.url || 'https://images.unsplash.com/photo-1596040050519-e9e775e0a87f?w=1200&h=600&fit=crop',
          category: 'Culinary',
          slug: foundBlog.slug,
          content: foundBlog.content,
        };

        setBlog(formattedBlog);
        document.title = `${foundBlog.title} | High Spirits Blog`;
        
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', foundBlog.excerpt);
        }
        
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load blog');
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <main className="bg-primary min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-3xl">
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full mx-auto mb-4"
                />
                <p className="text-muted-foreground">Loading blog...</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !blog) {
    return (
      <main className="bg-primary min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-3xl">
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <p className="text-red-500 mb-4">Error: {error || 'Blog not found'}</p>
                <Link
                  to="/blogs"
                  className="inline-flex items-center space-x-2 px-6 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Blogs</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-primary min-h-screen">
      <Navbar />

      {/* Hero Section with Image Background */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-80 md:h-[500px] overflow-hidden mt-20 rounded-2xl mx-4 md:mx-auto md:max-w-6xl"
      >
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
        
        {/* Back Button - Floating */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-6 left-6 md:left-8 z-10"
        >
          <Link
            to="/blogs"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-black/40 backdrop-blur-md text-white rounded-lg hover:bg-black/60 transition-all duration-300 border border-white/20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm md:text-base">Back</span>
          </Link>
        </motion.div>
      </motion.section>

      {/* Blog Content Container */}
      <section className="px-4 pb-20">
        <div className="container mx-auto max-w-4xl -mt-16 md:-mt-24 relative z-20">
          {/* Header Card with glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-secondary/60 to-secondary/40 backdrop-blur-xl border border-accent/30 rounded-3xl p-8 md:p-12 mb-12 shadow-2xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-luxury mb-6 leading-tight"
            >
              {blog.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed"
            >
              {blog.excerpt}
            </motion.p>

            {/* Enhanced Meta Information */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4 md:gap-6 border-t border-accent/20 pt-6"
            >
              <div className="flex items-center space-x-3 group">
                <div className="bg-accent/20 p-3 rounded-xl group-hover:bg-accent/30 transition-all">
                  <User className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">By Author</p>
                  <p className="text-lg font-semibold text-luxury">{blog.author}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="bg-accent/20 p-3 rounded-xl group-hover:bg-accent/30 transition-all">
                  <Calendar className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Published</p>
                  <p className="text-lg font-semibold text-luxury">{blog.date}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Article Content with enhanced styling */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-br from-secondary/40 to-secondary/20 border border-accent/20 rounded-3xl p-8 md:p-12 mb-12 backdrop-blur-sm"
          >
            <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-base md:text-lg space-y-4">
              {blog.content}
            </div>
          </motion.article>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0 my-12" />

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center py-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-luxury mb-4">Continue Your Journey</h2>
              <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto">
                Discover more culinary insights, chef stories, and dining experiences
              </p>
              <Link
                to="/blogs"
                className="inline-flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-accent to-accent/80 text-accent-foreground font-semibold rounded-xl hover:shadow-xl hover:shadow-accent/40 transition-all duration-300 transform hover:scale-105 border border-accent/50"
              >
                <ChefHat className="w-5 h-5" />
                <span>Explore All Articles</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BlogDetail;
