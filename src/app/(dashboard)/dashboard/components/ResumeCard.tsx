import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Eye, FileUser, PencilLine } from "lucide-react";
import React from "react";

type Resume = {
  id: string;
  data: any;
  template_id: string;
  user_id: string;
  created_at: string;
};

export function ResumeCard({ resume, onPreview, onEdit }: { resume: Resume; onPreview: (r: Resume) => void; onEdit: (r: Resume) => void; }) {
  const data = resume.data || {};
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-[4/3] bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <FileUser className="size-10 text-slate-400 group-hover:text-slate-600 transition-colors" />
      </div>
      <CardContent className="pt-4">
        <div className="font-semibold truncate">{data.personal?.name || "Untitled Resume"}</div>
        <div className="text-sm text-muted-foreground truncate">{data.personal?.title || "No title"}</div>
        <div className="text-xs text-slate-500 mt-1">Created: {new Date(resume.created_at).toLocaleDateString()}</div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="secondary" onClick={() => onEdit(resume)} className="gap-2">
          <PencilLine className="size-4" /> Edit
        </Button>
        <Button variant="outline" onClick={() => onPreview(resume)} className="gap-2">
          <Eye className="size-4" /> Preview
        </Button>
      </CardFooter>
    </Card>
  );
}
