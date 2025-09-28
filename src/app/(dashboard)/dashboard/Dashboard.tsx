"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ResumeCard } from "./components/ResumeCard";
import {
  Eye,
  Download,
  Plus,
  TrendingUp,
  FileText,
  Activity,
  Clock,
  Sparkles,
  Calendar,
} from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { useAuth } from "@clerk/nextjs";
import { templates } from "../editor/utils/templateMap";
import { useReactToPrint } from "react-to-print";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

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

// Helper function to calculate resume completion percentage
const calculateCompletion = (resumeData: any): number => {
  if (!resumeData) return 0;

  let completedFields = 0;
  let totalFields = 0;

  // Personal Information
  if (resumeData.personal) {
    const personalFields = ["name", "email", "phone", "location"];
    totalFields += personalFields.length;
    completedFields += personalFields.filter(
      (field) => resumeData.personal[field],
    ).length;
  }

  // Professional Summary
  if (resumeData.summary) {
    totalFields += 1;
    if (resumeData.summary.trim().length > 0) completedFields += 1;
  }

  // Work Experience
  if (resumeData.experience && Array.isArray(resumeData.experience)) {
    totalFields += 1;
    if (resumeData.experience.length > 0) completedFields += 1;
  }

  // Education
  if (resumeData.education && Array.isArray(resumeData.education)) {
    totalFields += 1;
    if (resumeData.education.length > 0) completedFields += 1;
  }

  // Skills
  if (resumeData.skills && Array.isArray(resumeData.skills)) {
    totalFields += 1;
    if (resumeData.skills.length > 0) completedFields += 1;
  }

  return totalFields > 0
    ? Math.round((completedFields / totalFields) * 100)
    : 0;
};

