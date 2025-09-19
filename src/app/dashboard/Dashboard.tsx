"use client";

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  House,
  CircleDollarSign,
  Settings,
  FileUser,
  Plus,
  Eye,
  Download,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useAuth } from "@clerk/nextjs";
import { templates } from "../editor/utils/templateMap";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

type Resume = {
  id: string;
  data: any; // Verander van string naar any omdat data al een object kan zijn
  template_id: string;
  user_id: string;
  created_at: string;
};

// Print verberg stijl
const printHideStyle = `
@media print {
  .no-print { display: none !important; }
}
`;

export default function Dashboard() {
  const pathname = usePathname();
  const { user, isLoaded } = useUser();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth();
  const [previewResume, setPreviewResume] = useState<Resume | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: previewResume?.data
      ? `${previewResume.data.personal?.name || "Resume"}-CV`
      : "Resume",
  });

  useEffect(() => {
    if (!isLoaded) return;

    const fetchResumes = async () => {
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
          {
            global: { headers: { Authorization: `Bearer ${token}` } },
          },
        );

        const { data, error: supabaseError } = await supabaseWithAuth
          .from("resumes")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (supabaseError) {
          console.error("Supabase error:", supabaseError);
          setError(`Error fetching resumes: ${supabaseError.message}`);
        } else {
          console.log("Resumes fetched:", data);

          // Zorg ervoor dat data altijd een object is, niet een string
          const processedData = data
            ? data.map((resume) => {
                // Als data een string is, parseer het naar een object
                if (typeof resume.data === "string") {
                  try {
                    return {
                      ...resume,
                      data: JSON.parse(resume.data),
                    };
                  } catch (e) {
                    console.error("Error parsing resume data:", e);
                    return {
                      ...resume,
                      data: {},
                    };
                  }
                }
                // Als data al een object is, retourneer het zoals het is
                return resume;
              })
            : [];

          setResumes(processedData);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, [user, isLoaded, getToken]);

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: House },
    { href: "/editor", label: "Editor", icon: FileUser },
    { href: "/billing", label: "Billing", icon: CircleDollarSign },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  // Functie om resume preview te openen
  const openPreview = (resume: Resume) => {
    setPreviewResume(resume);
  };

  // Functie om resume preview te sluiten
  const closePreview = () => {
    setPreviewResume(null);
  };

  return (
    <>
      <style>{printHideStyle}</style>
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-[201px] h-screen flex flex-col justify-between bg-[linear-gradient(180deg,_#7C3BEE1A_0%,_#7C3BEE1A_100%)]">
        <div>
          {/* Logo */}
          <div className="flex justify-center mt-6 mb-8">
            <Image
              src="/logo.png"
              alt="Logo"
              className="h-[29px] w-[117px]"
              width={117}
              height={29}
            />
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1 items-center">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className="w-full flex justify-center"
                >
                  <Button
                    className={`w-[184px] justify-start gap-2 rounded-full shadow-none cursor-pointer
                      ${
                        isActive
                          ? "text-[#4F46E5] bg-white font-bold"
                          : "text-black bg-transparent hover:bg-white hover:text-[#4F46E5]"
                      }`}
                  >
                    <Icon className="h-5 w-5" />
                    {label}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="ml-[201px] p-6">
        {/* Top bar */}
        <div className="flex items-center justify-between w-full text-xl font-semibold mb-6">
          <div className="flex items-center gap-2">
            <House className="h-6 w-6" aria-hidden="true" />
            <span>Dashboard</span>
          </div>
          <UserButton />
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Resume carousel */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Your Resumes</h2>
            <Button asChild>
              <Link href="/editor" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create New
              </Link>
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4F46E5]"></div>
            </div>
          ) : resumes.length === 0 ? (
            <div className="text-center p-8 border-2 border-dashed rounded-lg">
              <FileUser className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No resumes
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new resume.
              </p>
              <div className="mt-6">
                <Button asChild>
                  <Link href="/editor" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    New Resume
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="flex gap-4 pb-4">
                {/* Card to create new resume */}
                <div className="flex-shrink-0 w-64 h-64 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-4 hover:border-[#4F46E5] transition-colors">
                  <Plus className="h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-sm font-medium text-gray-900">
                    Create new resume
                  </p>
                  <Button asChild variant="ghost" className="mt-4">
                    <Link href="/editor">Create</Link>
                  </Button>
                </div>

                {/* Existing resumes */}
                {resumes.map((resume) => {
                  const data = resume.data || {};
                  const TemplateComponent = templates.find(
                    (t) => t.id === resume.template_id,
                  )?.comp;

                  return (
                    <div
                      key={resume.id}
                      className="flex-shrink-0 w-64 h-64 rounded-2xl border bg-white p-4 shadow flex flex-col"
                    >
                      {/* Resume preview thumbnail */}
                      <div className="flex-grow mb-2 overflow-hidden relative bg-gray-50 rounded-lg h-32">
                        {TemplateComponent ? (
                          <div className="scale-50 origin-top-left absolute top-0 left-0 w-[200%] h-[200%] pointer-events-none">
                            <TemplateComponent data={data} />
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-400">
                            <FileUser className="h-12 w-12" />
                          </div>
                        )}
                      </div>

                      <div className="flex-grow">
                        <div className="font-bold text-lg truncate">
                          {data.personal?.name || "Untitled Resume"}
                        </div>
                        <div className="text-sm text-gray-600 truncate">
                          {data.personal?.title || "No title"}
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          Created:{" "}
                          {new Date(resume.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button asChild className="flex-1">
                          <Link href={`/editor/${resume.id}`}>Edit</Link>
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => openPreview(resume)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Preview Modal */}
      {previewResume && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">
                {previewResume.data?.personal?.name || "Resume Preview"}
              </h3>
              <div className="flex gap-2">
                <Button onClick={handlePrint} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button onClick={closePreview} variant="ghost">
                  Close
                </Button>
              </div>
            </div>
            <div className="overflow-auto p-4">
              <div ref={contentRef} className="mx-auto">
                {(() => {
                  const data = previewResume.data || {};
                  const TemplateComponent = templates.find(
                    (t) => t.id === previewResume.template_id,
                  )?.comp;

                  return TemplateComponent ? (
                    <TemplateComponent data={data} />
                  ) : (
                    <div className="text-center p-8">
                      <FileUser className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-gray-500">Template not found</p>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
