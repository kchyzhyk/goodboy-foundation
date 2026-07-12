import { Title, Text, Container, Grid, Card } from '@mantine/core';
import { useStats, useShelters } from '@/src/hooks/useDonation';
import DonationForm from '@/src/components/forms/DonationForm';

export default function HomePage() {
    const { data: stats, isLoading: statsLoading } = useStats();
    const { data: shelters, isLoading: sheltersLoading } = useShelters();

    return (
        <Container size="lg" py="xl">
            <Title order={1} className="text-center mb-4">
                🐕 GoodBoy Foundation
            </Title>
            <Text size="lg" className="text-center text-gray-600 mb-8">
                Podporte slovenské útulky pre psov
            </Text>

            <Grid>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Text size="sm" c="dimmed">Celková suma</Text>
                        <Title order={2}>
                            {statsLoading ? '...' : `${stats?.contribution || 0} €`}
                        </Title>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Text size="sm" c="dimmed">Počet prispievateľov</Text>
                        <Title order={2}>
                            {statsLoading ? '...' : stats?.contributors || 0}
                        </Title>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Text size="sm" c="dimmed">Útulky</Text>
                        <Title order={2}>
                            {sheltersLoading ? '...' : shelters?.length || 0}
                        </Title>
                    </Card>
                </Grid.Col>
            </Grid>

            <DonationForm />
        </Container>
    );
}
