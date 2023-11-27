using System;
using System.Drawing;
using System.Windows.Forms;
using System.Windows.Forms.DataVisualization.Charting;

namespace Q1
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
            int N = 1000;
            int M = 1000;
            Random random = new Random();
            int[] SValues = { 20, 60, 100 };
            double[][] probabilities = new double[SValues.Length][];
            double[] discardedSystems = new double[SValues.Length];
            
           
            for (int v = 0; v < SValues.Length; v++)
            {
                int S = SValues[v];
                probabilities[v] = new double[9];
                for (int k = 2; k <= 10; k++)
                {
                    int P = k * 10;
                    double discardedCount = 0;

                    for (int i = 0; i < M; i++)
                    {
                        int penetrationScore = 0;
                        for (int j = 0; j < N; j++)
                        {
                            int attackScore = random.Next(0, S+1);
                            if (attackScore >= S)
                            {
                                break;
                            }
                            penetrationScore++;
                            if (penetrationScore >= P)
                            {
                                discardedCount++;
                                break;
                            }
                        }
                    }

                    double probabilityOfDiscard = Math.Round(discardedCount / M, 2);
                    probabilities[v][k-2] = probabilityOfDiscard;
                    discardedSystems[v] = discardedCount;
                }
            }

            CreateLineChart(SValues.Length, probabilities, chart1);
            CreateBarChart(discardedSystems, chart2);

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

        private void CreateLineChart(int S, double[][] probabilities, Chart chart)
        {
            for (int i = 0; i < S; i++)
            {
                Series series;
                if (i == 0)
                {
                    series = new Series($"S{i + 1} = 20");
                }
                else if (i == 1)
                {
                    series = new Series($"S{i + 1} = 60");
                }
                else
                {
                    series = new Series($"S{i + 1} = 100");
                }
                
                series.ChartType = SeriesChartType.Line;
                for (int j = 0; j < probabilities[i].Length; j++)
                {
                    series.Points.AddXY((j+2)*10, probabilities[i][j]);
                }
                chart.Series.Add(series);
            }

            chart.ChartAreas[0].AxisX.Title = "Penetration Score";
            chart.ChartAreas[0].AxisY.Title = "Probability of being discard";
            chart.ChartAreas[0].RecalculateAxesScale();
        }

        public void CreateBarChart(double[] discardedSystems, Chart chart)
        {
            Series barSeries = new Series("Successful Attacks");
            barSeries.ChartType = SeriesChartType.Bar;

            for (int i = 0; i < discardedSystems.Length; i++)
            {
                barSeries.Points.AddXY($"S{i + 1}", discardedSystems[i]);
            }

            chart.Series.Add(barSeries);

            chart.ChartAreas[0].AxisX.Title = "Discarded Systems";
            chart.ChartAreas[0].AxisY.Title = "Security Score";
        }
    }
}
