namespace Q3
{
    partial class Form1
    {
        private void compute_interval(object sender, EventArgs e)
        {
            int n = 1000;
            int k = 10;

            Random r = new Random();
            List<int> freq = new List<int>(new int[k]);

            for (int i = 0; i < n; i++)
            {
                double v = r.NextDouble();
                int interval = (int)(v * k);
                freq[interval]++;
            }

            Panel panel = new Panel
            {
                Location = new System.Drawing.Point(50, 125),
                AutoSize = true
            };

            for (int i = 0; i < k; i++)
            {
                double lower_bound = i / (double)k;
                double upper_bound = (i + 1) / (double)k;
                Label label = new Label
                {
                    Text = "Interval [{" + lower_bound + "}, {" + upper_bound + "}): {" + freq[i] + "}",
                    Location = new System.Drawing.Point(0, 30 * i),
                    AutoSize = true
                };
                panel.Controls.Add(label);
            }
            this.Controls.Add(panel);
        }

        #region Windows Form Designer generated code
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Text = "Form1";
            System.Windows.Forms.Button button = new System.Windows.Forms.Button();
            button.Text = "Click to compute the Intervals";
            button.Size = new Size(400, 50);
            button.Location = new Point(50, 50);
            this.Controls.Add(button);
            button.Click += new EventHandler(compute_interval);
        }

        #endregion
    }
}