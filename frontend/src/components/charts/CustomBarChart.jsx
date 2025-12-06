import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import CustomTooltip from "./CustomTooltip"; // You can reuse your tooltip

const CustomBarChart = ({ data }) => {
  
    const getBarColor = (entry) => {
        switch (entry?.priority) {
            case 'low':
                return '#00BC7D'
            
            case 'medium':
                return '#FE9900'
            
            case 'high':
                return '#FF1F57'

            default:
                return '#00BC7D'
        }
    }

    return (
        <div>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid stroke="none" />
                    <XAxis dataKey="priority" tick={{fontSize:12, fill: "#555"}} stroke="none" />

                    <YAxis tick={{fontSize:12, fill: "#555"}} stroke="none" />

                    <Tooltip content={<CustomTooltip />} />
    

                    <Bar
                      dataKey="count"
                      nameKey="priority"
                      radius={[10,10,0,0]}
                      activeDot={{r:8, fill:"yellow"}} 
                      activeStyle={{fill: "green"}}
                    >
                        {data.map((entry, index) => (
                            <Cell key={index} fill={getBarColor(entry)} />
                        ))}
                    </Bar>

                    <Legend />

                </BarChart>
            </ResponsiveContainer>
        </div>
    )


};

export default CustomBarChart;
