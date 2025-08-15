import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section id="home">
      <div className="h-[calc(100vh-100px)] flex flex-col items-center justify-center p-1 text-center bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-md mb-10">
        <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="font-bold text-4xl lg:text-5xl mb-6 leading-tight">Transform Your Financial Future with AI</h1>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">Personalized insights that empower your financial decisions.</p>
          <div className="mt-8">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-3 text-lg transition-all hover:scale-105">
              Get Started Today
            </Button>
          </div>
          <p className="text-sm mt-4 opacity-80">Track your finances effortlessly with AI-powered insights and analytics.</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
