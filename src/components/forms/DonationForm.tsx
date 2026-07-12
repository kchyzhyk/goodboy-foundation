'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { IconTrash, IconEdit } from '@tabler/icons-react';
import {DonationFormSchemaType, donationSchema} from '@/src/schemas/donationSchema';
import type {Donor, SubmitDonationRequest} from '@/src/types/api';
import { useShelters, useSubmitDonation } from '@/src/hooks/useDonation';
import { useDonationStore } from '@/src/store/donationStore';
import DonorForm from './DonorForm';

export default function DonationForm() {
    const [activeStep, setActiveStep] = useState(0);
    const [editingDonorIndex, setEditingDonorIndex] = useState<number | null>(null);
    const { data: shelters, isLoading: sheltersLoading } = useShelters();
    const { mutate: submitDonation, isPending } = useSubmitDonation();

    const { formData, setField, resetForm } = useDonationStore();

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        trigger,
        setValue,
    } = useForm<DonationFormSchemaType>({
        resolver: zodResolver(donationSchema),
        defaultValues: {
            helpType: (formData.helpType as 'general' | 'specific') || 'general',
            shelterId: formData.shelterId || null,
            amount: formData.amount || 0,
            donors: formData.donors || [],
            consent: formData.consent || false,
        },
    });

    const helpType = watch('helpType');
    const amount = watch('amount');
    const donors = watch('donors');

    const onSubmit = (data: DonationFormSchemaType) => {
        if (data.donors.length === 0) {
            alert('Prosím pridajte aspoň jedného darcu');
            return;
        }

        const apiData: SubmitDonationRequest = {
            contributors: data.donors.map((donor) => ({
                firstName: donor.name || '',
                lastName: donor.surname,
                email: donor.email,
                phone: donor.phone,
            })),
            value: data.amount,
        };

        if (data.helpType === 'specific' && data.shelterId) {
            apiData.shelterID = data.shelterId;
        }

        console.log('📤 Sending data:', JSON.stringify(apiData, null, 2));

        submitDonation(apiData, {
            onSuccess: (response) => {
                console.log('✅ Success:', response);
                resetForm();
                setActiveStep(2);
            },
            onError: (error: any) => {
                console.error('❌ Error:', error);
                let errorMessage = 'Chyba pri odosielaní. Skúste to prosím neskôr.';
                if (error.response?.data?.messages?.[0]?.message) {
                    errorMessage = error.response.data.messages[0].message;
                } else if (error.message) {
                    errorMessage = error.message;
                }
                alert(errorMessage);
            },
        });
    };

    const handleAddDonor = (donor: Donor) => {
        const newDonor = { ...donor, id: Date.now().toString() };
        const currentDonors = watch('donors');
        setValue('donors', [...currentDonors, newDonor]);
        setField('donors', [...currentDonors, newDonor]);
    };

    const handleEditDonor = (index: number, donor: Donor) => {
        const currentDonors = watch('donors');
        const updatedDonors = [...currentDonors];
        updatedDonors[index] = { ...donor, id: currentDonors[index].id };
        setValue('donors', updatedDonors);
        setField('donors', updatedDonors);
        setEditingDonorIndex(null);
    };

    const handleDeleteDonor = (index: number) => {
        const currentDonors = watch('donors');
        const updatedDonors = currentDonors.filter((_, i) => i !== index);
        setValue('donors', updatedDonors);
        setField('donors', updatedDonors);
    };

    const startEditing = (index: number) => {
        setEditingDonorIndex(index);
    };

    const cancelEditing = () => {
        setEditingDonorIndex(null);
    };

    const presetAmounts = [5, 10, 20, 50];

    const stepVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-lg mt-8">
            <div className="flex justify-between mb-8">
                {['Krok 1', 'Krok 2', 'Krok 3'].map((label, index) => (
                    <div key={index} className="flex-1 text-center">
                        <div
                            className={`text-sm font-semibold ${
                                activeStep === index ? 'text-blue-600' : 'text-gray-400'
                            }`}
                        >
                            {label}
                        </div>
                        <div
                            className={`h-1 mt-2 transition-colors ${
                                activeStep >= index ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                        />
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {activeStep === 0 && (
                    <motion.div
                        key="step1"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={stepVariants}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-2xl font-bold mb-4">📋 Typ pomoci</h2>

                        <div className="space-y-4">
                            <Controller
                                name="helpType"
                                control={control}
                                render={({ field }) => (
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Vyberte formu pomoci
                                        </label>
                                        <div className="space-y-2">
                                            <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                                <input
                                                    type="radio"
                                                    value="general"
                                                    checked={field.value === 'general'}
                                                    onChange={() => {
                                                        field.onChange('general');
                                                        setField('helpType', 'general');
                                                    }}
                                                    className="mr-3"
                                                />
                                                💝 Všeobecný dar pre nadáciu
                                            </label>
                                            <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                                <input
                                                    type="radio"
                                                    value="specific"
                                                    checked={field.value === 'specific'}
                                                    onChange={() => {
                                                        field.onChange('specific');
                                                        setField('helpType', 'specific');
                                                    }}
                                                    className="mr-3"
                                                />
                                                🏠 Dar pre konkrétny útulok
                                            </label>
                                        </div>
                                        {errors.helpType && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.helpType.message}
                                            </p>
                                        )}
                                    </div>
                                )}
                            />

                            {helpType === 'specific' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Controller
                                        name="shelterId"
                                        control={control}
                                        render={({ field }) => (
                                            <div>
                                                <label className="block text-sm font-medium mb-2">
                                                    Vyberte útulok *
                                                </label>
                                                <select
                                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    value={field.value || ''}
                                                    onChange={(e) => {
                                                        const value = e.target.value
                                                            ? parseInt(e.target.value)
                                                            : null;
                                                        field.onChange(value);
                                                        setField('shelterId', value);
                                                    }}
                                                    disabled={sheltersLoading}
                                                >
                                                    <option value="">Vyberte útulok...</option>
                                                    {shelters?.map((shelter) => (
                                                        <option key={shelter.id} value={shelter.id}>
                                                            {shelter.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.shelterId && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {errors.shelterId.message}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    />
                                </motion.div>
                            )}

                            <Controller
                                name="amount"
                                control={control}
                                render={({ field }) => (
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            💶 Vyberte sumu *
                                        </label>
                                        <div className="grid grid-cols-4 gap-2 mb-3">
                                            {presetAmounts.map((preset) => (
                                                <button
                                                    key={preset}
                                                    type="button"
                                                    className={`p-2 border rounded-lg transition-all ${
                                                        amount === preset
                                                            ? 'bg-blue-600 text-white border-blue-600 transform scale-105'
                                                            : 'hover:bg-gray-50 hover:scale-105'
                                                    }`}
                                                    onClick={() => {
                                                        field.onChange(preset);
                                                        setField('amount', preset);
                                                    }}
                                                >
                                                    {preset} €
                                                </button>
                                            ))}
                                        </div>
                                        <input
                                            type="number"
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Vlastná suma"
                                            value={field.value || ''}
                                            onChange={(e) => {
                                                const value = e.target.value
                                                    ? parseFloat(e.target.value)
                                                    : 0;
                                                field.onChange(value);
                                                setField('amount', value);
                                            }}
                                            min={1}
                                            step={1}
                                        />
                                        {errors.amount && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.amount.message}
                                            </p>
                                        )}
                                    </div>
                                )}
                            />

                            <div className="flex justify-end mt-6">
                                <button
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:scale-105"
                                    onClick={async () => {
                                        const isValid = await trigger(['helpType', 'shelterId', 'amount']);
                                        if (isValid) {
                                            setActiveStep(1);
                                        }
                                    }}
                                >
                                    Ďalej →
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeStep === 1 && (
                    <motion.div
                        key="step2"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={stepVariants}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-2xl font-bold mb-4">👤 Darcovia</h2>

                        {donors.length > 0 && (
                            <div className="mb-4 space-y-2">
                                {donors.map((donor, index) => (
                                    <motion.div
                                        key={donor.id || index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="flex items-center justify-between p-3 bg-white border rounded-lg hover:shadow-md transition"
                                    >
                                        <div className="flex-1">
                                            <p className="font-medium">
                                                {donor.name || ''} {donor.surname}
                                            </p>
                                            <p className="text-sm text-gray-600">{donor.email}</p>
                                            <p className="text-sm text-gray-500">{donor.phone}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => startEditing(index)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                aria-label="Upraviť darcu"
                                            >
                                                <IconEdit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteDonor(index)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                aria-label="Odstrániť darcu"
                                            >
                                                <IconTrash size={18} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {editingDonorIndex !== null ? (
                            <DonorForm
                                onEditDonor={handleEditDonor}
                                editingIndex={editingDonorIndex}
                                initialData={donors[editingDonorIndex]}
                                onCancel={cancelEditing}
                            />
                        ) : (
                            <DonorForm onAddDonor={handleAddDonor} />
                        )}

                        {errors.donors && (
                            <p className="text-red-500 text-sm mt-2">{errors.donors.message}</p>
                        )}

                        <div className="mt-4">
                            <Controller
                                name="consent"
                                control={control}
                                render={({ field }) => (
                                    <div className="flex items-start">
                                        <input
                                            type="checkbox"
                                            className="mt-1 mr-3"
                                            checked={field.value}
                                            onChange={(e) => {
                                                field.onChange(e.target.checked);
                                                setField('consent', e.target.checked);
                                            }}
                                        />
                                        <label className="text-sm">
                                            Súhlasím so spracovaním osobných údajov *
                                        </label>
                                    </div>
                                )}
                            />
                            {errors.consent && (
                                <p className="text-red-500 text-sm mt-1">{errors.consent.message}</p>
                            )}
                        </div>

                        <div className="flex justify-between mt-6">
                            <button
                                className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                                onClick={() => setActiveStep(0)}
                            >
                                ← Späť
                            </button>
                            <button
                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                                onClick={handleSubmit(onSubmit)}
                                disabled={isPending || donors.length === 0}
                            >
                                {isPending ? 'Odosielam...' : '✅ Poslať dar'}
                            </button>
                        </div>

                        {donors.length === 0 && !isPending && (
                            <p className="text-sm text-amber-600 mt-2">
                                ⚠️ Pridajte aspoň jedného darcu
                            </p>
                        )}
                    </motion.div>
                )}

                {activeStep === 2 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center py-8"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        >
                            <h2 className="text-3xl font-bold text-green-600 mb-4">
                                ✅ Ďakujeme!
                            </h2>
                        </motion.div>
                        <p className="text-lg mb-4">
                            Váš dar bol úspešne zaznamenaný.
                        </p>
                        <p className="text-gray-500 mb-6">
                            Spoločne pomáhame psíkom v núdzi 🐕
                        </p>
                        <button
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:scale-105"
                            onClick={() => {
                                resetForm();
                                setActiveStep(0);
                            }}
                        >
                            Nový dar
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
