import type { User } from "./user-interface"

const STORAGE_KEY = "auth-user"

interface AuthState {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  setUser: (user: User | null) => void
  isAuthenticated: () => boolean
}

// Create a simple state store
const authState: AuthState = {
  user:
    typeof window !== "undefined"
      ? (() => {
          const stored = localStorage.getItem(STORAGE_KEY)
          return stored ? JSON.parse(stored) : null
        })()
      : null,
  isLoading: false,
  login: async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error("Email and password are required")
    }
    if (!email.includes("@")) {
      throw new Error("Invalid email format")
    }
    const user: User = {
      id: Math.random().toString(36).substring(7),
      email,
      name: email.split("@")[0],
    }
    authState.user = user
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    }
  },
  signup: async (email: string, password: string, name: string) => {
    if (!email || !password || !name) {
      throw new Error("All fields are required")
    }
    if (!email.includes("@")) {
      throw new Error("Invalid email format")
    }
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters")
    }
    const user: User = {
      id: Math.random().toString(36).substring(7),
      email,
      name,
    }
    authState.user = user
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    }
  },
  logout: () => {
    authState.user = null
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY)
    }
  },
  setUser: (user: User | null) => {
    authState.user = user
  },
  isAuthenticated: () => authState.user !== null,
}

// Listeners for state changes
const listeners = new Set<() => void>()

const notifyListeners = () => {
  listeners.forEach((listener) => listener())
}

// Zustand-style hook
export function useAuthStore<T>(selector: (state: AuthState) => T): T {
  // This is a simplified version - in a real app, you'd need React hooks
  return selector(authState)
}

// Add getState method for compatibility
useAuthStore.getState = () => authState

// Add subscribe method for compatibility
useAuthStore.subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

// Export plain store object as fallback
export const authStore = {
  getUser: () => authState.user,
  setUser: (user: User | null) => {
    authState.user = user
    if (typeof window !== "undefined") {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      } else {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
    notifyListeners()
  },
  isAuthenticated: () => authState.isAuthenticated(),
  login: (email: string, password: string) => authState.login(email, password),
  signup: (email: string, password: string, name: string) => authState.signup(email, password, name),
  logout: () => authState.logout(),
}
