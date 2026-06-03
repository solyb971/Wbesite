"use client"

import { useState } from "react"
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import Column from "./Column"
import LeadCard from "./LeadCard"
import { Lead, LeadStatus } from "@/hooks/useLeads"

interface KanbanBoardProps {
  leads: Lead[]
  onLeadMove: (leadId: string, newStatus: LeadStatus) => Promise<void>
  onLeadClick: (lead: Lead) => void
}

const columns: { id: LeadStatus; title: string; color: string }[] = [
  { id: "nouveau", title: "Nouveau", color: "bg-blue-500" },
  { id: "contact", title: "Contact établi", color: "bg-yellow-500" },
  { id: "devis", title: "Devis envoyé", color: "bg-purple-500" },
  { id: "gagne", title: "Gagné", color: "bg-green-500" },
  { id: "perdu", title: "Perdu", color: "bg-gray-500" },
]

export default function KanbanBoard({ leads, onLeadMove, onLeadClick }: KanbanBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) {
      setActiveId(null)
      return
    }

    const leadId = active.id as string
    const newStatus = over.id as LeadStatus

    // Only update if status changed
    const lead = leads.find((l) => l.id === leadId)
    if (lead && lead.status !== newStatus) {
      await onLeadMove(leadId, newStatus)
    }

    setActiveId(null)
  }

  const getLeadsByStatus = (status: LeadStatus) => {
    return leads.filter((lead) => lead.status === status)
  }

  const activeLead = activeId ? leads.find((l) => l.id === activeId) : null

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <Column
            key={column.id}
            id={column.id}
            title={column.title}
            color={column.color}
            leads={getLeadsByStatus(column.id)}
            onLeadClick={onLeadClick}
          />
        ))}
      </div>

      <DragOverlay>
        {activeLead ? (
          <div className="rotate-3 opacity-80">
            <LeadCard lead={activeLead} onClick={() => {}} isDragging />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
