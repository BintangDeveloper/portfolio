import Head from 'next/head';
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";
import AchievementsSection from "@/components/AchievementsSection";

export default function Index() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Head>
        <title>BintangDeveloper | Portfolio</title>
        <meta name="description" content="Portfolio page for BintangDeveloper" />
      </Head>
      <Navbar />
      <div className="container mt-24 mx-auto px-12 py-4">
        <HeroSection />
        {/* <AchievementsSection /> */}
        <AboutSection />
        <ProjectsSection />
      </div>
      <Footer />
    </main>
  );
}