// Helper function to get status info based on completion
const getStatusInfo = (completion: number) => {
  if (completion >= 90) {
    return { label: "Complete", color: "bg-green-100 text-green-800" };
  } else if (completion >= 50) {
    return { label: "In Progress", color: "bg-blue-100 text-blue-800" };
  } else {
    return { label: "Draft", color: "bg-yellow-100 text-yellow-800" };
  }
};

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "Today";
  if (diffDays === 2) return "Yesterday";
  if (diffDays <= 7) return `${diffDays - 1} days ago`;
  if (diffDays <= 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

export default function Dashboard() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const { getToken, has } = useAuth();

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewResume, setPreviewResume] = useState<Resume | null>(null);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [isProUser, setIsProUser] = useState(false);
  const [loadingProCheck, setLoadingProCheck] = useState(true);
  const [aiUsageCount, setAiUsageCount] = useState(0);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkProStatus = async () => {
      if (!user) {
        setLoadingProCheck(false);
        return;
      }

      try {
        const hasProPlan = await has({ plan: "pro" });
        setIsProUser(hasProPlan);

        if (!hasProPlan) {
          const savedAiUsage = localStorage.getItem("ai_usage_count");
          setAiUsageCount(parseInt(savedAiUsage || "0"));
        }
      } catch (error) {
        console.error("Error checking pro status:", error);
        setIsProUser(false);
      } finally {
        setLoadingProCheck(false);
      }
    };

    checkProStatus();
  }, [user, has]);

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
      ${
        !isProUser
          ? `
          .watermark {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 80px;
            color: rgba(0, 0, 0, 0.1);
            pointer-events: none;
            z-index: 9999;
            white-space: nowrap;
            font-weight: bold;
          }
        `
          : ""
      }
    `,
  });

  // Handle edit resume - navigate to editor with resume ID
  const handleEditResume = (resume: Resume) => {
    router.push(`/editor/${resume.id}`);
  };

  // Get top 2 resumes for the preview cards
  const topResumes = useMemo(() => {
    return resumes.slice(0, 2).map((resume) => ({
      ...resume,
      completion: calculateCompletion(resume.data),
      status: getStatusInfo(calculateCompletion(resume.data)),
      lastUpdated: formatDate(resume.created_at),
      title: resume.data?.personal?.name || "Untitled Resume",
    }));
  }, [resumes]);

  const deleteResume = async (resumeId: string) => {
    if (!user) return;

    try {
      const token = await getToken({ template: "supabase" });
      if (!token) return;

      const supabaseWithAuth = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { global: { headers: { Authorization: `Bearer ${token}` } } },
      );

      const { error } = await supabaseWithAuth
        .from("resumes")
        .delete()
        .eq("id", resumeId)
        .eq("user_id", user.id);

      if (error) {
        console.error("Error deleting resume:", error);
        return;
      }

      // Remove the deleted resume from state
      setResumes(resumes.filter((resume) => resume.id !== resumeId));

      // Add activity log for deletion
      const newActivityItem: ActivityItem = {
        id: Date.now().toString(),
        description: "Deleted a resume",
        timestamp: new Date().toISOString(),
        action_type: "delete",
      };

      setActivity((prev) => [newActivityItem, ...prev.slice(0, 4)]);
    } catch (err) {
      console.error("Unexpected error deleting resume:", err);
    }
  };

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
          setLoading(false);
          return;
        }

        const supabaseWithAuth = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          { global: { headers: { Authorization: `Bearer ${token}` } } },
        );

        // Fetch resumes
        const { data: resumesData, error: resumesError } =
          await supabaseWithAuth
            .from("resumes")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

        if (resumesError) {
          console.error("Supabase error:", resumesError);
        } else {
          const processedData = (resumesData || []).map((resume) =>
            typeof resume.data === "string"
              ? { ...resume, data: JSON.parse(resume.data) }
              : resume,
          );
          setResumes(processedData);
        }

        // Fetch activity from database
        const { data: activityData, error: activityError } =
          await supabaseWithAuth
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
              action_type: "create",
            },
            {
              id: "2",
              description: "Updated your resume",
              timestamp: new Date(Date.now() - 86400000).toISOString(),
              action_type: "update",
            },
          ];
          setActivity(mockActivity);
        } else {
          // Format the activity data to match our type
          const formattedActivity = (activityData || []).map((item: any) => ({
            id: item.id,
            description: item.description,
            timestamp: item.created_at,
            action_type: getActionTypeFromDescription(item.description),
          }));
          setActivity(formattedActivity);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, isLoaded, getToken]);

  const TemplateComp = useMemo(() => {
    if (!previewResume) return null;
    return (
      templates.find((t) => t.id === previewResume.template_id)?.comp || null
    );
  }, [previewResume]);

  return (
    <>
      <style>{printHideStyle}</style>
      <div className="w-full max-w-full overflow-x-hidden px-4 animate-fade-in">
        {/* Header Section */}
        <div className="flex justify-end mb-2 mt-2">
          <UserButton />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-indigo-700 bg-clip-text text-transparent">
              Resume Dashboard
            </h1>
            <p className="text-muted-foreground mt-1 flex items-center gap-1">
              <Sparkles className="h-4 w-4 text-indigo-500" />
              AI-powered resume management at your fingertips
            </p>
          </div>
          <Button
            className="gap-2 bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg shadow-md"
            asChild
          >
            <Link href="/editor">
              <Plus className="size-4" /> Create New Resume
            </Link>
          </Button>
        </div>

        {/* New Progress Cards - Replacing the old ones */}
        {resumes.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recent Resumes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topResumes.map((resume, index) => (
                <div
                  key={resume.id}
                  className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleEditResume(resume)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {resume.title}
                      </h4>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {resume.lastUpdated}
                      </p>
                    </div>
                    <div
                      className={`text-xs px-2 py-1 rounded-full ${resume.status.color}`}
                    >
                      {resume.status.label}
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full mb-2">
                    <div
                      className="h-full bg-[#4F46E5] rounded-full transition-all duration-500"
                      style={{ width: `${resume.completion}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600">
                    Completion: {resume.completion}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Original Stats Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <Card className="border-0 shadow-md bg-gradient-to-br from-white to-indigo-50/30 hover:shadow-lg transition-all duration-300 group hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-indigo-100/80 group-hover:bg-indigo-200/60 transition-colors duration-300">
                  <FileText className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Resumes
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {resumes.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-br from-white to-green-50/30 hover:shadow-lg transition-all duration-300 group hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-green-100/80 group-hover:bg-green-200/60 transition-colors duration-300">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Last Activity
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {activity.length > 0
                      ? new Date(activity[0].timestamp).toLocaleDateString()
                      : "Never"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-br from-white to-blue-50/30 hover:shadow-lg transition-all duration-300 group hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-blue-100/80 group-hover:bg-blue-200/60 transition-colors duration-300">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Recent Actions
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {activity.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 w-full">
          <div className="lg:col-span-2 space-y-6 w-full">
            {/* Resumes Section */}
            <Card className="border-0 shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover-lift">
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between w-full">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5 text-indigo-600" />
                    Your Resumes
                  </CardTitle>
                  <span className="text-sm text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">
                    {resumes.length} items
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {loading ? (
                  <div className="h-40 grid place-items-center w-full">
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="rounded-full bg-indigo-100 h-12 w-12 mb-3"></div>
                      <div className="h-4 bg-indigo-100 rounded w-3/4"></div>
                    </div>
                  </div>
                ) : resumes.length === 0 ? (
                  <div className="text-center py-8 animate-fade-in">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mb-4">
                      <FileText className="h-8 w-8 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No resumes yet
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Create your first professional resume to kickstart your
                      job search journey.
                    </p>
                    <Button
                      className="bg-indigo-600 hover:bg-indigo-700 transition-colors gap-2"
                      asChild
                    >
                      <Link href="/editor">
                        <Plus className="size-4" /> Create Resume
                      </Link>
                    </Button>
                  </div>
                ) : resumes.length > 3 ? (
                  <div className="relative w-full">
                    <Carousel className="w-full">
                      <CarouselContent className="w-full">
                        {resumes.map((resume, index) => (
                          <CarouselItem
                            key={resume.id}
                            className="px-1 sm:basis-1/2 lg:basis-1/3"
                          >
                            <div
                              className="animate-fade-in"
                              style={{ animationDelay: `${index * 100}ms` }}
                            >
                              <ResumeCard
                                resume={resume}
                                onEdit={handleEditResume}
                                onPreview={setPreviewResume}
                                onDelete={deleteResume}
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-2 z-10 border-indigo-200 text-indigo-600 hover:bg-indigo-50 bg-white shadow-sm" />
                      <CarouselNext className="right-2 z-10 border-indigo-200 text-indigo-600 hover:bg-indigo-50 bg-white shadow-sm" />
                    </Carousel>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
                    {resumes.map((resume, index) => (
                      <div
                        key={resume.id}
                        className="animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <ResumeCard
                          resume={resume}
                          onEdit={handleEditResume}
                          onPreview={setPreviewResume}
                          onDelete={deleteResume}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity Table */}
            <Card className="border-0 shadow-md transition-all duration-300 hover:shadow-lg hover-lift">
              <CardHeader className="pb-3 border-b">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-indigo-600" />
                  Recent Activity
                  <span className="text-sm text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full ml-2">
                    {activity.length}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {activity.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Activity className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                    <p>
                      No activity yet. Create or edit a resume to see activity
                      here.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-lg border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader className="bg-gray-50/50">
                          <TableRow>
                            <TableHead className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                              Action
                            </TableHead>
                            <TableHead className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                              Description
                            </TableHead>
                            <TableHead className="text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                              Date & Time
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {activity.map((activityItem, index) => (
                            <TableRow
                              key={activityItem.id}
                              className="animate-fade-in border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors"
                              style={{ animationDelay: `${index * 100}ms` }}
                            >
                              <TableCell className="font-medium">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    activityItem.action_type === "create"
                                      ? "bg-green-100 text-green-800"
                                      : activityItem.action_type === "update"
                                        ? "bg-blue-100 text-blue-800"
                                        : activityItem.action_type === "delete"
                                          ? "bg-red-100 text-red-800"
                                          : activityItem.action_type === "view"
                                            ? "bg-purple-100 text-purple-800"
                                            : "bg-indigo-100 text-indigo-800"
                                  }`}
                                >
                                  {activityItem.action_type}
                                </span>
                              </TableCell>
                              <TableCell className="text-sm text-gray-700">
                                {activityItem.description}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex flex-col items-end">
                                  <span className="text-sm font-medium text-gray-700">
                                    {new Date(
                                      activityItem.timestamp,
                                    ).toLocaleDateString()}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {new Date(
                                      activityItem.timestamp,
                                    ).toLocaleTimeString()}
                                  </span>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6 w-full">
            <Card className="border-0 shadow-md transition-all duration-300 hover:shadow-lg hover-lift">
              <CardHeader className="pb-3 border-b">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-indigo-600" />
                  AI Tips & Best Practices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-indigo-50/30">
                    <div className="mt-1 size-2 rounded-full bg-indigo-500 flex-shrink-0" />
                    <span className="text-sm">
                      Use action verbs and quantify achievements for maximum
                      impact
                    </span>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-indigo-50/30">
                    <div className="mt-1 size-2 rounded-full bg-indigo-500 flex-shrink-0" />
                    <span className="text-sm">
                      Tailor your resume for each job application using
                      different templates
                    </span>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-indigo-50/30">
                    <div className="mt-1 size-2 rounded-full bg-indigo-500 flex-shrink-0" />
                    <span className="text-sm">
                      Download as PDF to preserve formatting when sharing with
                      employers
                    </span>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-indigo-50/30">
                    <div className="mt-1 size-2 rounded-full bg-indigo-500 flex-shrink-0" />
                    <span className="text-sm">
                      Keep your resume to 1-2 pages for optimal readability
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Resume Preview Dialog */}
        <Dialog
        open={!!previewResume}
        onOpenChange={(o) => !o && setPreviewResume(null)}
      >
        <DialogContent className="max-w-4xl w-full h-[90vh] flex flex-col backdrop-blur-sm">
          <DialogHeader className="flex-shrink-0 pb-4 border-b">
            <DialogTitle className="text-indigo-600 flex items-center gap-2">
              <Eye className="h-5 w-5" />
              {previewResume?.data?.personal?.name || "Resume Preview"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-between py-4 w-full flex-shrink-0 no-print border-b">
            <div className="text-sm text-muted-foreground">
              Template: {previewResume?.template_id || "Standard"}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => handleEditResume(previewResume!)}
                variant="outline"
                className="gap-2"
              >
                <FileText className="size-4" /> Edit Resume
              </Button>
              <Button
                onClick={handlePrint}
                className="gap-2 bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                <Download className="size-4" /> Download PDF
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-auto py-4">
            <div ref={contentRef} className="w-full flex justify-center relative">
              {!isProUser && (
                <div className="watermark select-none">FREE PLAN</div>
              )}
              {TemplateComp ? (
                <div className="w-[210mm] shadow-lg rounded bg-white relative z-10">
                  <TemplateComp data={previewResume!.data} />
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4" />
                  <p>Template not available for preview</p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      </div>
    </>
  );
}
