'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconEdit, IconUserPlus } from '@tabler/icons-react';
import { useEffect } from 'react';
import { DonorFormSchema, donorSchema } from "@/src/schemas/donationSchema";
import { Donor } from "@/src/types/api";

interface DonorFormProps {
    onAddDonor?: (donor: Donor) => void;
    onEditDonor?: (index: number, donor: Donor) => void;
    editingIndex?: number | null;
    initialData?: Donor;
    onCancel?: () => void;
}

export default function DonorForm({
                                      onAddDonor,
                                      onEditDonor,
                                      editingIndex,
                                      initialData,
                                      onCancel,
                                  }: DonorFormProps) {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<DonorFormSchema>({
        resolver: zodResolver(donorSchema),
        defaultValues: {
            name: '',
            surname: '',
            email: '',
            phone: '',
        },
    });

    useEffect(() => {
        if (initialData) {
            reset({
                name: initialData.name || '',
                surname: initialData.surname || '',
                email: initialData.email || '',
                phone: initialData.phone || '',
            });
        } else {
            reset({
                name: '',
                surname: '',
                email: '',
                phone: '',
            });
        }
    }, [initialData, reset]);

    const onSubmit = (data: DonorFormSchema) => {
        const donorData: Donor = {
            id: data.id,
            name: data.name,
            surname: data.surname,
            email: data.email,
            phone: data.phone,
        };

        if (editingIndex !== undefined && editingIndex !== null && onEditDonor) {
            onEditDonor(editingIndex, donorData);
        } else if (onAddDonor) {
            onAddDonor(donorData);
        }
        reset({
            name: '',
            surname: '',
            email: '',
            phone: '',
        });
    };

    const handleCancel = () => {
        reset({
            name: '',
            surname: '',
            email: '',
            phone: '',
        });
        if (onCancel) {
            onCancel();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-1">
                                Meno *
                            </label>
                            <input
                                {...field}
                                id="name"
                                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.name ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Zadajte meno"
                                value={field.value || ''}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                            )}
                        </div>
                    )}
                />

                <Controller
                    name="surname"
                    control={control}
                    render={({ field }) => (
                        <div>
                            <label htmlFor="surname" className="block text-sm font-medium mb-1">
                                Priezvisko *
                            </label>
                            <input
                                {...field}
                                id="surname"
                                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.surname ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Zadajte priezvisko"
                                value={field.value || ''}
                            />
                            {errors.surname && (
                                <p className="text-red-500 text-sm mt-1">{errors.surname.message}</p>
                            )}
                        </div>
                    )}
                />

                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">
                                Email *
                            </label>
                            <input
                                {...field}
                                id="email"
                                type="email"
                                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="vas@email.sk"
                                value={field.value || ''}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>
                    )}
                />

                <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium mb-1">
                                Telefón *
                            </label>
                            <input
                                {...field}
                                id="phone"
                                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.phone ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="+421 900 000 000"
                                value={field.value || ''}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Formát: +420 123456789 alebo +421 123456789
                            </p>
                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>

            <div className="flex gap-3 justify-end">
                {onCancel && (
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                    >
                        Zrušiť
                    </button>
                )}
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                    {editingIndex !== undefined && editingIndex !== null ? (
                        <>
                            <IconEdit size={18} />
                            {' '}
                            Upraviť
                        </>
                    ) : (
                        <>
                            <IconUserPlus size={18} />
                            {' '}
                            Pridať darcu
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
