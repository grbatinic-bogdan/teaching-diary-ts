import { normalize, schema } from 'normalizr';

const locationSchema = new schema.Entity('location');
const timeEntrySchema = new schema.Entity('timeEntry', {
    location: locationSchema
});

const timeEntriesListSchema = new schema.Array(timeEntrySchema);

export const normalizeTimeEntries = (originalData: any) => normalize(originalData, timeEntriesListSchema);