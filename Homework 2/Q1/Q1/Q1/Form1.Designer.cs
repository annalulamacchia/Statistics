using System;
using System.Data;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.IO;
using System.Windows.Forms;
using static System.Windows.Forms.VisualStyles.VisualStyleElement;
using static System.Windows.Forms.LinkLabel;


namespace Q1
{
    public partial class Form1 : Form
    {
        private Container components;
        private void compute_freq(object sender, EventArgs e)
        {
            string[][] parsed_s = parser();

            if (parsed_s != null)
            {
                int count = 0;
                Dictionary<string, int> qual_freq = discrete_freq(parsed_s, "Expected work sectors");
                int t = total(qual_freq);

                Panel panel = new Panel
                {
                    Location = new System.Drawing.Point(50, 125),
                    AutoSize = true
                };
                Label Title = new Label
                {
                    Text = "Expected work sectors",
                    Location = new System.Drawing.Point(0, 30 * count),
                    AutoSize = true

                };
                count++;
                panel.Controls.Add(Title);

                foreach (string freq in qual_freq.Keys)
                {
                    double rel_freq = (double)(qual_freq[freq]) / t;
                    Label label = new Label
                    {
                        Text = freq + ": " + qual_freq[freq].ToString() + " || " + rel_freq.ToString($"F{4}") + " || " +
                        (rel_freq * 100).ToString($"F{2}") + "%",
                        Location = new System.Drawing.Point(0, 30 * count),
                        AutoSize = true
                    };
                    count++;
                    panel.Controls.Add(label);
                }
                this.Controls.Add(panel);

                count = 0;
                Dictionary<string, int> discrete_qual_freq = discrete_freq(parsed_s, "Hard Worker (0-5)");
                t = total(discrete_qual_freq);
                Panel panel2 = new Panel
                {
                    Location = new System.Drawing.Point(300, 125),
                    AutoSize = true
                };
                Label Title2 = new Label
                {
                    Text = "Hard Worker (0-5)",
                    Location = new System.Drawing.Point(300, 30 * count),
                    AutoSize = true
                };
                count++;
                panel2.Controls.Add(Title2);
                foreach (string freq in discrete_qual_freq.Keys)
                {
                    double rel_freq = (double)(discrete_qual_freq[freq]) / t;
                    Label label = new Label
                    {
                        Text = freq + ":  " + discrete_qual_freq[freq].ToString() + " || " + rel_freq.ToString($"F{4}") + " || " +
                        (rel_freq * 100).ToString($"F{2}") + "%",
                        Location = new System.Drawing.Point(300, 30 * count),
                        AutoSize = true
                    };
                    count++;
                    panel2.Controls.Add(label);
                }
                this.Controls.Add(panel2);

                count = 0;
                Dictionary<string, int> continuos_quant_freq = continuous_freq(parsed_s, "weight", 5);
                t = total(continuos_quant_freq);
                Panel panel3 = new Panel
                {
                    Location = new System.Drawing.Point(400, 125),
                    AutoSize = true
                };
                Label Title3 = new Label
                {
                    Text = "weight",
                    Location = new System.Drawing.Point(400, 30 * count),
                    AutoSize = true
                };
                count++;
                panel3.Controls.Add(Title3);
                foreach (string freq in continuos_quant_freq.Keys)
                {
                    double rel_freq = (double)(continuos_quant_freq[freq]) / t;
                    Label label = new Label
                    {
                        Text = "[" + freq + ") :  " + continuos_quant_freq[freq].ToString() + " || " +
                            rel_freq.ToString($"F{4}") + " || " + (rel_freq * 100).ToString($"F{2}") + "%",
                        Location = new System.Drawing.Point(400, 30 * count),
                        AutoSize = true
                    };
                    count++;
                    panel3.Controls.Add(label);
                }
                this.Controls.Add(panel3);

                int num_v = 2;
                string[] v = new string[num_v];
                v[0] = "Expected work sectors";
                v[1] = "Hard Worker (0-5)";

                Dictionary<string, int> j_freq = joint_freq(parsed_s, num_v, v);
                count = 0;
                t = total(j_freq);
                Panel panel4 = new Panel
                {
                    Location = new System.Drawing.Point(520, 125),
                    AutoSize = true
                };
                Label Title4 = new Label
                {
                    Text = "Joint Distribution",
                    Location = new System.Drawing.Point(520, 30 * count),
                    AutoSize = true
                };
                count++;
                panel4.Controls.Add(Title4);
                foreach (string freq in j_freq.Keys)
                {
                    double rel_freq = (double)(j_freq[freq]) / t;
                    Label label = new Label
                    {
                        Text = "(" + freq + ") : " + j_freq[freq].ToString() + " || " +
                        rel_freq.ToString($"F{4}") + " || " + (rel_freq * 100).ToString($"F{2}") + "%",
                        Location = new System.Drawing.Point(520, 30 * count),
                        AutoSize = true
                    };
                    count++;
                    panel4.Controls.Add(label);
                }
                this.Controls.Add(panel4);
            }
        }

