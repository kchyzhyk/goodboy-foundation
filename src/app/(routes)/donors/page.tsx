'use client';

import { Container, Title, Text, Card, Grid, Loader, Center, Paper } from '@mantine/core';
import { useStats } from '@/src/hooks/useDonation';
import { IconUsers, IconCoinEuro, IconHeart } from '@tabler/icons-react';
import AnimatedCounter from '@/src/components/common/AnimatedCounter';

export default function DonorsPage() {
    const { data: stats, isLoading } = useStats();

    if (isLoading) {
        return (
            <Container size="lg" py="xl">
                <Center py="xl">
                    <Loader size="lg" />
                </Center>
            </Container>
        );
    }

    return (
        <>
            <Container size="lg" py="xl">
                <Title order={1} className="text-center mb-4">
                    👥 Prispievatelia
                </Title>
                <Text size="lg" className="text-center text-gray-600 mb-8">
                    Ľudia, ktorí pomáhajú psíkom v núdzi
                </Text>

                <Grid>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Card shadow="sm" padding="xl" radius="md" withBorder className="text-center">
                            <div className="flex justify-center mb-3">
                                <IconUsers size={40} className="text-blue-500" />
                            </div>
                            <Text size="sm" c="dimmed">Počet prispievateľov</Text>
                            <Title order={1} className="mt-2">
                                <AnimatedCounter value={stats?.contributors || 0} />
                            </Title>
                        </Card>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Card shadow="sm" padding="xl" radius="md" withBorder className="text-center">
                            <div className="flex justify-center mb-3">
                                <IconCoinEuro size={40} className="text-green-500" />
                            </div>
                            <Text size="sm" c="dimmed">Celková suma</Text>
                            <Title order={1} className="mt-2">
                                <AnimatedCounter value={stats?.contribution || 0} suffix=" €" />
                            </Title>
                        </Card>
                    </Grid.Col>
                </Grid>

                <Paper shadow="sm" p="xl" radius="md" withBorder mt="xl" className="bg-gradient-to-r from-blue-50 to-green-50">
                    <div className="text-center">
                        <div className="flex justify-center mb-3">
                            <IconHeart size={48} className="text-red-500" />
                        </div>
                        <Title order={3} mb="sm">
                            Ďakujeme všetkým prispievateľom! 🐕
                        </Title>
                        <Text c="dimmed">
                            Spoločne pomáhame slovenským útulkom a psíkom v núdzi
                        </Text>
                        <Text size="sm" c="dimmed" mt="2">
                            {stats?.contributors || 0} ľudí už prispelo {stats?.contribution || 0} €
                        </Text>
                    </div>
                </Paper>
            </Container>
        </>
    );
}
