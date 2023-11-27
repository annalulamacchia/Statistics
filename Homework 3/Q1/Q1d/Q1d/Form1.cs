using System;
using System.Drawing;
using System.Windows.Forms;

namespace Q1d
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }
    }

    public class AttackAnimation : Form
    {
        private int M = new Random().Next(0, 10);  
        private int N = new Random().Next(0, 10); 
        private double[,] dailyProbabilities; 
        private double[,] prob;
        private int[,] attacks;

        private int frame = 0;
        private Timer timer;

        public AttackAnimation()
        {
            attacks = new int[M, N];
            dailyProbabilities = new double[M, N];
            prob = new double[M, N];
            Random rand = new Random();

            for (int i = 0; i < M; i++)
            {
                for (int j = 0; j < N; j++)
                {
                    int dailyAttacks = 0;
                    double p = rand.NextDouble();
                    double p2 = rand.NextDouble();
                    if(p < p2)
                    {
                        dailyAttacks++;
                    }
                    attacks[i, j] = dailyAttacks;
                    prob[i, j] = p2;
                    dailyProbabilities[i, j] = p;
                }
            }

            timer = new Timer();
            timer.Interval = 2000; 
            timer.Tick += new EventHandler(Animate);
            timer.Start();

            this.Size = new Size(1000, 400);
            this.Paint += new PaintEventHandler(OnPaint);
        }

        private void Animate(object sender, EventArgs e)
        {
            frame++;
            if (frame >= 2 * N)
                frame = 0;
            this.Invalidate();
        }

        private void OnPaint(object sender, PaintEventArgs e)
        {
            Graphics g = e.Graphics;

            for (int j = 0; j < frame / 2; j++)
            {
                for (int i = 0; i < M; i++)
                {
                    g.DrawString($"System {i + 1}, Day {j + 1}: {attacks[i, j]} attacks, p: {Math.Round(dailyProbabilities[i, j], 2)}, p_attack: {Math.Round(prob[i, j], 2)}", new Font("Arial", 8), Brushes.Black, 20 + (i * 260), 30 * j);
                }
            }
        }
    }
}
