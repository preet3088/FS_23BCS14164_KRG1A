import { api } from "./client";

export const register = (payload) => api.post("/api/auth/register", payload);
export const login = (payload) => api.post("/api/auth/login", payload);

export const getMyProfile = (userId) =>
    api.get(`/api/volunteers/me`, { params: { userId } });
export const updateMyProfile = (userId, payload) =>
    api.put(`/api/volunteers/me`, payload, { params: { userId } });

export const listEvents = () => api.get("/api/events");
export const createEvent = (payload) => api.post("/api/events", payload);

export const listShiftsByEvent = (eventId) =>
    api.get(`/api/events/${eventId}/shifts`);
export const createShift = (eventId, payload) =>
    api.post(`/api/events/${eventId}/shifts`, payload);

export const enrollShift = (shiftId, userId) =>
    api.post(`/api/shifts/${shiftId}/enroll`, null, { params: { userId } });
export const assignShift = (shiftId, userId) =>
    api.post(`/api/shifts/${shiftId}/assign`, null, { params: { userId } });
