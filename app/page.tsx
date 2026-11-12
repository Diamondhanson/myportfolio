import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Work } from '@/components/Work';
import { Toolkit } from '@/components/Toolkit';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Page() {
  return (
    <>
      <a href="#work" className="skipLink">
        Skip to the work
      </a>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Toolkit />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
