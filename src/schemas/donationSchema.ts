import { z } from 'zod';

const phoneRegex = /^(\+420|\+421)\s*\d{3}\s*\d{3}\s*\d{3}$/;

export const donorSchema = z.object({
    id: z.string().optional(),
    name: z.string()
        .min(2, 'Meno musí mať aspoň 2 znaky')
        .max(20, 'Meno môže mať maximálne 20 znakov'),
    surname: z.string()
        .min(2, 'Priezvisko musí mať aspoň 2 znaky')
        .max(30, 'Priezvisko môže mať maximálne 30 znakov'),
    email: z.string()
        .email('Prosím zadajte platný email')
        .min(1, 'Email je povinný'),
    phone: z.string()
        .regex(phoneRegex, 'Prosím zadajte platné číslo (+420/+421 123456789)'),
});

export const donationSchema = z.object({
    helpType: z.enum(['general', 'specific']),
    shelterId: z.number().nullable(),
    amount: z.number()
        .min(1, 'Minimálna suma je 1 €')
        .max(10000, 'Maximálna suma je 10 000 €'),
    donors: z.array(donorSchema),
    consent: z.boolean()
        .refine((val) => val, 'Musíte súhlasiť so spracovaním osobných údajov'),
    name: z.string()
        .min(2, 'Meno musí mať aspoň 2 znaky')
        .max(20, 'Meno môže mať maximálne 20 znakov')
        .optional(),
    surname: z.string()
        .min(2, 'Priezvisko musí mať aspoň 2 znaky')
        .max(30, 'Priezvisko môže mať maximálne 30 znakov'),
    email: z.string()
        .email('Prosím zadajte platný email')
        .min(1, 'Email je povinný'),
    phone: z.string()
        .regex(phoneRegex, 'Prosím zadajte platné číslo (+420/+421 123456789)'),
}).refine(
    (data) => data.helpType !== 'specific' || !!data.shelterId,
    {
        message: 'Prosím vyberte útulok',
        path: ['shelterId'],
    }
);

export type DonationFormSchemaType = z.infer<typeof donationSchema>;
export type DonorFormSchema = z.infer<typeof donorSchema>;
