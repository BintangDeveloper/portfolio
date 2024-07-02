import Head from 'next/head';
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AchievementsSection from "@/components/AchievementsSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col bg-[#121212]">
      <Head>
        <title>@BintangDeveloper</title>
        <meta name="description" content="Portfolio page for BintangDeveloper" />
      </Head>
      <Navbar />
      <main className="container mt-24 mx-auto px-12 py-4">
        <HeroSection />
        <AchievementsSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
