import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-polinomial-regression',
  templateUrl: './polinomial-regression.component.html',
  styleUrls: ['./polinomial-regression.component.scss']
})
export class PolinomialRegressionComponent implements OnInit, AfterViewInit {
  @ViewChild('myPolCanvas', {static: false}) myPolCanvas: ElementRef;
  context: CanvasRenderingContext2D;
  linearModel: tf.Sequential;
  prediction: any;
  realA = 0.005;
  realB = -2;
  realC = 250;

  a: tf.Variable;
  b: tf.Variable;
  c: tf.Variable;
  learningRate = 0.7;
  optimizer = tf.train.sgd(this.learningRate);

  xs: number[];
  ys: number[];
  yDiff: number;
  xDiff: number;
  ymin: number;
  ymax: number;
  trainingInterval;

  ngOnInit(): void {
    this.generateData();
    this.xDiff = Math.max(...this.xs) - Math.min(...this.xs);
    this.ymax = Math.max(...this.ys);
    this.ymin = Math.min(...this.ys);
    this.yDiff = this.ymax - this.ymin;
  }

  ngAfterViewInit() {
    this.context = (this.myPolCanvas.nativeElement as HTMLCanvasElement).getContext('2d');
    this.drawPoints();
    this.train();
  }

  generateData() {
    this.xs = new Array<number>();
    for (let i = 0; i < 600; i += 5) {
      this.xs.push(i);
    }
    this.ys = this.xs.map( x => {
      return this.realA * Math.pow(x, 2) + this.realB * x + this.realC + (Math.random() - 0.5) * 20;
    });
  }

  drawPoints() {
    this.context.fillStyle = 'red';
    const len = this.xs.length;
    for (let i = 0; i < len; i++) {
      this.context.beginPath();
      this.context.arc(this.xs[i], 600 - this.ys[i], 2, 0, Math.PI * 2);
      this.context.fill();
    }
    this.context.closePath();
  }

  async train() {
    this.a = tf.scalar(Math.random()).variable();
    this.b = tf.scalar(Math.random()).variable();
    this.c = tf.scalar(Math.random()).variable();

    const scaledX = this.scaleData(this.xs);
    const scaledY = this.scaleData(this.ys);

    const tfxs = tf.tensor1d(scaledX);
    const tfys = tf.tensor1d(scaledY);

    this.trainingInterval = setInterval(() => {
      const cost = this.optimizer.minimize(() => this.loss(tfys, this.predict(tfxs)), true);
      console.log('cost:' + cost.dataSync());
      this.drawPrediction();
    }, 10);
  }

  scaleData(data: number[]) {
    const max = Math.max(...data);
    const min = Math.min(...data);
    return data.map(d => (d) / max);
  }

  predict(x: tf.Tensor): tf.Tensor {
    return tf.tidy(() => {
      const y = x.pow(2).mul(this.a).add(x.mul(this.b)).add(this.c);
      return y;
    });
  }

  loss(label: tf.Tensor, prediction: tf.Tensor): tf.Tensor<tf.Rank.R0> {
    return prediction.sub(label).square().mean();
  }


  drawPrediction() {
    this.context.clearRect(0, 0,
      this.context.canvas.width,
      this.context.canvas.height);
    const tx = tf.tensor1d(this.scaleData(this.xs));
    const ty = this.predict(tx);

    const optimizedYs = ty.dataSync();

    const predictedValues = optimizedYs.map(y => y * this.ymax );

    this.context.fillStyle = 'black';
    const len = this.xs.length;
    for (let i = 0; i < len; i++) {
      this.context.beginPath();
      this.context.arc(this.xs[i], 600 - predictedValues[i], 2, 0, Math.PI * 2);
      this.context.fill();
      this.context.closePath();
    }
    this.drawPoints();
  }

  stopTraining() {
    clearInterval(this.trainingInterval);
  }
}
