'use server'

// Axios Import
import axios from 'axios'

// Types Imports
import type { OMDBSearchRequest, OMDBTitleRequest } from '@/types/omdb/requestType'
import type { OMDBSearchResponse, OMDBSeasonResponse, OMDBTitleResponse } from '@/types/omdb/responseType'

const api = axios.create({
  baseURL: `${process.env.OMDB_API_URL}`,
  headers: {
    'Content-Type': 'application/json'
  }
})

const formatErrors = (errorData: any): string => {
  if (typeof errorData === 'object' && errorData !== null) {
    return Object.entries(errorData)
      .map(([field, messages]) => {
        if (Array.isArray(messages)) {
          return `${field}: ${messages.join(', ')}`
        }
        
        return `${field}: ${messages}`
      })
      .join(' ')
  }

  return 'An error occurred'
}

api.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    console.log(error)

    return Promise.reject(JSON.stringify(formatErrors(error.request.data || '')))
  }
)

api.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    console.log(error)

    return Promise.reject(JSON.stringify(formatErrors(error.response.data || '')))
  }
)

export const fetchMovie = async (request: OMDBTitleRequest): Promise<OMDBTitleResponse> => {
  try {
    const response = await api.get<OMDBTitleResponse>('/', { params: {
      apiKey: `${process.env.OMDB_API_KEY}`,
      ...request 
    }});
    
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    
    throw new Error('Error fetching movie details');
  }
};

export const searchMovies = async (request: OMDBSearchRequest): Promise<OMDBSearchResponse> => {
  try {
    const response = await api.get<OMDBSearchResponse>('/', { params: {
      apiKey: `${process.env.OMDB_API_KEY}`,
      ...request 
    }});

    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    
    throw new Error('Error searching movies');
  }
};

export const fetchSeason = async (request: OMDBTitleRequest, season: string): Promise<OMDBSeasonResponse> => {
  try {
    const response = await api.get<OMDBSeasonResponse>('/', { params: {
      apiKey: `${process.env.OMDB_API_KEY}`,
      ...request,
      season
    }});
    
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    
    throw new Error('Error fetching movie details');
  }
};

export const fetchGenres = async () => {
  return new Promise<string[]>((resolve) => {
    setTimeout(() => {
      resolve([
        'Action',
        'Comedy',
        'Drama',
        'Fantasy',
        'Horror',
        'Romance',
        'Sci-Fi',
        'Thriller',
        'Western',
      ]);
    }, 500);
  });
};