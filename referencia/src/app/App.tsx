import { useState } from 'react';
import { Trophy, Newspaper, Calendar, User, FileText, Users, ScanLine } from 'lucide-react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Login } from './components/Login';
import { Ranking } from './components/Ranking';
import { News } from './components/News';
import { Events } from './components/Events';
import { Profile } from './components/Profile';
import { MyRegistrations } from './components/MyRegistrations';
import { AdminPanel } from './components/AdminPanel';
import { CheckIn } from './components/CheckIn';

type Tab = 'ranking' | 'news' | 'events' | 'registrations' | 'admin' | 'checkin' | 'profile';

function MainApp() {
  const { currentUser, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('ranking');

  const userTabs = [
    { id: 'ranking' as Tab, icon: Trophy, label: 'Ranking' },
    { id: 'news' as Tab, icon: Newspaper, label: 'Notícias' },
    { id: 'events' as Tab, icon: Calendar, label: 'Eventos' },
    { id: 'registrations' as Tab, icon: FileText, label: 'Inscrições' },
    { id: 'profile' as Tab, icon: User, label: 'Perfil' },
  ];

  const adminTabs = [
    { id: 'ranking' as Tab, icon: Trophy, label: 'Ranking' },
    { id: 'news' as Tab, icon: Newspaper, label: 'Notícias' },
    { id: 'events' as Tab, icon: Calendar, label: 'Eventos' },
    { id: 'admin' as Tab, icon: Users, label: 'Usuários' },
    { id: 'checkin' as Tab, icon: ScanLine, label: 'Check-in' },
    { id: 'profile' as Tab, icon: User, label: 'Perfil' },
  ];

  const tabs = isAdmin() ? adminTabs : userTabs;

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="size-full flex flex-col bg-gray-50">
      <header className="bg-gradient-to-r from-black to-gray-900 text-white py-5 px-6 shadow-lg">
        <h1 className="text-3xl font-bold text-center tracking-tight">UJADEVRE</h1>
      </header>

      <div className="flex-1 overflow-y-auto pb-20">
        {activeTab === 'ranking' && <Ranking />}
        {activeTab === 'news' && <News />}
        {activeTab === 'events' && <Events />}
        {activeTab === 'registrations' && <MyRegistrations />}
        {activeTab === 'admin' && <AdminPanel />}
        {activeTab === 'checkin' && <CheckIn />}
        {activeTab === 'profile' && <Profile />}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-around items-center px-2 py-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                  isActive
                    ? 'text-black bg-gray-100'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}