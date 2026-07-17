'use client';

import {useEffect, useRef, useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {DonationFormSchemaType, donationSchema} from '@/src/schemas/donationSchema';
import {useShelters} from '@/src/hooks/useDonation';
import {useDonationStore} from '@/src/store/donationStore';
import {IconCurrencyEuro} from "@tabler/icons-react";
import Footer from "@/src/components/layout/Footer";

export default function HomePage() {
    const [step, setStep] = useState(1);
    const amountInputRef = useRef<HTMLInputElement>(null);
    const {data: shelters, isLoading: sheltersLoading} = useShelters();
    const {setField} = useDonationStore();

    const {
        control,
        handleSubmit,
        formState: {errors},
        watch,
        trigger,
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

    // Находим название приюта по ID
    const selectedShelterName = shelters?.find(s => s.id === shelterId)?.name || 'Nezvolený';

    const onSubmit = (data: DonationFormSchemaType) => {
        console.log('submit', data);
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
                                                        ? 'bg-green-500 text-white border-green-500'
                                                        : 'border-[#D1D5DB] text-gray-400 opacity-20 bg-transparent'
                                            }`}
                                        >
                                            {step > s.id ? '✓' : s.id}
                                        </div>
                                        <span
                                            className={`figma-stepper-text whitespace-nowrap ${
                                                step === s.id
                                                    ? 'figma-stepper-text-active'
                                                    : 'text-[#111827] opacity-10'
                                            }`}
                                        >
                                            {s.label}
                                        </span>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div
                                            className={`h-0.5 flex-1 mx-2 ${
                                                step > s.id ? 'bg-green-500' : 'bg-[#D1D5DB]'
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
                                                    <div className="flex items-center p-1 rounded-xl border border-gray-200 gap-2">
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
                                                                <option value="" disabled className="select-placeholder">
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
                                        <p className="figma-label mb-4 figma-label-semibold">Suma, ktorou chcem prispieť</p>
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
                                                            className={`w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent figma-body ${
                                                                errors.name ? 'border-red-500' : ''
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
                                                E-mailová adresa
                                            </label>
                                            <Controller
                                                name="email"
                                                control={control}
                                                render={({field}) => (
                                                    <div>
                                                        <input
                                                            type="email"
                                                            className={`w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent figma-body ${
                                                                errors.email ? 'border-red-500' : ''
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
                                                        <input
                                                            type="tel"
                                                            className={`w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent figma-body ${
                                                                errors.phone ? 'border-red-500' : ''
                                                            }`}
                                                            placeholder="+420 123 321 123"
                                                            value={field.value || ''}
                                                            onChange={field.onChange}
                                                            onBlur={field.onBlur}
                                                        />
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
                        </div>

                        <Footer
                            step={step}
                            onBack={step === 1 ? undefined : () => setStep(step - 1)}
                            onNext={async () => {
                                if (step === 1) {
                                    const isValid = await trigger(['helpType', 'shelterId', 'amount']);
                                    if (isValid) setStep(2);
                                } else if (step === 2) {
                                    const isValid = await trigger(['name', 'email', 'phone']);
                                    if (isValid) setStep(3);
                                } else if (step === 3) {
                                    handleSubmit(onSubmit)();
                                }
                            }}
                            hideBack={step === 1}
                            nextLabel={step === 3 ? 'Odoslať formulár' : 'Pokračovať →'}
                            isNextDisabled={step === 3 ? false : false}
                            isLoading={false}
                        />
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
