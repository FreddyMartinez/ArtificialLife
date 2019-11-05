using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class behavior : MonoBehaviour
{
    public float speed = 0.5f;
    float rotationSpeed = 4.0f;
    float averagePosition;
    float averageHeading;
    float neighbourDistance = 2.0f;

    // Start is called before the first frame update
    void Start()
    {
        speed = Random.Range(0.5f, 1);
    }

    // Update is called once per frame
    void Update()
    {
        transform.Translate(0, 0, Time.deltaTime * speed);
    }

    void flockingRules()
    {
        GameObject[] gos;
        gos = GlobalFlocking.mySharks;

        Vector3 vCenter = Vector3.zero;
        Vector3 vAvoid = Vector3.zero;

        Vector3 goal = GlobalFlocking.goalPosition;

        float dist;
        int groupSize = 0;
        foreach(GameObject go in gos)
        {
            if(go != this.gameObject)
            {
                dist = Vector3.Distance(go.transform.position, this.transform.position);
                if(dist <= neighbourDistance)
                {
                    vCenter += go.transform.position;
                    groupSize++;

                    if (dist < 1.0f)
                    {
                        vAvoid += this.transform.position - go.transform.position;
                    }
                }
            }
        }
    }
}
