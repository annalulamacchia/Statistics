using System;
using System.Drawing;
using System.Windows.Forms;

namespace Q1c
{
    public class AttackAnimation : Form
    {
        private int M = new Random().Next(0, 10);  
        private int N = new Random().Next(0, 10);  
        private double p = new Random().NextDouble();
        private int[,] attacks;

        private int frame = 0;
        private Timer timer;

        public AttackAnimation()
        {
            attacks = new int[M, N];
            Random rand = new Random();

            for (int i = 0; i < M; i++)
            {
                for (int j = 0; j < N; j++)
                {
                    if (rand.NextDouble() < p)
                        attacks[i, j] = 1;
                }
            }

            timer = new Timer();
            timer.Interval = 2000;
            timer.Tick += new EventHandler(Animate);
            timer.Start();

            this.Size = new Size(800, 400);
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

            if (frame % 2 == 0)  
            {
                for (int i = 0; i < M; i++)
                {
                    int cumulativeAttacks = 0;
                    for (int j = 0; j < frame / 2; j++)
                    {
                        cumulativeAttacks += attacks[i, j];
                    }
                    g.DrawString($"System {i + 1}: {cumulativeAttacks} attacks", new Font("Arial", 12), Brushes.Black, 20, 30 * i);
                }
            }
            else 
            {
                for (int j = 0; j < frame / 2; j++)
                {
                    int cumulativeAttacks = 0;
                    for (int i = 0; i < M; i++)
                    {
                        cumulativeAttacks += attacks[i, j];
                    }
                    g.DrawString($"Day {j + 1}: {cumulativeAttacks} attacks", new Font("Arial", 12), Brushes.Black, 20, 30 * j);
                }
            }
        }
    }
}
