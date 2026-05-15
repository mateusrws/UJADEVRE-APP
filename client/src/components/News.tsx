import {
    Newspaper,
    Clock,
    Megaphone,
    Star,
    Award,
    BookOpen,
    Plus,
    X,
    Trash2,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { newsService, type News as NewsType } from '../services/newsService'
import { useAuth } from '../contexts/AuthContext'

const iconMap: Record<string, React.ElementType> = {
    Megaphone,
    Star,
    Award,
    BookOpen,
    Newspaper,
}

const iconOptions = [
    { value: 'Megaphone', icon: Megaphone, label: 'Megafone' },
    { value: 'Star', icon: Star, label: 'Estrela' },
    { value: 'Award', icon: Award, label: 'Prêmio' },
    { value: 'BookOpen', icon: BookOpen, label: 'Livro' },
    { value: 'Newspaper', icon: Newspaper, label: 'Jornal' },
]

export function News() {
    const { isAdmin } = useAuth()
    const [news, setNews] = useState<NewsType[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [newTitle, setNewTitle] = useState('')
    const [newSummary, setNewSummary] = useState('')
    const [selectedIconIndex, setSelectedIconIndex] = useState(0)

    const fetchNews = async () => {
        try {
            const data = await newsService.getAll()
            setNews(data)
        } catch {
            Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível carregar as notícias', confirmButtonColor: '#000' })
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchNews()
    }, [])

    const handleCreateNews = async () => {
        if (!newTitle.trim() || !newSummary.trim()) {
            Swal.fire({ icon: 'warning', title: 'Campos obrigatórios', text: 'Por favor, preencha todos os campos!', confirmButtonColor: '#000' })
            return
        }

        setIsSaving(true)
        try {
            const created = await newsService.create({
                new_title: newTitle,
                new_content: newSummary,
                new_icon: iconOptions[selectedIconIndex].value,
            })
            setNews([created, ...news])
            setIsModalOpen(false)
            setNewTitle('')
            setNewSummary('')
            setSelectedIconIndex(0)
            Swal.fire({ icon: 'success', title: 'Notícia criada!', timer: 1500, showConfirmButton: false })
        } catch (err: any) {
            Swal.fire({ icon: 'error', title: 'Erro', text: err?.response?.data?.message || 'Não foi possível criar a notícia', confirmButtonColor: '#000' })
        } finally {
            setIsSaving(false)
        }
    }

    const handleDelete = async (new_id: string) => {
        const result = await Swal.fire({
            icon: 'warning',
            title: 'Excluir notícia?',
            text: 'Esta ação não pode ser desfeita.',
            showCancelButton: true,
            confirmButtonColor: '#000',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Sim, excluir',
            cancelButtonText: 'Cancelar',
        })

        if (!result.isConfirmed) return

        try {
            await newsService.delete(new_id)
            setNews(news.filter((n) => n.new_id !== new_id))
            Swal.fire({ icon: 'success', title: 'Notícia excluída!', timer: 1500, showConfirmButton: false })
        } catch {
            Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível excluir a notícia', confirmButtonColor: '#000' })
        }
    }

    return (
        <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-full">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-black p-2 rounded-xl">
                        <Newspaper className="text-white" size={24} />
                    </div>
                    <h1 className="text-2xl font-semibold">Notícias</h1>
                </div>
                {isAdmin() && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-black text-white p-3 rounded-xl hover:bg-gray-800 transition-all shadow-sm"
                    >
                        <Plus size={20} />
                    </button>
                )}
            </div>

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <span className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
                </div>
            ) : news.length === 0 ? (
                <div className="text-center text-gray-500 py-12">Nenhuma notícia encontrada</div>
            ) : (
                <div className="flex flex-col gap-4">
                    {news.map((item) => {
                        const Icon = iconMap[item.new_icon] || Newspaper
                        return (
                            <div
                                key={item.new_id}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="p-5">
                                    <div className="flex items-start gap-4 mb-3">
                                        <div className="bg-gray-100 p-3 rounded-xl shrink-0">
                                            <Icon size={24} className="text-black" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between">
                                                <h3 className="font-semibold text-black text-lg mb-2 flex-1">{item.new_title}</h3>
                                                {isAdmin() && (
                                                    <button
                                                        onClick={() => handleDelete(item.new_id)}
                                                        className="p-2 hover:bg-red-50 rounded-xl transition-all text-red-600 ml-2"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-600 leading-relaxed">{item.new_content}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-400 ml-16">
                                        <Clock size={14} />
                                        <span>{new Date(item.createdAt).toLocaleDateString('pt-BR')}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

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
                                        const IconComponent = option.icon
                                        return (
                                            <button
                                                key={option.value}
                                                onClick={() => setSelectedIconIndex(index)}
                                                className={`p-3 rounded-xl transition-all ${selectedIconIndex === index
                                                    ? 'bg-black text-white'
                                                    : 'bg-gray-100 text-black hover:bg-gray-200'
                                                    }`}
                                            >
                                                <IconComponent size={20} />
                                            </button>
                                        )
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
                                disabled={isSaving}
                                className="flex-1 bg-black text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-all shadow-sm disabled:opacity-60"
                            >
                                {isSaving ? (
                                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto block" />
                                ) : (
                                    'Criar'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
