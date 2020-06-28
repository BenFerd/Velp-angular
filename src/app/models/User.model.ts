export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    registerDate: Date;
    city: string;
    password?: string;
    adverts?: any;
    concernReviews?: any;
}