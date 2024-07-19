import { Text, Grid, Image, Container } from '@mantine/core';
import { useMobile } from '../lib/hooks';

export default function Hero() {
    const mobile = useMobile();

    return (
        <Grid my={mobile? 'sm' : '7rem'} align='center'>
            <Grid.Col ta={mobile? 'center' : 'left'} pb='xl' span={mobile? 12 : 7} order={mobile? 1 : 0} data-aos='fade-up' data-aos-anchor='#home-container'>
                <Text size={mobile ? '3rem' : '5rem'} mb='xl'>
                    <Text span fw={700} variant='gradient' gradient={{ from: 'blue', to: 'pink' }}>
                        Generative AI
                    </Text><br/><Text span fw={500} size={mobile ? '2rem' : '3.5rem'}>Powered Scouting</Text>
                </Text>
                <Text size={mobile ? '2rem' : '3rem'}>
                    Scouting has never been easier.
                </Text>
            </Grid.Col>
            <Grid.Col span={mobile? 12 : 5} order={mobile? 0 : 1} data-aos='fade' data-aos-anchor='#home-container'>
                <Image className='img-flip-x' src='/mockup-phone.png' alt='phone mockup'></Image>
            </Grid.Col>
        </Grid>
    );
}