import { Box, Center, Container, Group, LoadingOverlay, MultiSelect, Select, Stack, Textarea as TextArea, Text, Title } from '@mantine/core';
import Search from './search';
import { fetchWithHandling, postWithHandling } from '../lib/axios-ex';
import { useEffect, useState } from 'react';
import { IconArrowNarrowDown } from '@tabler/icons-react';
import { useMobile } from '../lib/hooks';

export default function Tryout() {
    // Inference API parameters
    const [season, setSeason] = useState(null);
    const [eventCode, setEventCode] = useState('');
    const [teams, setTeams] = useState([]);
    const [query, setQuery] = useState('');

    // Form population
    const seasonList = Array.from({ length: 5 }, (x, i) => `${i + 2019} - ${i + 2020}`);
    const [eventList, setEventList] = useState([]);
    const [teamList, setTeamList] = useState([]);

    // Output state
    const [output, setOutput] = useState('');

    const mobile = useMobile();

    useEffect(() => {
        const fetchEvents = async () => {
            if (season) {
                setEventList(['Loading...']);
                setEventCode('');
                const response = await fetchWithHandling('/api/events/', { params: { season: season.slice(0, 4) } });
                setEventList(response.data.response.data.eventsSearch.map(event => `${event.name} (${event.code})`));
                setEventCode(null);
            }
        }
        fetchEvents();
    }, [season]);

    useEffect(() => {
        const fetchTeams = async () => {
            if (season && eventCode && eventCode != 'Loading...') {
                setTeams([]);
                setTeamList(['Loading...']);
                const response = await fetchWithHandling('/api/teams/', { params: { season: season.slice(0, 4), eventCode: eventCode.split('(').at(-1).split(')').at(0) } });
                setTeamList(response.data.response);
                setTeams([]);
            }
        }
        fetchTeams();
    }, [season, eventCode]);

    return (
        <Container fluid mt='xl'>
            <Center>
                <Title mb='md' order={1} size={mobile? '3rem' : '4rem'}>Try it Out</Title>
            </Center>
            <Center mb='md'>
                <IconArrowNarrowDown size='2rem' />
            </Center>
            <Center>
                <Text mb='xl' fw={700} order={1} size={mobile? '3rem' : '4rem'} variant='gradient' gradient={{from: 'blue', to: 'pink'}}>AI-Scout</Text>
            </Center>
            <Center>
                <form onSubmit={async e => {
                    e.preventDefault();
                    const response = await postWithHandling('/api/inference/', { season: season.slice(0, 4), eventCode: eventCode.split('(').at(-1).split(')').at(0), teams, query }, {
                        responseType: 'stream',
                        adapter: 'fetch'
                    });
                    if (response && response.data) {
                        const stream = response.data;
                        const reader = stream.pipeThrough(new TextDecoderStream()).getReader();
                        let tempOutput = '';
                        while (true) {
                            const { value, done } = await reader.read();
                            if (done) break;
                            tempOutput += value;
                            setOutput(tempOutput);
                        }
                    }
                }}>
                    <Stack w='fit-content' align='stretch' justify='center'>
                        <Group justify='space-between'>
                            <Select
                                searchable
                                label='Season'
                                placeholder='Select season'
                                value={season}
                                data={seasonList}
                                required
                                onChange={setSeason} />

                            <Box pos='relative'>
                                <LoadingOverlay loaderProps={{ size: 'xs' }} visible={eventList.length > 0 && eventList.at(0) == 'Loading...'} />
                                <Select
                                    searchable
                                    disabled={!eventList.length}
                                    label='Event Code'
                                    placeholder='Select event'
                                    value={eventCode}
                                    data={eventList}
                                    required
                                    onChange={setEventCode} />
                            </Box>
                        </Group>

                        <Box pos='relative'>
                            <LoadingOverlay loaderProps={{ size: 'xs' }} visible={teamList.length > 0 && teamList.at(0) == 'Loading...'} />
                            <MultiSelect
                                searchable
                                disabled={!teamList.length}
                                label='Teams to Query'
                                placeholder='Select team # after inputting season & event code'
                                value={teams}
                                data={teamList}
                                required
                                onChange={e => setTeams(e)} />
                        </Box>

                        <Search
                            label='Query'
                            required
                            disabled={!(eventList.length && teams.length)}
                            id='change-query'
                            onChange={e => setQuery(e.target.value)}
                            placeholder='Ask me anything...' />

                        <Title order={2}>Output</Title>
                        <TextArea value={output} autosize></TextArea>
                    </Stack>
                </form>
            </Center>
        </Container>
    );
}