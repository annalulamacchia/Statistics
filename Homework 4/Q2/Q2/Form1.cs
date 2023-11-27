using System;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Windows.Forms;
using System.Windows.Forms.DataVisualization.Charting;

namespace Q2
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            InitializeChart();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            int M = new Random().Next(0, 10);
            int N = new Random().Next(0, 100);
            double p = new Random().NextDouble();

            int[][] scoreTrajectories = new int[M][];
            double[] sampleMeans = new double[M];
            double[][] zScores = new double[M][];

            Random random = new Random();
            for (int i = 0; i < M; i++)
            {
                scoreTrajectories[i] = new int[N];
                for (int j = 0; j < N; j++)
                {
                    if (random.NextDouble() < p)
                    {
                        scoreTrajectories[i][j] = -1;
                    }
                    else
                    {
                        scoreTrajectories[i][j] = 1;
                    }
                }
            }

            for (int i = 0; i < M; i++)
            {
                sampleMeans[i] = scoreTrajectories[i].Average();
                zScores[i] = new double[N];
                for (int j = 0; j < N; j++)
                {
                    zScores[i][j] = (scoreTrajectories[i][j] - sampleMeans[i]) / (Math.Sqrt(N * (1 - p) * p)); 
                }
            }

            CreateLineChart(M, N, zScores, chart1);
            CreateBarChart(M, N, zScores, chart2);

            Bitmap chartImage1 = new Bitmap(chart1.Width, chart1.Height);
            chart1.DrawToBitmap(chartImage1, new Rectangle(0, 0, chart1.Width, chart1.Height));

            // Salvataggio dell'immagine in un file o altro utilizzo
            chartImage1.Save("chart1.png", System.Drawing.Imaging.ImageFormat.Png);

            // Create panels for each chart
            Panel panel1 = new Panel();
            panel1.Dock = DockStyle.Fill;
            panel1.Controls.Add(chart1);

            // Create panels for each chart
            Panel panel2 = new Panel();
            panel2.Dock = DockStyle.Fill;
            panel2.Controls.Add(chart2);

            // Create a SplitContainer to arrange the charts side by side
            SplitContainer splitContainer = new SplitContainer();
            splitContainer.Dock = DockStyle.Fill;
            splitContainer.Orientation = Orientation.Vertical;
            splitContainer.SplitterDistance = splitContainer.Height / 2;


            splitContainer.Panel1.Controls.Add(panel1);
            splitContainer.Panel2.Controls.Add(panel2);
           
            // Add the SplitContainer to the form
            this.Controls.Add(splitContainer);
        }

        private void CreateLineChart(int M, int N, double[][] scoreTrajectories, Chart chart)
        {
            for (int i = 0; i < M; i++)
            {
                Series series = new Series($"System {i + 1}");
                series.ChartType = SeriesChartType.Line;

                for (int j = 0; j < N; j++)
                {
                    series.Points.AddXY(j, scoreTrajectories[i][j]);
                }

                chart.Series.Add(series);
            }

            chart.ChartAreas[0].AxisX.Title = "Attacks";
            chart.ChartAreas[0].AxisY.Title = "Normalized Frequency";
            chart.ChartAreas[0].RecalculateAxesScale();
        }

        public void CreateBarChart(int M, int N, double[][] frequency, Chart chart)
        {
            Series barSeries = new Series($"{N} Attacks");
            barSeries.ChartType = SeriesChartType.Bar;

            for (int i = 0; i < M; i++)
            {
                for (int j = 0; j < N; j++)
                {
                    barSeries.Points.AddXY($"Attack {j + 1}", frequency[i][j]);
                } 
            }

            chart.Series.Add(barSeries);

            chart.ChartAreas[0].AxisX.Title = "Attacks";
            chart.ChartAreas[0].AxisY.Title = "Normalized Frequency";
        }
    }
}
