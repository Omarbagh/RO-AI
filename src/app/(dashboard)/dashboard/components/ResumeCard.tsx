import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Eye, PencilLine } from "lucide-react";
import React from "react";
import { templates } from "../../editor/utils/templateMap";

type Resume = {
  id: string;
  data: any;
  template_id: string;
  user_id: string;
  created_at: string;
};

export function ResumeCard({ resume, onPreview, onEdit }: { resume: Resume; onPreview: (r: Resume) => void; onEdit: (r: Resume) => void; }) {
  const data = resume.data || {};
  const personal = data.personal || {};
  
  // Get the template component
  const TemplateComp = templates.find((t) => t.id === resume.template_id)?.comp;
  
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="aspect-[4/5] bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden relative">
        {TemplateComp ? (
          <div className="scale-[0.2] origin-top-left w-[500%] h-[500%] absolute top-0 left-0 pointer-events-none">
            <TemplateComp data={data} />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-slate-400">Template not available</div>
          </div>
        )}
      </div>
      
      <CardContent className="pt-4 pb-2 flex-grow-0">
        <div className="font-semibold truncate">{personal.name || "Untitled Resume"}</div>
        <div className="text-sm text-muted-foreground truncate">{personal.title || "No title"}</div>
        <div className="text-xs text-slate-500 mt-1">Created: {new Date(resume.created_at).toLocaleDateString()}</div>
      </CardContent>
      
      <CardFooter className="gap-2 mt-auto p-3 pt-0">
        <div className="flex flex-col xs:flex-row gap-2 w-full">
          <Button 
            variant="secondary" 
            onClick={() => onEdit(resume)} 
            className="gap-2 flex-1 min-w-0"
            size="sm"
          >
            <PencilLine className="size-4 flex-shrink-0" /> 
            <span className="truncate">Edit</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => onPreview(resume)} 
            className="gap-2 flex-1 min-w-0"
            size="sm"
          >
            <Eye className="size-4 flex-shrink-0" /> 
            <span className="truncate">Preview</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}