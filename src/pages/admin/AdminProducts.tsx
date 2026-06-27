import { useState, useEffect } from 'react';
import { Search, Plus, Grid, List, Edit2, CheckCircle } from 'lucide-react';
import { productsAPI } from '../../services/api';

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadProducts();
  }, [categoryFilter, searchQuery]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productsAPI.getAll(
        categoryFilter !== 'all' ? categoryFilter : undefined,
        searchQuery || undefined
      );
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'still': return 'STILL';
      case 'sparkling': return 'SPARKLING';
      case 'functional': return 'FUNCTIONAL';
      case 'alkaline': return 'ALKALINE';
      default: return cat.toUpperCase();
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'still': return 'bg-gray-800 text-white';
      case 'sparkling': return 'bg-blue-600 text-white';
      case 'functional': return 'bg-purple-600 text-white';
      case 'alkaline': return 'bg-emerald-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Catalog</h1>
          <p className="text-gray-500">Manage your active listings, inventory, and product details.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
            Bulk Actions ▾
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-900 text-white rounded-lg text-sm font-medium hover:bg-emerald-800">
            <Plus className="w-4 h-4" /> Add New Product
          </button>
        </div>
      </div>

      {/* Tabs & View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex gap-6 border-b border-gray-200">
          {['all', 'still', 'sparkling', 'functional', 'alkaline'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                categoryFilter === cat
                  ? 'border-emerald-900 text-emerald-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {cat === 'all' ? 'All Products' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">View:</span>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-emerald-900 text-white' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-emerald-900 text-white' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search catalog..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Products Grid/List */}
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-900"></div>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-square bg-gray-50">
                <span className={`absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold ${getCategoryColor(product.category)}`}>
                  {getCategoryLabel(product.category)}
                </span>
                {product.isActive && (
                  <CheckCircle className="absolute top-3 right-3 w-5 h-5 text-blue-500 fill-blue-500" />
                )}
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-xs text-gray-500">{product.volume} • {product.description?.slice(0, 30)}...</p>
                  </div>
                  <span className="font-bold text-gray-900">₹{product.price}</span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <span className={`text-xs font-medium ${product.stock <= product.lowStockThreshold ? 'text-red-600' : 'text-green-600'}`}>
                    • {product.stock.toLocaleString('en-IN')} in stock
                  </span>
                  <button className="text-gray-400 hover:text-emerald-700">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-left text-xs text-gray-500 uppercase">
                <th className="px-6 py-3 font-medium">Product</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Volume</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Stock</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getCategoryColor(product.category)}`}>
                      {getCategoryLabel(product.category)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{product.volume}</td>
                  <td className="px-6 py-4 font-medium">₹{product.price}</td>
                  <td className="px-6 py-4">
                    <span className={product.stock <= product.lowStockThreshold ? 'text-red-600' : 'text-green-600'}>
                      {product.stock.toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-gray-400 hover:text-emerald-700">
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
