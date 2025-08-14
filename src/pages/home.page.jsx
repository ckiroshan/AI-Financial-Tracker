import Hero from '../components/home/hero'
import Contact from '../components/home/contact'
import AboutUs from '../components/home/about-us'
import ProblemSolution from '@/components/home/problem-solution';
import Features from '@/components/home/features';


const HomePage = () => {
  return (
    <>
    <div className="container mx-auto px-4 sm:px-6 lg:px-32 py-4">  
      <Hero/>
      <ProblemSolution/>
      <Features/>
      <AboutUs/>
      <Contact/>
      
    </div>
    </>
  );
};

export default HomePage;
