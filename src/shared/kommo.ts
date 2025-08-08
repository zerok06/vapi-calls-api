import { CreateNote, Lead } from "../types/kommo";

const SUBDOMAIN = process.env.KOMMO_SUBDOMAIN
const API_KEY = process.env.KOMMO_API_TOKEN

const URL_BASE = `https://${SUBDOMAIN}.kommo.com/api/v4`


const lead = {
    find: async (id: number, parameters?: string) => {


        const url = `${URL_BASE}/leads/${id}${parameters ? `?with=${parameters}` : ''}`;
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', authorization: `Bearer ${API_KEY}` }
        };

        const response = await fetch(url, options);
        const data: Lead = await response.json();
        return data;
    },
    updateFields: async (id: number, fields: Partial<Lead>) => {
        const url = `${URL_BASE}/leads/${id}`;
        const options = {
            method: 'PATCH',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: `Bearer ${API_KEY}`
            },
            body: JSON.stringify(fields)
        };

        const response = await fetch(url, options);
        const data: Lead = await response.json();
        return data;
    }
}

const notes = {
    create: async (leadId: number, note: CreateNote = { entity_id: 0, note_type: 'common', params: { text: 'Common note' } }) => {
        const url = `${URL_BASE}/leads/${leadId}/notes`;
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: `Bearer ${API_KEY}`
            },
            body: JSON.stringify({ note })
        };

        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    },
    findAll: async (entity_type: "leads" | "contacts" | "companies", entity_id: number) => {
        const url = `${URL_BASE}/${entity_type}/${entity_id}/notes`;
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', authorization: `Bearer ${API_KEY}` }
        };

        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    }
}


export const kommo = {
    lead: lead,
    notes: notes
}