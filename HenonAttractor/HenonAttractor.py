
import numpy as np
import pylab as pl

a = 1.4
b = 0.3
iteraciones = 1000

def calc(x, y):
    x1 = 1 - a*x*x + y
    y1 = b*x
    return (x1,y1)


def itera(x, y):
    xv = np.empty(iteraciones)
    yv = np.empty(iteraciones)
    for i in range(0,iteraciones):
        x, y = calc(x, y);
        yv[i]=y
        xv[i]=x
    return (xv, yv)

x1, y1 = itera(0,0)
pl.plot(x1, y1, 'k.')