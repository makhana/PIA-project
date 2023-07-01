import { Place } from "./place";

export class RenovationRequest{
    id: number;
    agency: string;
    client: string;
    idPlace: number;
    dateStart: string;
    dateEnd: string;
    status: string;
    agencyName: string;
    place: Place;
    clientName: string;
    clientSurname: string;
    offer: number;
}