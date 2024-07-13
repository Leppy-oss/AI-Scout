import Layout from '../components/layout';
import { MantineProvider } from '@mantine/core'

import '../styles/global.css';
import '@mantine/core/styles.css';

function MyApp({ Component, pageProps }) {

    return (
        <MantineProvider withGlobalStyles withNormalizeCSS defaultColorScheme='light' >
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </MantineProvider>
    );
}

export default MyApp;