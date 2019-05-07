using UnityEngine;
using System.Collections;

public class ReactionDiffusionGenerator : MonoBehaviour {
    public int width = 256;
    public int height = 256;

    private Cell[,] grid;
    private Texture2D texture;

	// Use this for initialization
	void Start () {
        InitializeTexture();
        InitializeGrid();
    }
	
	// Update is called once per frame
	void Update () {
        RefreshTexture();
    }

    void InitializeTexture()
    {
        texture = new Texture2D(width, height);
        Renderer renderer = GetComponent<Renderer>();
        renderer.material.mainTexture = texture;

        for (int x = 0; x < width; x++)
        {
            for (int y = 0; y < height; y++)
            {
                texture.SetPixel(x, y, Color.cyan);
            }
        }
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

        for (int x = 100; x < 110; x++)
        {
            for (int y = 100; y < 110; y++)
            {
                grid[x, y].b = 1f;
            }
        }
    }

    void RefreshTexture()
    {
        for (int x = 0; x < width; x++)
        {
            for (int y = 0; y < height; y++)
            {
                texture.SetPixel(x, y, Color.Lerp(Color.white, Color.black, grid[x, y].b));
            }
        }
        texture.Apply();
    }
}
