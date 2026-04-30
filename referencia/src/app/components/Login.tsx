import { useState } from 'react';
import { User, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    const success = login(email, password);
    if (!success) {
      setError('Email ou senha incorretos');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="bg-black text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User size={32} />
          </div>
          <h1 className="text-3xl font-bold mb-2">UJADEVRE</h1>
          <p className="text-gray-600">Faça login para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-gray-600 mb-2 block flex items-center gap-2">
              <User size={16} />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-2 block flex items-center gap-2">
              <Lock size={16} />
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <LogIn size={20} />
            Entrar
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center mb-3">Credenciais de teste:</p>
          <div className="space-y-2 text-xs text-gray-600 bg-gray-50 p-4 rounded-xl">
            <div>
              <strong>Admin:</strong> admin@ujadevre.com / admin123
            </div>
            <div>
              <strong>Usuário:</strong> joao@email.com / user123
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
