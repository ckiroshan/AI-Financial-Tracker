

import { Button } from "../ui/button"


const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white h-100% rounded-lg mb-4">  
        <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="font-serif font-bold text-4xl md:text-6xl mb-6 leading-tight">
            Transform Your Financial Future with AI
          </h1>
          <p className="font-sans text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Personalized insights that empower your financial decisions.
          </p>
          <div className="mt-8">
            <Button 
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-3 text-lg transition-all hover:scale-105"
              
            >
              Get Started Today
            </Button>
          </div>
          <p className="font-sans text-sm mt-4 opacity-80">
           Track your finances effortlessly with AI-powered insights and analytics.
          </p>
        </div>
    </div>
  )
}

export default Hero
