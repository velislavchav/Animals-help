export interface IAnimal {
    id: string;
    type: string;
    name: string;
    age: number;
    weight: number;
    color: string;
    image: string;
    currentLocation: string;
    description: string;
    createdBy?: string;
    creator?: string;
    createdAt?: Date;
}
