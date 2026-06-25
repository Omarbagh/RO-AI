"use client";

import {
  AddItemButton,
  ItemCard,
  TextField,
} from "@/components/editor/fields";
import { emptyCertification } from "@/lib/resume/factory";
import type { CertificationItem } from "@/lib/resume/schema";

export function CertificationsEditor({
  value,
  onChange,
}: {
  value: CertificationItem[];
  onChange: (v: CertificationItem[]) => void;
}) {
  const update = (id: string, patch: Partial<CertificationItem>) =>
    onChange(value.map((item) => (item.id === id ? { ...item, ...patch } : item)));

  const remove = (id: string) =>
    onChange(value.filter((item) => item.id !== id));

  const add = () => onChange([...value, emptyCertification()]);

  return (
    <div className="flex flex-col gap-3">
      {value.map((item) => (
        <ItemCard
          key={item.id}
          title={item.name}
          subtitle={item.issuer}
          onRemove={() => remove(item.id)}
        >
          <div className="grid grid-cols-2 gap-3">
            <TextField
              label="Certificaat"
              value={item.name}
              onChange={(v) => update(item.id, { name: v })}
              placeholder="AWS Certified Solutions Architect"
            />
            <TextField
              label="Uitgever"
              value={item.issuer}
              onChange={(v) => update(item.id, { issuer: v })}
              placeholder="Amazon Web Services"
            />
          </div>
          <TextField
            label="Datum"
            value={item.date}
            onChange={(v) => update(item.id, { date: v })}
            placeholder="Mrt 2024"
          />
          <TextField
            label="Link"
            value={item.url}
            onChange={(v) => update(item.id, { url: v })}
            placeholder="https://…"
          />
          <TextField
            label="Credential-ID"
            value={item.credentialId}
            onChange={(v) => update(item.id, { credentialId: v })}
            placeholder="ABC-123456"
          />
        </ItemCard>
      ))}
      <AddItemButton label="Certificaat toevoegen" onClick={add} />
    </div>
  );
}
