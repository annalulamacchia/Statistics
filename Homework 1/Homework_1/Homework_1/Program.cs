namespace Homework_1;
using System;
using System.Drawing;
using System.Windows.Forms;

class DrawingForm : Form {
    public DrawingForm() {
        this.Text = "Shapes Drawing";
        this.Size = new Size(400, 400);
        this.Paint += new PaintEventHandler(DrawingForm_Paint);
    }

    private void DrawingForm_Paint(object sender, PaintEventArgs e) {

        Graphics g = e.Graphics;
        Pen pen = new Pen(Color.Blue, 2);

        // Draw a line
        g.DrawLine(pen, 50, 50, 200, 50);

        // Draw a point
        g.FillEllipse(Brushes.Red, 100, 100, 5, 5);

        // Draw a circle
        pen = new Pen(Color.Violet, 2);
        g.DrawEllipse(pen, 250, 150, 100, 100);

        // Draw a rectangle
        pen = new Pen(Color.Green, 2);
        g.DrawRectangle(pen, 50, 150, 150, 100);

        // Clean up resources
        pen.Dispose();
    }

    static void Main() {
        Application.Run(new DrawingForm());
    }
}
