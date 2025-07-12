'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Lock, Plus, Trash2 } from 'lucide-react';
import { CVData } from '@/types/cv';

import BasicTemplate from '@/components/templates/basicTemplate';
import ModernTemplate from '@/components/templates/ModernTemplate';
import CreativeTemplate from '@/components/templates/CreativeTemplate';

const templates = [
  { id: 1, name: 'Basic', comp: BasicTemplate, pro: false },
  { id: 2, name: 'Modern', comp: ModernTemplate, pro: true },
  { id: 3, name: 'Creative', comp: CreativeTemplate, pro: true },
];

export default function EditorPage() {
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

  // Update helpers
  function updatePersonal(field: keyof CVData['personal'], value: string) {
    setFormData(d => ({ ...d, personal: { ...d.personal, [field]: value } }));
  }
  function updateProfile(value: string) {
    setFormData(d => ({ ...d, profile: value }));
  }
  function updateExperienceItem(index: number, field: keyof CVData['experience'][0], value: string) {
    setFormData(d => {
      const exp = [...d.experience];
      exp[index] = { ...exp[index], [field]: value };
      return { ...d, experience: exp };
    });
  }
  function addExperience() {
    setFormData(d => ({ ...d, experience: [...d.experience, { job: '', company: '', description: '' }] }));
  }
  function removeExperience(index: number) {
    setFormData(d => ({ ...d, experience: d.experience.filter((_, i) => i !== index) }));
  }
  function updateEducationItem(index: number, field: keyof CVData['education'][0], value: string) {
    setFormData(d => {
      const edu = [...d.education];
      edu[index] = { ...edu[index], [field]: value };
      return { ...d, education: edu };
    });
  }
  function addEducation() {
    setFormData(d => ({ ...d, education: [...d.education, { school: '', degree: '', year: '' }] }));
  }
  function removeEducation(index: number) {
    setFormData(d => ({ ...d, education: d.education.filter((_, i) => i !== index) }));
  }
  function updateSkill(index: number, value: string) {
    setFormData(d => {
      const skills = [...d.skills];
      skills[index] = value;
      return { ...d, skills };
    });
  }
  function addSkill() {
    setFormData(d => ({ ...d, skills: [...d.skills, ''] }));
  }
  function removeSkill(index: number) {
    setFormData(d => ({ ...d, skills: d.skills.filter((_, i) => i !== index) }));
  }
  async function uploadPhoto(file: File): Promise<string> {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => {
        // In a real app, upload to server or cloud storage here
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }

  const TemplateComponent =
    selectedTemplate != null
      ? templates.find(t => t.id === selectedTemplate)!.comp
      : null;

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left: Form wizard */}
      <div className="w-full md:w-1/3 p-6 space-y-6">
        <h2 className="text-xl font-semibold">{steps[step]}</h2>

        {/* Step 0: Template selection */}
        {step === 0 && (
          <div className="grid grid-cols-1 gap-4">
            {templates.map(tpl => (
              <Card
                key={tpl.id}
                className={`cursor-pointer ${tpl.pro ? 'opacity-60' : ''}`}
                onClick={() => {
                  if (tpl.pro) return alert('Only for Pro users');
                  setSelectedTemplate(tpl.id);
                  setStep(1);
                }}
              >
                <CardContent className="text-center">
                  <p className="font-medium">{tpl.name}</p>
                  {tpl.pro && <div className="flex justify-center items-center gap-1 text-sm text-gray-500"><Lock size={14} /> Pro</div>}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Step 1: Personal Info */}
        {step === 1 && (
        <div className="space-y-4">
            <Input
                placeholder="Full Name"
                value={formData.personal.name}
                onChange={e => updatePersonal('name', e.target.value)}
                className="rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
            <Input
                placeholder="Professional Title"
                value={formData.personal.title}
                onChange={e => updatePersonal('title', e.target.value)}
                className="rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
            <Input
                placeholder="Email Address"
                type="email"
                value={formData.personal.email}
                onChange={e => updatePersonal('email', e.target.value)}
                className="rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
            <Input
                placeholder="Phone Number"
                type="tel"
                value={formData.personal.phone}
                onChange={e => updatePersonal('phone', e.target.value)}
                className="rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
            <div>
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
        </div>
        )}

        {/* Step 2: Profile Summary */}
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
            <Button variant="outline" onClick={addExperience}><Plus size={16} className="mr-2" />Add Experience</Button>
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
            <Button variant="outline" onClick={addEducation}><Plus size={16} className="mr-2" />Add Education</Button>
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
            <Button variant="outline" onClick={addSkill}><Plus size={16} className="mr-2" />Add Skill</Button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button disabled={step === 0} onClick={() => setStep(s => s - 1)}>Previous</Button>
          <Button disabled={step === steps.length - 1} onClick={() => step < steps.length - 1 && setStep(s => s + 1)}>
            {step === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </div>

      {/* Right: Live Preview */}
      <div className="w-full md:w-2/3 bg-gray-100 p-6 overflow-auto">
        {TemplateComponent && <TemplateComponent data={formData} />}
      </div>
    </div>
  );
}
