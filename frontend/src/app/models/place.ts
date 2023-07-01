import { Rectangle } from "./rectangle";

export class Place{
    type: string;
    address: string;
    roomNumber: number;
    size: number;
    client: string;
    rooms: [Rectangle];
    doors: [Rectangle];
    id: number;
}