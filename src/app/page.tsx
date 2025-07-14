
import TypewriterTexts from "@/components/TypewriterTexts";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (

    // Gradient Background
    <div className="fixed inset-0 -z-10">
      <div
        className="w-[2000px] h-[900px] opacity-15 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, #714BED 0%, #402B87 100%)",
          filter: "blur(200px)",
        }}
      />

    {/* Hero Section */}
    <div className="absolute left-1/2 top-[120px] sm:top-[200px] transform -translate-x-1/2 flex flex-col items-center w-full px-4">
      <h1
        className="text-3xl sm:text-5xl font-bold text-center text-[#1E293B] leading-tight"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        <span className="block">Land your dream job</span>
        <span className="block">
          using an AI-powered&nbsp;
          <span className="inline-block text-[#1E293B]">
            <TypewriterTexts texts={["resume builder", "career tool"]} />
          </span>
        </span>
      </h1>
    </div>

    <div className="absolute inset-x-0 top-[240px] sm:top-[340px] flex justify-center px-4">
    <div className="flex flex-col items-center w-full max-w-xl mx-auto space-y-3 sm:space-y-4">
      <p
        className="text-[#64748B] text-center font-poppins w-full text-sm sm:text-base"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        Create a standout resume in minutes with the power of AI – beautifully designed, fully tailored to your experience, and optimized to help you land your next big opportunity with confidence.
      </p>

      <Button
        className="bg-[#4F46E5] w-full max-w-[200px] h-[40px] rounded-3xl font-poppins font-600 text-sm sm:text-base"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        Get Started Today
      </Button>
        
      <div className="absolute inset-x-0 top-[240px] sm:top-[340px] flex flex-col items-center w-full px-4 space-y-4">

        {/* Cloud icons onder de afbeelding */}
    

      {/* Dashboard img */}
      <div className="fixed left-1/2 top-[420px] sm:top-[520px] transform -translate-x-1/2 z-10 w-full flex justify-center -mt-10">
        <img
          src="../dashboard.png"
          alt="dashboard"
          className="w-full max-w-2xl sm:max-w-4xl h-auto"
          style={{ minHeight: "200px", minWidth: "0" }}
        />
      </div>

      {/* Cloud icons onder de afbeelding */}
      <div className="fixed left-1/2 top-[780px] sm:top-[900px] transform -translate-x-1/2 flex flex-row justify-center items-center space-x-2 w-full z-0 -mt-80">
        <img src="../cloud.png" alt="cloud" />
        <img src="../cloud.png" alt="cloud" />
      </div>

    </div>



    </div>
  </div>


    </div>
  );
}
