import { Container, Text } from '@mantine/core';
import Tryout from '../components/tryout';
import Spline from '@splinetool/react-spline';

export default function Home() {
    return (
        <Container p={0} fluid>
            <Spline scene='https://prod.spline.design/t8nmR-00DkpbcENZ/scene.splinecode' />
            <Tryout />
        </Container>
    );
}