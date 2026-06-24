"use client";

import { TextField } from "@/components/editor/fields";
import type { Personal } from "@/lib/resume/schema";

export function PersonalEditor({
  value,
  onChange,
}: {
  value: Personal;
  onChange: (v: Personal) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <TextField
          label="Volledige naam"
          value={value.fullName}
          onChange={(fullName) => onChange({ ...value, fullName })}
          placeholder="Jan Jansen"
        />
        <TextField
          label="Functietitel"
          value={value.headline}
          onChange={(headline) => onChange({ ...value, headline })}
          placeholder="Senior Frontend Engineer"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <TextField
          label="E-mail"
          type="email"
          value={value.email}
          onChange={(email) => onChange({ ...value, email })}
          placeholder="jan@voorbeeld.nl"
        />
        <TextField
          label="Telefoon"
          value={value.phone}
          onChange={(phone) => onChange({ ...value, phone })}
          placeholder="+31 6 12345678"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <TextField
          label="Locatie"
          value={value.location}
          onChange={(location) => onChange({ ...value, location })}
          placeholder="Amsterdam, Nederland"
        />
        <TextField
          label="Website"
          value={value.website}
          onChange={(website) => onChange({ ...value, website })}
          placeholder="https://janjansen.nl"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <TextField
          label="LinkedIn"
          value={value.linkedin}
          onChange={(linkedin) => onChange({ ...value, linkedin })}
          placeholder="linkedin.com/in/janjansen"
        />
        <TextField
          label="GitHub"
          value={value.github}
          onChange={(github) => onChange({ ...value, github })}
          placeholder="github.com/janjansen"
        />
      </div>

      <TextField
        label="Foto-URL (optioneel)"
        value={value.photoUrl}
        onChange={(photoUrl) => onChange({ ...value, photoUrl })}
        placeholder="https://…"
      />
    </div>
  );
}
