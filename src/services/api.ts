import axios from 'axios';
import {
    DonationStats,
    Shelter,
    ShelterResponse,
    SubmitDonationRequest,
    SubmitDonationResponse
} from "@/src/types/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://frontend-assignment-api.goodrequest.dev';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getShelters = async (): Promise<Shelter[]> => {
    const response = await api.get<ShelterResponse>('/api/v1/shelters/');
    return response.data.shelters;
};

export const getStats = async (): Promise<DonationStats> => {
    const response = await api.get<DonationStats>('/api/v1/shelters/results');
    return response.data;
};

export const submitDonation = async (
    data: SubmitDonationRequest
): Promise<SubmitDonationResponse> => {
    const response = await api.post<SubmitDonationResponse>(
        '/api/v1/shelters/contribute',
        data
    );
    return response.data;
};

export default api;
