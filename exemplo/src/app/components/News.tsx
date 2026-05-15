import { Newspaper, Clock, Megaphone, Star, Award, BookOpen, Plus, X } from 'lucide-react';
import { useState } from 'react';

interface News {
  id: number;
  title: string;
  summary: string;
  date: string;
  icon: any;
}

const initialNews: News[] = [
  {
    id: 1,
    title: 'Novo evento de integração confirmado',
    summary: 'Participe do nosso próximo encontro mensal com atividades especiais e networking.',
    date: '2026-04-27',
    icon: Megaphone,
  },
  {
    id: 2,
    title: 'Atualização das regras de pontuação',
    summary: 'Confira as novas formas de ganhar pontos e subir no ranking da comunidade.',
    date: '2026-04-25',
    icon: Star,
  },
  {
    id: 3,
    title: 'Destaque do mês: Ana Silva',
    summary: 'Conheça a história da nossa membro mais ativa e suas contribuições para a comunidade.',
    date: '2026-04-22',
    icon: Award,
  },
  {
    id: 4,
    title: 'Workshop de desenvolvimento pessoal',
    summary: 'Inscrições abertas para o workshop gratuito sobre produtividade e gestão de tempo.',
    date: '2026-04-20',
    icon: BookOpen,
  },
];

const iconOptions = [
  { value: 'Megaphone', icon: Megaphone, label: 'Megafone' },
  { value: 'Star', icon: Star, label: 'Estrela' },
  { value: 'Award', icon: Award, label: 'Prêmio' },
  { value: 'BookOpen', icon: BookOpen, label: 'Livro' },
  { value: 'Newspaper', icon: Newspaper, label: 'Jornal' },
];

export function News() {
  const [news, setNews] = useState<News[]>(initialNews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [selectedIconIndex, setSelectedIconIndex] = useState(0);

  const handleCreateNews = () => {
    if (!newTitle.trim() || !newSummary.trim()) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    const newNews: News = {
      id: Math.max(...news.map(n => n.id)) + 1,
      title: newTitle,
      summary: newSummary,
      date: new Date().toISOString().split('T')[0],
      icon: iconOptions[selectedIconIndex].icon,
    };

    setNews([newNews, ...news]);
    setIsModalOpen(false);
    setNewTitle('');
    setNewSummary('');
    setSelectedIconIndex(0);
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-black p-2 rounded-xl">
            <Newspaper className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-semibold">Notícias</h1>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white p-3 rounded-xl hover:bg-gray-800 transition-all shadow-sm"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {news.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              <div className="p-5">
                <div className="flex items-start gap-4 mb-3">
                  <div className="bg-gray-100 p-3 rounded-xl shrink-0">
                    <Icon size={24} className="text-black" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-black text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.summary}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400 ml-16">
                  <Clock size={14} />
                  <span>{new Date(item.date).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-black p-2 rounded-xl">
                  <Newspaper className="text-white" size={20} />
                </div>
                <h2 className="text-xl font-semibold">Nova Notícia</h2>
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
                <label className="text-sm text-gray-600 mb-2 block">Título</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Digite o título da notícia"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-2 block">Resumo</label>
                <textarea
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="Digite o conteúdo da notícia"
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-2 block">Ícone</label>
                <div className="grid grid-cols-5 gap-2">
                  {iconOptions.map((option, index) => {
                    const IconComponent = option.icon;
                    return (
                      <button
                        key={option.value}
                        onClick={() => setSelectedIconIndex(index)}
                        className={`p-3 rounded-xl transition-all ${
                          selectedIconIndex === index
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-black hover:bg-gray-200'
                        }`}
                      >
                        <IconComponent size={20} />
                      </button>
                    );
                  })}
                </div>
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
                onClick={handleCreateNews}
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
