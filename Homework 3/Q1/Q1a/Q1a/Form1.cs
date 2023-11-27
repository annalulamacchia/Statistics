using System;
using System.Drawing;
using System.Windows.Forms;
using System.Windows.Forms.DataVisualization.Charting;

namespace Q1a
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

            CreateLineChart(M, N, scoreTrajectories, chart1);

            CreateBarChart(M, N, scoreTrajectories, chart2);

            Bitmap chartImage1 = new Bitmap(chart1.Width, chart1.Height);
            chart1.DrawToBitmap(chartImage1, new Rectangle(0, 0, chart1.Width, chart1.Height));

            // Salvataggio dell'immagine in un file o altro utilizzo
            chartImage1.Save("chart1.png", System.Drawing.Imaging.ImageFormat.Png);

            Bitmap chartImage2 = new Bitmap(chart2.Width, chart2.Height);
            chart2.DrawToBitmap(chartImage2, new Rectangle(0, 0, chart2.Width, chart2.Height));

            // Salvataggio dell'immagine in un file o altro utilizzo
            chartImage2.Save("chart2.png", System.Drawing.Imaging.ImageFormat.Png);

            Panel panel1 = new Panel();
            panel1.Dock = DockStyle.Fill;
            panel1.Controls.Add(chart1);

            Panel panel2 = new Panel();
            panel2.Dock = DockStyle.Fill;
            panel2.Controls.Add(chart2);

            var splitContainer = new SplitContainer();
            splitContainer.Dock = DockStyle.Fill;
            splitContainer.Panel1.Controls.Add(panel1);
            splitContainer.Panel2.Controls.Add(panel2);
            splitContainer.SplitterDistance = splitContainer.Height / 2;

            Controls.Add(splitContainer);

            this.Show(); 
        }

        private void CreateLineChart(int M, int N, int[][] scoreTrajectories, Chart chart)
        {
            for (int i = 0; i < M; i++)
            {
                Series series = new Series($"System {i + 1}");
                series.ChartType = SeriesChartType.Line;

                int conta = 0;
                for (int j = 0; j < N; j++)
                {
                    conta += scoreTrajectories[i][j];
                    series.Points.AddXY(j, conta);
                }

                chart.Series.Add(series);
            }

            chart.ChartAreas[0].AxisX.Title = "Attacks";
            chart.ChartAreas[0].AxisY.Title = "Security Score";
            chart.ChartAreas[0].RecalculateAxesScale();
        }

        public void CreateBarChart(int M, int N, int[][] scoreTrajectories, Chart chart)
        { 
            Series barSeries = new Series("Successful Attacks");
            barSeries.ChartType = SeriesChartType.Bar;

            for (int i = 0; i < M; i++)
            {
                int successfulAttacks = 0;
                for (int j = 0; j < N; j++)
                {
                    if (scoreTrajectories[i][j] == -1)
                    {
                        successfulAttacks++;
                    }
                }
                barSeries.Points.AddXY($"System {i + 1}", successfulAttacks);
            }

            chart.Series.Add(barSeries);

            chart.ChartAreas[0].AxisX.Title = "System";
            chart.ChartAreas[0].AxisY.Title = "Successful Attacks";
        }

        private void chart2_Click(object sender, EventArgs e)
        {

        }
    }
}
