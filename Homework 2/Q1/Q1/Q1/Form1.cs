namespace Q1
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            Text = "Security Score Simulation";
            Size = new System.Drawing.Size(800, 600);

            chartControl = new CustomChartControl();
            chartControl.Parent = this;
            chartControl.Dock = DockStyle.Fill;

            simulateButton = new Button();
            simulateButton.Parent = this;
            simulateButton.Text = "Simulate";
            simulateButton.Click += SimulateButton_Click;
            simulateButton.Dock = DockStyle.Top;

            attackNumberInput = new NumericUpDown();
            attackNumberInput.Parent = this;
            attackNumberInput.Minimum = 1;
            attackNumberInput.Maximum = numAttacks;
            attackNumberInput.Value = numAttacks / 2;
            attackNumberInput.Dock = DockStyle.Top;
            InitializeComponent();
        }
    }
}