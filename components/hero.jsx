import { Text, Paper, Grid } from '@mantine/core';
import { useMobile } from '../lib/hooks';
import Search from './search';

export default function Hero() {
    const mobile = useMobile();

    return (
        <div>
            <Grid m='xl' my='7rem'>
                <Grid.Col span={7} data-aos='fade-up' data-aos-anchor='#home-container'>
                    <Text data-aos='fade-up' ta='left' mb='xl' fw={700} size={mobile ? '3rem' : '4rem'}>Generative AI Powered Scouting</Text>
                    <Text data-aos='fade-up' ta='left' mb='xl' fw={500} size={mobile ? '2rem' : '3rem'}>Generative AI Powered Scouting</Text>
                </Grid.Col>
                <Grid.Col span={5} data-aos='fade' data-aos-anchor='#home-container'>
                    <Search readOnly defaultValue='Explain the performance of Team 18225.'></Search>
                    <Paper mt='lg' withBorder radius='xl' shadow='md' p='lg'>
                        <Text size='sm'>
                            {`The team's Autonomous period is strong, with an average of 90.2 points and a high score of 123 points, driven by their ability to earn yellow and purple pixel points. In TeleOP, they consistently score around 86.7 points on average, with a high score of 114 points, indicating a reliable robot performance. In Endgame, they average 67 points, with a high score of 90 points, showing they can effectively navigate and earn points in this period. The team's penalty score is 60 points, which is relatively low. Overall, the team's highest score is 313 points, and their lowest score is 162 points, indicating some inconsistency in their performance.`}
                        </Text>
                    </Paper>
                </Grid.Col>
            </Grid>
        </div>
    );
}