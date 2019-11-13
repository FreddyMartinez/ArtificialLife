import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-linnear-regression',
  templateUrl: './linnear-regression.component.html',
  styleUrls: ['./linnear-regression.component.scss']
})
export class LinnearRegressionComponent implements OnInit, AfterViewInit {

  @ViewChild('myCanvas', {static: false}) myCanvas: ElementRef;
  context: CanvasRenderingContext2D;
  linearModel: tf.Sequential;
  prediction: any;
  realM = 0.52;
  realB = 100;
  m: tf.Variable;
  b: tf.Variable;
  learningRate = 0.5;
  optimizer = tf.train.sgd(this.learningRate);
  xs: number[]; // = [0, 250, 500];
  ys: number[]; // = [120, 250, 350];
  yDiff: number;
  xDiff: number;
  trainingInterval;

  ngOnInit(): void {
    this.generateData();
    this.xDiff = Math.max(...this.xs) - Math.min(...this.xs);
    this.yDiff = Math.max(...this.ys) - Math.min(...this.ys);
  }

  ngAfterViewInit() {
    this.context = (this.myCanvas.nativeElement as HTMLCanvasElement).getContext('2d');
    this.drawPoints();
    setTimeout( () => {
      this.train();
    }, 10);
  }

  generateData() {
    this.xs = new Array<number>();
    for (let i = 0; i < 600; i += 5) {
      this.xs.push(i);
    }
    this.ys = this.xs.map( x => {
      return x * this.realM + this.realB + (Math.random() - 0.5) * 200;
    });
  }

  drawPoints() {
    this.context.fillStyle = 'red';
    const len = this.xs.length;
    for (let i = 0; i < len; i++) {
      this.context.arc(this.xs[i], 400 - this.ys[i], 2, 0, Math.PI * 2);
      this.context.closePath();
    }
    this.context.fill();
  }

  async train() {
    this.m = tf.scalar(Math.random()).variable();
    this.b = tf.scalar(Math.random()).variable();

    const scaledX = this.scaleData(this.xs);
    const scaledY = this.scaleData(this.ys);

    const tfxs = tf.tensor1d(scaledX);
    const tfys = tf.tensor1d(scaledY);

    this.trainingInterval = setInterval(() => {
      const cost = this.optimizer.minimize(() => this.loss(tfys, this.predict(tfxs)), true);
      console.log('cost:' + cost.dataSync());
      this.drawLine();
    }, 100);
  }

  scaleData(data: number[]) {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const diff = max - min;
    return data.map(d => (d - min) / diff);
  }

  predict(x: tf.Tensor): tf.Tensor {
    return tf.tidy(() => {
      const y = x.mul(this.m).add(this.b);
      return y;
    });
  }

  loss(label: tf.Tensor, prediction: tf.Tensor): tf.Tensor<tf.Rank.R0> {
    return prediction.sub(label).square().mean();
  }

  drawLine() {
    this.context.clearRect(0, 0,
      this.context.canvas.width,
      this.context.canvas.height);
    const tx = tf.tensor1d([0, 10]);
    const ty = this.predict(tx);

    const optimizedYs = ty.dataSync();

    this.context.fillStyle = 'green';
    this.context.beginPath();
    this.context.moveTo(0, 400 - (optimizedYs[0] * this.yDiff + Math.min(...this.ys)));
    this.context.lineTo(10 * this.xDiff, 400 - (optimizedYs[1] * this.yDiff + Math.min(...this.ys)));
    this.context.stroke();
    this.context.closePath();
    this.drawPoints();
  }

  stopTraining() {
    clearInterval(this.trainingInterval);
  }
}
