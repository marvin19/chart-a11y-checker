export const twoLineSeries = {
    css: `
      .highcharts-figure,
      .highcharts-data-table table {
        min-width: 360px;
        max-width: 800px;
        margin: 1em auto;
      }
      .highcharts-data-table table {
        font-family: Verdana, sans-serif;
        border-collapse: collapse;
        border: 1px solid #ebebeb;
        margin: 10px auto;
        text-align: center;
        width: 100%;
        max-width: 500px;
      }
      .highcharts-data-table caption {
        padding: 1em 0;
        font-size: 1.2em;
        color: #555;
      }
      .highcharts-data-table th {
        font-weight: 600;
        padding: 0.5em;
      }
      .highcharts-data-table td,
      .highcharts-data-table th,
      .highcharts-data-table caption {
        padding: 0.5em;
      }
      .highcharts-data-table thead tr,
      .highcharts-data-table tr:nth-child(even) {
        background: #f8f8f8;
      }
      .highcharts-data-table tr:hover {
        background: #f1f7ff;
      }
      .highcharts-description {
        margin: 0.3rem 10px;
      }
    `.trim(),

    html: `
      <script src="https://code.highcharts.com/highcharts.js"></script>
      <script src="https://code.highcharts.com/modules/series-label.js"></script>
      <script src="https://code.highcharts.com/modules/exporting.js"></script>
      <script src="https://code.highcharts.com/modules/export-data.js"></script>
      <script src="https://code.highcharts.com/modules/accessibility.js"></script>
      
      <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
          Column chart showing employment data in the U.S. solar industry. Each year has grouped bars for easier comparison between categories.
        </p>
      </figure>
    `.trim(),

    config: `{
      chart: {
        type: 'column',
        backgroundColor: '#ff69b4'
      },
      title: {
        text: 'U.S Solar Employment Growth',
        align: 'left'
      },
      subtitle: {
        text: 'By Job Category. Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>.',
        align: 'left'
      },
      xAxis: {
        accessibility: {
          rangeDescription: 'Range: 2010 to 2022'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Number of Employees'
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },
      tooltip: {
        shared: true
      },
      plotOptions: {
        column: {
          grouping: true,
          pointPadding: 0.1,
          borderWidth: 0
        },
        series: {
          pointStart: 2010
        }
      },
      series: [
        {
          name: 'Installation & Developers',
          data: [43934, 48656, 65165, 81827, 112143, 142383, 171533, 165174, 155157, 161454, 154610, 168960, 171558]
        },
        {
          name: 'Manufacturing',
          data: [22000, 25000, 30000, 34000, 41000, 46000, 52000, 50000, 47000, 48000, 46000, 49000, 51000]
        }
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
              }
            }
          }
        ]
      }
    }`.trim(),
};
