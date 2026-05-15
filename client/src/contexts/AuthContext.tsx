import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { jwtDecode } from 'jwt-decode'
import { authService } from '../services/authService'
import { userService, type User } from '../services/userService'

interface JwtPayload {
    sub: string
    email: string
    name: string
    createdAt: string
    iat: number
    exp: number
}

interface AuthContextType {
    currentUser: User | null
    token: string | null
    isLoading: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => void
    isAdmin: () => boolean
    isCoordinator: () => boolean
    refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(localStorage.getItem('access_token'))
    const [isLoading, setIsLoading] = useState(true)

    const loadUser = async () => {
        const storedToken = localStorage.getItem('access_token')
        if (!storedToken) {
            setIsLoading(false)
            return
        }

        try {
            const decoded = jwtDecode<JwtPayload>(storedToken)
            // Check if token is expired
            if (decoded.exp * 1000 < Date.now()) {
                localStorage.removeItem('access_token')
                setToken(null)
                setCurrentUser(null)
                setIsLoading(false)
                return
            }

            const user = await userService.getMe()
            setCurrentUser(user)
            setToken(storedToken)
        } catch {
            localStorage.removeItem('access_token')
            setToken(null)
            setCurrentUser(null)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadUser()
    }, [])

    const login = async (email: string, password: string) => {
        const { access_token } = await authService.signIn({ email, password })
        localStorage.setItem('access_token', access_token)
        setToken(access_token)
        const user = await userService.getMe()
        setCurrentUser(user)
    }

    const logout = () => {
        localStorage.removeItem('access_token')
        setToken(null)
        setCurrentUser(null)
    }

    const isAdmin = () => {
        return currentUser?.user_tipo === 'COORDENADOR'
    }

    const isCoordinator = () => {
        return currentUser?.user_tipo === 'COORDENADOR'
    }

    const refreshUser = async () => {
        const user = await userService.getMe()
        setCurrentUser(user)
    }

    return (
        <AuthContext.Provider value={{ currentUser, token, isLoading, login, logout, isAdmin, isCoordinator, refreshUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}
