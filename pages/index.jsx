import { Container } from '@mantine/core';
import Tryout from '../components/tryout';
import Hero from '../components/hero';

export default function Home() {
    return (
        <Container id='home-container' p={0} fluid>
            <Hero />
            <Tryout />
        </Container>
    );
}