import { CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Share2 } from "lucide-react"
import { useState, useEffect } from "react"


interface FinalPageStepProps {
  handlePrint: () => void;
}

export default function FinalPageStep({ handlePrint }: FinalPageStepProps) {
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    async function checkProStatus() {
       const proRes = await fetch("/api/check-pro");
        const { isPro } = await proRes.json();
        setIsPro(isPro);
      } 
    checkProStatus();
  }, []);

  return (
    <CardContent className="p-6">
      <div className="w-28 h-28 bg-[#F4F4F4] rounded-full flex items-center justify-center mx-auto mb-6">
        <span style={{ fontSize: "4rem" }}>👏</span>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 mb-6">
        <div className="text-center">
            <h3 className="font-bold text-black text-lg">
            Hurray! You Have Successfully <br /> Created Your Resume
            </h3>
          <p className="text-[#64748B] text-sm mt-2">
            Your professional resume is ready to download
          </p>
        </div>
      </div>
      <div className="space-y-3">
        <div className="grid gap-3 items-center justify-center">
          <Button onClick={handlePrint} className="bg-[#4F46E5] rounded-full h-10 w-80 hover:bg-gray-800 hover:text-white">
            <Download className="w-4 h-4" />
            Print / Download as PDF{isPro ? " (With Watermark)" : ""}
          </Button>
          <Button
            onClick={() => alert("Share feature coming soon!")}
            variant="outline"
            className="border-black-300 hover:bg-gray-800 hover:text-white rounded-full h-10 w-80"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Link
          </Button>
        </div>
      </div>
    </CardContent>
  )
}
