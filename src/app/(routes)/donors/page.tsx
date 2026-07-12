'use client';

import { Container, Title, Text, Card, Grid, Loader, Center, Paper } from '@mantine/core';
import { useStats } from '@/src/hooks/useDonation';
import { IconUsers, IconCoinEuro, IconHeart } from '@tabler/icons-react';
import AnimatedCounter from '@/src/components/common/AnimatedCounter';
import { useTranslation } from '@/src/hooks/useTranslation';

export default function DonorsPage() {
    const { t } = useTranslation();
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
        <Container size="lg" py="xl">
            <Title order={1} className="text-center mb-4">
                {t('donors.title')}
            </Title>
            <Text size="lg" className="text-center text-gray-600 mb-8">
                {t('donors.subtitle')}
            </Text>

            <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Card shadow="sm" padding="xl" radius="md" withBorder className="text-center">
                        <div className="flex justify-center mb-3">
                            <IconUsers size={40} className="text-blue-500" />
                        </div>
                        <Text size="sm" c="dimmed">{t('donors.totalContributors')}</Text>
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
                        <Text size="sm" c="dimmed">{t('donors.totalAmount')}</Text>
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
                        {t('donors.thanks')}
                    </Title>
                    <Text c="dimmed">
                        {t('donors.thanksDesc')}
                    </Text>
                    <Text size="sm" c="dimmed" mt="2">
                        {stats?.contributors || 0} {t('donors.alreadyContributed')} {stats?.contribution || 0} €
                    </Text>
                </div>
            </Paper>
        </Container>
    );
}
