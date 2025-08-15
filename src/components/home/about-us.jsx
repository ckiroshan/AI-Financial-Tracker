import { Users, Target, Award } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

const aboutUs = () => {
  return (
    <section id="about">
      <div className="py-16 md:py-24 mb-10 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-bold text-3xl md:text-4xl text-gray-900 mb-4">About AI Finance Tracker</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">We're on a mission to democratize financial intelligence through cutting-edge AI technology, making sophisticated financial planning accessible to everyone.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="font-bold text-2xl text-gray-900 mb-6">Our Story</h3>
              <p className="text-gray-600 mb-4 text-justify text-lg">Founded in 2025 by a team of financial experts and AI engineers, AI Finance Tracker was born from the frustration of seeing people struggle with complex financial decisions despite having access to more data than ever before.</p>
              <p className="text-gray-600 mb-4 text-justify text-lg">We realized that the problem wasn't lack of information—it was the inability to process and understand that information in a meaningful way. That's where AI comes in.</p>
              <p className="text-gray-600 text-justify text-lg">Today, we're proud to serve thousands of users worldwide, helping them make smarter financial decisions with confidence and clarity.</p>
            </div>
            <div className="bg-green-50 p-8 rounded-lg border">
              <div className="grid grid-cols-2 gap-14 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">50K+</div>
                  <div className="text-sm text-gray-600">Active Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">$2B+</div>
                  <div className="text-sm text-gray-600">Assets Tracked</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
                  <div className="text-sm text-gray-600">Uptime</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">4.9/5</div>
                  <div className="text-sm text-gray-600">User Rating</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">Our Team</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-justify">A diverse group of financial advisors, data scientists, and engineers working together to build the future of personal finance.</p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-justify">To empower individuals with AI-driven financial insights that were once only available to institutional investors and wealth management firms.</p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-justify">Transparency, security, and user-first design guide everything we do. Your financial data is private, secure, and always under your control.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default aboutUs;
