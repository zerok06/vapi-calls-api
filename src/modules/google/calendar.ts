import moment from 'moment-timezone';

import { calendarAuth } from './auth'


const TIMEZONE = process.env.HOLOS_TIMEZONE;


/* AUTH CALENDAR */

const calendar = calendarAuth()



export async function getAvailableSlots({ calendarId = 'primary', dateISO = '', startHour = 9, endHour = 18, durationMin = 30 }) {

    const startDay = moment.tz(`${dateISO} ${startHour}:00`, 'YYYY-MM-DD HH:mm', TIMEZONE);
    const endDay = moment.tz(`${dateISO} ${endHour}:00`, 'YYYY-MM-DD HH:mm', TIMEZONE);

    const res = await calendar.freebusy.query({
        requestBody: {
            timeMin: startDay.toISOString(),
            timeMax: endDay.toISOString(),
            timeZone: TIMEZONE,
            items: [{ id: calendarId }]
        }
    });

    const busy = res.data.calendars[calendarId].busy;
    const slots = [];

    let slotStart = startDay.clone();
    while (slotStart.clone().add(durationMin, 'minutes').isSameOrBefore(endDay)) {
        const slotEnd = slotStart.clone().add(durationMin, 'minutes');
        const overlaps = busy.some(
            b =>
                moment(b.start).isBefore(slotEnd) &&
                moment(b.end).isAfter(slotStart)
        );

        if (!overlaps) {
            slots.push({
                start: slotStart.format('HH:mm'),
                end: slotEnd.format('HH:mm'),
                raw: slotStart.toISOString()
            });
        }

        slotStart.add(durationMin, 'minutes');
    }

    return slots;
}

export async function createCalendarEvent(event: any) {
    try {
        const response = await calendar.events.insert({
            calendarId: 'primary',
            requestBody: event,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function updateCalendarEvent(eventId: string, event: any) {
    try {
        const response = await calendar.events.update({
            calendarId: 'primary',
            eventId,
            requestBody: event,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function deleteCalendarEvent(eventId: string) {
    try {
        await calendar.events.delete({
            calendarId: 'primary',
            eventId,
        });
        return { success: true };
    } catch (error) {
        throw error;
    }
}

export async function isTimeAvailable({ calendarId = 'primary', dateISO = '', time24h = '', durationMin = 30 }) {

    const start = moment.tz(`${dateISO} ${time24h}`, 'YYYY-MM-DD HH:mm', TIMEZONE);
    const end = start.clone().add(durationMin, 'minutes');

    const res = await calendar.freebusy.query({
        requestBody: {
            timeMin: start.toISOString(),
            timeMax: end.toISOString(),
            timeZone: TIMEZONE,
            items: [{ id: calendarId }]
        }
    });

    const busySlots = res.data.calendars[calendarId].busy;
    return busySlots.length === 0;
}
