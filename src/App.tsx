import './App.css'
import { useReducer } from 'react';
import { Header } from './components/HeaderComponent/HeaderComponent';
import type { Tabs } from './types/Tab/typeTabs';
import { NavTab } from './components/NavTabComponent/NavTabComponent';
import { navTabReducer } from './components/NavTabComponent/NavTabReducer';
import { TrophyIcon, NewspaperIcon, Calendar, FileTextIcon, User, Users, ScanLine } from 'lucide-react';
import type { TabIds } from './types/Tab/typeTabId';
import { ContentComponent } from './components/ContentComponent/ContentComponent';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './pages/Login';

function MainApp() {
    const { currentUser, isAdmin } = useAuth();

    const userTabs: Tabs = [
        { id: 'ranking', icon: TrophyIcon, label: 'Ranking' },
        { id: 'news', icon: NewspaperIcon, label: 'Notícias' },
        { id: 'events', icon: Calendar, label: 'Eventos' },
        { id: 'registrations', icon: FileTextIcon, label: 'Inscrições' },
        { id: 'profile', icon: User, label: 'Perfil' },
    ];

    const adminTabs: Tabs = [
        { id: 'ranking', icon: TrophyIcon, label: 'Ranking' },
        { id: 'news', icon: NewspaperIcon, label: 'Notícias' },
        { id: 'events', icon: Calendar, label: 'Eventos' },
        { id: 'admin', icon: Users, label: 'Usuários' },
        { id: 'checkin', icon: ScanLine, label: 'Check-in' },
        { id: 'profile', icon: User, label: 'Perfil' },
    ];

    const tabs = isAdmin() ? adminTabs : userTabs;
    const initialState: TabIds = 'ranking';
    const [activeTab, dispatch] = useReducer(navTabReducer, initialState);

    if (!currentUser) {
        return <Login />;
    }

    return (
        <div className='size-full flex flex-col bg-gray-50'>
            <Header />
            <ContentComponent activeTab={activeTab} />
            <NavTab tabs={tabs} activeTab={activeTab} dispatch={dispatch} />
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <MainApp />
        </AuthProvider>
    );
}

export default App;
