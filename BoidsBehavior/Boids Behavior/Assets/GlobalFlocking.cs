using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GlobalFlocking : MonoBehaviour
{
    public GameObject genericShark;
    public static int tankSize = 5;
    static int numOfSharks=5;
    public static GameObject[] mySharks = new GameObject[numOfSharks];

    public static Vector3 goalPosition = Vector3.zero;

    // Start is called before the first frame update
    void Start()
    {
        for (int i = 0; i < numOfSharks; i++)
        {
            Vector3 position = new Vector3(Random.Range(-tankSize, tankSize), Random.Range(0, tankSize), Random.Range(-tankSize, tankSize));
            mySharks[i] = (GameObject)Instantiate(genericShark, position, Quaternion.identity);
        }
    }

    // Update is called once per frame
    void Update()
    {
        if (Random.Range(0, 100) < 10)
        {
            goalPosition = new Vector3(Random.Range(-tankSize, tankSize), Random.Range(0, tankSize), Random.Range(-tankSize, tankSize));
        }
    }
}
