export interface DataModel {
    data: Article[];
    pagination: PagData;
}

export interface Article {
    author: string,
    category: string,
    country: string,
    description: string,
    image: string,
    language: string,
    published_at: string,
    source: string,
    title: string,
    url: string,
}

export interface PagData {
    count: number,
    limit: number,
    offset: number,
    total: number,
}