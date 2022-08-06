const path = require("path");

const tf = require("@tensorflow/tfjs-node");

const faceapi = require("@vladmandic/face-api/dist/face-api.node.js");

let faceDetectionNet = faceapi.nets.ssdMobilenetv1;

const minConfidence = 0.5;

// TinyFaceDetectorOptions
const inputSize = 408;
const scoreThreshold = 0.5;

let optionsSSDMobileNet;

function getFaceDetectorOptions(net) {
  return net === faceapi.nets.ssdMobilenetv1
    ? new faceapi.SsdMobilenetv1Options({ minConfidence })
    : new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold });
}

async function image(file) {
  const decoded = tf.node.decodeImage(file);
  const casted = decoded.toFloat();
  const result = casted.expandDims(0);
  decoded.dispose();
  casted.dispose();
  return result;
}

async function detect(tensor) {
  const result = await faceapi
    .detectAllFaces(tensor, optionsSSDMobileNet)
    // .withFaceLandmarks()
    .withAgeAndGender();
  return result;
}

async function main(file) {
  console.log("FaceAPI single-process test");

  await faceapi.tf.setBackend("tensorflow");
  await faceapi.tf.enableProdMode();
  await faceapi.tf.ready();
  await faceDetectionNet.loadFromDisk("./models");
  await faceapi.nets.faceLandmark68Net.loadFromDisk("./models");
  await faceapi.nets.ageGenderNet.loadFromDisk("./models");
  const tensor = await image(file);
  const result = await detect(tensor);
  tensor.dispose();

  return result;
}

module.exports = {
  detect: main,
};
