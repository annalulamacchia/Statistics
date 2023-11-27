using System;
using System.Data;
using System.Drawing;
using System.Windows.Forms;
using System.Windows.Forms.DataVisualization.Charting;

namespace Q1b
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
            double[] cumulativeFrequency = new double[N]; 
            double[] relativeFrequency = new double[N];
            double[] normalizedRatio = new double[N];

            for (int j = 0; j < N; j++)
            {
                cumulativeFrequency[j] = 0;
                relativeFrequency[j] = 0;
            }

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

                    cumulativeFrequency[j] += scoreTrajectories[i][j];
                    relativeFrequency[j] = cumulativeFrequency[j] / N;
                    normalizedRatio[j] = cumulativeFrequency[j] / Math.Sqrt(N);
                }
            }

            CreateBarChart(N, cumulativeFrequency, chart1, "Cumulative Frequency (f)");
            CreateBarChart(N, relativeFrequency, chart2, "Relative Frequence");
            CreateBarChart(N, normalizedRatio, chart3, "Normalized Frequence");

            Bitmap chartImage1 = new Bitmap(chart1.Width, chart1.Height);
            chart1.DrawToBitmap(chartImage1, new Rectangle(0, 0, chart1.Width, chart1.Height));

            // Salvataggio dell'immagine in un file o altro utilizzo
            chartImage1.Save("chart1.png", System.Drawing.Imaging.ImageFormat.Png);

            Bitmap chartImage2 = new Bitmap(chart2.Width, chart2.Height);
            chart2.DrawToBitmap(chartImage2, new Rectangle(0, 0, chart2.Width, chart2.Height));

            // Salvataggio dell'immagine in un file o altro utilizzo
            chartImage2.Save("chart2.png", System.Drawing.Imaging.ImageFormat.Png);

            Bitmap chartImage3 = new Bitmap(chart3.Width, chart3.Height);
            chart3.DrawToBitmap(chartImage3, new Rectangle(0, 0, chart3.Width, chart3.Height));

            // Salvataggio dell'immagine in un file o altro utilizzo
            chartImage3.Save("chart3.png", System.Drawing.Imaging.ImageFormat.Png);

            // Create panels for each chart
            Panel panel1 = new Panel();
            panel1.Dock = DockStyle.Fill;
            panel1.Controls.Add(chart1);

            // Create panels for each chart
            Panel panel2 = new Panel();
            panel2.Dock = DockStyle.Fill;
            panel2.Controls.Add(chart2);

            // Create panels for each chart
            Panel panel3 = new Panel();
            panel3.Dock = DockStyle.Fill;
            panel3.Controls.Add(chart3);


            // Create a SplitContainer to arrange the charts side by side
            SplitContainer splitContainer = new SplitContainer();
            splitContainer.Dock = DockStyle.Fill;
            splitContainer.Orientation = Orientation.Vertical;

            // Set the SplitContainer panel sizes
            splitContainer.SplitterDistance = splitContainer.Height / 2;

            // Create a SplitContainer to arrange the charts side by side
            SplitContainer splitContainer1 = new SplitContainer();
            splitContainer1.Dock = DockStyle.Fill;
            splitContainer1.Orientation = Orientation.Horizontal;

            // Set the SplitContainer panel sizes
            splitContainer1.SplitterDistance = splitContainer1.Height / 2;
            splitContainer1.Panel1.Controls.Add(panel1);
            splitContainer1.Panel2.Controls.Add(panel2);
            splitContainer.Panel1.Controls.Add(splitContainer1);

            // Add the panels to the SplitContainer
           
            splitContainer.Panel2.Controls.Add(panel3);

            // Add the SplitContainer to the form
            this.Controls.Add(splitContainer);
        }

        public void CreateBarChart(int N, double[] frequency, Chart chart, String freq)
        {
            Series barSeries = new Series($"{N} Attacks");
            barSeries.ChartType = SeriesChartType.Bar;

            for (int i = 0; i < N; i++)
            {
                barSeries.Points.AddXY($"Attack {i + 1}", frequency[i]);
            }

            chart.Series.Add(barSeries);

            chart.ChartAreas[0].AxisX.Title = "Attacks";
            chart.ChartAreas[0].AxisY.Title = freq;
        }

        private void chart3_Click(object sender, EventArgs e)
        {

        }
    }
}

