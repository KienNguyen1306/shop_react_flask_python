import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
function ChartProduct({ listProductPrice }) {
    const data = listProductPrice.map((ce) => {
        return {
            name: ce.name,
            money: ce.price,
        };
    });

    return (
        <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="money" stackId="a" fill="#82ca9d" />
        </BarChart>
    );
}

export default ChartProduct;
