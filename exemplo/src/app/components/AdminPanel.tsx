import { useState } from 'react';
import { Users, UserPlus, Trash2, Shield, User as UserIcon, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function AdminPanel() {
  const { users, addUser, removeUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');

  const handleCreateUser = () => {
    if (!newUserName.trim() || !newUserEmail.trim() || !newUserPassword.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    if (users.some(u => u.email === newUserEmail)) {
      alert('Já existe um usuário com este email!');
      return;
    }

    addUser({
      name: newUserName,
      email: newUserEmail,
      password: newUserPassword,
      phone: newUserPhone,
      role: 'user',
      avatarUrl: null,
      bio: '',
    });

    setIsModalOpen(false);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserPassword('');
    setNewUserPhone('');
  };

  const handleDeleteUser = (userId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      removeUser(userId);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-black p-2 rounded-xl">
            <Users className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-semibold">Gerenciar Usuários</h1>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-4 py-3 rounded-xl hover:bg-gray-800 transition-all shadow-sm flex items-center gap-2"
        >
          <UserPlus size={20} />
          Novo Usuário
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 p-3 rounded-xl">
                {user.role === 'admin' ? (
                  <Shield size={24} className="text-black" />
                ) : (
                  <UserIcon size={24} className="text-black" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-black">{user.name}</h3>
                  {user.role === 'admin' && (
                    <span className="bg-black text-white text-xs px-2 py-1 rounded-full">
                      Admin
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600">{user.email}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {user.points} pontos • Membro desde {new Date(user.memberSince).toLocaleDateString('pt-BR')}
                </div>
              </div>

              {user.role !== 'admin' && (
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="p-2 hover:bg-red-50 rounded-xl transition-all text-red-600"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-black p-2 rounded-xl">
                  <UserPlus className="text-white" size={20} />
                </div>
                <h2 className="text-xl font-semibold">Novo Usuário</h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-4 mb-6">
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Nome Completo *</label>
                <input
                  type="text"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="Ex: Maria Silva"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-2 block">Email *</label>
                <input
                  type="email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="Ex: maria@email.com"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-2 block">Senha *</label>
                <input
                  type="password"
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-2 block">Telefone</label>
                <input
                  type="tel"
                  value={newUserPhone}
                  onChange={(e) => setNewUserPhone(e.target.value)}
                  placeholder="(11) 99999-9999"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-white text-black border-2 border-black py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateUser}
                className="flex-1 bg-black text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-all shadow-sm"
              >
                Criar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
