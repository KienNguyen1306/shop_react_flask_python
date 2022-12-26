import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

function Chart({ listCaterogy }) {
    const data = {
        labels: listCaterogy.map((caterogy) => caterogy.name),
        datasets: [
            {
                label: 'Số lượng',
                data: listCaterogy.map((caterogy) => caterogy.count_products),

                backgroundColor: listCaterogy.map((caterogy) => {
                    let r = Math.floor(Math.random() * 255) + 1;
                    let g = Math.floor(Math.random() * 255) + 1;
                    let a = Math.floor(Math.random() * 255) + 1;
                    return `RGBA( ${r}, ${g}, ${a}, 1 )`;
                }),
                borderColor: listCaterogy.map((caterogy) => {
                    let r = Math.floor(Math.random() * 255) + 1;
                    let g = Math.floor(Math.random() * 255) + 1;
                    let a = Math.floor(Math.random() * 255) + 1;
                    return `RGBA( ${r}, ${g}, ${a}, 1 )`;
                }),
                borderWidth: 1,
            },
        ],
    };

    return <Pie data={data} />;
}

export default Chart;
