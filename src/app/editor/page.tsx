'use client';

import { useState, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useUser, SignInButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Lock, Plus, Trash2, Zap, Image as ImageIcon, Palette } from 'lucide-react';
import { CVData } from '@/types/cv';

import BasicTemplate from '@/components/templates/basicTemplate';
import ModernTemplate from '@/components/templates/ModernTemplate';
import CreativeTemplate from '@/components/templates/CreativeTemplate';
import { ExecutiveTemplate } from '@/components/templates/ExecutiveTemplate';
import { MinimalistTemplate } from '@/components/templates/MinimalistTemplate';
import { PortfolioTemplate } from '@/components/templates/PortfolioTemplate';
import { ProfessionalTemplate } from '@/components/templates/ProfessionalTemplate';
import { SidebarDarkTemplate } from '@/components/templates/SidebarDarkTemplate';
import { ClassicTemplate } from '@/components/templates/ClassicTemplate';

const templates = [
  { id: 1, name: 'Basic', comp: BasicTemplate, pro: false },
  { id: 2, name: 'Modern', comp: ModernTemplate, pro: false },
  { id: 3, name: 'Creative', comp: CreativeTemplate, pro: true },
  { id: 4, name: 'Executive', comp: ExecutiveTemplate, pro: true },
  { id: 5, name: 'Minimalist', comp: MinimalistTemplate, pro: true },
  { id: 6, name: 'Portfolio', comp: PortfolioTemplate, pro: true },
  { id: 7, name: 'Professional', comp: ProfessionalTemplate, pro: true },
  { id: 8, name: 'Sidebar Dark', comp: SidebarDarkTemplate, pro: false },
  { id: 9, name: 'Classic', comp: ClassicTemplate, pro: false },
];

const defaultAccent = '#7C3AED';

