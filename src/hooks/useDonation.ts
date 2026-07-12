import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {getDonors, getShelters, getStats, submitDonation} from "@/src/services/api";
import {SubmitDonationRequest} from "@/src/types/api";

export const QUERY_KEYS = {
    shelters: ['shelters'] as const,
    stats: ['stats'] as const,
    donors: ['donors'] as const,
};

export const useShelters = () => {
    return useQuery({
        queryKey: QUERY_KEYS.shelters,
        queryFn: getShelters,
        staleTime: 5 * 60 * 1000,
    });
};

export const useStats = () => {
    return useQuery({
        queryKey: QUERY_KEYS.stats,
        queryFn: getStats,
        refetchInterval: 30 * 1000,
    });
};

export const useDonors = (shelterId?: number) => {
    return useQuery({
        queryKey: [...QUERY_KEYS.donors, shelterId],
        queryFn: () => getDonors(shelterId),
        staleTime: 60 * 1000,
        enabled: !!shelterId,
    });
};

export const useSubmitDonation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: SubmitDonationRequest) => submitDonation(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.stats });
        },
    });
};
