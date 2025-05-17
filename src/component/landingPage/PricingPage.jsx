import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

const PricingPage = () => {
  const pricingPlans = [
    {
      name: "PROFESSIONAL",
      description:
        "Enhanced customization and automation to streamline business processes",
      originalPrice: "₹500",
      price: "400",
    },
    {
      name: "PREMIUM",
      description:
        "Enhanced customization and automation to streamline business processes",
      originalPrice: "₹750",
      price: "600",
    },
    {
      name: "STANDARD",
      description:
        "Enhanced customization and automation to streamline business processes",
      originalPrice: "₹200",
      price: "150",
    },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Header Card */}
      <div className="w-full flex justify-center z-10 pt-10">
        <Card className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#121115] rounded-full border-none">
          <CardContent className="flex items-center p-0">
            <img
              className="w-6 h-6"
              alt="Services"
              src={"/Images/landingPage/services.png"}
            />
            <div className="ml-2 font-semibold text-white text-sm">
              Subscriptions
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Background Circles */}
      <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
        <img
          src={"/Images/landingPage/Ellipse 59.png"}
          alt="bg"
          className="absolute animate-spin-slow w-[1200px] opacity-100 -top-48"
        />
        <img
          src={"/Images/landingPage/Ellipse 60.png"}
          alt="bg"
          className="absolute animate-spin-reverse-slower w-[1200px] opacity-90 -top-40"
        />
        <img
          src={"/Images/landingPage/Ellipse 61.png"}
          alt="bg"
          className="absolute animate-spin-slower w-[1200px] opacity-80 -top-30"
        />
        <img
          src={"/Images/landingPage/Ellipse 62.png"}
          alt="bg"
          className="absolute animate-spin-reverse-slower w-[1200px] opacity-60 -top-20"
        />
        <img
          src={"/Images/landingPage/Ellipse 63.png"}
          alt="bg"
          className="absolute animate-spin-slowest w-[1200px] opacity-50 -top-15"
        />
      </div>

      {/* Pricing Cards */}
      <div className="relative z-10 w-full flex flex-wrap justify-center gap-6 px-4 py-20">
        {pricingPlans.map((plan, index) => (
          <Card
            key={index}
            className="w-full max-w-sm h-[525px] rounded-[30px] border border-blue-500 bg-transparent backdrop-blur-[35px] backdrop-brightness-[100%] flex flex-col justify-between"
          >
            <CardHeader className="flex flex-col items-center pt-12 bg-transparent">
              <div className="font-semibold text-white text-sm">
                {plan.name}
              </div>
              <div className="mt-3 font-normal text-white text-sm text-center leading-normal px-2">
                {plan.description}
              </div>
            </CardHeader>

            <CardContent className="flex flex-col items-center justify-center bg-transparent">
              <div className="w-full text-center">
                <div className="opacity-50 relative inline-block">
                  <div className="absolute w-8 h-px top-2 left-0 bg-white" />
                  <div className="text-white text-base opacity-80">
                    {plan.originalPrice}
                  </div>
                </div>

                <div className="mt-3 relative">
                  <span className="text-white text-lg absolute left-[calc(50%-35px)]">
                    ₹
                  </span>
                  <span className="text-white text-4xl font-bold ml-3">
                    {plan.price}
                  </span>
                </div>

                <div className="mt-2 text-white text-sm">
                  Price/Org/Month Billed Annually
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-center pb-6">
              <Button className="px-6 py-3 bg-[#4462ff] rounded-full text-white text-sm font-semibold">
                Start my free trial
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
