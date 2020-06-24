export interface Advert {
    id: number;
    title: string;
    description: string;
    image: string;
    pubDate: Date;
    user?: any;
    category?: any;
}