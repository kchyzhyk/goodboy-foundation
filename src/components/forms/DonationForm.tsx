'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { donationSchema } from '@/src/schemas/donationSchema';
import type { DonationFormData, SubmitDonationRequest } from '@/src/types/api';
import { useShelters, useSubmitDonation } from '@/src/hooks/useDonation';
import { useDonationStore } from '@/src/store/donationStore';

export default function DonationForm() {
    const [activeStep, setActiveStep] = useState(0);
    const { data: shelters, isLoading: sheltersLoading } = useShelters();
    const { mutate: submitDonation, isPending } = useSubmitDonation();

    const { formData, setField, resetForm } = useDonationStore();

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        trigger,
    } = useForm<DonationFormData>({
        resolver: zodResolver(donationSchema),
        defaultValues: {
            helpType: formData.helpType || 'general',
            shelterId: formData.shelterId || null,
            amount: formData.amount || 0,
            name: formData.name || '',
            surname: formData.surname || '',
            email: formData.email || '',
            phone: formData.phone || '',
            consent: formData.consent || false,
        },
    });

    const helpType = watch('helpType');
    const amount = watch('amount');

    const onSubmit = (data: DonationFormData) => {
        const apiData: SubmitDonationRequest = {
            contributors: [
                {
                    firstName: data.name || '',
                    lastName: data.surname,
                    email: data.email,
                    phone: data.phone,
                },
            ],
            value: data.amount,
        };

        if (data.helpType === 'specific' && data.shelterId) {
            apiData.shelterID = data.shelterId;
        }

        submitDonation(apiData, {
            onSuccess: (response) => {
                console.log('✅ Success:', response);
                resetForm();
                setActiveStep(2);
            },
            onError: (error: any) => {
                console.error('❌ Error:', error);
                console.error('Response data:', error.response?.data);

                const errorMessage = error.response?.data?.messages?.[0]?.message ||
                    'Chyba pri odosielaní. Skúste to prosím neskôr.';
                alert(errorMessage);
            },
        });
    };

    const presetAmounts = [5, 10, 20, 50];

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
            <div className="flex justify-between mb-8">
                <div className="flex-1 text-center">
                    <div
                        className={`text-sm font-semibold ${
                            activeStep === 0 ? 'text-blue-600' : 'text-gray-400'
                        }`}
                    >
                        Krok 1
                    </div>
                    <div
                        className={`h-1 mt-2 ${activeStep >= 0 ? 'bg-blue-600' : 'bg-gray-200'}`}
                    />
                </div>
                <div className="flex-1 text-center">
                    <div
                        className={`text-sm font-semibold ${
                            activeStep === 1 ? 'text-blue-600' : 'text-gray-400'
                        }`}
                    >
                        Krok 2
                    </div>
                    <div
                        className={`h-1 mt-2 ${activeStep >= 1 ? 'bg-blue-600' : 'bg-gray-200'}`}
                    />
                </div>
                <div className="flex-1 text-center">
                    <div
                        className={`text-sm font-semibold ${
                            activeStep === 2 ? 'text-blue-600' : 'text-gray-400'
                        }`}
                    >
                        Krok 3
                    </div>
                    <div
                        className={`h-1 mt-2 ${activeStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}
                    />
                </div>
            </div>

            {activeStep === 0 && (
                <div>
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
                                        <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
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
                                        <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
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
                            <Controller
                                name="shelterId"
                                control={control}
                                render={({ field }) => (
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Vyberte útulok *
                                        </label>
                                        <select
                                            className="w-full p-2 border rounded-lg"
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
                                                className={`p-2 border rounded-lg transition ${
                                                    amount === preset
                                                        ? 'bg-blue-600 text-white border-blue-600'
                                                        : 'hover:bg-gray-50'
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
                                        className="w-full p-2 border rounded-lg"
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
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                onClick={async () => {
                                    const isValid = await trigger([
                                        'helpType',
                                        'shelterId',
                                        'amount',
                                    ]);
                                    if (isValid) {
                                        setActiveStep(1);
                                    }
                                }}
                            >
                                Ďalej →
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {activeStep === 1 && (
                <div>
                    <h2 className="text-2xl font-bold mb-4">👤 Osobné údaje</h2>

                    <div className="space-y-4">
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <div>
                                    <label className="block text-sm font-medium mb-1">Meno</label>
                                    <input
                                        className="w-full p-2 border rounded-lg"
                                        placeholder="Zadajte vaše meno"
                                        value={field.value}
                                        onChange={(e) => {
                                            field.onChange(e.target.value);
                                            setField('name', e.target.value);
                                        }}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>
                            )}
                        />

                        <Controller
                            name="surname"
                            control={control}
                            render={({ field }) => (
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Priezvisko *
                                    </label>
                                    <input
                                        className="w-full p-2 border rounded-lg"
                                        placeholder="Zadajte vaše priezvisko"
                                        value={field.value}
                                        onChange={(e) => {
                                            field.onChange(e.target.value);
                                            setField('surname', e.target.value);
                                        }}
                                    />
                                    {errors.surname && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.surname.message}
                                        </p>
                                    )}
                                </div>
                            )}
                        />

                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        className="w-full p-2 border rounded-lg"
                                        placeholder="vas@email.sk"
                                        value={field.value}
                                        onChange={(e) => {
                                            field.onChange(e.target.value);
                                            setField('email', e.target.value);
                                        }}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                            )}
                        />

                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => (
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Telefón *
                                    </label>
                                    <input
                                        className="w-full p-2 border rounded-lg"
                                        placeholder="+421 900 000 000"
                                        value={field.value}
                                        onChange={(e) => {
                                            field.onChange(e.target.value);
                                            setField('phone', e.target.value);
                                        }}
                                    />
                                    <p className="text-sm text-gray-500 mt-1">
                                        Formát: +420 123456789 alebo +421 123456789
                                    </p>
                                    {errors.phone && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.phone.message}
                                        </p>
                                    )}
                                </div>
                            )}
                        />

                        <Controller
                            name="consent"
                            control={control}
                            render={({ field }) => (
                                <div className="flex items-start" >
                                    <input
                                        type="checkbox"
                                        className="mt-1 mr-3"
                                        checked={field.value}
                                        onChange={(e) => {
                                            field.onChange(e.target.checked);
                                            setField('consent', e.target.checked);
                                        }}
                                    />
                                    <label className="text-sm" >
                                        Súhlasím so spracovaním osobných údajov *
                                    </label>
                                </div>
                            )}
                        />
                        {errors.consent && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.consent.message}
                            </p>
                        )}

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
                                disabled={isPending}
                            >
                                {isPending ? 'Odosielam...' : '✅ Poslať dar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {activeStep === 2 && (
                <div className="text-center py-8">
                    <h2 className="text-3xl font-bold text-green-600 mb-4">
                        ✅ Ďakujeme!
                    </h2>
                    <p className="text-lg mb-4">
                        Váš dar bol úspešne zaznamenaný.
                    </p>
                    <p className="text-gray-500 mb-6">
                        Spoločne pomáhame psíkom v núdzi 🐕
                    </p>
                    <button
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        onClick={() => {
                            resetForm();
                            setActiveStep(0);
                        }}
                    >
                        Nový dar
                    </button>
                </div>
            )}
        </div>
    );
}