const dummyPreviewData: CVData = {
  personal: {
    name: "Jane Doe",
    title: "Frontend Developer",
    email: "jane.doe@email.com",
    phone: "+1 234 567 8901",
    photoUrl: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  profile: "Creative and passionate frontend developer with 3+ years of experience building React/Next.js apps.",
  experience: [
    { job: "Frontend Developer", company: "Web Innovators", description: "Developed and maintained scalable SPAs for various clients.", period: "2022-2024" },
    { job: "UI Engineer", company: "Pixel Factory", description: "Created interactive UI components and improved design systems.", period: "2020-2022" }
  ],
  education: [
    { school: "State University", degree: "BSc Computer Science", year: "2020" },
  ],
  skills: ["React", "Next.js", "TypeScript", "CSS-in-JS", "Figma"],
};

function TemplateFullPreview({
  Component,
  accent,
}: {
  Component: React.ComponentType<{ data: CVData }>;
  accent: string;
}) {
  // Use a fixed height for preview, allow vertical scroll inside if needed.
  return (
    <div
      className="w-full bg-gray-50 border rounded-xl overflow-hidden shadow relative flex items-start justify-center"
      style={{
        borderColor: accent,
        minHeight: 420,
        maxHeight: 480,
        height: 480,
        padding: 0,
      }}
    >
      <div className="w-full h-full overflow-auto" style={{ background: "#f8fafc" }}>
        <Component data={dummyPreviewData} />
      </div>
    </div>
  );
}

export default function EditorPage() {
  const { isSignedIn } = useUser();
  const [step, setStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [formData, setFormData] = useState<CVData>({
    personal: { name: '', title: '', email: '', phone: '', photoUrl: '' },
    profile: '',
    experience: [{ job: '', company: '', description: '', period: '' }],
    education: [{ school: '', degree: '', year: '' }],
    skills: [''],
  });
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [isPro, setIsPro] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  // Accent color & Color picker (after step 0)
  const [accent, setAccent] = useState(defaultAccent);
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accent);
  }, [accent]);

  const steps = ['Template', 'Personal', 'Profile', 'Experience', 'Education', 'Skills'];

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <p className="mb-4 text-gray-700">You must be signed in to use the CV editor.</p>
          <SignInButton>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Sign In
            </Button>
          </SignInButton>
        </div>
      </div>
    );
  }

  const TemplateComponent =
    selectedTemplate != null
      ? templates.find((t) => t.id === selectedTemplate)!.comp
      : null;

  // Helpers for data editing
  const updatePersonal = (field: keyof CVData['personal'], value: string) => {
    setFormData((d) => ({ ...d, personal: { ...d.personal, [field]: value } }));
  };

  const handlePhotoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      updatePersonal('photoUrl', e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const updateProfile = (value: string) => {
    setFormData((d) => ({ ...d, profile: value }));
  };
  const updateExperienceItem = (i: number, field: keyof CVData['experience'][0], value: string) => {
    setFormData((d) => {
      const exp = [...d.experience];
      exp[i] = { ...exp[i], [field]: value };
      return { ...d, experience: exp };
    });
  };
  const addExperience = () => {
    setFormData((d) => ({ ...d, experience: [...d.experience, { job: '', company: '', description: '', period: '' }] }));
  };
  const removeExperience = (i: number) => {
    setFormData((d) => ({ ...d, experience: d.experience.filter((_, idx) => idx !== i) }));
  };

  const updateEducationItem = (i: number, field: keyof CVData['education'][0], value: string) => {
    setFormData((d) => {
      const edu = [...d.education];
      edu[i] = { ...edu[i], [field]: value };
      return { ...d, education: edu };
    });
  };
  const addEducation = () => {
    setFormData((d) => ({ ...d, education: [...d.education, { school: '', degree: '', year: '' }] }));
  };
  const removeEducation = (i: number) => {
    setFormData((d) => ({ ...d, education: d.education.filter((_, idx) => idx !== i) }));
  };

  const updateSkill = (i: number, value: string) => {
    setFormData((d) => {
      const skills = [...d.skills];
      skills[i] = value;
      return { ...d, skills };
    });
  };
  const addSkill = () => {
    setFormData((d) => ({ ...d, skills: [...d.skills, ''] }));
  };
  const removeSkill = (i: number) => {
    setFormData((d) => ({ ...d, skills: d.skills.filter((_, idx) => idx !== i) }));
  };

  // Save & pro-check
  const handleFinish = async () => {
    if (!selectedTemplate) return;
    setLoadingSave(true);
    const res = await fetch('/api/save-resume', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ templateId: selectedTemplate, formData }),
    });
    if (!res.ok) {
      setLoadingSave(false);
      return;
    }
    const { resumeId } = await res.json();
    setResumeId(resumeId);
    const proRes = await fetch('/api/check-pro');
    const { isPro } = await proRes.json();
    setIsPro(isPro);
    setSaveSuccess(true);
    setLoadingSave(false);
  };

  const downloadResume = (id: string, format: 'pdf' | 'docx', watermark = false) => {
    const params = new URLSearchParams({ resumeId: id, format });
    if (watermark) params.set('watermark', 'Resumo');
    const url = `/api/download?${params.toString()}`;
    const link = document.createElement('a');
    link.href = url;
    link.download = `resume.${format}`;
    link.click();
  };

  // ---- STEP 0: Template Selector Full Page ----
  if (step === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 flex flex-col items-center justify-center px-2 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-indigo-700">
          Choose your resume template
        </h1>
        <p className="text-gray-500 mb-8 text-center max-w-2xl">
          View live previews of all templates. You can still change color and details later. PRO templates are marked.
          <br />
          Click a template to select, then continue.
        </p>
        <div className="w-full max-w-7xl grid gap-8 grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 mb-10">
          {templates.map((tpl) => {
            const Preview = tpl.comp;
            const isSelected = selectedTemplate === tpl.id;
            return (
              <div
                key={tpl.id}
                tabIndex={0}
                aria-label={tpl.name}
                className={`relative group border-2 bg-white rounded-2xl p-4 shadow-lg flex flex-col transition-all duration-150
                  ${isSelected
                    ? 'border-indigo-600 ring-2 ring-indigo-300'
                    : 'border-gray-200 hover:border-indigo-400 hover:shadow-2xl'
                  }
                  ${tpl.pro && !isPro ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
                `}
                onClick={() => {
                  if (tpl.pro && !isPro) return;
                  setSelectedTemplate(tpl.id);
                }}
                style={{
                  minHeight: 520,
                  maxHeight: 560,
                  height: 560,
                  width: '100%',
                  overflow: 'hidden',
                }}
              >
                {/* Pro-badge */}
                {tpl.pro && (
                  <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1 z-10 shadow">
                    <Lock size={13} /> PRO
                  </span>
                )}
                {/* Checkmark for selected */}
                {isSelected && (
                  <span className="absolute top-3 right-3 bg-green-500 text-white rounded-full p-1 shadow z-10">
                    <svg width="16" height="16" fill="none"><path d="M4 8.5l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                )}
                {/* Full Preview */}
                <div className="mb-3 pointer-events-none w-full h-full overflow-auto">
                  <TemplateFullPreview
                    Component={Preview}
                    accent={defaultAccent}
                  />
                </div>
                <div className="flex items-center mt-3">
                  <span className="font-semibold text-indigo-700 text-base">{tpl.name}</span>
                  <button
                    className={`ml-auto px-4 py-1.5 rounded-lg text-sm font-semibold shadow transition 
                      ${isSelected
                        ? 'bg-indigo-600 text-white'
                        : 'border border-indigo-300 text-indigo-700 bg-white hover:bg-indigo-50'
                      }
                    `}
                    onClick={e => {
                      e.stopPropagation();
                      if (tpl.pro && !isPro) return;
                      setSelectedTemplate(tpl.id);
                    }}
                    disabled={tpl.pro && !isPro}
                    tabIndex={-1}
                  >
                    {isSelected ? "Selected" : "Select"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <button
          className={`px-6 py-3 mt-2 rounded-lg font-bold text-lg transition-all duration-150 shadow ${
            selectedTemplate
              ? "bg-indigo-600 hover:bg-indigo-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!selectedTemplate}
          onClick={() => setStep(1)}
        >
          Continue
        </button>
      </div>
    );
  }

  // ---- The actual Editor (steps 1+) ----
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-indigo-50 text-gray-800">
      <aside className="w-full md:w-1/3 p-8 bg-white shadow-lg relative">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6 flex items-center gap-3">
          Step {step + 1}: {steps[step]}
          {/* Color picker button, only after template select */}
          <div className="relative ml-auto">
            <button
              className="w-9 h-9 rounded-full border-2 flex items-center justify-center transition ring-2 ring-indigo-200 focus:ring-4"
              style={{ background: accent, borderColor: '#fff' }}
              onClick={() => setShowColorPicker((v) => !v)}
              aria-label="Pick accent color"
            >
              <Palette size={22} className="text-white" />
            </button>
            {showColorPicker && (
              <div className="absolute left-0 mt-3 z-50 bg-white p-4 rounded-lg shadow-xl border w-48">
                <HexColorPicker color={accent} onChange={setAccent} />
                <div className="flex items-center mt-2">
                  <span className="text-xs mr-1">Hex:</span>
                  <input
                    className="border px-2 py-1 rounded text-xs w-20"
                    value={accent}
                    onChange={e => setAccent(e.target.value)}
                  />
                  <button
                    className="ml-auto bg-indigo-500 text-white text-xs px-3 py-1 rounded hover:bg-indigo-600"
                    onClick={() => setShowColorPicker(false)}
                  >
                    Ok
                  </button>
                </div>
              </div>
            )}
          </div>
        </h2>
        {step === 1 && (
          <div className="space-y-4">
            {/* Profile photo upload */}
            <div className="flex items-center gap-4 mb-2">
              {formData.personal.photoUrl ? (
                <img
                  src={formData.personal.photoUrl}
                  alt="Profile"
                  className="w-16 h-16 rounded-full border-2 border-indigo-200 object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-indigo-200 flex items-center justify-center text-indigo-200">
                  <ImageIcon size={30} />
                </div>
              )}
              <label className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-lg cursor-pointer flex items-center gap-1 hover:bg-indigo-200 border border-indigo-200">
                <ImageIcon size={16} /> Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      handlePhotoUpload(e.target.files[0]);
                    }
                  }}
                />
              </label>
              {formData.personal.photoUrl && (
                <button
                  className="ml-1 text-xs text-red-400 underline"
                  onClick={() => updatePersonal('photoUrl', '')}
                  type="button"
                >
                  Remove
                </button>
              )}
            </div>
            <Input placeholder="Name" value={formData.personal.name} onChange={(e) => updatePersonal('name', e.target.value)} />
            <Input placeholder="Title" value={formData.personal.title} onChange={(e) => updatePersonal('title', e.target.value)} />
            <Input placeholder="Email" type="email" value={formData.personal.email} onChange={(e) => updatePersonal('email', e.target.value)} />
            <Input placeholder="Phone" value={formData.personal.phone} onChange={(e) => updatePersonal('phone', e.target.value)} />
          </div>
        )}
        {step === 2 && (
          <Textarea placeholder="Profile summary" rows={4} value={formData.profile} onChange={(e) => updateProfile(e.target.value)} />
        )}
        {step === 3 && (
          <div className="space-y-4">
            {formData.experience.map((exp, i) => (
              <div key={i} className="border p-4 rounded-lg relative">
                <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500" onClick={() => removeExperience(i)}>
                  <Trash2 size={16} />
                </button>
                <Input placeholder="Job Title" value={exp.job} onChange={(e) => updateExperienceItem(i, 'job', e.target.value)} />
                <Input placeholder="Company" value={exp.company} onChange={(e) => updateExperienceItem(i, 'company', e.target.value)} />
                <Input placeholder="Period (optional)" value={exp.period ?? ''} onChange={e => updateExperienceItem(i, 'period', e.target.value)} />
                <Textarea placeholder="Description" rows={2} value={exp.description} onChange={(e) => updateExperienceItem(i, 'description', e.target.value)} />
              </div>
            ))}
            <Button variant="outline" className="flex items-center gap-2" onClick={addExperience}>
              <Plus size={16} /> Add Experience
            </Button>
          </div>
        )}
        {step === 4 && (
          <div className="space-y-4">
            {formData.education.map((edu, i) => (
              <div key={i} className="border p-4 rounded-lg relative">
                <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500" onClick={() => removeEducation(i)}>
                  <Trash2 size={16} />
                </button>
                <Input placeholder="School" value={edu.school} onChange={(e) => updateEducationItem(i, 'school', e.target.value)} />
                <Input placeholder="Degree" value={edu.degree} onChange={(e) => updateEducationItem(i, 'degree', e.target.value)} />
                <Input placeholder="Year" value={edu.year} onChange={(e) => updateEducationItem(i, 'year', e.target.value)} />
              </div>
            ))}
            <Button variant="outline" className="flex items-center gap-2" onClick={addEducation}>
              <Plus size={16} /> Add Education
            </Button>
          </div>
        )}
        {step === 5 && (
          <div className="space-y-4">
            {formData.skills.map((skill, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input placeholder="Skill" value={skill} onChange={(e) => updateSkill(i, e.target.value)} />
                <button className="text-gray-400 hover:text-red-500" onClick={() => removeSkill(i)}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <Button variant="outline" className="flex items-center gap-2" onClick={addSkill}>
              <Plus size={16} /> Add Skill
            </Button>
          </div>
        )}
        <div className="flex justify-between mt-8">
          <Button onClick={() => setStep((s) => s - 1)} disabled={step === 1} className="bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50">
            Previous
          </Button>
          {step < steps.length - 1 ? (
            <Button onClick={() => setStep((s) => s + 1)} className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Next
            </Button>
          ) : (
            <Button onClick={handleFinish} disabled={loadingSave}	className="bg-indigo-600 hover:bg-indigo-700 text-white">
              {loadingSave ? 'Saving...' : 'Finish'}
            </Button>
          )}
        </div>
        {saveSuccess && resumeId && (
          <div className="mt-6 space-y-4">
            <p className="text-green-600 font-semibold">Resume saved!</p>
            <div className="flex flex-col gap-2">
              <Button onClick={() => downloadResume(resumeId, 'pdf', !isPro)} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Download PDF {isPro ? '' : '(watermark)'}
              </Button>
              <Button onClick={() => downloadResume(resumeId, 'docx', false)} disabled={!isPro} className={`border rounded-lg px-4 py-2 ${!isPro ? 'border-gray-300 text-gray-400 cursor-not-allowed' : 'border-indigo-600 text-indigo-600 hover:bg-indigo-50'}`
              }>
                Download DOCX (Pro only)
              </Button>
              <Button onClick={() => alert('AI Summary coming soon!')} className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2">
                <Zap size={16} /> AI Summary
              </Button>
            </div>
          </div>
        )}
      </aside>
      <main className="w-full md:w-2/3 p-8 overflow-auto">
        {TemplateComponent ? (
          <div className="max-w-2xl mx-auto bg-white shadow-md p-6 rounded-lg" style={{ borderColor: accent }}>
            <TemplateComponent data={formData} />
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-20">Select a template to preview</p>
        )}
      </main>
    </div>
  );
}
