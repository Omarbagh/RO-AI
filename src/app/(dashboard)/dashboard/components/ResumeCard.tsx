import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Eye, PencilLine, FileText, Calendar, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { templates } from "../../editor/utils/templateMap";

type Resume = {
  id: string;
  data: any;
  template_id: string;
  user_id: string;
  created_at: string;
};

export function ResumeCard({
  resume,
  onPreview,
  onEdit,
  onDelete,
}: {
  resume: Resume;
  onPreview: (r: Resume) => void;
  onEdit: (r: Resume) => void;
  onDelete: (id: string) => void;
}) {
  const data = resume.data || {};
  const personal = data.personal || {};
  const [isDeleting, setIsDeleting] = useState(false);

  // Get the template component
  const TemplateComp = templates.find((t) => t.id === resume.template_id)?.comp;

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this resume? This action cannot be undone.",
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      await onDelete(resume.id);
    } catch (error) {
      console.error("Error deleting resume:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-[500px] flex flex-col border-0 shadow-md bg-gradient-to-br from-white to-gray-50/70 hover-lift">
      {/* Preview Section with Gradient Background */}
      <div className="aspect-[4/5] bg-gradient-to-br from-indigo-50/40 to-blue-50/40 overflow-hidden relative border-b">
        {TemplateComp ? (
          <div className="scale-[0.2] origin-top-left w-[500%] h-[500%] absolute top-0 left-0 pointer-events-none">
            <TemplateComp data={data} />
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-4">
            <FileText className="h-10 w-10 text-indigo-300 mb-2" />
            <div className="text-indigo-400 text-sm text-center">
              Template not available
            </div>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 transition-all duration-300 pointer-events-none" />

        {/* Delete Button (Top Right) */}
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-red-500 hover:bg-red-600"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Content Section */}
      <CardContent className="pt-4 pb-2 flex-grow-0 px-4">
        <div className="font-semibold truncate text-gray-900 group-hover:text-indigo-700 transition-colors">
          {personal.name || "Untitled Resume"}
        </div>
        <div className="text-sm text-muted-foreground truncate mt-1">
          {personal.title || "No professional title"}
        </div>

        {/* Creation Date */}
        <div className="flex items-center mt-2 text-xs text-gray-500">
          <Calendar className="h-3 w-3 mr-1" />
          <span>
            Created: {new Date(resume.created_at).toLocaleDateString()}
          </span>
        </div>
      </CardContent>

      {/* Action Buttons */}
      <CardFooter className="gap-2 mt-auto p-4 pt-0">
        <div className="flex flex-col xs:flex-row gap-2 w-full">
          <Button
            variant="secondary"
            onClick={() => onEdit(resume)}
            className="gap-2 flex-1 min-w-0 transition-all duration-200 hover:shadow-sm bg-white border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50 text-gray-700 hover:text-indigo-700"
            size="sm"
          >
            <PencilLine className="size-4 flex-shrink-0" />
            <span className="truncate">Edit</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => onPreview(resume)}
            className="gap-2 flex-1 min-w-0 transition-all duration-200 hover:shadow-sm border-indigo-200 bg-indigo-600 text-white hover:bg-indigo-700 hover:border-indigo-300"
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
