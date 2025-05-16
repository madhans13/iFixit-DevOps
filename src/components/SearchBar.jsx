import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { api } from '../services/api';
import SearchResults from './SearchResults';
import '../componentStyles/SearchBar.css';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    deviceType: '',
    brand: '',
    difficulty: '',
    partType: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const searchTimeoutRef = useRef(null);
  const abortControllerRef = useRef(null);
  const searchContainerRef = useRef(null);

  const deviceTypes = ['Phone', 'Laptop', 'Tablet', 'Desktop'];
  const brands = ['Apple', 'Samsung', 'Asus', 'OnePlus', 'Dell', 'HP', 'Lenovo'];
  const difficulties = ['Easy', 'Moderate', 'Difficult', 'Expert'];
  const partTypes = ['Screen', 'Battery', 'Motherboard', 'Camera', 'Speaker'];

  const performSearch = useCallback(async (query, currentFilters) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    if (!query && !Object.values(currentFilters).some(f => f)) {
      setResults(null);
      setIsLoading(false);
      setError(null);
      setShowResults(false);
      return;
    }

    abortControllerRef.current = new AbortController();

    try {
      setIsLoading(true);
      setError(null);
      setShowResults(true);

      const [guidesResponse, productsResponse] = await Promise.all([
        api.getGuides({
          search: query,
          category: currentFilters.deviceType.toLowerCase(),
          difficulty: currentFilters.difficulty,
          signal: abortControllerRef.current.signal
        }),
        api.getProducts({
          search: query,
          category: currentFilters.partType.toLowerCase(),
          signal: abortControllerRef.current.signal
        })
      ]);

      if (!abortControllerRef.current.signal.aborted) {
        setResults({
          guides: guidesResponse || [],
          products: productsResponse || []
        });
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        setError(error);
        console.error('Search failed:', error);
      }
    } finally {
      if (!abortControllerRef.current.signal.aborted) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    searchTimeoutRef.current = setTimeout(() => {
      performSearch(searchQuery, filters);
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, filters, performSearch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowResults(false);
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      const newFilters = {
        ...prev,
        [filterType]: value
      };
      return newFilters;
    });
  };

  const clearFilters = () => {
    setFilters({
      deviceType: '',
      brand: '',
      difficulty: '',
      partType: ''
    });
  };

  const clearSearch = () => {
    setSearchQuery('');
    setResults(null);
    setError(null);
    setShowResults(false);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const handleSearchFocus = () => {
    if (searchQuery || Object.values(filters).some(f => f)) {
      setShowResults(true);
    }
  };

  return (
    <div className="search-container" ref={searchContainerRef}>
      <div className="search-bar">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          placeholder="Search for guides, parts, or discussions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={handleSearchFocus}
          className="search-input"
        />
        {searchQuery && (
          <button 
            className="clear-search"
            onClick={clearSearch}
          >
            <X size={16} />
          </button>
        )}
        <button 
          className="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={20} />
          {Object.values(filters).some(f => f) && <span className="filter-badge" />}
        </button>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filters-header">
            <h3>Filters</h3>
            <button onClick={clearFilters} className="clear-filters">
              <X size={16} /> Clear all
            </button>
          </div>
          
          <div className="filter-groups">
            <div className="filter-group">
              <label>Device Type</label>
              <select 
                value={filters.deviceType}
                onChange={(e) => handleFilterChange('deviceType', e.target.value)}
              >
                <option value="">All Devices</option>
                {deviceTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Brand</label>
              <select 
                value={filters.brand}
                onChange={(e) => handleFilterChange('brand', e.target.value)}
              >
                <option value="">All Brands</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Difficulty</label>
              <select 
                value={filters.difficulty}
                onChange={(e) => handleFilterChange('difficulty', e.target.value)}
              >
                <option value="">Any Difficulty</option>
                {difficulties.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Part Type</label>
              <select 
                value={filters.partType}
                onChange={(e) => handleFilterChange('partType', e.target.value)}
              >
                <option value="">All Parts</option>
                {partTypes.map(part => (
                  <option key={part} value={part}>{part}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {showResults && (searchQuery || Object.values(filters).some(f => f)) && (
        <div className="search-results-wrapper">
          <SearchResults 
            results={results} 
            isLoading={isLoading} 
            error={error}
          />
          <button 
            className="close-results"
            onClick={() => setShowResults(false)}
          >
            Close Results
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar; 