import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading';

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  startLoading: () => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Constants for loading durations
const INITIAL_LOAD_DURATION = 1000; // 1 second for initial load
const PAGE_TRANSITION_DURATION = 900; // 0.9 seconds for page transitions

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const location = useLocation();
  const isFirstRender = useRef(true);
  const initialLoadTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const routeChangeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startLoading = useCallback(() => {
    if (!isInitialLoad) {
      setIsLoading(true);
    }
  }, [isInitialLoad]);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Handle initial page load
  useEffect(() => {
    if (isInitialLoad && isFirstRender.current) {
      isFirstRender.current = false;
      
      // Clear any existing timeouts
      if (initialLoadTimeoutRef.current) {
        clearTimeout(initialLoadTimeoutRef.current);
      }
      if (routeChangeTimeoutRef.current) {
        clearTimeout(routeChangeTimeoutRef.current);
      }

      initialLoadTimeoutRef.current = setTimeout(() => {
        setIsLoading(false);
        setIsInitialLoad(false);
      }, INITIAL_LOAD_DURATION);
    }

    return () => {
      if (initialLoadTimeoutRef.current) {
        clearTimeout(initialLoadTimeoutRef.current);
      }
    };
  }, [isInitialLoad]);

  // Handle route changes
  useEffect(() => {
    if (!isInitialLoad) {
      // Clear any existing route change timeout
      if (routeChangeTimeoutRef.current) {
        clearTimeout(routeChangeTimeoutRef.current);
      }

      const handleRouteChange = () => {
        startLoading();
        routeChangeTimeoutRef.current = setTimeout(() => {
          stopLoading();
        }, PAGE_TRANSITION_DURATION);
      };

      handleRouteChange();
    }

    return () => {
      if (routeChangeTimeoutRef.current) {
        clearTimeout(routeChangeTimeoutRef.current);
      }
    };
  }, [location.pathname, startLoading, stopLoading, isInitialLoad]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (initialLoadTimeoutRef.current) {
        clearTimeout(initialLoadTimeoutRef.current);
      }
      if (routeChangeTimeoutRef.current) {
        clearTimeout(routeChangeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, startLoading, stopLoading }}>
      <div 
        className={`loading-transition ${isLoading ? 'loading-active' : ''}`}
        style={{ 
          opacity: isInitialLoad ? 1 : undefined,
          transition: isInitialLoad ? 'none' : 'opacity 0.3s ease-out'
        }}
      >
        {isLoading && <Loading />}
      </div>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}; 