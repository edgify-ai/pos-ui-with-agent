import { EdgifyServiceClient } from 'edgify-agent-api';
import {
  PredictionRequest,
  GroundTruthRequest,
  GroundTruth,
} from 'edgify-agent-api/prediction_pb';

const getGRPCUrl = (port) => {
  const pageHostname = window.location.host.split(':')[0];
  const pageProtocol = window.location.protocol;
  return `${pageProtocol}\\\\${pageHostname}:${port}`;
};

const request = new XMLHttpRequest();
request.open('GET', '/clients/config.json', false);
request.send(null);
const { ports } = JSON.parse(request.response);

const clients = ports.map((port) => new EdgifyServiceClient(getGRPCUrl(port)));

const makePredictionInClient = (client, port) =>
  new Promise((resolve, reject) => {
    const req = new PredictionRequest();
    client.getPrediction(req, (err, prediction) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          prediction,
          port,
        });
      }
    });
  });

export const defaultPort = ports[0];

const getClientByPort = (port) =>
  clients[ports.findIndex((clientPort) => clientPort === port)];

export const makePrediction = (port) =>
  makePredictionInClient(getClientByPort(port), port);

export const makePredictions = () =>
  Promise.all(
    clients.map((client, i) => makePredictionInClient(client, ports[i]))
  );

export const createGroundTruth = (label, predictions) =>
  Promise.all(
    predictions.map(({ raw, port }) => {
      const req = new GroundTruthRequest();
      const gt = new GroundTruth();
      const client = getClientByPort(port);
      gt.setPrediction(raw);
      gt.setLabel(label);
      req.setGroundTruth(gt);
      return new Promise((resolve, reject) => {
        client.createGroundTruth(req, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    })
  );
