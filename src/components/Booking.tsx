import React, { useState } from 'react';
import '@mantine/dates/styles.css';
import { DatePicker } from "@mantine/dates";
import { Title, Grid, Flex, Paper, Button, SimpleGrid, Alert, Text } from '@mantine/core';
import '@/pages/physicians-overview/index.module.css';
import { IconHeart } from '@tabler/icons-react';

interface ButtonConfig {
    id: number;
    label: string;
}

export default function Booking() {
    const [apptDate, setApptDate] = React.useState<Date | null>(null);
    const [selectedButton, setSelectedButton] = useState<number | null>(null);
    const [renderState, setRenderState] = useState<number>(0);

    const times: ButtonConfig[] = [
        { id: 0, label: '9:00 AM' },
        { id: 1, label: '10:00 AM' },
        { id: 2, label: '11:00 AM' },
        { id: 3, label: '12:00 PM' },
        { id: 4, label: '3:00 PM' },
        { id: 5, label: '4:00 PM' },
    ];

    const handleTimeClick = (id: number) => {
        setSelectedButton(id);
    };

    const timeElems = times.map((time) => (
        <Button key={time.id}
            onClick={() => handleTimeClick(time.id)}
            color={selectedButton === time.id ? 'blue' : 'gray'}
            variant={selectedButton === time.id ? 'filled' : 'outline'}
        >
            {time.label}
        </Button>
    ));

    const handleCalClick = (date: Date) => {
        setApptDate(date);
    };

    const datePicker = (
        <div>
            <Title order={4} ta="center" mb="sm">Select a Date and Time</Title>
            <Grid justify="center" align="stretch" mb="xl">
                <Grid.Col span={{ base: 12 }} className="calendar-col">
                    <Flex justify="center" align="center">
                        <Paper withBorder p='md'>
                            <DatePicker
                                size='md'
                                firstDayOfWeek={0}
                                getDayProps={(date) => ({
                                    onClick: () => handleCalClick(date),
                                })}
                                defaultDate={new Date()}
                                minDate={new Date()}
                            />
                        </Paper>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={{ base: 12 }}>
                    <Flex justify="center" align="center">
                        <Title order={3} pb="md">{apptDate == null ? "Select Date" : (apptDate as Date).toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "short",
                            day: "numeric"
                        })}
                        </Title>
                    </Flex>
                    <Flex justify="center" align="center">
                        {apptDate &&
                            <SimpleGrid cols={4}>
                                {timeElems}
                            </SimpleGrid>
                        }
                    </Flex>
                    <Flex justify="center" align="center">
                        {apptDate && selectedButton &&
                            <Button mt="xl" onClick={() => setRenderState(1)}>Schedule Appointment</Button>
                        }
                    </Flex>
                </Grid.Col>
            </Grid>
        </div>
    );


    const icon = <IconHeart />;

    const thanksMessage = (
        <Flex justify="center" align="center" mt="xl">
            <Alert title="Thank You!" color="blue" icon={icon} style={{ width: '100%', maxWidth: '500px' }}>
                <Title fw={300} order={6}>Your appointment has been scheduled!</Title>
            </Alert>
        </Flex>
    );

    const retElem = (renderState === 0 ? datePicker : thanksMessage);

    return retElem;
}