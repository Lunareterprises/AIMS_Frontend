import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const AccountingDashboardAnnimation = () => {
  const products = [
    {
      id: 1,
      name: "ZELUNA PAYROLL",
      image: "/Images/landingPage/ZelunaPayroll.png",
      description:
        "The process of calculating and distributing employee salaries, including taxes and deductions.",
      features: [
        "Salary Processing",
        "Tax Calculations",
        "Employee Portal",
        "Compliance Management",
      ],
    },
    {
      id: 2,
      name: "ZELUNA CRM",
      image: "/Images/landingPage/Crm.png",
      description:
        "A system for managing a company's interactions with current and potential customers to improve relationships and boost sales.",
      features: [
        "Lead Management",
        "Sale Pipeline",
        "Email Integration",
        "Analytics",
      ],
    },
    {
      id: 3,
      name: "ZELUNA INVENTORY",
      image: "/Images/landingPage/inventory.png",
      description:
        "Inventory refers to the goods and materials a business holds for selling or producing products.",
      features: [
        "Item Tracking",
        "Order Management",
        "Barcoding",
        "Purchase Orders",
      ],
    },
    {
      id: 4,
      name: "ZELUNA BILLING",
      image: "/Images/landingPage/Billing.png",
      description:
        "Create Professional invoices, track payments, and manage subscription billing with our intuitive billing software",
      features: [
        "Invoice Generation",
        "Payment Trackiing",
        "Recurring Billing",
        "Client Portal",
      ],
    },
    {
      id: 5,
      name: "ZELUNA PROJECTS",
      image: "/Images/landingPage/project.png",
      description:
        "Plan, track and collaborate on projects with ease using our comprehensive project management solution.",
      features: [
        "Task Management",
        "Gantt Charts",
        "Time Tracking",
        "Team Collaboration",
      ],
    },
  ];

  return (
    <section className="flex flex-wrap justify-center gap-[58px] py-8 min-h-screen px-4">
      {products.map((product) => (
        <div
          className="w-[355px] h-[530px] rounded-[40px] p-[2px]"
          style={{
            background: "linear-gradient(135deg, #4462ff, #6c49ff)", // border gradient
          }}
        >
          <Card
            key={product.id}
            className="w-[350px] h-[525px] rounded-[40px] overflow-hidden border border-transparent bg-[linear-gradient(#1f033f,#32054a)] p-[2px]"
          >
            <div className="w-full h-full rounded-[36px] backdrop-blur-[35px] backdrop-brightness-[100%] bg-[linear-gradient(to bottom right,rgba(255,255,255,0.1),rgba(255,255,255,0.03))]">
              <CardContent className="p-0">
                <div className="relative">
                  <div
                    className="w-[344px] h-[242px] mx-auto mt-[3px]"
                    style={{
                      backgroundImage: `url(${product.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="relative h-[43px] top-[199px] bg-black/75">
                      <h3 className="absolute h-[15px] top-[13px] left-2.5 font-semibold text-white text-xs">
                        {product.name}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="px-[13px] mt-[12px]">
                  <p className="w-full h-[30px] font-normal text-white text-xs">
                    {product.description}
                  </p>

                  <h4 className="mt-[24px] font-semibold text-white text-xs">
                    POPULAR FEATURES
                  </h4>

                  <div className="flex flex-wrap gap-[12px] mt-[27px]">
                    {product.features.map((feature, index) => (
                      <Badge
                        key={index}
                        className="bg-[#4462ff1f] text-white border border-[#4462ff] rounded-[4245px] px-4 py-2 font-medium text-xs"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-center mt-[40px]">
                    <Button className="bg-[#4462ff] text-white rounded-[1515px] px-9 py-4 font-bold text-[12.7px]">
                      Explore more
                    </Button>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      ))}
    </section>
  );
};
export default AccountingDashboardAnnimation;
