import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, LoginRequest, LoginResponse } from '@avl/shared-types';
import { AVLApiClient } from '@avl/api-client';

// Auth State
interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

// Auth Actions
type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'CLEAR_ERROR' };

// Auth Context
interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null,
        isAuthenticated: true,
      };

    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
        error: null,
        isAuthenticated: false,
      };

    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'CLEAR_ERROR':
      return { ...state, error: null };

    default:
      return state;
  }
};

// Auth Provider Props
interface AuthProviderProps {
  children: React.ReactNode;
  apiClient: AVLApiClient;
}

// Auth Provider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children, apiClient }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  });

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });

      try {
        if (apiClient.isAuthenticated()) {
          // Try to get user profile with existing token
          const response = await apiClient.users.getProfile();
          if (response.success) {
            dispatch({
              type: 'LOGIN_SUCCESS',
              payload: {
                user: response.data,
                token: apiClient.getToken() || '',
              },
            });
          } else {
            // Token is invalid, clear it
            apiClient.clearTokens();
            dispatch({ type: 'LOGOUT' });
          }
        }
      } catch (error) {
        apiClient.clearTokens();
        dispatch({ type: 'LOGOUT' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initializeAuth();
  }, [apiClient]);

  const login = async (credentials: LoginRequest) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const response = await apiClient.users.login(credentials);

      if (response.success) {
        const { user, token, refreshToken } = response.data;

        // Store tokens in API client
        apiClient.setTokens(token, refreshToken);

        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user, token },
        });
      } else {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: response.message || 'Login failed',
        });
      }
    } catch (error: any) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.message || 'Login failed. Please try again.',
      });
    }
  };

  const logout = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      await apiClient.users.logout();
    } catch (error) {
      // Continue with logout even if server request fails
    } finally {
      apiClient.clearTokens();
      dispatch({ type: 'LOGOUT' });
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const contextValue: AuthContextType = {
    ...state,
    login,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Auth Hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
