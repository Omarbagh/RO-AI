"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Eye, CheckCircle2 } from "lucide-react";
import { templates } from "../utils/templateMap";

export function TemplateCard({
  template,
  isSelected,
  onSelect,
}: {
  template: any;
  isSelected: boolean;
  onSelect: () => void;
}) {
  // Find the actual template component for preview
  const TemplateComponent = templates.find(t => t.id === template.id)?.comp;

  return (
    <Card
      className={`group overflow-hidden border-gray-200 transition-all duration-300 hover:shadow-lg hover:border-gray-300 ${
        isSelected ? "ring-2 ring-indigo-600 ring-offset-2" : ""
      }`}
    >
      <CardContent className="p-0">
        <div className="relative">
          <AspectRatio ratio={4 / 3}>
            <div
              className={`h-full w-full bg-gradient-to-br ${template.accent ?? "from-indigo-500 to-indigo-700"} p-4`}
            >
              <div className="h-full w-full rounded-lg bg-white/80 p-4 shadow-sm">
                <div className="grid h-full grid-rows-6 gap-2">
                  <div className="row-span-1 flex items-center gap-3">
                    <div className="h-7 w-7 rounded-full bg-gradient-to-br from-gray-200 to-gray-300" />
                    <div className="h-2 w-24 rounded bg-gray-300" />
                    <div className="h-2 w-14 rounded bg-gray-200" />
                  </div>
                  <div className="row-span-2 rounded-lg bg-gray-100" />
                  <div className="row-span-1 grid grid-cols-3 gap-2">
                    <div className="rounded bg-gray-100" />
                    <div className="rounded bg-gray-100" />
                    <div className="rounded bg-gray-100" />
                  </div>
                  <div className="row-span-2 grid grid-cols-2 gap-2">
                    <div className="rounded bg-gray-100" />
                    <div className="rounded bg-gray-100" />
                  </div>
                </div>
              </div>
            </div>
          </AspectRatio>
          <div className="absolute right-3 top-3">
            <Badge
              variant="secondary"
              className="bg-white/90 backdrop-blur-sm border-gray-200 text-gray-700 font-medium"
            >
              {template.category}
            </Badge>
          </div>
          
          {isSelected && (
            <div className="absolute left-3 top-3">
              <Badge className="bg-green-600 text-white border-0">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Selected
              </Badge>
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="mb-3">
            <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{template.description}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              {template.pages || 1} page{template.pages !== 1 ? 's' : ''}
            </div>
            
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-gray-300 hover:bg-gray-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-full h-[80vh] flex flex-col">
                  <DialogHeader>
                    <DialogTitle className="text-indigo-600 flex items-center gap-2">
                      {template.name} - Preview
                    </DialogTitle>
                    <p className="text-sm text-gray-600 font-normal">
                      {template.description}
                    </p>
                  </DialogHeader>
                  
                  <div className="flex-1 overflow-auto bg-gray-50 rounded-lg p-4">
                    <div className="bg-white rounded-lg shadow-lg mx-auto max-w-4xl">
                      {TemplateComponent ? (
                        <div className="scale-90 origin-top">
                          {/* Render the actual template component with sample data */}
                          <TemplateComponent data={{
                            personal: {
                              name: "John Doe",
                              email: "john.doe@example.com",
                              phone: "+1 (555) 123-4567",
                              location: "New York, NY"
                            },
                            summary: "Experienced professional with a proven track record of success...",
                            experience: [
                              {
                                company: "Tech Company",
                                position: "Senior Developer",
                                period: "2020 - Present"
                              }
                            ],
                            education: [
                              {
                                institution: "University of Technology",
                                degree: "Bachelor of Science",
                                period: "2016 - 2020"
                              }
                            ],
                            skills: ["JavaScript", "React", "Node.js", "TypeScript"]
                          }} />
                        </div>
                      ) : (
                        <div className="h-96 flex items-center justify-center text-gray-500">
                          <div className="text-center">
                            <Eye className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                            <p>Preview not available for this template</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="text-sm text-gray-600">
                      <Badge variant="outline" className="mr-2">
                        {template.category}
                      </Badge>
                    </div>
                    <Button
                      onClick={onSelect}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Use This Template
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button
                onClick={onSelect}
                size="sm"
                className={`${
                  isSelected 
                    ? "bg-green-600 hover:bg-green-700" 
                    : "bg-indigo-600 hover:bg-indigo-700"
                } text-white transition-colors`}
              >
                {isSelected ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Selected
                  </>
                ) : (
                  "Choose"
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}