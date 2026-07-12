export interface Shelter {
    id: number;
    name: string;
}

export interface DonationStats {
    contributors: number;
    contribution: number;
}

export interface Donor {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export interface DonorsResponse {
    contributors: Donor[];
    shelterID: number;
    value: number;
}

export interface ShelterResponse {
    shelters: Shelter[];
}

export type HelpType = 'general' | 'specific';

export interface DonationFormData {
    helpType: HelpType;
    shelterId: number | null;
    amount: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    consent: boolean;
}

export interface SubmitDonationRequest {
    contributors: Array<{
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    }>;
    shelterID?: number;
    value: number;
}

export interface SubmitDonationResponse {
    messages: Array<{
        message: string;
        type: 'SUCCESS' | 'ERROR' | 'WARNING';
    }>;
}
