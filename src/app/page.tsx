import TypewriterTexts from "@/components/TypewriterTexts";
import { Button } from "@/components/ui/button";

export default function Home() {
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

      <main className="pt-[120px] sm:pt-[200px] px-4 flex flex-col items-center">
        {/* 2. Hero Section */}
        <h1
          className="text-3xl sm:text-5xl font-bold text-center text-[#1E293B] leading-tight"
          style={{ fontFamily: "Poppins, sans-serif", marginTop: "-100px" }}
        >
          <span className="block">Land your dream job</span>
          <span className="block">
            using an AI-powered&nbsp;
            <span className="inline-block text-[#1E293B]">
              <TypewriterTexts texts={["resume builder", "career tool"]} />
            </span>
          </span>
        </h1>

        {/* 3. Description + Button */}
        <section className="mt-4 text-center max-w-xl space-y-4">
          <p
            className="text-[#64748B] font-poppins text-sm sm:text-base"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Create a standout resume in minutes with the power of AI – beautifully
            designed, fully tailored to your experience, and optimized to help you land
            your next big opportunity with confidence.
          </p>
          <Button
            className="bg-[#4F46E5] w-full max-w-[200px] h-[40px] rounded-3xl font-poppins font-600 text-sm sm:text-base"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Get Started Today
          </Button>
        </section>

        {/* 4. Dashboard + Clouds */}
        <section className="mt-5 relative flex flex-col items-center">
          <img
            src="/dashboard.png"
            alt="dashboard"
            className="w-full max-w-4xl h-auto z-10"
            style={{ minHeight: "360px" }}
          />
            <div className="absolute left-[-120px] top-10 flex space-x-2">
            <img src="/cloud.png" alt="cloud" />
            <img src="/cloud.png" alt="cloud" />
            </div>
        </section>

        {/* 5. How it works */}
        <section className="mt-10 w-full max-w-[1800px] bg-[#EFECF9] h-[700px] rounded-2xl xl:max-w-[1800px]">
            <h1 className="font-poppins text-center text-4xl sm:text-5xl font-bold text-[#1E293B] mb-4 mt-15" style={{ fontFamily: "Poppins, sans-serif" }}>
            How It Works
            </h1>
            <p
              className="text-[#64748B] text-center font-poppins text-sm sm:text-sm max-w-lg mx-auto"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Upload your resume or start from scratch.<br />
              Enter details, pick a style, and let AI optimize it.
              Download and apply with confidence!
            </p>
            <div className="flex justify-center items-center gap-8 mt-8">
              <img src="/how_it_works_1.png" alt="Step 1" className="w-85 h-auto" />
              <img src="/how_it_works_2.png" alt="Step 2" className="w-85 h-auto" />
              <img src="/how_it_works_3.png" alt="Step 3" className="w-85 h-auto" />
            </div>
            <div className="flex justify-center mt-8">
              <Button
                className="bg-[#4F46E5] w-full max-w-[300px] h-[40px] rounded-3xl font-poppins font-600 text-sm sm:text-base"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Begin Your AI Resume Journey
              </Button>
            </div>
        </section>


        {/* 6. Key Features */}
        <h1 className="font-poppins text-center text-4xl sm:text-5xl font-bold text-[#1E293B] mb-4 mt-25" style={{ fontFamily: "Poppins, sans-serif" }}>Key features</h1>
        <p
          className="text-[#64748B] text-center font-poppins text-sm sm:text-sm max-w-2xl mx-auto mt-2"
          style={{ fontFamily: "Poppins, sans-serif", wordBreak: "normal", whiteSpace: "normal" }}
        >
          Effortlessly create professional resumes with AI-driven content suggestions, customizable templates, real-time feedback, and one-click downloads. Stand out with tailored achievements, modern design, and seamless editing—all in one place.
        </p>

        {/* Cards section (Key Features) */}
        <section className="-mt-25 mr-10">
          <img src="/keyFeatures.png" alt="Key Features" className="mx-auto" />
        </section>

        {/* Our Templates */}
      </main>
    </div>
  );
}
