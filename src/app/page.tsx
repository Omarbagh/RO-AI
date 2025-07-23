"use client";

import TypewriterTexts from "@/components/TypewriterTexts";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";

import { useEffect, useState } from "react";
import { SignUpButton } from "@clerk/nextjs";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the animation after mount
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* 1. Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="w-[2000px] h-[900px] opacity-10 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, #714BED 0%, #402B87 100%)",
            filter: "blur(200px)",
            top: "200px",
            left: 0,
            right: 0,
          }}
        />
      </div>

       {/* Badges Section */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-2 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-purple-100 translate-y-24">
            <Award className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700" style={{ fontFamily: "Poppins, sans-serif" }}>
              #1 AI Resume Builder
            </span>
          </div>
        </div>

      <main className="pt-[120px] sm:pt-[200px] px-4 flex flex-col items-center">
        {/* 2. Hero Section */}
        <h1
          className={`text-3xl sm:text-5xl font-bold text-center text-[#1E293B] leading-tight transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ fontFamily: "Poppins, sans-serif", marginTop: "-100px" }}
        >
          <span className="block animate-fade-in-down" style={{ animationDelay: "0.1s" }}>
            Create a
          </span>
          <span className="inline-block text-[#1E293B]">
              <TypewriterTexts texts={["Job-Winning Resume", "Professional Resume", "AI-Generated CV"]} />
            </span>
          <span className="block animate-fade-in-down" style={{ animationDelay: "0.3s" }}>
            in under 5-minutes
            
          </span>
        </h1>

        {/* 3. Description + Button */}
        <section
          className={`mt-4 text-center max-w-xl space-y-4 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p
            className="text-[#64748B] font-poppins text-sm sm:text-base animate-fade-in"
            style={{ fontFamily: "Poppins, sans-serif", animationDelay: "0.5s" }}
          >
            Create a standout resume in minutes with the power of AI – beautifully
            designed, fully tailored to your experience, and optimized to help you land
            your next big opportunity with confidence.
          </p>
          <SignUpButton>
            <Button
              className="bg-black w-full max-w-[230px] h-[60px] rounded-full font-poppins font-600 text-sm sm:text-base shadow-lg hover:scale-105 transition-transform duration-300 animate-fade-in-up"
              style={{ fontFamily: "Poppins, sans-serif", animationDelay: "0.7s" }}
            >
              Get Started Today
            </Button>
          </SignUpButton>
        </section>

        {/* Minimal Animations */}
        <style jsx global>{`
          @keyframes fade-in-down {
            0% {
              opacity: 0;
              transform: translateY(-20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fade-in-up {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fade-in {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
          .animate-fade-in-down {
            animation: fade-in-down 0.8s both;
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.8s both;
          }
          .animate-fade-in {
            animation: fade-in 1s both;
          }
        `}</style>

        {/* 4. Dashboard + Clouds */}
        <section className="mt-5 relative flex flex-col items-center">
          <img
            src="/dashboard.png"
            alt="dashboard"
            className="w-full max-w-4xl h-auto z-10 animate-fade-in"
            style={{ minHeight: "360px", animationDelay: "0.9s" }}
          />
          <div className="absolute left-[-120px] top-10 flex space-x-2">
            <img src="/cloud.png" alt="cloud" className="opacity-80 animate-fade-in-down" style={{ animationDelay: "1.1s" }} />
            <img src="/cloud.png" alt="cloud" className="opacity-60 animate-fade-in-down" style={{ animationDelay: "1.3s" }} />
          </div>
        </section>

        {/* 5. How it works */}
        <section className="mt-10 w-full max-w-[1800px] bg-[#EFECF9] h-[700px] rounded-2xl xl:max-w-[1800px]">
          <h1 className="font-poppins text-center text-4xl sm:text-5xl font-bold text-[#1E293B] mb-4 mt-15 animate-fade-in-down" style={{ fontFamily: "Poppins, sans-serif", animationDelay: "1.5s" }}>
            How It Works
          </h1>
          <p
            className="text-[#64748B] text-center font-poppins text-sm sm:text-sm max-w-lg mx-auto animate-fade-in"
            style={{ fontFamily: "Poppins, sans-serif", animationDelay: "1.7s" }}
          >
            Upload your resume or start from scratch.<br />
            Enter details, pick a style, and let AI optimize it.
            Download and apply with confidence!
          </p>
            <div
            className="flex justify-center items-center gap-8 mt-8"
            style={{ opacity: 0, transform: "translateY(40px)", transition: "opacity 0.8s, transform 0.8s" }}
            ref={el => {
              if (!el) return;
              const onScroll = () => {
              const rect = el.getBoundingClientRect();
              if (rect.top < window.innerHeight - 100) {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
                window.removeEventListener("scroll", onScroll);
              }
              };
              window.addEventListener("scroll", onScroll);
              // Run once in case already in view
              onScroll();
            }}
            >
            <img src="/how_it_works_1.png" alt="Step 1" className="w-80 h-auto animate-fade-in-up" style={{ animationDelay: "1.9s" }} />
            <img src="/how_it_works_2.png" alt="Step 2" className="w-80 h-auto animate-fade-in-up" style={{ animationDelay: "2.4s" }} />
            <img src="/how_it_works_3.png" alt="Step 3" className="w-80 h-auto animate-fade-in-up" style={{ animationDelay: "2.9s" }} />
            </div>
          <div className="flex justify-center mt-8">
            <Button
              className="bg-[#4F46E5] w-full max-w-[300px] h-[40px] rounded-3xl font-poppins font-600 text-sm sm:text-base animate-fade-in-up"
              style={{ fontFamily: "Poppins, sans-serif", animationDelay: "2.5s" }}
            >
              Begin Your AI Resume Journey
            </Button>
          </div>
        </section>

        {/* 6. Key Features */}
        <h1 className="font-poppins text-center text-4xl sm:text-5xl font-bold text-[#1E293B] mb-4 mt-25 animate-fade-in-down" style={{ fontFamily: "Poppins, sans-serif", animationDelay: "2.7s" }}>Key features</h1>
        <p
          className="text-[#64748B] text-center font-poppins text-sm sm:text-sm max-w-2xl mx-auto mt-2 animate-fade-in"
          style={{ fontFamily: "Poppins, sans-serif", wordBreak: "normal", whiteSpace: "normal", animationDelay: "2.9s" }}
        >
          Effortlessly create professional resumes with AI-driven content suggestions, customizable templates, real-time feedback, and one-click downloads. Stand out with tailored achievements, modern design, and seamless editing—all in one place.
        </p>

        {/* Cards section (Key Features) */}
        <section className="-mt-25 mr-10">
          <img src="/keyFeatures.png" alt="Key Features" className="mx-auto animate-fade-in-up" style={{ animationDelay: "3.1s" }} />
        </section>

        {/* Our Templates */}
      </main>
    </div>
  );
}
