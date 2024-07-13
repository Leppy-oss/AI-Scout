import { Container, Text } from '@mantine/core';

export default function Home() {
    return (
        <Container>
            <Text variant='gradient' fw={700} size='xl' gradient={{ from: 'blue', to: 'pink' }} w='fit-content'>
                Place your site content here!
            </Text>
        </Container>
    );
}