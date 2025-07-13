'use client';

import { useState } from 'react';
import { useUser, SignInButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Lock, Plus, Trash2 } from 'lucide-react';
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
  { id: 2, name: 'Modern', comp: ModernTemplate, pro: true },
  { id: 3, name: 'Creative', comp: CreativeTemplate, pro: true },
  { id: 4, name: 'Executive', comp: ExecutiveTemplate, pro: true },
  { id: 5, name: 'Minimalist', comp: MinimalistTemplate, pro: true },
  { id: 6, name: 'Portfolio', comp: PortfolioTemplate, pro: true },
  { id: 7, name: 'Portfolio', comp: ProfessionalTemplate, pro: true },
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
  const steps = ['Choose Template', 'Personal Info', 'Profile', 'Experiences', 'Education', 'Skills'];

  // download/resume state
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [isPro, setIsPro] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  // Prevent anonymous use
  if (!isSignedIn) {
    return (
      <div className="p-8 text-center">
        <p className="mb-4">You must be signed in to use the CV editor.</p>
        <SignInButton>
          <button className="btn">Sign In</button>
        </SignInButton>
      </div>
    );
  }

  // Helpers to update formData...

  async function uploadPhoto(file: File): Promise<string> {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }
  
  function updatePersonal(field: keyof CVData['personal'], value: string) {
    setFormData(d => ({ ...d, personal: { ...d.personal, [field]: value } }));
  }
  
  function updateProfile(value: string) {
    setFormData(d => ({ ...d, profile: value }));
  }
  
  function updateExperienceItem(i: number, f: keyof CVData['experience'][0], v: string) {
    setFormData(d => {
      const exp = [...d.experience];
      exp[i] = { ...exp[i], [f]: v };
      return { ...d, experience: exp };
    });
  }
  
  function addExperience() {
    setFormData(d => ({ ...d, experience: [...d.experience, { job: '', company: '', description: '' }] }));
  }
  
  function removeExperience(i: number) {
    setFormData(d => ({ ...d, experience: d.experience.filter((_, idx) => idx !== i) }));
  }
  
  function updateEducationItem(i: number, f: keyof CVData['education'][0], v: string) {
    setFormData(d => {
      const edu = [...d.education];
      edu[i] = { ...edu[i], [f]: v };
      return { ...d, education: edu };
    });
  }
  
  function addEducation() {
    setFormData(d => ({ ...d, education: [...d.education, { school: '', degree: '', year: '' }] }));
  }
  
  function removeEducation(i: number) {
    setFormData(d => ({ ...d, education: d.education.filter((_, idx) => idx !== i) }));
  }
  
  function updateSkill(i: number, v: string) {
    setFormData(d => {
      const skills = [...d.skills];
      skills[i] = v;
      return { ...d, skills };
    });
  }
  
  function addSkill() {
    setFormData(d => ({ ...d, skills: [...d.skills, ''] }));
  }
  
  function removeSkill(i: number) {
    setFormData(d => ({ ...d, skills: d.skills.filter((_, idx) => idx !== i) }));
  }

  const TemplateComponent =
    selectedTemplate != null
      ? templates.find(t => t.id === selectedTemplate)!.comp
      : null;

  // Save & determine pro status
  async function handleFinish() {
    if (!selectedTemplate) return;
    setLoadingSave(true);
    
    // 1) Save resume
    const saveRes = await fetch('/api/save-resume', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ templateId: selectedTemplate, formData }),
    });
    
    if (!saveRes.ok) {
      console.error('Save failed');
      setLoadingSave(false);
      return;
    }
    
    const { resumeId } = await saveRes.json();
    setResumeId(resumeId);

    // 2) Check pro
    const proRes = await fetch('/api/check-pro');
    const { isPro } = await proRes.json();
    setIsPro(isPro);

    setSaveSuccess(true);
    setLoadingSave(false);
  }

  // Fixed download helper
  function downloadResume(id: string, format: 'pdf' | 'docx', watermark = false) {
    const params = new URLSearchParams({ resumeId: id, format });
    if (watermark) params.set('watermark', 'Resumo');
    const url = `/api/download?${params.toString()}`;
    
    // Create hidden link to trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = `resume.${format}`;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left: Form wizard */}
      <div className="w-full md:w-1/3 p-6 space-y-6">
        <h2 className="text-xl font-semibold">{steps[step]}</h2>

        {/* Step 0: choose template */}
        {step === 0 && (
          <div className="grid grid-cols-1 gap-4">
            {templates.map(tpl => (
              <Card
                key={tpl.id}
                className={`cursor-pointer ${tpl.pro ? 'opacity-60' : ''}`}
                onClick={() => {
                  if (tpl.pro && !isPro) return alert('Only for Pro users');
                  setSelectedTemplate(tpl.id);
                  setStep(1);
                }}
              >
                <CardContent className="text-center">
                  <p className="font-medium">{tpl.name}</p>
                  {tpl.pro && <div className="flex items-center justify-center gap-1 text-sm"><Lock size={14} /> Pro</div>}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Step 1: Personal */}
        {step === 1 && (
          <div className="space-y-4">
            <Input placeholder="Name" value={formData.personal.name} onChange={e => updatePersonal('name', e.target.value)} />
            <Input placeholder="Title" value={formData.personal.title} onChange={e => updatePersonal('title', e.target.value)} />
            <Input placeholder="Email" value={formData.personal.email} onChange={e => updatePersonal('email', e.target.value)} />
            <Input placeholder="Phone" value={formData.personal.phone} onChange={e => updatePersonal('phone', e.target.value)} />
                <label className="block text-sm font-medium mb-1">Photo</label>
                <div className="flex items-center gap-4">
                    {formData.personal.photoUrl && (
                        <img
                            src={formData.personal.photoUrl}
                            alt="Profile"
                            className="w-14 h-14 rounded-full object-cover border"
                        />
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={e => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            uploadPhoto(file).then((url: string) => updatePersonal('photoUrl', url));
                        }}
                        className="block text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                    />
                </div>
          </div>
        )}

        {/* Step 2: Profile */}
        {step === 2 && (
          <Textarea placeholder="Profile summary" rows={4} value={formData.profile} onChange={e => updateProfile(e.target.value)} />
        )}

        {/* Step 3: Experiences */}
        {step === 3 && (
          <div className="space-y-4">
            {formData.experience.map((exp, i) => (
              <div key={i} className="border p-4 rounded space-y-2">
                <div className="flex justify-between items-center">
                  <p className="font-medium">Experience {i + 1}</p>
                  <button onClick={() => removeExperience(i)}><Trash2 size={16} /></button>
                </div>
                <Input placeholder="Job Title" value={exp.job} onChange={e => updateExperienceItem(i, 'job', e.target.value)} />
                <Input placeholder="Company" value={exp.company} onChange={e => updateExperienceItem(i, 'company', e.target.value)} />
                <Textarea placeholder="Description" rows={2} value={exp.description} onChange={e => updateExperienceItem(i, 'description', e.target.value)} />
              </div>
            ))}
            <Button variant="outline" onClick={addExperience}><Plus size={16} className="mr-2" /> Add Experience</Button>
          </div>
        )}

        {/* Step 4: Education */}
        {step === 4 && (
          <div className="space-y-4">
            {formData.education.map((edu, i) => (
              <div key={i} className="border p-4 rounded space-y-2">
                <div className="flex justify-between items-center">
                  <p className="font-medium">Education {i + 1}</p>
                  <button onClick={() => removeEducation(i)}><Trash2 size={16} /></button>
                </div>
                <Input placeholder="School" value={edu.school} onChange={e => updateEducationItem(i, 'school', e.target.value)} />
                <Input placeholder="Degree" value={edu.degree} onChange={e => updateEducationItem(i, 'degree', e.target.value)} />
                <Input placeholder="Year" value={edu.year} onChange={e => updateEducationItem(i, 'year', e.target.value)} />
              </div>
            ))}
            <Button variant="outline" onClick={addEducation}><Plus size={16} className="mr-2" /> Add Education</Button>
          </div>
        )}

        {/* Step 5: Skills */}
        {step === 5 && (
          <div className="space-y-4">
            {formData.skills.map((skill, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Input placeholder="Skill" value={skill} onChange={e => updateSkill(i, e.target.value)} />
                <button onClick={() => removeSkill(i)}><Trash2 size={16} /></button>
              </div>
            ))}
            <Button variant="outline" onClick={addSkill}><Plus size={16} className="mr-2" /> Add Skill</Button>
          </div>
        )}

        {/* Navigation & Finish */}
        <div className="flex justify-between mt-6">
          <Button disabled={step === 0} onClick={() => setStep(s => s - 1)}>Previous</Button>
          {step < steps.length - 1 ? (
            <Button onClick={() => setStep(s => s + 1)}>Next</Button>
          ) : (
            <Button onClick={handleFinish} disabled={loadingSave}>
              {loadingSave ? 'Saving...' : 'Finish & Save'}
            </Button>
          )}
        </div>

        {/* Download buttons after saving */}
        {step === steps.length - 1 && saveSuccess && resumeId && (
          <div className="mt-6 flex gap-4">
            {!isPro && (
              <Button onClick={() => downloadResume(resumeId, 'pdf', true)}>
                Download PDF (watermark)
              </Button>
            )}
            {isPro && (
              <>
                <Button onClick={() => downloadResume(resumeId, 'pdf', false)}>
                  Download PDF
                </Button>
                <Button onClick={() => downloadResume(resumeId, 'docx', false)}>
                  Download DOCX
                </Button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Right: live preview */}
      <div className="w-full md:w-2/3 bg-gray-100 p-6 overflow-auto">
        {TemplateComponent && <TemplateComponent data={formData} />}
      </div>
    </div>
  );
}