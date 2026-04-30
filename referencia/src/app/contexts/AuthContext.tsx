import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  phone?: string;
  memberSince: string;
  avatarUrl: string | null;
  bio: string;
  points: number;
}

interface AuthContextType {
  currentUser: User | null;
  users: User[];
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAdmin: () => boolean;
  addUser: (user: Omit<User, 'id' | 'memberSince' | 'points'>) => void;
  removeUser: (userId: number) => void;
  updateCurrentUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialUsers: User[] = [
  {
    id: 1,
    name: 'Administrador',
    email: 'admin@ujadevre.com',
    password: 'admin123',
    role: 'admin',
    phone: '(11) 99999-9999',
    memberSince: '2025-01-01',
    avatarUrl: null,
    bio: 'Administrador do sistema',
    points: 1000,
  },
  {
    id: 2,
    name: 'João Silva',
    email: 'joao@email.com',
    password: 'user123',
    role: 'user',
    phone: '(11) 98765-4321',
    memberSince: '2025-01-15',
    avatarUrl: null,
    bio: 'Entusiasta de tecnologia e eventos comunitários.',
    points: 580,
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(initialUsers);

  const login = (email: string, password: string): boolean => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const isAdmin = () => {
    return currentUser?.role === 'admin';
  };

  const addUser = (userData: Omit<User, 'id' | 'memberSince' | 'points'>) => {
    const newUser: User = {
      ...userData,
      id: Math.max(...users.map(u => u.id)) + 1,
      memberSince: new Date().toISOString().split('T')[0],
      points: 0,
    };
    setUsers([...users, newUser]);
  };

  const removeUser = (userId: number) => {
    setUsers(users.filter(u => u.id !== userId));
  };

  const updateCurrentUser = (data: Partial<User>) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...data };
      setCurrentUser(updatedUser);
      setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    }
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      users,
      login,
      logout,
      isAdmin,
      addUser,
      removeUser,
      updateCurrentUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
