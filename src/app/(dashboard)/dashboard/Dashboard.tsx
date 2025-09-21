"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ResumeCard } from "./components/ResumeCard";
import { Eye, Download, Plus } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { useAuth } from "@clerk/nextjs";
import { templates } from "../editor/utils/templateMap";
import { useReactToPrint } from "react-to-print";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Resume = {
  id: string;
  data: any;
  template_id: string;
  user_id: string;
  created_at: string;
};

type ActivityItem = {
  id: string;
  description: string;
  timestamp: string;
  action_type: string;
};

const printHideStyle = `
@media print {
  .no-print, .no-print * { 
    display: none !important; 
  }
  
  body, html {
    width: 100% !important;
    height: auto !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  
  @page {
    margin: 0;
    size: auto;
  }
}
`;

// Helper function to determine action type from description
const getActionTypeFromDescription = (description: string): string => {
  if (description.toLowerCase().includes("created")) return "create";
  if (description.toLowerCase().includes("updated")) return "update";
  if (description.toLowerCase().includes("deleted")) return "delete";
  if (description.toLowerCase().includes("viewed")) return "view";
  return "other";
};

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previewResume, setPreviewResume] = useState<Resume | null>(null);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: previewResume?.data
      ? `${previewResume.data.personal?.name || "Resume"}-CV`
      : "Resume",
    pageStyle: `
      @page { 
        margin: 0; 
        size: auto;
      }
      body { 
        -webkit-print-color-adjust: exact; 
        print-color-adjust: exact;
      }
    `,
  });

  useEffect(() => {
    if (!isLoaded) return;

    const fetchData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const token = await getToken({ template: "supabase" });
        if (!token) {
          setError("Failed to get authentication token");
          setLoading(false);
          return;
        }

        const supabaseWithAuth = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          { global: { headers: { Authorization: `Bearer ${token}` } } }
        );

        // Fetch resumes
        const { data: resumesData, error: resumesError } = await supabaseWithAuth
          .from("resumes")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (resumesError) {
          console.error("Supabase error:", resumesError);
          setError(`Error fetching resumes: ${resumesError.message}`);
        } else {
          const processedData = (resumesData || []).map((resume) =>
            typeof resume.data === "string"
              ? { ...resume, data: JSON.parse(resume.data) }
              : resume
          );
          setResumes(processedData);
        }

        // Fetch activity from database
        const { data: activityData, error: activityError } = await supabaseWithAuth
          .from("activity")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(5);

        if (activityError) {
          console.error("Error fetching activity:", activityError);
          // Fallback to mock data if table doesn't exist
          const mockActivity: ActivityItem[] = [
            {
              id: "1",
              description: "Created a new resume",
              timestamp: new Date().toISOString(),
              action_type: "create"
            },
            {
              id: "2",
              description: "Updated your resume",
              timestamp: new Date(Date.now() - 86400000).toISOString(),
              action_type: "update"
            },
          ];
          setActivity(mockActivity);
        } else {
          // Format the activity data to match our type
          const formattedActivity = (activityData || []).map((item: any) => ({
            id: item.id,
            description: item.description,
            timestamp: item.created_at,
            action_type: getActionTypeFromDescription(item.description)
          }));
          setActivity(formattedActivity);
        }

      } catch (err) {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, isLoaded, getToken]);

  const TemplateComp = useMemo(() => {
    if (!previewResume) return null;
    return templates.find((t) => t.id === previewResume.template_id)?.comp || null;
  }, [previewResume]);

  return (
    <>
      <style>{printHideStyle}</style>
      <div className="w-full max-w-full overflow-x-hidden px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Manage your resumes and activity</p>
          </div>
          <Button className="gap-2" asChild>
            <Link href="/editor">
              <Plus className="size-4" /> Create New
            </Link>
          </Button>
        </div>

        {error && (
          <Card className="mb-6 border-destructive text-destructive w-full">
            <CardContent className="pt-4">{error}</CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-6 w-full">
          <div className="lg:col-span-2 space-y-6 w-full">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between w-full">
                  <CardTitle className="text-lg">Your Resumes</CardTitle>
                  <Button variant="outline" className="gap-2" size="sm">
                    <Eye className="size-4" />View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="h-40 grid place-items-center w-full">Loading...</div>
                ) : resumes.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">Get started by creating a new resume.</p>
                    <Button asChild>
                      <Link href="/editor">New Resume</Link>
                    </Button>
                  </div>
                ) : (
                  resumes.length > 3 ? (
                    <div className="relative w-full">
                      <Carousel className="w-full">
                        <CarouselContent className="w-full">
                          {resumes.map((resume) => (
                            <CarouselItem key={resume.id} className="px-1 sm:basis-1/2 lg:basis-1/3">
                              <ResumeCard
                                resume={resume}
                                onEdit={() => {}}
                                onPreview={setPreviewResume}
                              />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-2 z-10" />
                        <CarouselNext className="right-2 z-10" />
                      </Carousel>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
                      {resumes.map((resume) => (
                        <ResumeCard
                          key={resume.id}
                          resume={resume}
                          onEdit={() => {}}
                          onPreview={setPreviewResume}
                        />
                      ))}
                    </div>
                  )
                )}
              </CardContent>
            </Card>
            
            {/* Recent Activity Table */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableCaption className="pb-3">
                    {activity.length === 0 ? "No recent activity" : "A list of your recent activities"}
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Action</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activity.map((activityItem) => (
                      <TableRow key={activityItem.id}>
                        <TableCell className="font-medium capitalize">{activityItem.action_type}</TableCell>
                        <TableCell>{activityItem.description}</TableCell>
                        <TableCell className="text-right">
                          {new Date(activityItem.timestamp).toLocaleDateString()}
                          <br />
                          <span className="text-xs text-muted-foreground">
                            {new Date(activityItem.timestamp).toLocaleTimeString()}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6 w-full">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Resumes</span>
                    <span className="text-lg font-bold">{resumes.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Last Created</span>
                    <span className="text-sm">
                      {resumes.length > 0 
                        ? new Date(resumes[0].created_at).toLocaleDateString() 
                        : "Never"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Recent Activity</span>
                    <span className="text-sm">{activity.length} items</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 size-2 rounded-full bg-indigo-500 flex-shrink-0" />
                    <span>Keep your resume updated with recent experiences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 size-2 rounded-full bg-indigo-500 flex-shrink-0" />
                    <span>Use different templates for different job applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 size-2 rounded-full bg-indigo-500 flex-shrink-0" />
                    <span>Download your resume as PDF for sharing</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <Dialog open={!!previewResume} onOpenChange={(o) => !o && setPreviewResume(null)}>
          <DialogContent className="max-w-4xl w-full h-[90vh] flex flex-col">
            <DialogHeader className="flex-shrink-0">
              <DialogTitle>{previewResume?.data?.personal?.name || "Resume Preview"}</DialogTitle>
            </DialogHeader>
            <div className="flex items-center justify-between pb-2 w-full flex-shrink-0 no-print">
              <div />
              <Button onClick={handlePrint} className="gap-2">
                <Download className="size-4" /> Download
              </Button>
            </div>
            <div className="flex-1 overflow-auto">
              <div ref={contentRef} className="w-full flex justify-center">
                {TemplateComp ? (
                  <div className="w-[210mm]"> {/* Standard A4 width */}
                    <TemplateComp data={previewResume!.data} />
                  </div>
                ) : (
                  <div>Template not found</div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}