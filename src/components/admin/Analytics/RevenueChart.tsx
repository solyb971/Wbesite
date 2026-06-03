"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function RevenueChart() {
  const data = [
    { month: "Sep", realized: 1200, projected: 1300 },
    { month: "Oct", realized: 1800, projected: 2000 },
    { month: "Nov", realized: 2400, projected: 2500 },
    { month: "Déc", realized: 3594, projected: 4000 },
    { month: "Jan", realized: null, projected: 4500 },
    { month: "Fév", realized: null, projected: 5200 },
  ]

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip
            formatter={(value: number) => [`${value.toLocaleString()}€`, ""]}
            contentStyle={{ backgroundColor: "white", border: "1px solid #ccc", borderRadius: "8px" }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="realized"
            stroke="#2563eb"
            strokeWidth={2}
            name="CA Réalisé"
            dot={{ fill: "#2563eb", r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="projected"
            stroke="#10b981"
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Projection"
            dot={{ fill: "#10b981", r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
