import { News } from "src/modules/News/entities/News";
import { News as NewsRaw } from "@prisma/client";

export class PrismaNewsMapper {
    static toPrisma(news: News): NewsRaw {
        return {
            new_id: news.getId,
            new_title: news.getTitle,
            new_content: news.getContent,
            new_icon: news.getIcon,
            createdAt: news.getDate,
        }
    }

    static toDomain(newsList: NewsRaw[]): News[] {
        return newsList.map(news => new News(
            {
                new_title: news.new_title,
                new_content: news.new_content,
                new_icon: news.new_icon,
                new_createdAt: news.createdAt,
            },
            news.new_id
        ))
    }

    static toDomainSingle(news: NewsRaw): News {
        return new News(
            {
                new_title: news.new_title,
                new_content: news.new_content,
                new_icon: news.new_icon,
                new_createdAt: news.createdAt,
            },
            news.new_id
        )
    }
}
