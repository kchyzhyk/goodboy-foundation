import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {DonationFormData} from "@/src/types/api";

interface DonationState {
    formData: DonationFormData;
    currentStep: number;
    isSubmitting: boolean;
    isSuccess: boolean;
    error: string | null;

    setField: <K extends keyof DonationFormData>(
        field: K,
        value: DonationFormData[K]
    ) => void;
    setFormData: (data: Partial<DonationFormData>) => void;
    setCurrentStep: (step: number) => void;
    setSubmitting: (isSubmitting: boolean) => void;
    setSuccess: (isSuccess: boolean) => void;
    setError: (error: string | null) => void;
    resetForm: () => void;
}

const initialFormData: DonationFormData = {
    helpType: 'general',
    shelterId: null,
    amount: 0,
    donors: [],
    consent: false,
};

const initialState = {
    formData: initialFormData,
    currentStep: 0,
    isSubmitting: false,
    isSuccess: false,
    error: null,
};

export const useDonationStore = create<DonationState>()(
    persist(
        (set) => ({
            ...initialState,

            setField: (field, value) =>
                set((state) => ({
                    formData: {
                        ...state.formData,
                        [field]: value,
                    },
                })),

            setFormData: (data) =>
                set((state) => ({
                    formData: {
                        ...state.formData,
                        ...data,
                    },
                })),

            setCurrentStep: (step) => set({ currentStep: step }),
            setSubmitting: (isSubmitting) => set({ isSubmitting }),
            setSuccess: (isSuccess) => set({ isSuccess }),
            setError: (error) => set({ error }),
            resetForm: () => set({ ...initialState, formData: { ...initialFormData } }),
        }),
        {
            name: 'donation-storage',
            partialize: (state) => ({ formData: state.formData }),
        }
    )
);
