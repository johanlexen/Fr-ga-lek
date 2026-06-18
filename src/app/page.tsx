import { AuroraBackground } from "@/components/chrome/AuroraBackground";
import { Grain } from "@/components/chrome/Grain";
import { ScrollProgress } from "@/components/chrome/ScrollProgress";
import { CustomCursor } from "@/components/chrome/CustomCursor";
import { Preloader } from "@/components/chrome/Preloader";
import { Nav } from "@/components/chrome/Nav";

import { Hero } from "@/components/sections/Hero";
import { InspiredBy } from "@/components/sections/InspiredBy";
import { ScrollStory } from "@/components/sections/ScrollStory";
import { ProductReveal3D } from "@/components/sections/ProductReveal3D";
import { ScrollTransform } from "@/components/sections/ScrollTransform";
import { FloatingEcosystem } from "@/components/sections/FloatingEcosystem";
import { MotionShowcase } from "@/components/sections/MotionShowcase";
import { VisualsGallery } from "@/components/sections/VisualsGallery";
import { Finale, Footer } from "@/components/sections/Finale";

export default function Page() {
  return (
    <>
      {/* fixed atmospheric layers */}
      <AuroraBackground />
      <Grain />
      <ScrollProgress />
      <CustomCursor />
      <Preloader />
      <Nav />

      {/* scroll narrative */}
      <main className="relative z-10">
        <Hero />
        <InspiredBy />
        <ScrollStory />
        <ProductReveal3D />
        <ScrollTransform />
        <FloatingEcosystem />
        <MotionShowcase />
        <VisualsGallery />
        <Finale />
      </main>

      <Footer />
    </>
  );
}
