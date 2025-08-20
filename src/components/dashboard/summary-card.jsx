import { ChartNoAxesCombined, Download, PieChart, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const SummaryCard = () => {
  return (
    <div className="px-2 md:px-0 lg:py-0 pt-3 lg:mb-10">
      <div className="flex items-stretch justify-between mb-3 lg:mb-2">
        <div className="flex space-x-2 items-center justify-evenly">
          <span className="text-xl md:text-2xl lg:text-3xl text-gray-800">Stats</span>
          <ChartNoAxesCombined className="text-white bg-amber-300 rounded-md p-1 mb-2 size-7 lg:size-9 " />
        </div>
        <Button className="md:text-base text-background px-4">
          <Download />
          Report
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Income */}
        <Card className=" border-green-200 rounded-xl">
          <CardContent className="py-4 lg:py-15">
            <div className="flex items-center lg:justify-center space-x-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 lg:w-7 lg:h-7 text-white" />
              </div>
              <div>
                <p className="lg:text-xl md:text-lg">Total Income</p>
                <p className="text-lg md:text-xl lg:text-2xl font-bold text-primary">Rs 75,000</p>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Total Expense */}
        <Card className="border-red-200">
          <CardContent className="py-4 lg:py-15">
            <div className="flex items-center lg:justify-center space-x-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-red-500 rounded-xl flex items-center justify-center">
                <TrendingDown className="w-5 h-5 lg:w-7 lg:h-7 text-white" />
              </div>
              <div>
                <p className="lg:text-xl md:text-lg">Total Expense</p>
                <p className="text-lg md:text-xl lg:text-2xl font-bold text-red-500">Rs 26,350</p>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Balance */}
        <Card className="border-blue-200">
          <CardContent className="py-4 lg:py-15">
            <div className="flex items-center lg:justify-center space-x-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <Wallet className="w-5 h-5 lg:w-7 lg:h-7 text-white" />
              </div>
              <div>
                <p className="lg:text-xl md:text-lg">Balance</p>
                <p className="text-lg md:text-xl lg:text-2xl font-bold text-blue-700">Rs 48,650</p>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Savings */}
        <Card className="border-purple-200">
          <CardContent className="py-4 lg:py-15">
            <div className="flex items-center lg:justify-center space-x-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <PieChart className="w-5 h-5 lg:w-7 lg:h-7 text-white" />
              </div>
              <div>
                <p className="lg:text-xl md:text-lg">Savings Rate</p>
                <p className="text-lg md:text-xl lg:text-2xl font-bold text-purple-700">64.9%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SummaryCard;
