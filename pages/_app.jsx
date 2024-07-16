import Layout from '../components/layout';
import { MantineProvider } from '@mantine/core'

import '../styles/global.css';
import '@mantine/core/styles.css';

import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        Aos.init({
            duration: 1000,
            easing: 'ease-in-out-cubic'
        });
    }, []);

    return (
        <MantineProvider withGlobalStyles withNormalizeCSS defaultColorScheme='light' >
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </MantineProvider>
    );
}

export default MyApp;