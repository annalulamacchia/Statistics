using System;
using System.Collections;
using System.Collections.Generic;
using System.Windows.Forms;

namespace Q2
{
    internal static class Program
    {
        /// <summary>
        ///  The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            // To customize application configuration such as set high DPI settings or default font,
            // see https://aka.ms/applicationconfiguration.
            ApplicationConfiguration.Initialize();
            Application.Run(new Form1());
        }

        public static void array_function()
        {
            int[] array = { 1, 2, 3, 4, 5 };

            // Loop
            for (int i = 0; i < array.Length; i++)
            {
                //operation
            }

            for (int i = 0; i < array.Length; i++)
            {
                int element = array[i];
                //operation
            }

            int j = 0;
            while (j < array.Length)
            {
                int element = array[j];
                //operation
                j++;
            }

            // Get
            int value = array[2];

            //List
            array[2] = 10;

            // Check Existence
            bool exists = Array.Exists(array, element => element == 3);
        }

        public static void list_function()
        {
            List<int> list = new List<int> { 1, 2, 3, 4, 5 };

            // Loop
            foreach (int item in list)
            {
                //operation
                break;
            }

            for (int i = 0; i < list.Count; i++)
            {
                int element = list[i];
                //operation
                continue;
            }

            int j = 0;
            while (j < list.Count)
            {
                int element = list[j];
                //operation
                j++;
            }

            // Add
            list.Add(6);

            // Remove
            list.Remove(3);

            //Get
            int elem = list[2];

            //Set
            list[2] = 10;

            // Check Existence
            bool exists = list.Contains(4);
        }

        public static void dictionary_function()
        {
            Dictionary<string, int> dictionary = new Dictionary<string, int>();

            // Add
            dictionary["one"] = 1;

            // Get
            int value = dictionary["one"];

            // Remove
            dictionary.Remove("one");

            // Loop
            foreach (var pair in dictionary)
            {
                //operation
                break;
            }

            var keys = dictionary.Keys.ToArray();
            for (int i = 0; i < keys.Length; i++)
            {
                string key = keys[i];
                int v = dictionary[key];
                //operation
                continue;
            }

            int j = 0;
            while (j < keys.Length)
            {
                string key = keys[j];
                int v = dictionary[key];
                //operation
                j++;
            }

            //Set
            dictionary["two"] = 20;

            // Check Existence
            bool exists = dictionary.ContainsKey("two");
        }

        public static void hashset_function()
        {
            HashSet<int> hashSet = new HashSet<int> { 1, 2, 3, 4, 5 };

            // Loop
            foreach (int item in hashSet)
            {
                //operation
                break;
            }

            // Converti il set in un array
            int[] arrayFromHashSet = hashSet.ToArray();

            // Loop con for
            for (int i = 0; i < arrayFromHashSet.Length; i++)
            {
                int element = arrayFromHashSet[i];
                //operation
                continue;
            }

            var enumerator = hashSet.GetEnumerator();
            while (enumerator.MoveNext())
            {
                int element = enumerator.Current;
                //operation
            }

            // Add
            hashSet.Add(6);

            // Remove
            hashSet.Remove(3);

            // Check Existence
            bool exists = hashSet.Contains(4);
        }

        public static void queue_function()
        {
            Queue<int> queue = new Queue<int>();

            // Enqueue
            queue.Enqueue(1);
            queue.Enqueue(2);
            queue.Enqueue(3);

            // Dequeue
            int dequeuedItem = queue.Dequeue(); // Removes and returns the first item

            // Peek
            int frontItem = queue.Peek(); // Returns the first item without removing it

            // Loop
            foreach (int item in queue)
            {
                //operation
                break;
            }

            for (int count = queue.Count; count > 0; count--)
            {
                int element = queue.Dequeue();
                //operation
                continue;
            }

            while (queue.Count > 0)
            {
                int element = queue.Dequeue();
                //operation
            }

            // Check Existence
            bool exists = queue.Contains(2);
        }

        public static void stack_function()
        {
            Stack<int> stack = new Stack<int>();

            // Push
            stack.Push(1);
            stack.Push(2);
            stack.Push(3);

            // Pop
            int poppedItem = stack.Pop(); // Removes and returns the top item

            // Peek
            int topItem = stack.Peek(); // Returns the top item without removing it

            // Loop
            foreach (int item in stack)
            {
                //operation
                break;
            }

            for (int count = stack.Count; count > 0; count--)
            {
                int element = stack.Pop();
                //operation
                continue;
            }

            while (stack.Count > 0)
            {
                int element = stack.Pop();
                //operation
            }

            // Check Existence
            bool exists = stack.Contains(2);
        }

        public static void linked_list_function()
        {
            LinkedList<int> linkedList = new LinkedList<int>();

            // Add
            linkedList.AddLast(1);
            linkedList.AddLast(2);

            // Remove
            LinkedListNode<int> node = linkedList.Find(1);
            if (node != null)
            {
                linkedList.Remove(node);
            }

            // Loop
            foreach (int item in linkedList)
            {
                //operation
                break;
            }

            for (LinkedListNode<int> first = linkedList.First; first != null; first = first.Next)
            {
                int element = first.Value;
                //operation
                continue;
            }

            var first_node = linkedList.First;

            while (first_node != null)
            {
                int element = first_node.Value;
                //operation
                first_node = first_node.Next;
            }

            //Get First Element
            int elem = linkedList.First.Value;

            //Set a Specific Element
            var n = linkedList.Find(2);
            if (n != null)
            {
                n.Value = 20;
            }

            // Check Existence
            bool exists = linkedList.Contains(2);

        }
    }
}