import { Container, Group, ActionIcon, rem, Image, Text } from '@mantine/core';
import { IconBrandX, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
import classes from '../styles/footer.module.css';
import { useMobile } from '../lib/hooks';

export default function Footer() {
    const mobile = useMobile();

    return (
        <div className={classes.footer}>
            <Container fluid className={classes.inner}>
                <Group className={classes.links} align='center' wrap='nowrap' justify='space-between'>
                    <Group align='center' justify='center'>
                        <Image mah={mobile? '2.5rem' : '3rem'} src='/logo.png' alt='site logo' />
                    </Group>
                    <Group gap={0} visibleFrom='xs'>
                        <ActionIcon size='lg' color='gray' variant='subtle' stroke={1.5} component='a' target='_blank' href='#' >
                            <IconBrandX style={{ width: rem(18), height: rem(18) }} />
                        </ActionIcon>
                        <ActionIcon size='lg' color='gray' variant='subtle' stroke={1.5} component='a' target='_blank' href='#' >
                            <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} />
                        </ActionIcon>
                        <ActionIcon size='lg' color='gray' variant='subtle' component='a' target='_blank' href='#'>
                            <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                        </ActionIcon>
                    </Group>
                    <Text c="dimmed" size="sm">
                        © 2024 YOUR_NAME. All rights reserved.
                    </Text>
                </Group>
            </Container>
        </div>
    );
}