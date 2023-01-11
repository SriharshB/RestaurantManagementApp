import React from "react";
import "./Chart.css";


import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    orders: 1,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    orders: 0,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    orders: 2,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    orders: 1,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    orders: 2,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    orders: 0,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    orders: 1,
    pv: 4300,
    amt: 2100,
  },
];

export default function WeeklyOrder() {
  return (
    <div className="chart">
      {" "}
      <h3 className="chartTitle">Weekly Orders</h3>
      <ResponsiveContainer width="100%" height="100%" aspect={4 / 2}>
        <BarChart width={150} height={100} data={data}>
          <Bar dataKey="orders" fill="#8884d8" />
          <Legend />
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
