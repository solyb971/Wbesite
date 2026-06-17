"use client"

import { useState } from "react"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, AlertTriangle, Loader2 } from "lucide-react"
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks, eachDayOfInterval } from "date-fns"
import { fr } from "date-fns/locale"
import { usePlanningEvents } from "@/hooks/usePlanningEvents"
import WeekView from "@/components/admin/Planning/WeekView"
import CapacityIndicator from "@/components/admin/Planning/CapacityIndicator"
import NewEventDialog from "@/components/admin/Planning/NewEventDialog"
import type { PlanningEventInsert } from "@/types/database.types"

const WEEKLY_HOURS_TARGET = 20

export default function PlanningPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [showNewEventDialog, setShowNewEventDialog] = useState(false)

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 })
  const weekEnd   = endOfWeek(currentDate,   { weekStartsOn: 1 })
  const weekDays  = eachDayOfInterval({ start: weekStart, end: weekEnd })

  const { events, loading, error, createEvent, weeklyStats } = usePlanningEvents(weekStart, weekEnd)

  const usedHours    = Math.min(weeklyStats.used, WEEKLY_HOURS_TARGET)
  const percentage   = Math.round((usedHours / WEEKLY_HOURS_TARGET) * 100)
  const remaining    = Math.max(0, WEEKLY_HOURS_TARGET - weeklyStats.used)
  const isOverloaded = percentage >= 90

  const handleCreateEvent = async (data: PlanningEventInsert) => {
    try {
      await createEvent(data)
      setShowNewEventDialog(false)
    } catch (err) {
      console.error("Erreur création événement:", err)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-[#F5EDD8]">Planning</h1>
          <p className="text-[#7E715E] text-sm mt-0.5">Gérez votre emploi du temps et votre charge de travail</p>
        </div>
        <button
          onClick={() => setShowNewEventDialog(true)}
          className="flex items-center gap-2 bg-coral hover:bg-coral/90 text-white px-3 py-2.5 sm:px-4 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] shadow-lg shadow-coral/20 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Nouvel événement</span>
          <span className="sm:hidden">Nouveau</span>
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
          Erreur de chargement : {error}
        </div>
      )}

      {/* Capacité semaine */}
      <div className={`bg-[#1F1813] border rounded-2xl p-5 ${isOverloaded ? "border-orange-500/30" : "border-white/[0.06]"}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-[#F5EDD8] font-semibold text-base">Charge de travail</h2>
            <p className="text-[#7E715E] text-sm mt-0.5 flex items-center gap-1.5">
              Semaine du {format(weekStart, "d MMM", { locale: fr })} au {format(weekEnd, "d MMM yyyy", { locale: fr })}
              {loading && <Loader2 className="w-3 h-3 animate-spin" />}
            </p>
          </div>
          {isOverloaded && (
            <div className="flex items-center gap-2 text-orange-400">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-semibold text-sm">Surcharge</span>
            </div>
          )}
        </div>

        <CapacityIndicator
          total={WEEKLY_HOURS_TARGET}
          used={usedHours}
          remaining={remaining}
          percentage={percentage}
        />

        {isOverloaded && (
          <div className="mt-4 p-4 bg-orange-500/10 rounded-xl border border-orange-500/20">
            <h4 className="font-semibold text-orange-400 mb-2 text-sm">⚠️ Suggestions</h4>
            <ul className="text-sm text-orange-300/80 space-y-1">
              <li>• Reporter certaines tâches à la semaine prochaine</li>
              <li>• Limiter la prospection à 30 minutes</li>
              <li>• Déléguer si possible</li>
            </ul>
          </div>
        )}
      </div>

      {/* Navigation semaine */}
      <div className="flex items-center justify-between bg-[#1F1813] border border-white/[0.06] p-3 rounded-2xl gap-2">
        <button
          onClick={() => setCurrentDate(subWeeks(currentDate, 1))}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/[0.07] text-[#A89880] hover:text-[#F5EDD8] hover:bg-white/[0.05] transition-all text-sm font-medium shrink-0"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Préc.</span>
        </button>

        <div className="flex items-center gap-2 min-w-0">
          <CalendarIcon className="w-4 h-4 text-[#7E715E] shrink-0" />
          <span className="font-semibold text-[#F5EDD8] text-xs sm:text-sm text-center">
            {format(weekStart, "d MMM", { locale: fr })} — {format(weekEnd, "d MMM yyyy", { locale: fr })}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-2 rounded-xl border border-white/[0.07] text-[#A89880] hover:text-[#F5EDD8] hover:bg-white/[0.05] transition-all text-xs sm:text-sm font-medium"
          >
            Auj.
          </button>
          <button
            onClick={() => setCurrentDate(addWeeks(currentDate, 1))}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/[0.07] text-[#A89880] hover:text-[#F5EDD8] hover:bg-white/[0.05] transition-all text-sm font-medium"
          >
            <span className="hidden sm:inline">Suiv.</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Vue semaine */}
      <WeekView weekDays={weekDays} events={events} loading={loading} />

      <NewEventDialog
        isOpen={showNewEventDialog}
        onClose={() => setShowNewEventDialog(false)}
        onSubmit={handleCreateEvent}
        weekStart={weekStart}
      />
    </div>
  )
}
