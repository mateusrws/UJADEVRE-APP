import './App.css'
import { useReducer } from 'react';
import { Header } from './components/HeaderComponent/HeaderComponent'
import type { Tabs } from './types/Tab/typeTabs';
import { NavTab } from './components/NavTabComponent/NavTabComponent';
import { navTabReducer } from './components/NavTabComponent/NavTabReducer';
import { TrophyIcon, NewspaperIcon  , Calendar, FileTextIcon, User } from 'lucide-react';
import type { TabIds } from './types/Tab/typeTabId';
import { ContentComponent } from './components/ContentComponent/ContentComponent';

function App() {
  const tabs: Tabs = [
    { id: 'ranking', icon: TrophyIcon, label: 'Ranking'},
    { id: 'news', icon: NewspaperIcon, label: 'Notícias'},
    { id: 'events', icon: Calendar, label: 'Eventos'},
    { id: 'registrations', icon: FileTextIcon, label: 'Inscrições'},
    { id: 'profile', icon: User, label: 'Perfil'}
  ]

  const initialState: TabIds = 'ranking'
  const [activeTab, dispatch] = useReducer(navTabReducer, initialState)

  return (
    <div className='size-full flex flex-col bg-gray-50'>
      <Header></Header>
      <ContentComponent activeTab={activeTab}></ContentComponent>
      <NavTab tabs={tabs} activeTab={activeTab} dispatch={dispatch}></NavTab>
    </div>
  )
}

export default App
