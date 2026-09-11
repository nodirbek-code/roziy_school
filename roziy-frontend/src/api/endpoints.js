import { api } from "./client";

// Thin wrapper functions around every backend endpoint the frontend needs.
// Keeping them here means pages/components never write a raw URL string.

export const getSiteSettings = () => api.get("/core/settings/").then((r) => r.data);
export const getPage = (slug) => api.get(`/core/pages/${slug}/`).then((r) => r.data);

export const getGrades = () => api.get("/academics/grades/").then((r) => r.data);

export const submitApplication = (payload) =>
  api.post("/admissions/apply/", payload).then((r) => r.data);

export const checkApplicationStatus = (payload) =>
  api.post("/admissions/status/", payload).then((r) => r.data);

export const getWeeklyMenu = () => api.get("/meals/").then((r) => r.data);

export const getGallery = () => api.get("/gallery/").then((r) => r.data);

export const getTeachers = () => api.get("/staff/").then((r) => r.data);

export const getTestimonials = () => api.get("/testimonials/").then((r) => r.data);

export const getNews = () => api.get("/news/").then((r) => r.data);
export const getNewsPost = (slug) => api.get(`/news/${slug}/`).then((r) => r.data);

export const sendContactMessage = (payload) =>
  api.post("/contacts/send/", payload).then((r) => r.data);

export const login = (username, password) =>
  api.post("/auth/login/", { username, password }).then((r) => r.data);

export const registerParent = (payload) =>
  api.post("/accounts/register/", payload).then((r) => r.data);
