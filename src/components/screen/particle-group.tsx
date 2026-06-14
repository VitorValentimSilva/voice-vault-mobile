import { useColorScheme } from 'nativewind';

import { Particle } from '@/components/screen/particle';
import { THEME } from '@/shared/constants/theme';

export function ParticleGroup() {
  const { colorScheme } = useColorScheme();

  const theme = colorScheme === 'dark' ? THEME.dark : THEME.light;

  const p1 = theme.chart1;
  const p2 = theme.chart2;
  const p3 = theme.chart3;
  const p4 = theme.chart4;

  return (
    <>
      <Particle color={p1} size={6} top={12} left={14} delayMs={0} travelY={18} />

      <Particle color={p2} size={5} top={18} left={80} delayMs={300} travelY={15} />

      <Particle color={p3} size={4} top={26} left={24} delayMs={600} travelY={12} />

      <Particle color={p4} size={5} top={32} left={88} delayMs={900} travelY={17} />

      <Particle color={p1} size={4} top={44} left={10} delayMs={400} travelY={11} />

      <Particle color={p2} size={5} top={50} left={92} delayMs={700} travelY={14} />

      <Particle color={p3} size={6} top={58} left={18} delayMs={1000} travelY={16} />

      <Particle color={p4} size={4} top={64} left={78} delayMs={1200} travelY={13} />

      <Particle color={p1} size={5} top={72} left={12} delayMs={200} travelY={18} />

      <Particle color={p2} size={4} top={80} left={85} delayMs={500} travelY={12} />

      <Particle color={p3} size={6} top={74} left={35} delayMs={800} travelY={16} />

      <Particle color={p4} size={5} top={22} left={60} delayMs={1100} travelY={14} />

      <Particle color={p1} size={4} top={40} left={70} delayMs={1400} travelY={12} />

      <Particle color={p2} size={5} top={65} left={55} delayMs={1600} travelY={15} />
    </>
  );
}
