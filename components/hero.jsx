import { Text, Container } from '@mantine/core';
import Spline from '@splinetool/react-spline';
import { useMobile } from '../lib/hooks';

export default function Hero() {
    const mobile = useMobile();
    const h = mobile ? '100' : '200';
    console.log(h)

    return (
        <Container data-aos='fade-up' data-aos-anchor='#home-container'>
            <Container h={h}>
                <Container h={h} pos='relative' darkHidden>
                    <Spline scene={process.env.NEXT_PUBLIC_SUL} />
                </Container>
                <Container h={h} pos='relative' lightHidden>
                    <Spline scene={process.env.NEXT_PUBLIC_SUD} />
                </Container>
            </Container>
            <Text data-aos='fade-up' ta='center' mb='xl' c='blue' fw={700} size={mobile ? '3rem' : '4rem'}>AI-Powered Scouting</Text>
        </Container >
    );
}