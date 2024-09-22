import { ref, get, set } from "firebase/database";
import { database } from "../../firebase.config";
import { AppShell, Button, Text, Title, useMantineTheme, Card, Image, Badge, Grid, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './index.module.css';
import { useEffect, useState } from 'react';
import Booking from "@/components/Booking";

interface Physician {
    name: string,
    imagePath: string,
    clinicName: string,
    practice: string,
    description: string;
}

const typeToColor: { [index: string]: string; } = {
    "General Physician": "green",
    "Family Medicine": "lightpink",
    "Pediatrician": "lightblue",
    "Gynecologist": "yellow",
    "Psychiatrist": "slategrey"
};

function fetchAndCreateCards() {
    const [opened, { open, close }] = useDisclosure(false);
    const [physiciansData, setPhysiciansData] = useState([]);
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        // Fetch data when the component mounts
        const fetchPhysiciansData = () => {
            const physiciansRef = ref(database, "Users/Physicians");

            get(physiciansRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        // Convert the data object into an array
                        setPhysiciansData(data);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        };

        fetchPhysiciansData();

    }, []);

    function createCard(physician: Physician, id: string, displayDesc: boolean = false): JSX.Element {
        const name = physician["name"];
        const imagePath = physician["imagePath"];
        const clinicName = physician["clinicName"];
        const practice = physician["practice"];
        let description = physician["description"];

        if (displayDesc && description.trim().length > 211) {
            description = description.slice(0, 208).concat("...");
        }

        return (
            <>
                <Card shadow="sm" padding="lg" radius="md" className={classes.card} withBorder onClick={() => {
                    setActiveId(id);
                    open();
                }}>
                    <Card.Section>
                        <Image
                            src={imagePath}
                            height={200}
                        />
                    </Card.Section>
                    <Card.Section style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} mt="sm" mb="xs">
                        <Text size="xl" fw={700}>{name}</Text>
                        <Badge color={typeToColor[practice]}>{practice}</Badge>
                        <Text c="dimmed" mt="sm">{clinicName}</Text>

                        {displayDesc && <Text size="sm" c="dimmed" style={{ marginBottom: "10px" }}>
                            {description}
                        </Text>}

                        {/* {displayDesc && <Button color="blue" fullWidth mt="md" radius="md">
                            Schedule
                        </Button>} */}
                    </Card.Section>
                </Card>
                <Drawer opened={opened} onClose={close} position="bottom" title="" withOverlay={false} size="75%">
                    <Grid>
                        {activeId && <Grid.Col span={4} offset={1}>
                            <Text size="xl" fw={700}>{physiciansData[activeId].name}</Text>
                            <Badge color={typeToColor[physiciansData[activeId].practice]}>{physiciansData[activeId].practice}</Badge>
                            <Text size="sm" c="dimmed" mt="xs">
                                {physiciansData[activeId].description}
                            </Text>
                        </Grid.Col>}
                        <Grid.Col span={7}>
                            <Booking></Booking>
                        </Grid.Col>
                    </Grid>
                </Drawer>
            </>
        );
    }

    let physicianCards: JSX.Element[] = [];
    for (const id in physiciansData) {
        physicianCards.push(createCard(physiciansData[id], id));
    }

    return (
        <Grid justify="center" align="stretch" ml="lg" mr="lg" mb="lg">
            {physicianCards.map((card, index) => (
                <Grid.Col span={{ lg: 2.4, md: 3, sm: 4, xs: 6, base: 12 }} key={index}>
                    {card}
                </Grid.Col>
            ))}
        </Grid>
    );
}


export function PhysiciansOverview(): JSX.Element {
    return (
        <AppShell>
            <Title order={1} style={{ textAlign: "center", color: "black" }} mb="md" mt="sm">Choose A Physician</Title>
            {fetchAndCreateCards()}
        </AppShell>
    );
}