export interface ITimeEntry {
    id: number;
    name: string;
    time: string | Date;
    duration: number;
    individual: boolean;
    status: string;
    description: string | null;
    created_at?: string;
    updated_at?: string;
    user_id: number;
    location_id: number | null;
    location: number;
}

interface ILocation {
    id: number;
    address: string;
    latitude: string;
    longitude: string;
    created_at?: string;
    updated_at?: string;
}

interface ITimeEntryEntities {
    [propName: number]: ITimeEntry;
}

interface ILocationEntities {
    [propName: number]: ILocation;
}

interface IEntities {
    timeEntry: ITimeEntryEntities;
    location: ILocationEntities;
}

export interface ITimeEntryState {
    result: number[];
    entities: IEntities;
}