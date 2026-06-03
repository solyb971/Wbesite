"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

interface TemplateEditorProps {
  isOpen: boolean
  onClose: () => void
  template: any
  onSave?: (template: any) => void
}

export default function TemplateEditor({ isOpen, onClose, template, onSave }: TemplateEditorProps) {
  const [formData, setFormData] = useState({
    name: template?.name || "",
    category: template?.category || "quick-reply",
    subject: template?.subject || "",
    body: template?.body || "",
    trackOpens: true,
    trackClicks: true,
  })

  const variables = [
    "{{prenom}}",
    "{{nom}}",
    "{{email}}",
    "{{company}}",
    "{{type_projet}}",
    "{{budget}}",
    "{{delai}}",
  ]

  const insertVariable = (variable: string) => {
    setFormData({ ...formData, body: formData.body + " " + variable })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{template ? "Éditer template" : "Nouveau template"}</DialogTitle>
          <DialogDescription>Créez ou modifiez un template d&apos;email personnalisé</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <Label htmlFor="name">Nom du template *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Devis site vitrine 599€"
            />
          </div>

          <div>
            <Label htmlFor="category">Catégorie *</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quick-reply">Réponse rapide</SelectItem>
                <SelectItem value="sequence">Séquence auto</SelectItem>
                <SelectItem value="custom">Personnalisé</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="subject">Objet de l&apos;email *</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Ex: Votre devis site vitrine - {{company}}"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="body">Corps du message *</Label>
              <div className="text-sm text-gray-600">Variables disponibles:</div>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {variables.map((variable) => (
                <button
                  key={variable}
                  type="button"
                  onClick={() => insertVariable(variable)}
                  className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 transition-colors"
                >
                  {variable}
                </button>
              ))}
            </div>
            <Textarea
              id="body"
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
              rows={12}
              placeholder="Bonjour {{prenom}},&#10;&#10;Merci pour votre demande de {{type_projet}}..."
            />
          </div>

          <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-900 mb-2">Options de tracking</div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="trackOpens"
                checked={formData.trackOpens}
                onCheckedChange={(checked) => setFormData({ ...formData, trackOpens: !!checked })}
              />
              <Label htmlFor="trackOpens" className="cursor-pointer">
                Activer le tracking des ouvertures
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="trackClicks"
                checked={formData.trackClicks}
                onCheckedChange={(checked) => setFormData({ ...formData, trackClicks: !!checked })}
              />
              <Label htmlFor="trackClicks" className="cursor-pointer">
                Activer le tracking des clics
              </Label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button
              onClick={() => {
                if (onSave && template) {
                  onSave({
                    ...template,
                    name: formData.name,
                    category: formData.category,
                    subject: formData.subject,
                    body: formData.body,
                  })
                }
                onClose()
              }}
            >
              Sauvegarder
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
