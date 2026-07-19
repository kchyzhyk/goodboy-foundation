'use client';

import Link from "next/link";
import {Card, Container, Grid, Title, Text} from "@mantine/core";
import {IconArrowLeft} from "@tabler/icons-react";
import Footer from "@/src/components/layout/Footer";

export default function AboutPage() {

    return (
        <Container size="lg" py="xl">
            <Link
                href="/"
                className="inline-flex items-center gap-2 transition-colors  mb-10 figma-button-text back-btn"
            >
                <IconArrowLeft size={20} className="back-btn"/>
                Späť
            </Link>

            <Title order={1} className="text-left mb-10">
                O projekte
            </Title>

            <Grid mt="xl" className="w-full mb-10 gap-8">
                <Grid.Col>
                    <Card padding="lg" className="h-full w-full">
                        <div className="flex flex-col items-center justify-center">
                            <Text size="sm" className=" desc-text">
                                Nadácia Good Boy sa venuje zlepšovaniu života psov v Žiline na Slovensku. Zachraňujeme
                                opustené, týrané a bezdomovské psy, poskytujeme im lekársku starostlivosť, útočisko a
                                lásku, ktorú si zaslúžia. Naším poslaním je dať týmto verným spoločníkom druhú šancu na
                                život tým, že im nájdeme milujúci domov. Okrem záchrany a rehabilitácie sa zameriavame
                                aj na podporu zodpovedného vlastníctva zvierat a ochrany zvierat prostredníctvom
                                vzdelávacích a komunitných programov.
                            </Text>
                        </div>
                    </Card>
                </Grid.Col>
            </Grid>
            <Grid className="w-full mb-10 gap-4 border-t-2 border-gray-200 border-b-2 py-16">
                <Grid.Col span={{base: 12, md: 6}}>
                    <Card padding="lg" className="h-full w-full">
                        <div className="flex flex-col items-center justify-center text-center">
                            <Title order={4} mb="sm" className='mb-3 count-text'>12 200 €</Title>
                            <Text size="sm" className="text-center count-desc">
                                Celková vyzbieraná hodnota
                            </Text>
                        </div>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{base: 12, md: 6}}>
                    <Card padding="lg" className="h-full w-full">
                        <div className="flex flex-col items-center justify-center text-center">
                            <Title order={4} mb="sm" className='mb-3 count-text'>1 028</Title>
                            <Text size="sm" className="text-center count-desc">
                                Počet darcov
                            </Text>
                        </div>
                    </Card>
                </Grid.Col>
            </Grid>
            <Grid mt="xl" className="w-full mb-10 gap-8">
                <Grid.Col>
                    <Card padding="lg" className="h-full w-full">
                        <div className="flex flex-col items-center justify-center">
                            <Text size="sm" className=" desc-text">
                                Naša práca je možná vďaka podpore vášnivých dobrovoľníkov, štedrých darcov a komunity,
                                ktorá sa hlboko stará o dobro zvierat. Organizujeme aj kastračné a sterilizačné
                                iniciatívy, aby sme riešili problém túlavých psov a zabezpečili dlhodobý vplyv. V
                                nadácii Good Boy veríme, že každý pes si zaslúži bezpečný, milujúci domov a šťastný
                                život. Pridajte sa k nám a pomôžte nám robiť zmeny – či už dobrovoľníctvom, darovaním
                                alebo adopciou chlpatého priateľa. Spoločne môžeme vytvoriť lepšiu budúcnosť pre psy v
                                Žiline.
                            </Text>
                        </div>
                    </Card>
                </Grid.Col>
            </Grid>
            <Footer/>
        </Container>

    );
}
