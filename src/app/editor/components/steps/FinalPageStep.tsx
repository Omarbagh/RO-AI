import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Download, Globe } from "lucide-react"


interface FinalPageStepProps {
  handlePrint: () => void;
  showPrintNotification: boolean;
}

export default function FinalPageStep({ handlePrint, showPrintNotification }: FinalPageStepProps) {
  return (
    <Card className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-xl">
    <CardContent className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
          <CheckCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-green-900 text-lg">
            Resume Created Successfully!
          </h3>
          <p className="text-green-700 text-sm">
            Your professional resume is ready to download
          </p>
        </div>
      </div>
      <div className="space-y-3">
        <div className="grid gap-3">
          <Button onClick={handlePrint}>
            <Download className="w-4 h-4" />
            Print / Download as PDF
          </Button>
          <Button
            onClick={() => alert("Share feature coming soon!")}
            variant="outline"
            className="border-purple-300 text-purple-600 hover:bg-purple-50 w"
          >
            <Globe className="w-4 h-4 mr-2" />
            Share Link
          </Button>
          {showPrintNotification && (
            <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-xl shadow-lg z-50 animate-fade-in-up">
              Je CV is klaargemaakt voor printen of downloaden!
              <span className="block text-xs opacity-80 mt-1">Check je printdialoog of download via je browser.</span>
            </div>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
  )
}