        private int total(Dictionary<string, int> dictionary)
        {
            int total = 0;
            foreach (int value in dictionary.Values)
            {
                total += value;
            }
            return total;
        }

        private string[][] parser()
        {
            string tsv_path = @"C:\Users\ann.lamacchia\Desktop\Statistics\Homework 2\Professional_Life-Sheet1.tsv";

            if (File.Exists(tsv_path))
            {
                using (StreamReader stream = new StreamReader(tsv_path))
                {
                    while (!stream.EndOfStream)
                    {
                        string text = stream.ReadToEnd();
                        string[] rows = text.Split('\n');
                        string[][] m = new string[rows.Length][];
                        string[] values;
                        for (int i = 0; i < rows.Length; i++)
                        {
                            string row = rows[i];
                            if (row != null)
                            {
                                values = row.Split('\t');
                                m[i] = values;
                            }
                        }
                        return m;
                    }
                }
            }
            return null;
        }

        private Dictionary<string, int> discrete_freq(string[][] parsed_s, string v)
        {
            int index = 0;
            int cols = parsed_s[0].Length;
            int rows = parsed_s.Length;
            Dictionary<string, int> dictionary = new Dictionary<string, int>();
            for (int i = 0; i < cols; i++)
            {
                if (parsed_s[0][i].Equals(v, StringComparison.OrdinalIgnoreCase))
                {
                    index = i;
                    break;
                }
            }
            for (int j = 1; j < rows; j++)
            {
                string elem = parsed_s[j][index];
                if (elem != null)
                {
                    if (dictionary.ContainsKey(elem))
                    {
                        dictionary[elem]++;
                    }
                    else
                    {
                        dictionary.Add(elem, 1);
                    }
                }
            }
            return dictionary;
        }

        private Dictionary<string, int> continuous_freq(string[][] parsed_s, string v, int interval)
        {
            int index = 0;
            int cols = parsed_s[0].Length;
            int rows = parsed_s.Length;
            Dictionary<string, int> dictionary = new Dictionary<string, int>();
            for (int i = 0; i < cols; i++)
            {
                if (parsed_s[0][i].Equals(v, StringComparison.OrdinalIgnoreCase))
                {
                    index = i;
                    break;
                }
            }
            for (int j = 1; j < rows; j++)
            {
                string elemento = parsed_s[j][index];
                string pattern = @"^\d+$";
                Regex regex = new Regex(pattern);
                if (elemento != "" && regex.IsMatch(elemento))
                {
                    double weight = Double.Parse(elemento);
                    int interval_min = (int) Math.Floor(weight / interval);
                    interval_min = interval_min * interval;
                    int interval_max = interval_min + interval;
                    string variable = interval_min.ToString() + "-" + interval_max.ToString();
                    if (dictionary.ContainsKey(variable))
                    {
                        dictionary[variable]++;
                    }
                    else
                    {
                        dictionary.Add(variable, 1);
                    }
                }
            }
            return dictionary;
        }


        private Dictionary<string, int> joint_freq(string[][] parsed_s, int n, string[] v)
        {
            int[] index = new int[n];
            int cols = parsed_s[0].Length;
            int rows = parsed_s.Length;
            Dictionary<string, int> dictionary = new Dictionary<string, int>();
            int count = 0;

            for (int i = 0; i < cols; i++)
            {
                if (v.Contains(parsed_s[0][i]))
                {
                    index[count] = i;
                    count++;
                }
            }

            for (int j = 1; j < rows; j++)
            {
                string[] elemento = new string[n];
                for (int x = 0; x < n; x++)
                {
                    elemento[x] = parsed_s[j][index[x]];
                }
                string key = "";
                for (int x = 0; x < n; x++)
                {
                    if(x < n - 1)
                    {
                        key = key + "" + elemento[x] + ", ";
                    }
                    else if (x == n - 1)
                    {
                        key = key + "" + elemento[x];
                    }
                        
                }
                if (dictionary.ContainsKey(key))
                {
                    dictionary[key]++;
                }
                else
                {
                    dictionary.Add(key, 1);
                }

            }
            return dictionary;
        }

        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(2000, 1000);
            this.Text = "Form1";
            System.Windows.Forms.Button button = new System.Windows.Forms.Button();
            button.Text = "Click to compute the Frequency Distribution";
            button.Size = new Size(400, 50);
            button.Location = new Point(50, 50);
            this.Controls.Add(button);
            button.Click += new EventHandler(compute_freq);
        }
    }
}