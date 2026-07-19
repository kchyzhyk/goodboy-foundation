'use client';

import {Container, Title, Text, Card, Grid, Paper} from '@mantine/core';
import {IconArrowLeft, IconMail, IconMapPin, IconPhone} from '@tabler/icons-react';
import {useTranslation} from '@/src/hooks/useTranslation';
import Footer from "@/src/components/layout/Footer";
import Link from 'next/link';

export default function KontaktPage() {
    const {t} = useTranslation();

    return (
        <Container size="lg" py="xl">
            <Link
                href="/"
                className="inline-flex items-center gap-2 transition-colors mb-10 figma-button-text back-btn"
            >
                <IconArrowLeft size={20} className="back-btn" />
                Späť
            </Link>

            <Title order={1} className="text-left mb-10">
                {t('contact.title')}
            </Title>

            <Grid mt="xl" className="w-full mb-10 gap-8">
                <Grid.Col span={{base: 12, md: 4}}>
                    <Card padding="lg" className="h-full w-full">
                        <div className="flex flex-col items-center justify-center text-center">
                            <div className="icon-wrapper p-4">
                                <IconMail size={24} className='contact' />
                            </div>
                            <Title order={4} mb="sm" className='mb-2 email-text'>Email</Title>
                            <Text size="sm" className="text-center desc-text">
                                Our friendly team is here to help.
                            </Text>
                            <Text size="sm" className="text-center link">
                                hello@goodrequest.com
                            </Text>
                        </div>
                    </Card>
                </Grid.Col>

                <Grid.Col span={{base: 12, md: 4}}>
                    <Card padding="lg" className="h-full w-full">
                        <div className="flex flex-col items-center justify-center text-center">
                            <div className="icon-wrapper p-4">
                                <IconMapPin size={24} className='contact' />
                            </div>
                            <Title order={4} mb="sm" className='mb-2 email-text'>Office</Title>
                            <Text size="sm" className="text-center desc-text">
                                Come say hello at our office HQ.
                            </Text>
                            <Text size="sm" className="text-center link">
                                Obchodná 3D, 010 08 Žilina, Slovakia
                            </Text>
                        </div>
                    </Card>
                </Grid.Col>

                <Grid.Col span={{base: 12, md: 4}}>
                    <Card padding="lg" className="h-full w-full">
                        <div className="flex flex-col items-center justify-center text-center">
                            <div className="icon-wrapper p-4">
                                <IconPhone size={24} className='contact' />
                            </div>
                            <Title order={4} mb="sm" className='mb-2 email-text'>Phone</Title>
                            <Text size="sm" className="text-center desc-text">
                                Mon-Fri from 8am to 5pm.
                            </Text>
                            <Text size="sm" className="text-center link">
                                +421 911 750 750
                            </Text>
                        </div>
                    </Card>
                </Grid.Col>
            </Grid>

            <Paper className={'image-wrapper'}>
                <img
                    src="/images/good-doggo-2.jpg"
                    alt="Good boy dog"
                    className="w-full h-auto"
                />
            </Paper>

            <Footer/>
        </Container>
    );
}
