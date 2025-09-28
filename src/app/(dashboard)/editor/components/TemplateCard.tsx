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
import { Eye, CheckCircle2, Lock, Crown } from "lucide-react";
import { templates } from "../utils/templateMap";

export function TemplateCard({
  template,
  isSelected,
  isLocked = false,
  onSelect,
}: {
  template: any;
  isSelected: boolean;
  isLocked?: boolean;
  onSelect: () => void;
}) {
  // Find the actual template component for preview
  const TemplateComponent = templates.find((t) => t.id === template.id)?.comp;

  return (
    <Card
      className={`group overflow-hidden border-gray-200 transition-all duration-300 hover:shadow-lg hover:border-gray-300 ${
        isSelected ? "ring-2 ring-indigo-600 ring-offset-2" : ""
      } ${isLocked ? "opacity-70 grayscale" : ""}`}
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

          {/* Lock overlay for locked templates */}
          {isLocked && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white p-4">
                <Lock className="h-8 w-8 mx-auto mb-2" />
                <p className="font-semibold">Pro Feature</p>
                <p className="text-sm opacity-90">Upgrade to unlock</p>
              </div>
            </div>
          )}

          <div className="absolute right-3 top-3">
            <Badge
              variant="secondary"
              className={`bg-white/90 backdrop-blur-sm border-gray-200 text-gray-700 font-medium ${
                isLocked ? "opacity-50" : ""
              }`}
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

          {/* Pro badge for locked templates */}
          {isLocked && (
            <div className="absolute left-3 top-3">
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                <Crown className="h-3 w-3 mr-1" />
                Pro
              </Badge>
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="mb-3">
            <h3
              className={`font-semibold text-gray-900 mb-1 ${isLocked ? "opacity-70" : ""}`}
            >
              {template.name}
              {isLocked && (
                <Lock className="h-4 w-4 inline ml-2 text-gray-400" />
              )}
            </h3>
            <p
              className={`text-sm text-gray-600 leading-relaxed ${isLocked ? "opacity-70" : ""}`}
            >
              {template.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`border-gray-300 hover:bg-gray-50 ${
                      isLocked ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isLocked) {
                        e.preventDefault();
                      }
                    }}
                    disabled={isLocked}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-full h-[80vh] flex flex-col">
                  <DialogHeader>
                    <DialogTitle className="text-indigo-600 flex items-center gap-2">
                      {template.name} - Preview
                      {isLocked && (
                        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                          <Crown className="h-3 w-3 mr-1" />
                          Pro Feature
                        </Badge>
                      )}
                    </DialogTitle>
                    <p className="text-sm text-gray-600 font-normal">
                      {template.description}
                    </p>
                  </DialogHeader>

                  <div className="flex-1 overflow-auto bg-gray-50 rounded-lg p-4">
                    <div className="bg-white rounded-lg shadow-lg mx-auto max-w-4xl">
                      {TemplateComponent ? (
                        <div className="scale-90 origin-top">
                          <TemplateComponent
                            data={{
                              personal: {
                                name: "John Doe",
                                title: "Software Engineer",
                                email: "john.doe@example.com",
                                phone: "+1 (555) 123-4567",
                                address: "New York, NY"
                              },
                              profile: "Experienced professional with a proven track record of success...", 
                              experience: [
                                {
                                  company: "Tech Company",
                                  job: "Senior Developer", 
                                  period: "2020 - Present",
                                  description: "Led development of innovative solutions..."
                                },
                              ],
                              education: [
                                {
                                  school: "University of Technology", 
                                  degree: "Bachelor of Science",
                                  year: "2016 - 2020", 
                                },
                              ],
                              skills: [
                                "JavaScript",
                                "React",
                                "Node.js",
                                "TypeScript",
                              ],
                              settings: {
                                accent: "#4F46E5"
                              }
                            }}
                          />
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
                      {isLocked && (
                        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                          Pro Template
                        </Badge>
                      )}
                    </div>
                    <Button
                      onClick={isLocked ? () => {} : onSelect}
                      className={
                        isLocked
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                          : "bg-indigo-600 hover:bg-indigo-700 text-white"
                      }
                    >
                      {isLocked ? (
                        <>
                          <Crown className="h-4 w-4 mr-2" />
                          Upgrade to Pro
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Use This Template
                        </>
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button
                onClick={isLocked ? () => {} : onSelect}
                size="sm"
                className={`${
                  isLocked
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white cursor-pointer"
                    : isSelected
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                } transition-colors`}
                disabled={isLocked && !isSelected}
              >
                {isLocked ? (
                  <>
                    <Lock className="h-4 w-4 mr-1" />
                    Locked
                  </>
                ) : isSelected ? (
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
