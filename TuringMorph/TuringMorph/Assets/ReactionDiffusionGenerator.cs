using UnityEngine;
using System;
using System.IO;

public class ReactionDiffusionGenerator : MonoBehaviour
{
    public int width = 150;
    public int height = 150;

    private float Da = 1f;
    private float Db = 0.5f;
    private float f = 0.045f;
    private float k = 0.065f;

    private int count = 0;

    private Cell[,] grid;
    private Texture2D texture;

    // Use this for initialization
    void Start()
    {
        InitializeTexture();
        InitializeGrid();
    }

    // Update is called once per frame
    void Update()
    {
        GenNewTexture();
        count += 1;
        if(count == 20)
        {
            RefreshTexture();
            count = 0;
        }
    }

    void InitializeTexture()
    {
        texture = new Texture2D(width, height, TextureFormat.RGB24, false);
        Renderer renderer = GetComponent<Renderer>();
        renderer.material.mainTexture = texture;
        
        texture.Apply();
    }

    void InitializeGrid()
    {
        grid = new Cell[width, height];
        for (int x = 0; x < width; x++)
        {
            for (int y = 0; y < height; y++)
            {
                grid[x, y] = new Cell();
            }
        }
        
        for (int x = 10; x < 145; x++)
        {
            for (int y = 10; y < 145; y++)
            {
                //grid[x, y].b = 1;
                System.Random rand = new System.Random();
                grid[x, y].b = rand.Next(0, 2);
            }
        }
    }
    void GenNewTexture()
    {
        Cell[,] newGrid = new Cell[width, height];
        for (int x = 0; x < width; x++)
        {
            for (int y = 0; y < height; y++)
            {
                newGrid[x, y] = new Cell();
            }
        }

        for (int x = 1; x < width-1; x++)
        {
            for (int y = 1; y < height-1; y++)
            {
                float A = grid[x, y].a;
                float B = grid[x, y].b;
                newGrid[x, y].a = A + Da * LaplaceA(x, y) - A * B * B + f * (1 - A);
                newGrid[x, y].b = B + Db * LaplaceB(x, y) + A * B * B - (k + f) * B;
            }
        }
        grid = newGrid;
    }

    float LaplaceA(int x, int y)
    {
        float la = grid[x, y].a * -1f;
        la += grid[x + 1, y].a * 0.2f;
        la += grid[x - 1, y].a * 0.2f;
        la += grid[x, y + 1].a * 0.2f;
        la += grid[x, y - 1].a * 0.2f;
        la += grid[x + 1, y + 1].a * 0.05f;
        la += grid[x + 1, y - 1].a * 0.05f;
        la += grid[x - 1, y + 1].a * 0.05f;
        la += grid[x - 1, y - 1].a * 0.05f;
        return la;
    }

    float LaplaceB(int x, int y)
    {
        float lb = grid[x, y].b * -1f;
        lb += grid[x + 1, y].b * 0.2f;
        lb += grid[x - 1, y].b * 0.2f;
        lb += grid[x, y + 1].b * 0.2f;
        lb += grid[x, y - 1].b * 0.2f;
        lb += grid[x + 1, y + 1].b * 0.05f;
        lb += grid[x + 1, y - 1].b * 0.05f;
        lb += grid[x - 1, y + 1].b * 0.05f;
        lb += grid[x - 1, y - 1].b * 0.05f;
        return lb;
    }

    void RefreshTexture()
    {
        for (int x = 0; x < width; x++)
        {
            for (int y = 0; y < height; y++)
            {
                texture.SetPixel(x, y, Color.Lerp(Color.blue, Color.black, grid[x, y].b *3f));
            }
        }
        texture.Apply();
    }

    void OnApplicationQuit()
    {
        byte[] bytes = texture.EncodeToPNG();

        File.WriteAllBytes(Application.dataPath + "/../TuringMorph.png", bytes);
    }
}