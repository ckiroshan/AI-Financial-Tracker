import { Receipt, FileText, PieChart, Archive, Bell, Brain } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const features = () => {
  return (
    <section id="features">
      <div className="py-16 md:py-24 mb-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-bold text-3xl md:text-4xl text-gray-900 mb-4">Our Powerful Features</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Discover how our AI-powered platform transforms the way you manage, track, and grow your wealth with cutting-edge technology and intelligent insights.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-green-200 bg-white hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Receipt className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900 text-center">Add Transactions & Capture Receipts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-justify">Easily add transactions manually or capture receipts with your camera. Our AI automatically extracts transaction details from receipt images for seamless expense tracking.</p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-white hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900 text-center">Expense Logging & Categorization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-justify">Smart categorization system automatically sorts your expenses into meaningful categories. Customize categories to match your spending habits and financial goals.</p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-white hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <PieChart className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900 text-center">Basic Budget Tracking & Predicting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-justify">Set monthly budgets for different categories and track your progress in real-time. Visual indicators help you stay on track and avoid overspending.</p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-white hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Archive className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900 text-center">Receipt Storage (Proof)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-justify">Securely store all your receipts in the cloud with organized search and filtering. Perfect for tax preparation and expense reporting with easy access anytime.</p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-white hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900 text-center">Smart Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-justify">Receive intelligent notifications about budget limits, unusual spending patterns, bill reminders, and important financial milestones to keep you informed.</p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-white hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900 text-center">AI Powered Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-justify">Advanced machine learning algorithms analyze your spending patterns and provide personalized recommendations to optimize your financial health and achieve your goals.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default features;
