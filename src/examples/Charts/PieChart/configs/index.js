/**
=========================================================
* Argon Dashboard 2 PRO MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/* eslint-disable no-dupe-keys */
// Argon Dashboard 2 PRO MUI base styles
import colors from "assets/theme/base/colors";
import "chartjs-plugin-datalabels";//for datalabels on slice of pie chart

const { gradients, dark } = colors;

function configs(labels, datasets) {
  const backgroundColors = [];

  if (datasets?.[0]?.backgroundColor) {
    datasets?.[0]?.backgroundColor.forEach((color) => backgroundColors.push(color));
  } else {
    if (datasets.backgroundColors) {
      datasets.backgroundColors.forEach((color) =>
        gradients[color]
          ? backgroundColors.push(gradients[color].state)
          : backgroundColors.push(dark.main)
      );
    } else {
      backgroundColors.push(dark.main);
    }
  }

  return {
    data: {
      labels,
      datasets: [
        {
          label: datasets?.[0]?.label,
          weight: 9,
          cutout: 0,
          tension: 0.9,
          pointRadius: 2,
          borderWidth: 0,
          backgroundColor: backgroundColors,
          fill: false,
          data: datasets?.[0]?.data,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: true,
        mode: "index",
      },
      scales: {
        y: {
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: false,
            drawTicks: false,
          },
          ticks: {
            display: false,
          },
        },
        x: {
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: false,
            drawTicks: false,
          },
          ticks: {
            display: false,
          },
        },
      },
      // Add the legend configuration
      plugins: {
        legend: {
          position: "right",
          labels: {
            boxWidth: 12,
          },
        },
        datalabels: {
          display: true,
          color: "#fff",
          font: {
            weight: "bold",
          },
          formatter: (value, context) => {
            return "$" + value;
          },
        }
      },
    },
  };
}

export default configs;
