'use client';

import { Container, Title, Text, Card, Grid, Stack, ThemeIcon, Group, Paper } from '@mantine/core';
import { IconMail, IconPhone, IconMapPin, IconClock, IconWorld } from '@tabler/icons-react';

export default function KontaktPage() {
    return (
        <>
            <Container size="lg" py="xl">
                <Title order={1} className="text-center mb-4">
                    📞 Kontakt
                </Title>
                <Text size="lg" className="text-center text-gray-600 mb-8">
                    Spojte sa s nami
                </Text>

                <Grid>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Card shadow="sm" padding="lg" radius="md" withBorder className="h-full">
                            <Title order={3} mb="md">Kontaktné informácie</Title>

                            <Stack gap="md">
                                <Group wrap="nowrap">
                                    <ThemeIcon color="blue" size="lg" radius="xl">
                                        <IconMapPin size={20} />
                                    </ThemeIcon>
                                    <div>
                                        <Text size="sm" c="dimmed">Adresa</Text>
                                        <Text>GoodBoy Foundation</Text>
                                        <Text>Hatiko 123</Text>
                                        <Text>811 01 Bratislava</Text>
                                        <Text>Slovenská republika</Text>
                                    </div>
                                </Group>

                                <Group wrap="nowrap">
                                    <ThemeIcon color="green" size="lg" radius="xl">
                                        <IconPhone size={20} />
                                    </ThemeIcon>
                                    <div>
                                        <Text size="sm" c="dimmed">Telefón</Text>
                                        <Text>+421 900 123 456</Text>
                                    </div>
                                </Group>

                                <Group wrap="nowrap">
                                    <ThemeIcon color="red" size="lg" radius="xl">
                                        <IconMail size={20} />
                                    </ThemeIcon>
                                    <div>
                                        <Text size="sm" c="dimmed">Email</Text>
                                        <Text>info@goodboy-foundation.sk</Text>
                                    </div>
                                </Group>

                                <Group wrap="nowrap">
                                    <ThemeIcon color="grape" size="lg" radius="xl">
                                        <IconWorld size={20} />
                                    </ThemeIcon>
                                    <div>
                                        <Text size="sm" c="dimmed">Web</Text>
                                        <Text>www.goodboy-foundation.sk</Text>
                                    </div>
                                </Group>
                            </Stack>
                        </Card>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Card shadow="sm" padding="lg" radius="md" withBorder className="h-full">
                            <Title order={3} mb="md">Otváracie hodiny</Title>

                            <Stack gap="sm">
                                <Group justify="space-between">
                                    <Text>Pondelok - Piatok</Text>
                                    <Text fw={500}>9:00 - 17:00</Text>
                                </Group>
                                <Group justify="space-between">
                                    <Text>Sobota</Text>
                                    <Text fw={500}>10:00 - 14:00</Text>
                                </Group>
                                <Group justify="space-between">
                                    <Text>Nedeľa</Text>
                                    <Text fw={500} c="dimmed">Zatvorené</Text>
                                </Group>
                            </Stack>

                            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                <Group wrap="nowrap">
                                    <IconClock size={20} className="text-blue-600" />
                                    <Text size="sm" c="blue">
                                        V prípade núdze nás kontaktujte kedykoľvek na telefónnom čísle +421 900 123 456
                                    </Text>
                                </Group>
                            </div>
                        </Card>
                    </Grid.Col>
                </Grid>

                <Paper shadow="sm" p="xl" radius="md" withBorder mt="xl">
                    <Title order={3} mb="md">Kde nás nájdete</Title>
                    <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                        <div className="text-center">
                            <div className="text-6xl mb-2 animate-float">📍</div>
                            <Text size="lg" fw={600}>GoodBoy Foundation</Text>
                            <Text c="dimmed">Hlavná 123, 811 01 Bratislava</Text>
                        </div>
                        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-400/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 right-0 w-48 h-48 bg-green-400/20 rounded-full translate-x-1/3 translate-y-1/3" />
                        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/5 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                    </div>
                    <Text size="sm" c="dimmed" className="mt-3 text-center">
                        Hatiko 123, 811 01 Bratislava, Slovenská republika
                    </Text>
                </Paper>
                <Grid mt="xl">
                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                            <div className="text-center">
                                <div className="text-4xl mb-3">🏠</div>
                                <Title order={4} mb="sm">Útulky</Title>
                                <Text size="sm" c="dimmed">
                                    Podporujeme slovenské útulky pre psov a pomáhame im nájsť nové domovy.
                                </Text>
                            </div>
                        </Card>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                            <div className="text-center">
                                <div className="text-4xl mb-3">🐕</div>
                                <Title order={4} mb="sm">Psíky</Title>
                                <Text size="sm" c="dimmed">
                                    Každý dar pomáha konkrétnym psíkom v núdzi poskytnúť starostlivosť.
                                </Text>
                            </div>
                        </Card>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                            <div className="text-center">
                                <div className="text-4xl mb-3">🤝</div>
                                <Title order={4} mb="sm">Spolupráca</Title>
                                <Text size="sm" c="dimmed">
                                    Spoločne môžeme zmeniť životy psíkov v núdzi k lepšiemu.
                                </Text>
                            </div>
                        </Card>
                    </Grid.Col>
                </Grid>
            </Container>
        </>
    );
}
