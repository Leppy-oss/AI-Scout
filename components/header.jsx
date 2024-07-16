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
    ActionIcon,
    useMantineColorScheme
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    IconChevronDown,
    IconSun,
    IconMoonStars,
    IconBrandGithub
} from '@tabler/icons-react';
import classes from '../styles/header.module.css';
import Link from 'next/link';
import constants from '../lib/constants';
import { useMobile } from '../lib/hooks';
import { useState } from 'react';

export function Header() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, setLinksOpened] = useState([]);
    const theme = useMantineTheme();
    const mobile = useMobile();
    const { colorScheme, setColorScheme } = useMantineColorScheme();

    const tabs = [
        {
            name: 'Home',
            href: '/'
        },
        {
            name: 'Chat',
            href: '/chat'
        },
        {
            name: 'About',
            href: '/about'
        },
        {
            name: 'API',
            href: '/api',
            type: 'dropdown',
            dropdownItems: [
                { name: 'Overview', href: '/', description: 'This feature is still in progress!' },
                { name: 'Playground', href: '/playground', description: 'This feature is still in progress!' },
                { name: 'Docs', href: '/docs', description: 'This feature is still in progress!' }
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
        <Box>
            <header className={classes.header}>
                <Group justify='space-between' h='100%' >
                    <Group align='center'>
                        <Image mah={mobile ? '2.5rem' : '3rem'} src='/logo-white.png' alt='site logo' lightHidden />
                        <Image mah={mobile ? '2.5rem' : '3rem'} src='/logo.png' alt='site logo' darkHidden />
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
                                                    Pages
                                                </Text>
                                                <Grid mt='sm'>
                                                    {tab.dropdownItems.map(item =>
                                                        <Grid.Col span={4} key={item.name}>
                                                            <Paper radius='lg' shadow p='1em'>
                                                                <Anchor underline='never' variant='gradient' gradient={{ from: 'blue', to: 'pink' }} type='a' href={tab.href.concat(item.href)}>
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
                                                            Quick Start
                                                        </Text>
                                                        <Text size='xs' c='dimmed'>
                                                            Get a quick overview of the API
                                                        </Text>
                                                    </Container>
                                                    <Link href={tab.href}><Button variant='outline'>Go!</Button></Link>
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
                    <Group gap='xs'>
                        <ActionIcon variant='outline' lightHidden
                            color='orange'
                            onClick={() => setColorScheme(colorScheme == 'dark' ? 'light' : 'dark')}>
                            <IconSun />
                        </ActionIcon>
                        <ActionIcon variant='outline' darkHidden
                            onClick={() => setColorScheme(colorScheme == 'dark' ? 'light' : 'dark')}>
                            <IconMoonStars />
                        </ActionIcon>
                        <Container visibleFrom='md' p={0} m={0}>
                            <Link target='_blank' href='https://github.com/Leppy-oss/AI-Scout'>
                                <Button variant='gradient' gradient={{ from: 'pink', to: 'orange' }} leftSection={<IconBrandGithub />}>
                                    Source Code
                                </Button>
                            </Link>
                        </Container>
                        <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom='sm' />
                    </Group>
                </Group>
            </header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size='100%'
                padding='md'
                title={`${constants.SITE_NAME.toUpperCase()} | NAVIGATION`}
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
                                <Anchor underline='never' href={tab.href.concat(item.href)} className={classes.link} fw={600}>{item.name}</Anchor>
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