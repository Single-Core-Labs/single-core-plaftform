"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "Mon", requests: 400, tokens: 2400, cost: 2.4 },
  { name: "Tue", requests: 300, tokens: 1398, cost: 1.4 },
  { name: "Wed", requests: 550, tokens: 9800, cost: 9.8 },
  { name: "Thu", requests: 278, tokens: 3908, cost: 3.9 },
  { name: "Fri", requests: 620, tokens: 4800, cost: 4.8 },
  { name: "Sat", requests: 239, tokens: 3800, cost: 3.8 },
  { name: "Sun", requests: 349, tokens: 4300, cost: 4.3 },
];

export function UsageChart() {
  return (
    <div className="h-[350px] w-full pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#555" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            dy={10}
          />
          <YAxis 
            yAxisId="left"
            stroke="#555" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(value) => `$${value}`} 
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            stroke="#555" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(value) => `${value}`} 
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#0a0a0a", border: "1px solid #222", borderRadius: "8px", fontSize: "12px" }}
            itemStyle={{ padding: "2px 0" }}
            cursor={{ stroke: '#333', strokeWidth: 1 }}
          />
          <Legend verticalAlign="top" height={36} iconType="circle" />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="cost" 
            name="Cost ($)"
            stroke="hsl(var(--primary))" 
            strokeWidth={2} 
            dot={{ r: 4, fill: "hsl(var(--primary))", strokeWidth: 0 }} 
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="requests" 
            name="Requests"
            stroke="#8884d8" 
            strokeWidth={2} 
            dot={{ r: 4, fill: "#8884d8", strokeWidth: 0 }} 
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
