import { CheckCircle, XCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'

const problemSolution = () => {
    return (
        <div className="py-16 md:py-24 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="font-serif font-bold text-3xl md:text-4xl text-gray-900 mb-4">
                        Your Financial Challenges, Our AI Solutions
                    </h2>
                    <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
                        See how our AI-powered platform transforms common financial struggles into opportunities for growth.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    {/* Problems Grid */}
                    <div className="space-y-6">
                        <h3 className="font-serif font-bold text-2xl text-red-600 mb-6 flex items-center">
                            <XCircle className="w-6 h-6 mr-2" />
                            The Problems
                        </h3>

                        <Card className="border-red-200 bg-red-50">
                            <CardHeader>
                                <CardTitle className="text-red-700 font-sans">Struggling to manage expenses?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-red-600 font-sans">
                                    Manual tracking is time-consuming and error-prone, leading to overspending and financial stress.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-red-200 bg-red-50">
                            <CardHeader>
                                <CardTitle className="text-red-700 font-sans">Confused by investment options?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-red-600 font-sans">
                                    Complex financial markets make it difficult to choose the right investments for your goals and risk
                                    tolerance.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-red-200 bg-red-50">
                            <CardHeader>
                                <CardTitle className="text-red-700 font-sans">Difficulty in financial planning?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-red-600 font-sans">
                                    Without proper forecasting tools, it's hard to plan for major life events and retirement.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Solutions Grid */}
                    <div className="space-y-6">
                        <h3 className="font-serif font-bold text-2xl text-green-600 mb-6 flex items-center">
                            <CheckCircle className="w-6 h-6 mr-2" />
                            Our Solutions
                        </h3>

                        <Card className="border-green-200 bg-green-50">
                            <CardHeader>
                                <CardTitle className="text-green-700 font-sans">Automated tracking and budgeting tools</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-green-600 font-sans">
                                    AI automatically categorizes expenses and creates personalized budgets that adapt to your spending
                                    patterns.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-green-200 bg-green-50">
                            <CardHeader>
                                <CardTitle className="text-green-700 font-sans">
                                    AI-driven recommendations tailored to your goals
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-green-600 font-sans">
                                    Get personalized investment suggestions based on your financial situation, goals, and risk
                                    preferences.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-green-200 bg-green-50">
                            <CardHeader>
                                <CardTitle className="text-green-700 font-sans">
                                    Smart forecasting based on your unique data
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-green-600 font-sans">
                                    Advanced AI models predict your financial future and help you plan for major milestones with
                                    confidence.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default problemSolution