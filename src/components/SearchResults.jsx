import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Clock, BarChart, Wrench, Star, ChevronRight, AlertCircle } from 'lucide-react';
import '../componentStyles/SearchResults.css';

const getDifficultyClass = (difficulty) => {
  if (!difficulty || typeof difficulty !== 'string') return 'moderate';
  const normalized = difficulty.toLowerCase().trim();
  return ['easy', 'moderate', 'hard'].includes(normalized) ? normalized : 'moderate';
};

const SearchResults = ({ results, isLoading, error }) => {
  // Memoize processed results to prevent unnecessary re-renders
  const processedResults = useMemo(() => {
    if (!results) return { guides: [], products: [] };
    
    return {
      guides: results.guides?.map(guide => ({
        ...guide,
        difficulty: typeof guide.difficulty === 'string' ? guide.difficulty : 'Moderate',
        duration: guide.duration || '0',
        description: guide.description || 'No description available',
        tools: Array.isArray(guide.tools) ? guide.tools : []
      })) || [],
      products: results.products?.map(product => ({
        ...product,
        name: product.name || 'Unnamed Product',
        description: product.description || 'No description available',
        price: {
          currency: product?.price?.currency || '$',
          value: typeof product?.price?.value === 'number' ? product.price.value : 0
        },
        stock: typeof product?.stock === 'number' ? product.stock : 0,
        averageRating: typeof product?.averageRating === 'number' ? product.averageRating : 0,
        ratings: Array.isArray(product?.ratings) ? product.ratings : []
      })) || []
    };
  }, [results]);

  // Error state
  if (error) {
    return (
      <div className="search-results-error">
        <div className="error-state">
          <AlertCircle size={32} />
          <h3>Oops! Something went wrong</h3>
          <p>{error.message || 'There was an error processing your search. Please try again.'}</p>
          <button 
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Initial loading state
  if (isLoading && (!processedResults.guides.length && !processedResults.products.length)) {
    return (
      <div className="search-results-loading">
        <div className="loading-spinner"></div>
        <p>Searching for the best matches...</p>
      </div>
    );
  }

  // Empty state
  if (!isLoading && (!processedResults.guides.length && !processedResults.products.length)) {
    return (
      <div className="search-results-empty">
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No matches found</h3>
          <p>Try adjusting your search terms or filters for better results.</p>
          <ul className="search-tips">
            <li>Check for typos or misspellings</li>
            <li>Use more general terms</li>
            <li>Try different keywords</li>
            <li>Remove filters to broaden your search</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className={`search-results ${isLoading ? 'is-loading' : ''}`}>
      {isLoading && (
        <div className="results-loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}

      {processedResults.guides.length > 0 && (
        <div className="results-section">
          <div className="section-header">
            <h2>Repair Guides</h2>
            <span className="result-count">{processedResults.guides.length} guides found</span>
          </div>
          <div className="guides-list">
            {processedResults.guides.map((guide) => (
              <Link to={`/guides/${guide._id}`} key={guide._id} className="guide-card">
                <div className="guide-image-container">
                  {guide.image ? (
                    <img 
                      src={guide.image} 
                      alt={guide.title} 
                      className="guide-image" 
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder-guide.png';
                      }}
                    />
                  ) : (
                    <div className="guide-image-placeholder">
                      <Wrench size={32} />
                    </div>
                  )}
                  <div className="guide-difficulty" data-difficulty={getDifficultyClass(guide.difficulty)}>
                    {guide.difficulty}
                  </div>
                </div>
                <div className="guide-info">
                  <h3>{guide.title}</h3>
                  <p className="guide-description">{guide.description}</p>
                  <div className="guide-metadata">
                    <span className="metadata-item" title="Duration">
                      <Clock size={16} />
                      {guide.duration} mins
                    </span>
                    <span className="metadata-item" title="Difficulty">
                      <BarChart size={16} />
                      {guide.difficulty}
                    </span>
                    <span className="metadata-item" title="Required Tools">
                      <Wrench size={16} />
                      {guide.tools.length} tools
                    </span>
                  </div>
                  <div className="guide-footer">
                    <span className="view-guide">
                      View Guide <ChevronRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {processedResults.products.length > 0 && (
        <div className="results-section">
          <div className="section-header">
            <h2>Parts & Tools</h2>
            <span className="result-count">{processedResults.products.length} items found</span>
          </div>
          <div className="products-list">
            {processedResults.products.map((product) => (
              <Link 
                to={`/store/${product.category}/${product._id}`} 
                key={product._id} 
                className="product-card"
              >
                <div className="product-image-container">
                  {product.images?.[0]?.url ? (
                    <img 
                      src={product.images[0].url} 
                      alt={product.name} 
                      className="product-image"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder-product.png';
                      }}
                    />
                  ) : (
                    <div className="product-image-placeholder">
                      <Wrench size={32} />
                    </div>
                  )}
                  <div className={`product-badge ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </div>
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-details">
                    <p className="product-price">
                      {product.price.currency} {product.price.value.toFixed(2)}
                    </p>
                    {product.averageRating > 0 && (
                      <div className="product-rating" title={`${product.averageRating.toFixed(1)} out of 5 stars`}>
                        <div className="stars">
                          {[...Array(5)].map((_, index) => (
                            <Star
                              key={index}
                              size={16}
                              className={index < Math.round(product.averageRating) ? 'filled' : ''}
                            />
                          ))}
                        </div>
                        <span className="rating-count">({product.ratings.length})</span>
                      </div>
                    )}
                  </div>
                  <div className="product-footer">
                    <span className="view-product">
                      View Details <ChevronRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults; 