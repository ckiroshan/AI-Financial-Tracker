import Hero from '../components/home/hero'
import Contact from '../components/home/contact'


const HomePage = () => {
  return (
    <>
    <div className="container mx-auto px-4 sm:px-6 lg:px-32 py-4">  
      <Hero/>
      <Contact/>
      
    </div>
    </>
  );
};

export default HomePage;
