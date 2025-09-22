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
import { Eye } from "lucide-react";

export function TemplateCard({
  template,
  isSelected,
  onSelect,
}: {
  template: any;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <Card
      className={`group overflow-hidden border-slate-200/70 transition-all hover:shadow-xl ${
        isSelected ? "ring-2 ring-brand" : ""
      }`}
    >
      <CardContent className="p-0">
        <div className="relative">
          <AspectRatio ratio={4 / 3}>
            <div
              className={`h-full w-full bg-gradient-to-br ${template.accent ?? "from-indigo-500 to-indigo-700"} p-4`}
            >
              <div className="h-full w-full rounded-xl bg-white/70 p-4 shadow-sm backdrop-blur">
                <div className="grid h-full grid-rows-6 gap-2">
                  <div className="row-span-1 flex items-center gap-3">
                    <div className="h-7 w-7 rounded-full bg-gradient-to-br from-slate-200 to-slate-300" />
                    <div className="h-2 w-24 rounded bg-slate-300" />
                    <div className="h-2 w-14 rounded bg-slate-200" />
                  </div>
                  <div className="row-span-2 rounded-lg bg-slate-100" />
                  <div className="row-span-1 grid grid-cols-3 gap-2">
                    <div className="rounded bg-slate-100" />
                    <div className="rounded bg-slate-100" />
                    <div className="rounded bg-slate-100" />
                  </div>
                  <div className="row-span-2 grid grid-cols-2 gap-2">
                    <div className="rounded bg-slate-100" />
                    <div className="rounded bg-slate-100" />
                  </div>
                </div>
              </div>
            </div>
          </AspectRatio>
          <div className="absolute right-3 top-3">
            <Badge
              variant="secondary"
              className="backdrop-blur bg-white/80 border-slate-200/80"
            >
              {template.category}
            </Badge>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-4">
          <div>
            <p className="font-semibold leading-tight">{template.name}</p>
            <p className="text-xs text-slate-500">{template.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Eye className="mr-1 h-4 w-4" />
                  Preview
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>{template.name}</DialogTitle>
                </DialogHeader>
                <AspectRatio ratio={16 / 10}>
                  <div
                    className={`h-full w-full rounded-xl bg-gradient-to-br ${template.accent || "from-indigo-500 to-indigo-700"} p-6`}
                  >
                    <div className="h-full w-full rounded-xl bg-white/70 shadow-inner" />
                  </div>
                </AspectRatio>
                <div className="flex justify-end">
                  <Button
                    onClick={onSelect}
                    className="bg-gradient-to-r from-brand to-indigo-600 text-white"
                  >
                    Select this template
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              onClick={onSelect}
              size="sm"
              className="bg-gradient-to-r from-brand to-indigo-600 text-white"
            >
              Choose
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
