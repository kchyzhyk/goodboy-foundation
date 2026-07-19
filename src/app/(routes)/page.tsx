'use client';

import {useEffect, useRef, useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {DonationFormSchemaType, donationSchema} from '@/src/schemas/donationSchema';
import {useShelters, useSubmitDonation} from '@/src/hooks/useDonation';
import {useDonationStore} from '@/src/store/donationStore';
import {IconCurrencyEuro} from "@tabler/icons-react";
import Footer from "@/src/components/layout/Footer";
import NavigationButtons from "@/src/components/common/NavigationButtons";
import {SubmitDonationRequest} from "@/src/types/api";

export default function HomePage() {
    const [step, setStep] = useState(1);
    const [isSuccess, setIsSuccess] = useState(false);
    const amountInputRef = useRef<HTMLInputElement>(null);
    const {data: shelters, isLoading: sheltersLoading} = useShelters();
    const {setField} = useDonationStore();
    const {mutate: submitDonation, isPending} = useSubmitDonation();

    const {
        control,
        handleSubmit,
        formState: {errors},
        watch,
        trigger,
        reset
    } = useForm<DonationFormSchemaType>({
        resolver: zodResolver(donationSchema),
        defaultValues: {
            helpType: 'specific',
            shelterId: null,
            amount: 0,
            donors: [],
            consent: false,
            name: '',
            surname: '',
            email: '',
            phone: '',
        },
    });

    const amount = watch('amount');
    const helpType = watch('helpType');
    const shelterId = watch('shelterId');
    const name = watch('name');
    const surname = watch('surname');
    const email = watch('email');
    const phone = watch('phone');
    const presetAmounts = [5, 10, 20, 30, 50, 100];

    const selectedShelterName = shelters?.find(s => s.id === shelterId)?.name || 'Nezvolený';

    const onSubmit = (data: DonationFormSchemaType) => {
        const apiData: SubmitDonationRequest = {
            contributors: [
                {
                    firstName: data.name || '',
                    lastName: data.surname || '',
                    email: data.email,
                    phone: data.phone,
                }
            ],
            value: data.amount,
        };
        if (data.helpType === 'specific' && data.shelterId) {
            apiData.shelterID = data.shelterId;
        }

        submitDonation(apiData, {
            onSuccess: (response) => {
                console.log('✅ Success:', response);
                setIsSuccess(true);
                setStep(4);
            },
            onError: (error: any) => {
                console.error('❌ Error:', error);
                const errorMessage = error.response?.data?.messages?.[0]?.message || 'Chyba pri odosielaní. Skúste to prosím neskôr.';
                alert(errorMessage);
            },
        });
    };

    const steps = [
        {id: 1, label: 'Výber útulku'},
        {id: 2, label: 'Osobné údaje'},
        {id: 3, label: 'Potvrdenie'},
    ];

    useEffect(() => {
        if (amountInputRef.current) {
            const input = amountInputRef.current;
            const value = input.value;
            input.style.width = '146px';
            if (value && value !== '0') {
                input.style.width = input.scrollWidth + 'px';
            }
        }
    }, [amount]);

    return (
        <div className="h-screen flex flex-col bg-white">
            <div className="flex-1 flex items-center justify-center">
                <div className="columns-wrapper">

                    <div className="flex-1 flex flex-col column-left">
                        <div className="flex items-center justify-between mb-10">
                            {steps.map((s, index) => (
                                <div key={s.id} className="flex items-center flex-1">
                                    <div className="flex items-center gap-2 flex-1">
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center figma-stepper-text border-2 ${
                                                step === s.id
                                                    ? 'bg-[#4F46E5] text-white border-[#4F46E5]'
                                                    : step > s.id
                                                        ? 'bg-transparent text-[#4F46E5] border-[#4F46E5]'
                                                        : 'border-[#D1D5DB] text-gray-400 opacity-20 bg-transparent'
                                            }`}
                                        >
                                            {step > s.id ? '✓' : s.id}
                                        </div>
                                        <span
                                            className={`figma-stepper-text whitespace-nowrap ${
                                                step === s.id
                                                    ? 'figma-stepper-text-active'
                                                    : step > s.id
                                                        ? 'passed-step'
                                                        : 'text-[#111827] opacity-10'
                                            }`}
                                        >
                                            {s.label}
                                        </span>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div
                                            className={`h-0.5 flex-1 mx-2 ${
                                                step > s.id ? 'bg-[#4F46E5]' : 'bg-[#D1D5DB]'
                                            }`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="form-spacing">
                            {step === 1 && (
                                <>
                                    <h2 className="figma-heading mb-10">
                                        Vyberte si možnosť, ako chcete pomôcť
                                    </h2>

                                    <div className='mb-10'>
                                        <Controller
                                            name="helpType"
                                            control={control}
                                            render={({field}) => (
                                                <div>
                                                    <div
                                                        className="flex items-center p-1 rounded-xl border border-gray-200 gap-2">
                                                        <button
                                                            type="button"
                                                            className={`flex-1 py-4 px-2 rounded-lg figma-button-text transition-all ${
                                                                field.value === 'specific'
                                                                    ? 'bg-[#4F46E5] text-white border border-[#4F46E5]'
                                                                    : 'text-gray-500 hover:text-gray-700 border border-transparent'
                                                            }`}
                                                            onClick={() => {
                                                                field.onChange('specific');
                                                                setField('helpType', 'specific');
                                                            }}
                                                        >
                                                            Prispieť konkrétnemu útulku
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className={`flex-1 py-4 px-2 rounded-lg figma-button-text transition-all ${
                                                                field.value === 'general'
                                                                    ? 'bg-[#4F46E5] text-white border border-[#4F46E5]'
                                                                    : 'text-gray-500 hover:text-gray-700 border border-transparent'
                                                            }`}
                                                            onClick={() => {
                                                                field.onChange('general');
                                                                setField('helpType', 'general');
                                                            }}
                                                        >
                                                            Prispieť celej nadácii
                                                        </button>
                                                    </div>
                                                    {errors.helpType && (
                                                        <p className="text-red-500 text-sm mt-1">{errors.helpType.message}</p>
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </div>

                                    {helpType === 'specific' && (
                                        <>
                                            <div className='mb-4'>
                                                <p className="figma-label">O projekte</p>
                                            </div>

                                            <div className='mb-10'>
                                                <p className="figma-label flex items-center gap-1 mb-1">
                                                    Útulok <span className="figma-label-optional">(Nepovinné)</span>
                                                </p>
                                                <Controller
                                                    name="shelterId"
                                                    control={control}
                                                    render={({field}) => (
                                                        <div>
                                                            <select
                                                                className={`select-custom ${errors.shelterId ? 'border-red-500' : ''}`}
                                                                value={field.value || ''}
                                                                onChange={(e) => {
                                                                    const value = e.target.value ? parseInt(e.target.value) : null;
                                                                    field.onChange(value);
                                                                    setField('shelterId', value);
                                                                }}
                                                                disabled={sheltersLoading}
                                                            >
                                                                <option value="" disabled
                                                                        className="select-placeholder">
                                                                    Vyberte útulok zo zoznamu
                                                                </option>
                                                                {shelters?.map((s) => (
                                                                    <option key={s.id} value={s.id}>{s.name}</option>
                                                                ))}
                                                            </select>
                                                            {errors.shelterId && (
                                                                <p className="text-red-500 text-sm mt-1">{errors.shelterId.message}</p>
                                                            )}
                                                        </div>
                                                    )}
                                                />
                                            </div>
                                        </>
                                    )}

                                    <div className='mb-12'>
                                        <p className="figma-label mb-4 figma-label-semibold">Suma, ktorou chcem
                                            prispieť</p>
                                        <Controller
                                            name="amount"
                                            control={control}
                                            render={({field}) => (
                                                <div>
                                                    <div className="amount-input-wrapper">
                                                        <div className="amount-inner">
                                                            <input
                                                                ref={amountInputRef}
                                                                type="number"
                                                                className={`amount-input ${errors.amount ? 'border-red-500' : ''}`}
                                                                value={field.value || ''}
                                                                onChange={(e) => {
                                                                    const val = parseFloat(e.target.value) || 0;
                                                                    field.onChange(val);
                                                                    setField('amount', val);
                                                                }}
                                                                min={0}
                                                                step={1}
                                                                placeholder="0"
                                                            />
                                                            <span className="amount-currency">
                                                                <IconCurrencyEuro size={38} stroke={2}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="amount-buttons">
                                                        {presetAmounts.map((preset) => (
                                                            <button
                                                                key={preset}
                                                                type="button"
                                                                className={`amount-button ${amount === preset ? 'amount-button-active' : ''}`}
                                                                onClick={() => {
                                                                    field.onChange(preset);
                                                                    setField('amount', preset);
                                                                }}
                                                            >
                                                                {preset} €
                                                            </button>
                                                        ))}
                                                    </div>
                                                    {errors.amount && (
                                                        <p className="text-red-500 text-sm">{errors.amount.message}</p>
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </div>
                                </>
                            )}

                            {step === 2 && (
                                <>
                                    <h2 className="figma-heading-32">
                                        Potrebujeme od Vás zopár informácií
                                    </h2>

                                    <div className="space-y-4">

                                        <label className="figma-label mb-1 block">
                                            O vás
                                        </label>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="figma-label mb-1 block">
                                                    Meno
                                                </label>
                                                <Controller
                                                    name="name"
                                                    control={control}
                                                    render={({field}) => (
                                                        <div>
                                                            <input
                                                                type="text"
                                                                className={`w-full p-3 border-2 rounded-xl figma-body outline-none transition-colors bg-[#F3F4F6] ${
                                                                    errors.name
                                                                        ? 'border-red-500'
                                                                        : 'border-gray-200 focus:border-[#3b82f6]'
                                                                }`}
                                                                placeholder="Zadajte Vaše meno"
                                                                value={field.value || ''}
                                                                onChange={field.onChange}
                                                                onBlur={field.onBlur}
                                                            />
                                                            {errors.name && (
                                                                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                                                            )}
                                                        </div>
                                                    )}
                                                />
                                            </div>

                                            <div>
                                                <label className="figma-label mb-1 block">
                                                    Priezvisko
                                                </label>
                                                <Controller
                                                    name="surname"
                                                    control={control}
                                                    render={({field}) => (
                                                        <div>
                                                            <input
                                                                type="text"
                                                                className={`w-full p-3 border-2 rounded-xl figma-body outline-none transition-colors bg-[#F3F4F6] ${
                                                                    errors.surname
                                                                        ? 'border-red-500'
                                                                        : 'border-gray-200 focus:border-[#3b82f6]'
                                                                }`}
                                                                placeholder="Zadajte Vaše priezvisko"
                                                                value={field.value || ''}
                                                                onChange={field.onChange}
                                                                onBlur={field.onBlur}
                                                            />
                                                            {errors.surname && (
                                                                <p className="text-red-500 text-sm mt-1">{errors.surname.message}</p>
                                                            )}
                                                        </div>
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="figma-label mb-1 block">
                                                E-mailová adresa
                                            </label>
                                            <Controller
                                                name="email"
                                                control={control}
                                                render={({field}) => (
                                                    <div>
                                                        <input
                                                            type="email"
                                                            className={`w-full p-3 border-2 rounded-xl figma-body outline-none transition-colors bg-[#F3F4F6] ${
                                                                errors.email
                                                                    ? 'border-red-500'
                                                                    : 'border-gray-200 focus:border-[#3b82f6]'
                                                            }`}
                                                            placeholder="Zadajte Váš e-mail"
                                                            value={field.value || ''}
                                                            onChange={field.onChange}
                                                            onBlur={field.onBlur}
                                                        />
                                                        {errors.email && (
                                                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                                        )}
                                                    </div>
                                                )}
                                            />
                                        </div>

                                        <div>
                                            <label className="figma-label mb-1 block">
                                                Telefónne číslo
                                            </label>
                                            <Controller
                                                name="phone"
                                                control={control}
                                                render={({field}) => (
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="relative w-[130px]">
                                                                <select
                                                                    className="w-full h-14 pl-3 pr-8 border-2 rounded-xl figma-body outline-none transition-colors bg-[#F3F4F6] border-gray-200 focus:border-[#3b82f6] appearance-none cursor-pointer"
                                                                    value={field.value?.match(/^\+\d{3}/)?.[0] || '+421'}
                                                                    onChange={(e) => {
                                                                        const newCode = e.target.value;
                                                                        const currentNumber = field.value?.replace(/^\+\d{3}\s?/, '') || '';
                                                                        field.onChange(`${newCode} ${currentNumber}`);
                                                                    }}
                                                                >
                                                                    <option value="+420">🇨🇿 +420</option>
                                                                    <option value="+421">🇸🇰 +421</option>
                                                                </select>
                                                                <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                                </svg>
                                                            </div>
                                                            <input
                                                                type="tel"
                                                                className={`flex-1 p-3 border-2 rounded-xl figma-body outline-none transition-colors bg-[#F3F4F6] ${
                                                                    errors.phone
                                                                        ? 'border-red-500'
                                                                        : 'border-gray-200 focus:border-[#3b82f6]'
                                                                }`}
                                                                placeholder="+421 123 456 789"
                                                                value={field.value || ''}
                                                                onChange={(e) => {
                                                                    const rawValue = e.target.value.replace(/\s/g, '');
                                                                    const codeMatch = rawValue.match(/^(\+420|\+421)/);
                                                                    if (codeMatch) {
                                                                        const detectedCode = codeMatch[0];
                                                                        const number = rawValue.replace(detectedCode, '');
                                                                        const formattedNumber = number.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
                                                                        field.onChange(`${detectedCode} ${formattedNumber}`);
                                                                    } else {
                                                                        const currentCode = field.value?.match(/^\+\d{3}/)?.[0] || '+421';
                                                                        const formattedNumber = rawValue.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
                                                                        field.onChange(`${currentCode} ${formattedNumber}`);
                                                                    }
                                                                }}
                                                                onPaste={(e) => {
                                                                    setTimeout(() => {
                                                                        const input = e.target as HTMLInputElement;
                                                                        const rawValue = input.value.replace(/[^\d+]/g, '');
                                                                        const codeMatch = rawValue.match(/^(\+420|\+421)/);
                                                                        if (codeMatch) {
                                                                            const detectedCode = codeMatch[0];
                                                                            const number = rawValue.replace(detectedCode, '');
                                                                            const formattedNumber = number.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
                                                                            field.onChange(`${detectedCode} ${formattedNumber}`);
                                                                        } else {
                                                                            const currentCode = field.value?.match(/^\+\d{3}/)?.[0] || '+421';
                                                                            const formattedNumber = rawValue.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
                                                                            field.onChange(`${currentCode} ${formattedNumber}`);
                                                                        }
                                                                    }, 10);
                                                                }}
                                                                onBlur={field.onBlur}
                                                            />
                                                        </div>
                                                        {errors.phone && (
                                                            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                                                        )}
                                                    </div>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {step === 3 && (
                                <>
                                    <h2 className="figma-heading-32">
                                        Skontrolujte si zadané údaje
                                    </h2>

                                    <div className="space-y-4">
                                        <div className="bg-gray-50 rounded-xl p-4">
                                            <p className="figma-label mb-2">Zhrnutie</p>
                                            <div className="space-y-2 figma-body">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Forma pomoci</span>
                                                    <span className="font-medium">
                                                        {helpType === 'specific' ? 'Prispieť konkrétnemu útulku' : 'Prispieť celej nadácii'}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Útulok</span>
                                                    <span className="font-medium">
                                                        {shelterId ? selectedShelterName : 'Nezvolený'}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Suma prispevku</span>
                                                    <span className="font-medium">{amount} €</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Meno a priezvisko</span>
                                                    <span className="font-medium">{name || '-'} {surname || ''}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">E-mail</span>
                                                    <span className="font-medium">{email || '-'}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Telefónne číslo</span>
                                                    <span className="font-medium">{phone || '-'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <Controller
                                            name="consent"
                                            control={control}
                                            render={({field}) => (
                                                <div>
                                                    <label className="flex items-start gap-3 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            className="mt-1 w-4 h-4"
                                                            checked={field.value}
                                                            onChange={(e) => {
                                                                field.onChange(e.target.checked);
                                                                setField('consent', e.target.checked);
                                                            }}
                                                        />
                                                        <span className="figma-body text-gray-700">
                                                            Súhlasím so spracovaním mojich osobných údajov
                                                        </span>
                                                    </label>
                                                    {errors.consent && (
                                                        <p className="text-red-500 text-sm mt-1">{errors.consent.message}</p>
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </div>
                                </>
                            )}

                            {step === 4 && (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <div
                                        className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                    </div>
                                    <h2 className="figma-heading-32 text-center mb-4">
                                        ✅ Ďakujeme!
                                    </h2>
                                    <p className="figma-body text-gray-600 text-center max-w-md mb-2">
                                        Váš dar bol úspešne odoslaný.
                                    </p>
                                    <p className="figma-body text-gray-500 text-center max-w-md">
                                        Spoločne pomáhame psíkom v núdzi. 🐕
                                    </p>
                                    <button
                                        type="button"
                                        className="mt-8 px-8 py-3 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] transition figma-button-text"
                                        onClick={() => {
                                            setStep(1);
                                            setIsSuccess(false);
                                            reset();
                                        }}
                                    >
                                        Nový dar
                                    </button>
                                </div>
                            )}

                            {!isSuccess &&

                                <div className="mb-4">
                                    <NavigationButtons
                                        onBack={step === 1 ? undefined : () => setStep(step - 1)}
                                        onNext={async () => {
                                            if (step === 1) {
                                                const isValid = await trigger(['helpType', 'shelterId', 'amount']);
                                                if (isValid) setStep(2);
                                            } else if (step === 2) {
                                                const isValid = await trigger(['name', 'surname', 'email', 'phone']);
                                                if (isValid) setStep(3);
                                            } else if (step === 3) {
                                                await handleSubmit(onSubmit)();
                                            }
                                        }}
                                        hideBack={step === 1}
                                        nextLabel={step === 3 ? 'Odoslať formulár' : 'Pokračovať →'}
                                        isLoading={isPending}
                                    />
                                </div>
                            }


                        </div>

                        <Footer/>
                    </div>

                    <div className="image-column">
                        <img
                            src="/images/good-doggo-1.jpg"
                            alt="Good boy dog"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
