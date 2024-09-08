import { config } from '../config/config';

// TODO: Implement a generic Network class that handles all the network requests and utilizes this endpoints structure
const ENDPOINTS = {
    getUserReports: {
        url: `${config.API_URL}/me/reports`,
        method: 'GET',
    },

    getReport: (reportId: string) => ({
        url: `${config.API_URL}/me/reports/${reportId}`,
        method: 'GET',
    }),

    addReport: {
        url: `${config.API_URL}/me/reports`,
        method: 'POST',
    },

    addThreadReply: (reportId: string) => ({
        url: `${config.API_URL}/me/reports/${reportId}`,
        method: 'POST',
    }),

    login: {
        url: `${config.API_URL}/login`,
        method: 'POST',
    },

    subjectsList: {
        url: `${config.API_URL}/subjects`,
        method: 'GET',
    },
};

export default ENDPOINTS;
