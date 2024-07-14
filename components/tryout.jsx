import { Button, Center, Container, Group, MultiSelect, Stack, Textarea as TextArea, TextInput, Title } from '@mantine/core';
import Search from './search';
import { fetchWithHandling, postWithHandling } from '../lib/axios-ex';
import { useState } from 'react';

export default function Tryout() {
    const [state, rawSetState] = useState({ season: '', eventCode: '', query: '', teams: [] });
    const [teams, setTeams] = useState([]);
    const [output, setOutput] = useState('');

    const setState = newState => rawSetState({ ...state, ...newState });
    const onChange = (e, id = null) => {
        setState({
            [(id || e.target.id).split('-').at(-1)]: id ? e : e.target.value
        });
    }

    return (<Container p={0} m={0} left={0} fluid>
        <Center>
            <Title mb='xl'>Try AI-Scout out!</Title>
        </Center>
        <Center>
            <form onSubmit={async e => {
                e.preventDefault();
                console.log(state)
                const response = await postWithHandling('/api/inference/', { ...state }, {
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
                        <TextInput type='number' id='change-season' onChange={onChange} label='Season (Starting Year)' placeholder='Enter season here' />
                        <TextInput id='change-eventCode' onChange={onChange} label='Event Code' placeholder='Enter event code' />
                        <Button mt='1.5rem' onClick={async () => {
                            const newTeams = (await fetchWithHandling('/api/teams/', {
                                params: { season: state.season, eventCode: state.eventCode }
                            })).data.response;
                            setTeams(newTeams.map(String));
                        }}>Fetch Teams</Button>
                    </Group>
                    <MultiSelect placeholder='Select team # after inputting season & event code' data={teams} required id='change-teams' onChange={e => onChange(e, 'change-teams')}></MultiSelect>
                    <Search required id='change-query' onChange={onChange} placeholder='Ask me anything...' />
                    <Title order={2}>Output</Title>
                    <TextArea value={output} autosize></TextArea>
                </Stack>
            </form>
        </Center>
    </Container>);
}