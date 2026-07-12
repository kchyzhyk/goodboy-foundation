'use client';

import { Title, Text, Container, Grid, Card } from '@mantine/core';
import { useStats, useShelters } from '@/src/hooks/useDonation';
import DonationForm from '@/src/components/forms/DonationForm';
import AnimatedWrapper from '@/src/components/common/AnimatedWrapper';
import AnimatedCounter from '@/src/components/common/AnimatedCounter';
import { IconUsers, IconCoinEuro, IconHeart } from '@tabler/icons-react';

export default function HomePage() {
    const { data: stats, isLoading: statsLoading } = useStats();
    const { data: shelters } = useShelters();

    return (
        <>
            <Container size="lg" py="xl">
                <AnimatedWrapper>
                    <Title order={1} className="text-center mb-4">
                        🐕 GoodBoy Foundation
                    </Title>
                    <Text size="lg" className="text-center text-gray-600 mb-8">
                        Podporte slovenské útulky pre psov
                    </Text>
                </AnimatedWrapper>

                <Grid>
                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <AnimatedWrapper delay={0.1}>
                            <Card shadow="sm" padding="lg" radius="md" withBorder className="text-center hover:shadow-md transition-shadow">
                                <IconCoinEuro size={32} className="text-green-500 mx-auto mb-2" />
                                <Text size="sm" c="dimmed">Celková suma</Text>
                                <Title order={2}>
                                    {statsLoading ? '...' : (
                                        <AnimatedCounter value={stats?.contribution || 0} suffix="€" />
                                    )}
                                </Title>
                            </Card>
                        </AnimatedWrapper>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <AnimatedWrapper delay={0.2}>
                            <Card shadow="sm" padding="lg" radius="md" withBorder className="text-center hover:shadow-md transition-shadow">
                                <IconUsers size={32} className="text-blue-500 mx-auto mb-2" />
                                <Text size="sm" c="dimmed">Počet prispievateľov</Text>
                                <Title order={2}>
                                    {statsLoading ? '...' : (
                                        <AnimatedCounter value={stats?.contributors || 0} />
                                    )}
                                </Title>
                            </Card>
                        </AnimatedWrapper>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <AnimatedWrapper delay={0.3}>
                            <Card shadow="sm" padding="lg" radius="md" withBorder className="text-center hover:shadow-md transition-shadow">
                                <IconHeart size={32} className="text-red-500 mx-auto mb-2" />
                                <Text size="sm" c="dimmed">Útulky</Text>
                                <Title order={2}>
                                    {shelters?.length || 0}
                                </Title>
                            </Card>
                        </AnimatedWrapper>
                    </Grid.Col>
                </Grid>

                <AnimatedWrapper delay={0.4}>
                    <DonationForm />
                </AnimatedWrapper>
            </Container>
        </>
    );
}
