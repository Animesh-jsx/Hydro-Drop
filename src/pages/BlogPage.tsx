import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ArrowRight, Calendar, Mail, ChevronLeft, ChevronRight } from 'lucide-react'
import PageTransition from '../components/common/PageTransition'
import HeroBanner from '../components/common/HeroBanner'
import AnimatedSection from '../components/common/AnimatedSection'

const featuredPost = {
  title: 'The Importance of Minerals in Your Daily Water',
  category: 'Science',
  date: 'October 24, 2025',
  excerpt: 'Not all water is created equal. Learn why trace minerals like calcium, magnesium, and potassium are crucial for optimal hydration and...',
  image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&auto=format&fit=crop&q=80',
}

const blogPosts = [
  { title: '5 Signs You\'re Dehydrated (And Don\'t Know It)', category: 'Wellness', date: 'October 15, 2025', author: 'Sarah Jenkins', image: 'https://images.unsplash.com/photo-1559839914-17aae19cec71?w=400&auto=format&fit=crop&q=80' },
  { title: 'Our Journey to 100% rPET Bottles', category: 'Sustainability', date: 'October 08, 2025', author: 'Dr. Elias Thorne', image: 'https://images.unsplash.com/photo-1606168094336-48f205276929?w=400&auto=format&fit=crop&q=80' },
  { title: 'Morning Routine: Start With Water', category: 'Lifestyle', date: 'September 29, 2025', author: 'Diana Ross', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&auto=format&fit=crop&q=80' },
  { title: 'Alkaline vs. Regular Water', category: 'Science', date: 'September 22, 2025', author: 'Dr. Elias Thorne', image: 'https://images.unsplash.com/photo-1519455953755-af066f52f1a6?w=400&auto=format&fit=crop&q=80' },
  { title: 'Hydration for Athletes', category: 'Wellness', date: 'September 15, 2025', author: 'Mike Johnson', image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80' },
  { title: 'Giving Back: The Clean Water Project', category: 'Community', date: 'September 01, 2025', author: 'Sarah Jenkins', image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&auto=format&fit=crop&q=80' },
]

const categories = [
  { name: 'All Posts', count: 42 },
  { name: 'Wellness', count: 15 },
  { name: 'Science of Water', count: 8 },
  { name: 'Sustainability', count: 12 },
  { name: 'Lifestyle', count: 7 },
]

const trendingTags = ['#Hydration', '#Minerals', '#EcoFriendly', '#HealthTips', '#Fitness', '#ZeroWaste']

export default function BlogPage() {
  const [currentPage] = useState(1)

  return (
    <PageTransition>
      <HeroBanner
        label="Insights & News"
        title="Hydration & Wellness Blog"
        subtitle="Discover the science of purity, wellness tips, and the latest from the world of Hydra Drop."
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Featured Post */}
              <AnimatedSection>
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-lg transition-shadow mb-12 group">
                  <span className="absolute top-4 left-4 z-10 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    FEATURED
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 relative">
                    <div className="aspect-square md:aspect-auto overflow-hidden">
                      <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                        <Calendar size={14} />
                        <span>{featuredPost.date}</span>
                        <span>•</span>
                        <span className="text-primary font-medium">{featuredPost.category}</span>
                      </div>
                      <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">{featuredPost.title}</h3>
                      <p className="text-gray-600 text-sm mb-6">{featuredPost.excerpt}</p>
                      <a href="#" className="text-primary font-semibold text-sm flex items-center gap-2 group/link">
                        Read Full Article <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Blog Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((post, i) => (
                  <motion.div
                    key={post.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-md transition-all group cursor-pointer"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <span className="absolute top-3 left-3 z-10 bg-primary/90 text-white text-xs font-medium px-2.5 py-1 rounded-md">
                        {post.category}
                      </span>
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-gray-400 mb-2">{post.date}</p>
                      <h4 className="font-bold text-gray-900 mb-2 line-clamp-2 text-sm">{post.title}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">By {post.author}</span>
                        <span className="text-primary text-xs font-semibold">Read</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-2 mt-12">
                <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50">
                  <ChevronLeft size={16} />
                </button>
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    className={`w-10 h-10 rounded-lg font-medium text-sm ${
                      currentPage === page
                        ? 'bg-primary text-white'
                        : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <span className="w-10 h-10 flex items-center justify-center text-gray-400">...</span>
                <button className="w-10 h-10 rounded-lg border border-gray-200 font-medium text-sm text-gray-600 hover:bg-gray-50">8</button>
                <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Search */}
              <AnimatedSection delay={0.1}>
                <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-xs">
                  <h4 className="font-bold text-gray-900 mb-4">Search</h4>
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Type and hit enter..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                  </div>
                </div>
              </AnimatedSection>

              {/* Categories */}
              <AnimatedSection delay={0.2}>
                <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-xs">
                  <h4 className="font-bold text-gray-900 mb-4">Categories</h4>
                  <ul className="space-y-3">
                    {categories.map((cat) => (
                      <li key={cat.name} className="flex items-center justify-between text-sm">
                        <a href="#" className="text-gray-600 hover:text-primary transition-colors">{cat.name}</a>
                        <span className="bg-emerald-50 text-primary text-xs font-medium px-2 py-0.5 rounded-full">{cat.count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>

              {/* Trending Tags */}
              <AnimatedSection delay={0.3}>
                <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-xs">
                  <h4 className="font-bold text-gray-900 mb-4">Trending Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {trendingTags.map((tag) => (
                      <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-full hover:bg-primary hover:text-white cursor-pointer transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Newsletter */}
              <AnimatedSection delay={0.4}>
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100 p-6">
                  <Mail size={28} className="text-primary mb-4" />
                  <h4 className="font-bold text-gray-900 mb-2">Don't Miss Out</h4>
                  <p className="text-sm text-gray-600 mb-4">Get the latest hydration tips delivered to your inbox.</p>
                  <input type="email" placeholder="Email address" className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm mb-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                  <button className="w-full bg-primary hover:bg-emerald-600 text-white py-2.5 rounded-lg font-semibold text-sm transition-colors">
                    Subscribe
                  </button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
