import React from "react";
import Header from "./Header";
import { Button } from "../ui/button";
import SubHeader from "./SubHeader";
import AccountingLandingPage from "./AccountingLandingPage";
import TestimonialCarousel from "./TestimonialCarousel";
import PricingPage from "./PricingPage";

import AccountingDashboardAnnimation from "./AccountingDashboardAnnimation";
import { Card, CardContent } from "../ui/card";
import Footer from "./Footer";

function LandingIndex() {
  return (
    <>
      <div
        className="bg-black flex flex-row justify-center w-full"
        data-model-id="186:5555"
      >
        <div className="bg-black overflow-hidden w-full max-w-[1440px] relative">
          <Header />
          <div className="w-full max-w-[1726px] mx-auto">
            <div className="w-full max-w-[1058px] overflow-hidden rotate-[9.21deg] blur-[7px]" />
            <section className="relative w-full max-w-[554px] mx-auto py-12">
              <div className="bg-[#4462ffbf] rounded-[277px/96.5px] blur-[112px] absolute inset-0 z-0"></div>
              <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-4">
                <h1 className="font-black text-[48px] leading-tight mb-8">
                  <span className="text-[#ffcd5a] block">
                    Simplify Billing,
                  </span>
                  <span className="text-white block">Amplify Efficiency.</span>
                </h1>

                <p className="font-normal text-white text-[15.5px] leading-[26px]">
                  Automate invoices, Track payments and Manage Clients
                  Seamlessly.
                </p>
              </div>
            </section>
            <div className="w-full max-w-[374px] mx-auto flex gap-4">
              <Button className="px-[43px] py-[19px] bg-[#4462ff] rounded-[1515px] h-auto">
                <span className="font-bold text-white text-[12.7px] text-center whitespace-nowrap">
                  Start free trial
                </span>
              </Button>

              <Button
                variant="outline"
                className="px-[43px] py-[19px] bg-[#121115] rounded-[1515px] h-auto border-none"
              >
                <span className="font-www-zoho-com-semantic-button font-[number:var(--www-zoho-com-semantic-button-font-weight)] text-white text-[length:var(--www-zoho-com-semantic-button-font-size)] text-center tracking-[var(--www-zoho-com-semantic-button-letter-spacing)] leading-[var(--www-zoho-com-semantic-button-line-height)] whitespace-nowrap [font-style:var(--www-zoho-com-semantic-button-font-style)]">
                  Request a demo
                </span>
              </Button>
            </div>
          </div>
          <div className="w-full flex justify-center mt-20">
            <img
              className="w-[625px] h-[450px]"
              alt="Group"
              src="/Images/landingPage/books.png"
            />
          </div>
          <AccountingLandingPage />
          <div
            style={{
              backgroundImage: `url(/Images/landingPage/lineargradientbg.png)`,
              // objectFit: "cover",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              // backgroundAttachment: "fixed", // Keeps the image fixed while scrolling
              backgroundBlendMode: "overlay",
            }}
          >
            <div className="w-full flex justify-center ">
              <Card className="inline-flex items-start gap-2.5 px-[18px] py-[7px] bg-[#121115] rounded-[1515px] border-none justify-center align-center mt-10">
                <CardContent className="flex items-center p-0">
                  <img
                    className="w-[27px] h-[27px]"
                    alt="Services svgrepo com"
                    src="/Images/landingPage/services.png"
                  />
                  <div className="ml-2.5 font-semibold text-white text-sm leading-[25px] whitespace-nowrap">
                    Services
                  </div>
                </CardContent>
              </Card>
            </div>
            <AccountingDashboardAnnimation />
          </div>

          <PricingPage />
          {/* <div className="relative w-[197px] h-[207px] mx-auto rotate-[10.05deg] blur-[47px]">
            <div className="relative w-[247px] h-[248px] top-[-15px] left-[-25px]">
              <div className="absolute w-[69px] h-[69px] top-[39px] left-14 bg-[#1c9ec1] rounded-[114px]" />

              <img
                className="absolute w-[213px] h-[214px] top-[17px] left-[17px] rotate-[-10.05deg]"
                alt="Group"
                src="/group-143725869.png"
              />

              <div className="absolute w-[69px] h-[69px] top-[66px] left-[76px] bg-[#4462ff] rounded-[114px]" />
            </div>
          </div> */}
          <Footer />
        </div>
      </div>
    </>
  );
}

export default LandingIndex;
