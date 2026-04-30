import { Award, BookOpen, Megaphone, Star } from "lucide-react";
import type { News } from "../types/News/NewsType";

export function getInitialNews(){
    const initialNews: News[] = [
    {
        id: 1,
        title: 'Novo evento de integração confirmado',
        summary: 'Participe do nosso próximo encontro mensal com atividades especiais e networking.',
        date: new Date(2026, 4, 27),
        icon: Megaphone,
    },
    {
        id: 2,
        title: 'Atualização das regras de pontuação',
        summary: 'Confira as novas formas de ganhar pontos e subir no ranking da comunidade.',
        date: new Date(2026,4,25),
        icon: Star,
    },
    {
        id: 3,
        title: 'Destaque do mês: Ana Silva',
        summary: 'Conheça a história da nossa membro mais ativa e suas contribuições para a comunidade.',
        date: new Date(2026,4,22),
        icon: Award,
    },
    {
        id: 4,
        title: 'Workshop de desenvolvimento pessoal',
        summary: 'Inscrições abertas para o workshop gratuito sobre produtividade e gestão de tempo.',
        date: new Date(2026,4,20),
        icon: BookOpen,
    },
    ];
    return initialNews;
}