import Hero from "../components/home/hero";
import Contact from "../components/home/contact";
import AboutUs from "../components/home/about-us";
import ProblemSolution from "@/components/home/problem-solution";
import Features from "@/components/home/features";

const HomePage = () => {
  return (
    <>
      <div className="rounded-lg mx-2 md:mx-20 lg:mx-30 my-3 py-4 md:px-8 px-2">
        <Hero />
        <ProblemSolution />
        <Features />
        <AboutUs />
        <Contact />
      </div>
    </>
  );
};

export default HomePage;