import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-perceptron',
  templateUrl: './perceptron.component.html',
  styleUrls: ['./perceptron.component.scss']
})
export class PerceptronComponent implements OnInit {

  /**
   * These variables are used for tensorflow perceptron
   */
  public inputA = 0;
  public inputB = 0;

  linearModel: tf.Sequential;
  public prediction: any;

  xs = [[0.1, 0.1], [0.2, 0.2], [0.9, 0.1], [0.1, 0.9], [0.8, 0.8], [0.9, 0.9]];
  // ys = [0, 0, 1, 1, 1, 1]; // OR Gate
  ys = [0, 0, 0, 0, 1, 1]; // AND Gate
  // ys = [1, 1, 0, 0, 0, 0]; // NOR Gate

  /**
   * These variables are used for manually created perceptron
   */
  public w1 = 1;
  public w2 = 1;
  public b = -1.5;
  public myPrediction: number;
  public myRoundedPrediction: number;


  ngOnInit() {
    this.train();
  }

  async train() {
    this.linearModel = tf.sequential();
    this.linearModel.add(tf.layers.dense({units: 1, inputShape: [2], activation: 'sigmoid', useBias: true}));

    // Prepare the model for training: Specify the loss and the optimizer.
    this.linearModel.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

    // Training data
    const xs = tf.tensor2d(this.xs);
    const ys = tf.tensor1d(this.ys);

    // Train
    await this.linearModel.fit(xs, ys, {epochs: 5000});

    console.log('model trained!');
  }

  predict(): void {
    const output = this.linearModel.predict(tf.tensor2d([this.inputA, this.inputB], [1, 2])) as any;
    this.prediction = Array.from(output.dataSync())[0];
    this.perceptron();
  }

  /**
   * Manually created Perceptron
   */

   sigmoid(x: number): number {
     return 1 / (1 + Math.exp(-x));
   }

   perceptron(): void {
     const z = this.inputA * this.w1 + this.inputB * this.w2 + this.b;
     this.myPrediction = this.sigmoid(z);
     this.myRoundedPrediction = Math.round(this.myPrediction);
   }
}
