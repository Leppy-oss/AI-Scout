import { Container } from '@mantine/core';
import Spline from '@splinetool/react-spline';
import { useMobile } from '../lib/hooks';

export default function SplineHero() {
    const mobile = useMobile();
    const h = mobile ? '100' : '200';

    <Container p={0} h={h}>
        <Container p={0} h={h} pos='relative' darkHidden>
            <Spline scene={process.env.NEXT_PUBLIC_SUL} />
        </Container>
        <Container p={0} h={h} pos='relative' lightHidden>
            <Spline scene={process.env.NEXT_PUBLIC_SUD} />
        </Container>
    </Container>
}