/* eslint-disable react-hooks/exhaustive-deps */
import {
    HoverCard,
    Group,
    Button,
    UnstyledButton,
    Text,
    Anchor,
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    Collapse,
    ScrollArea,
    rem,
    useMantineTheme,
    Image,
    Grid,
    Paper,
    Container,
    ActionIcon
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    IconChevronDown,
    IconSun,
    IconMoonStars
} from '@tabler/icons-react';
import classes from '../styles/header.module.css';
import Link from 'next/link';
import constants from '../lib/constants';
import { useLoaded, useMobile } from '../lib/hooks';
import { useState } from 'react';

export function Header({ colorScheme, setColorScheme }) {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, setLinksOpened] = useState([]);
    const theme = useMantineTheme();
    const loaded = useLoaded();
    const mobile = useMobile();

    const tabs = [
        {
            name: 'Tab 1',
            href: '#'
        },
        {
            name: 'Tab 2',
            href: '#'
        },
        {
            name: 'Tab 3',
            href: '#',
            type: 'dropdown',
            dropdownItems: [
                { name: 'Item 1', href: '#', description: 'Lorem ipsum dolor sit amet' },
                { name: 'Item 2', href: '#', description: 'Lorem ipsum dolor sit amet' },
                { name: 'Item 3', href: '#', description: 'Lorem ipsum dolor sit amet' },
                { name: 'Item 4', href: '#', description: 'Lorem ipsum dolor sit amet' },
                { name: 'Item 5', href: '#', description: 'Lorem ipsum dolor sit amet' },
                { name: 'Item 6', href: '#', description: 'Lorem ipsum dolor sit amet' },
            ]
        }
    ];

    const setLinkTo = (key) => {
        const setTo = Object.hasOwn(linksOpened, key) ? !linksOpened[key] : true;
        setLinksOpened({
            ...linksOpened,
            [key]: setTo
        });
    };

    return (
        <Box pb={60}>
            <header className={classes.header}>
                <Group justify='space-between' h='100%' >
                    <Group align='center'>
                        <Image mah={mobile ? '2.5rem' : '3rem'} src='/logo.png' alt='site logo' />
                        <Anchor
                            fw={900}
                            variant='gradient'
                            gradient={{ from: 'blue', to: 'pink', deg: 90 }}
                            styles={{ root: { fontSize: mobile ? '1.35rem' : '2rem' } }}
                            underline='never'
                            type='a'
                            href='/'
                        >{constants.SITE_NAME}</Anchor>
                    </Group>

                    <Group h='100%' gap={0} visibleFrom='sm' wrap='nowrap'>
                        {tabs.map(tab => {
                            if (tab.type && tab.type == 'dropdown') return (
                                <HoverCard key={tab.name} width={600} position='bottom' radius='md' shadow='md' withinPortal>
                                    <HoverCard.Target>
                                        <Link href={tab.href} className={classes.link}>
                                            <Center inline>
                                                <Box component='span' mr={5}>
                                                    {tab.name}
                                                </Box>
                                                <IconChevronDown
                                                    style={{ width: rem(16), height: rem(16) }}
                                                    color={theme.colors.blue[6]}
                                                />
                                            </Center>
                                        </Link>
                                    </HoverCard.Target>

                                    <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                                        <Group justify='space-between' px='md'>
                                            <Text fw={500}>{tab.name}</Text>
                                            <Anchor href={tab.href} fz='xs'>
                                                View all
                                            </Anchor>
                                        </Group>

                                        <Divider my='sm' />

                                        <Container fluid className={classes.dropdownFooter}>
                                            <Container>
                                                <Text fw={500} fz='md'>
                                                    Items
                                                </Text>
                                                <Grid mt='sm'>
                                                    {tab.dropdownItems.map(item =>
                                                        <Grid.Col span={4} key={item.name}>
                                                            <Paper radius='lg' shadow p='1em'>
                                                                <Anchor underline='never' variant='gradient' gradient={{ from: 'blue', to: 'cyan' }} type='a' href={item.name}>
                                                                    {item.name}
                                                                </Anchor>
                                                                <Text>{item.description}</Text>
                                                            </Paper>
                                                        </Grid.Col>
                                                    )
                                                    }
                                                </Grid>
                                            </Container>
                                            <Container mt='md'>
                                                <Group justify='space-between'>
                                                    <Container left={0} m={0} p={0}>
                                                        <Text fw={500} fz='md'>
                                                            Browse random
                                                        </Text>
                                                        <Text size='xs' c='dimmed'>
                                                            Browse a random {tab.name}!
                                                        </Text>
                                                    </Container>
                                                    <Button onClick={() => { }}>Go!</Button>
                                                </Group>
                                            </Container>
                                        </Container>
                                    </HoverCard.Dropdown>
                                </HoverCard>
                            );
                            return <Link
                                key={tab.name}
                                href={tab.href}
                                className={classes.link}>
                                {tab.name}
                            </Link>;
                        })}
                    </Group>

                    {loaded &&
                        <Group gap='xs'>
                            <ActionIcon
                                variant='outline'
                                color={colorScheme == 'dark' && 'orange'}
                                onClick={() => setColorScheme(colorScheme == 'dark' ? 'light' : 'dark')}>
                                {colorScheme == 'dark' ? <IconSun /> : <IconMoonStars />}
                            </ActionIcon>
                            <Container visibleFrom='md' p={0} m={0}>
                                <Link href='#'><Button variant='gradient' gradient={{ from: 'pink', to: 'orange' }}>Special Button</Button></Link>
                            </Container>
                            <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom='sm' />
                        </Group>
                    }
                </Group>
            </header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size='100%'
                padding='md'
                title={`${constants.SITE_NAME} | NAVIGATION`}
                hiddenFrom='sm'
                zIndex={1000000}
            >
                <Divider my='sm' />

                {tabs.map(tab => {
                    if (tab.type && tab.type == 'dropdown') return <Container p={0} key={tab.name}>
                        <UnstyledButton className={classes.link} onClick={() => setLinkTo(tab.name, true)}>
                            <Center inline>
                                <Box component='span' mr={5}>{tab.name}</Box>
                                <IconChevronDown
                                    style={{ width: rem(16), height: rem(16) }}
                                    color={theme.colors.blue[6]}
                                />
                            </Center>
                        </UnstyledButton>
                        <Collapse in={linksOpened[tab.name]}>{
                            tab.dropdownItems.map(item => <Container key={item.name}>
                                <Anchor underline='never' href={item.href} className={classes.link} fw={600}>{item.name}</Anchor>
                                <Text>{item.description}</Text>
                            </Container>)
                        }</Collapse>
                    </Container>
                    return <Link style={{ padding: 0 }} key={tab.name} href={tab.href} className={classes.link}>{tab.name}</Link>
                })}
                <Divider my='sm' />
            </Drawer>
        </Box>
    );
}