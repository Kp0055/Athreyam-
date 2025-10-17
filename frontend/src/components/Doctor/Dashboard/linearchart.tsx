import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  ChartOptions,
} from "chart.js";

// Register necessary components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title);

// Generate random numbers for dataset
const generateNumbers = (count: number, min: number, max: number) => {
  return Array.from({ length: count }, () =>
    Math.floor(Math.random() * (max - min + 1) + min)
  );
};

const DATA_COUNT = 7;
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Dataset 1",
      data: generateNumbers(NUMBER_CFG.count, NUMBER_CFG.min, NUMBER_CFG.max),
      borderColor: "red",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      fill: false,
    },
    {
      label: "Dataset 2",
      data: generateNumbers(NUMBER_CFG.count, NUMBER_CFG.min, NUMBER_CFG.max),
      borderColor: "blue",
      backgroundColor: "rgba(54, 162, 235, 0.5)",
      fill: false,
    },
  ],
};

// ✅ Explicitly define the type for Chart.js options
const options: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Monthly Data Chart",
    },
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: "Month",
        color: "#911",
        font: {
          family: "Comic Sans MS",
          size: 20,
          weight: "bold",
        },
        padding: { top: 20 },
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        // text: "Value",
        color: "#191",
        font: {
          family: "Times",
          size: 20,
        },
        padding: { top: 30 },
      },
    },
  },
};

const LineChart: React.FC = () => {
  return (
    <div className="border rounded-3xl bg-white" style={{ width: "45%", height: "50%",padding:"30px", marginLeft:"40px"  }}>
      <Line data={data} options={options} />
    </div>
  );
};


export default LineChart;
