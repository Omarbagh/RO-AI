"use client";

import { useState } from "react";
import { templates } from "@/app/(dashboard)/editor/utils/templateMap";
import { Button } from "@/components/ui/button";
import { Eye, Download, Star, CheckCircle, ArrowRight } from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";

export default function TemplatePreview() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const popularTemplates = templates.slice(0, 4);

  return (
    <>
      <section id="templates" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
              Professional Templates
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from expertly designed templates that pass ATS systems and impress hiring managers
            </p>
          </div>

          {/* Template Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {popularTemplates.map((template, index) => (
              <div
                key={template.id}
                className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-[#4F46E5]/30"
                data-animate="fade-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Template Preview */}
                <div 
                  className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 relative cursor-pointer"
                  onClick={() => {
                    setSelectedTemplate(template);
                    setIsModalOpen(true);
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-20`}></div>
                  <div className="absolute inset-4 bg-white rounded-lg shadow-inner border">
                    {/* Mock resume content */}
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-100 rounded"></div>
                        <div className="h-2 bg-gray-100 rounded w-5/6"></div>
                        <div className="h-2 bg-gray-100 rounded w-4/6"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg">{template.name}</h3>
                    <span className="flex items-center text-sm text-yellow-600">
                      <Star className="w-4 h-4 fill-current mr-1" />
                      {template.popularity}%
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                  
                  <div className="space-y-2">
                    {template.features.slice(0, 2).map((feature, i) => (
                      <div key={i} className="flex items-center text-xs text-gray-500">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() => {
                      setSelectedTemplate(template);
                      setIsModalOpen(true);
                    }}
                    className="w-full mt-4 bg-gradient-to-r from-[#4F46E5] to-[#7E22CE] hover:from-[#5B51E8] hover:to-[#8B5CF6] text-white"
                  >
                    Preview Template
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <SignUpButton>
              <Button className="bg-gradient-to-r from-[#4F46E5] to-[#7E22CE] hover:from-[#5B51E8] hover:to-[#8B5CF6] text-white px-8 py-6 rounded-2xl text-lg font-semibold">
                Explore All {templates.length}+ Templates
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </SignUpButton>
            <p className="text-gray-500 text-sm mt-4">Free to try • No credit card required</p>
          </div>
        </div>
      </section>

      {/* Template Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">{selectedTemplate.name}</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="p-8 overflow-auto max-h-[70vh]">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-600">{selectedTemplate.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Features</h4>
                    <div className="space-y-2">
                      {selectedTemplate.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#4F46E5]/5 to-[#7E22CE]/5 rounded-xl">
                    <div>
                      <div className="font-semibold text-gray-900">Popularity Score</div>
                      <div className="text-sm text-gray-600">Based on user ratings</div>
                    </div>
                    <div className="text-2xl font-bold text-[#4F46E5]">{selectedTemplate.popularity}%</div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-center">
                  <div className="w-64 h-80 bg-white shadow-lg border rounded-lg transform rotate-3">
                    {/* Mock template preview */}
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="space-y-2 mt-4">
                        <div className="h-2 bg-gray-100 rounded"></div>
                        <div className="h-2 bg-gray-100 rounded w-5/6"></div>
                        <div className="h-2 bg-gray-100 rounded w-4/6"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-between items-center">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Close Preview
              </Button>
              <SignUpButton>
                <Button className="bg-gradient-to-r from-[#4F46E5] to-[#7E22CE] hover:from-[#5B51E8] hover:to-[#8B5CF6] text-white">
                  Use This Template
                  <Download className="w-4 h-4 ml-2" />
                </Button>
              </SignUpButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}