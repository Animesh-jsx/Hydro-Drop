import { Link } from 'react-router-dom'

const trendingProducts = [
  {
    name: 'The Classic Still',
    price: '$45.00 / Case',
    image: 'https://pixabay.com/get/ge6e4ed715f92b8a3f4ce72ff36835c6fc8bed884778be89d2e5bfbcc0b48537cc8b6b16a25cab805d3c802a5d907f99a.jpg',
  },
  {
    name: 'Arctic Sparkling',
    price: '$52.00 / Case',
    image: 'https://pixabay.com/get/gb87c1bb02e62f1b745bfabefad9541efe3a342b5e4b30c2a2326cc279d1a1d8e1d7075d03dbe420b1fec18fcbb77d93d.jpg',
  },
  {
    name: 'Infusion Series',
    price: '$60.00 / Case',
    image: 'https://pixabay.com/get/ge319951da1f7a5e13d4b39ae7bb92816bd9c5e4618229748055007db79f3a5ec802bfa2b2f830ca353590d6738f2b1d4.jpg',
  },
]

export default function TrendingProducts() {
  return (
    <div className="mt-16 sm:mt-20">
      {/* Divider with label */}
      <div className="flex items-center gap-4 mb-10">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase">
          Trending Now
        </span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {trendingProducts.map((product) => (
          <Link
            key={product.name}
            to="/products"
            className="group"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 mb-3">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-primary font-medium mt-0.5">{product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
