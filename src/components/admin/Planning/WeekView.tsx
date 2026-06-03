"use client"

import { format, isToday, isWeekend, parseISO, isSameDay } from "date-fns"
import { fr } from "date-fns/locale"
import { Loader2 } from "lucide-react"
import type { PlanningEvent, EventType } from "@/types/database.types"

interface WeekViewProps {
  weekDays: Date[]
  events: PlanningEvent[]
  loading?: boolean
}

const EVENT_COLORS: Record<EventType, string> = {
  projet:       "bg-blue-500/15 text-blue-300 border-blue-500/30",
  appel:        "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  animation:    "bg-purple-500/15 text-purple-300 border-purple-500/30",
  distribution: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  cdd:          "bg-white/[0.05] text-[#6B7A99] border-white/[0.08]",
  blocked:      "bg-red-500/15 text-red-300 border-red-500/30",
}

const PERIODS = [
  { label: "Matin",      sub: "6h–12h",  start: 6,  end: 12 },
  { label: "Après-midi", sub: "12h–18h", start: 12, end: 18 },
  { label: "Soirée",     sub: "18h–21h", start: 18, end: 21 },
]

function getHour(isoString: string): number {
  return parseISO(isoString).getHours()
}

export default function WeekView({ weekDays, events, loading = false }: WeekViewProps) {
  const getEventsForDayPeriod = (day: Date, periodStart: number, periodEnd: number) =>
    events.filter(e => {
      const hour = getHour(e.start_time)
      return isSameDay(parseISO(e.start_time), day) && hour >= periodStart && hour < periodEnd
    })

  return (
    <div className="bg-[#0F1628] border border-white/[0.06] rounded-2xl overflow-hidden">
      {loading && (
        <div className="flex items-center justify-center p-3 gap-2 text-[#4B5870] text-sm border-b border-white/[0.05]">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          Chargement des événements...
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/[0.05] bg-[#0A0F1E]">
              <th className="p-4 text-left w-28">
                <span className="text-[10px] font-semibold text-[#3A4560] uppercase tracking-widest">Période</span>
              </th>
              {weekDays.map((day) => (
                <th
                  key={day.toISOString()}
                  className={`p-3 text-center ${isWeekend(day) ? "opacity-50" : ""}`}
                >
                  <div className="text-[10px] font-semibold text-[#3A4560] uppercase tracking-widest">
                    {format(day, "EEE", { locale: fr })}
                  </div>
                  <div className={`text-lg font-bold mt-0.5 ${isToday(day) ? "text-coral" : "text-[#E2E8F8]"}`}>
                    {format(day, "d")}
                  </div>
                  {isToday(day) && <div className="w-1 h-1 bg-coral rounded-full mx-auto mt-0.5" />}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PERIODS.map((period) => (
              <tr key={period.label} className="border-b border-white/[0.04] last:border-0">
                <td className="p-4 border-r border-white/[0.04]">
                  <div className="font-semibold text-[#C8D4E8] text-sm">{period.label}</div>
                  <div className="text-xs text-[#3A4560] mt-0.5">{period.sub}</div>
                </td>
                {weekDays.map((day) => {
                  const dayEvents = getEventsForDayPeriod(day, period.start, period.end)
                  return (
                    <td
                      key={`${day.toISOString()}-${period.label}`}
                      className={`p-2 align-top ${isWeekend(day) ? "opacity-60" : ""} ${isToday(day) ? "bg-coral/[0.03]" : ""}`}
                    >
                      {dayEvents.length > 0 ? (
                        <div className="space-y-1">
                          {dayEvents.map(event => (
                            <div
                              key={event.id}
                              className={`p-2 rounded-lg border text-xs cursor-pointer hover:opacity-80 transition-opacity ${EVENT_COLORS[event.event_type] ?? EVENT_COLORS.projet}`}
                              title={event.description || event.title}
                            >
                              <div className="font-semibold truncate">{event.title}</div>
                              <div className="opacity-70 mt-0.5">
                                {format(parseISO(event.start_time), "HH:mm")} – {format(parseISO(event.end_time), "HH:mm")}
                              </div>
                              {event.estimated_hours && (
                                <div className="opacity-50">{event.estimated_hours}h</div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-3 text-center text-[#2E3A55] text-xs hover:text-[#4B5870] hover:bg-white/[0.03] rounded-lg cursor-pointer transition-all">
                          Libre
                        </div>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
