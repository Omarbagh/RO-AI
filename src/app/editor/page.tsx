'use client';

import { useState } from 'react';
import { useUser, SignInButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Lock, Plus, Trash2, Zap } from 'lucide-react';
import { CVData } from '@/types/cv';

import BasicTemplate from '@/components/templates/basicTemplate';
import ModernTemplate from '@/components/templates/ModernTemplate';
import CreativeTemplate from '@/components/templates/CreativeTemplate';
import { ExecutiveTemplate } from '@/components/templates/ExecutiveTemplate';
import { MinimalistTemplate } from '@/components/templates/MinimalistTemplate';
import { PortfolioTemplate } from '@/components/templates/PortfolioTemplate';
import ProfessionalTemplate from '@/components/templates/ProfessionalTemplate';

const templates = [
  { id: 1, name: 'Basic', comp: BasicTemplate, pro: false },
  { id: 2, name: 'Modern', comp: ModernTemplate, pro: false },
  { id: 3, name: 'Creative', comp: CreativeTemplate, pro: true },
  { id: 4, name: 'Executive', comp: ExecutiveTemplate, pro: true },
  { id: 5, name: 'Minimalist', comp: MinimalistTemplate, pro: true },
  { id: 6, name: 'Portfolio', comp: PortfolioTemplate, pro: true },
  { id: 7, name: 'Professional', comp: ProfessionalTemplate, pro: true },
];

export default function EditorPage() {
  const { isSignedIn } = useUser();
  const [step, setStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [formData, setFormData] = useState<CVData>({
    personal: { name: '', title: '', email: '', phone: '', photoUrl: '' },
    profile: '',
    experience: [{ job: '', company: '', description: '' }],
    education: [{ school: '', degree: '', year: '' }],
    skills: [''],
  });
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [isPro, setIsPro] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

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

  // Helper functions
  const updatePersonal = (field: keyof CVData['personal'], value: string) => {
    setFormData((d) => ({ ...d, personal: { ...d.personal, [field]: value } }));
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
    setFormData((d) => ({ ...d, experience: [...d.experience, { job: '', company: '', description: '' }] }));
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
      console.error('Save failed');
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

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-indigo-50 text-gray-800">
      <aside className="w-full md:w-1/3 p-8 bg-white shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6">
          Step {step + 1}: {steps[step]}
        </h2>

        {step === 0 && (
          <div className="grid gap-4">
            {templates.map((tpl) => (
              <Card
                key={tpl.id}
                onClick={() => {
                  if (tpl.pro && !isPro) return;
                  setSelectedTemplate(tpl.id);
                  setStep(1);
                }}
                className={`cursor-pointer p-4 rounded-lg transition border hover:border-indigo-600 ${tpl.pro && !isPro ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                <CardContent className="text-center">
                  <p className="font-medium text-lg">{tpl.name}</p>
                  {tpl.pro && (
                    <div className="inline-flex items-center gap-1 mt-2 text-sm text-indigo-600">
                      <Lock size={14} /> Pro
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
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
          <Button onClick={() => setStep((s) => s - 1)} disabled={step === 0} className="bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50">
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
          <div className="max-w-2xl mx-auto bg-white shadow-md p-6 rounded-lg">
            <TemplateComponent data={formData} />
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-20">Select a template to preview</p>
        )}
      </main>
    </div>
  );
}
