import { EdgifyServiceClient } from 'edgify-agent-api';
import {
  PredictionRequest,
  GroundTruthRequest,
  GroundTruth,
} from 'edgify-agent-api/prediction_pb';

const getGRPCUrl = (port, pageHostname) => {
  const pageProtocol = window.location.protocol;
  return `${pageProtocol}\\\\${pageHostname}:${port}`;
};

const request = new XMLHttpRequest();
request.open('GET', '/clients/config.json', false);
request.send(null);
const { configs } = JSON.parse(request.response);
const clientsConfigs = configs.map(({ port, host = 'localhost' }) => ({
  port,
  host,
}));

const clients = clientsConfigs.map(
  ({ port, host }) => new EdgifyServiceClient(getGRPCUrl(port, host))
);

const makePredictionInClient = (client, config) =>
  new Promise((resolve, reject) => {
    const req = new PredictionRequest();
    client.getPrediction(req, (err, prediction) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          prediction,
          config,
        });
      }
    });
  });

export const defaultConfig = clientsConfigs[0];

const getClientByConfig = ({ port, host }) =>
  clients[
    clientsConfigs.findIndex(
      (client) => client.port === port && client.host === host
    )
  ];

export const makePrediction = async (config) => {
  const timestamp = new Date();
  const result = await makePredictionInClient(
    getClientByConfig(config),
    config
  );
  // eslint-disable-next-line no-console
  console.log(
    `It took ${
      new Date() - timestamp
    } ms to take picture and make prediction from agent with config ${JSON.stringify(
      config
    )}`
  );
  return result;
};

export const makePredictions = async () => {
  const timestamp = new Date();
  const results = await Promise.all(
    clients.map((client, i) =>
      makePredictionInClient(client, clientsConfigs[i])
    )
  );
  // eslint-disable-next-line no-console
  console.log(
    `It took ${
      new Date() - timestamp
    } ms to take picture and make prediction from all agents with configs ${JSON.stringify(
      clientsConfigs
    )}`
  );
  return results;
};

export const createGroundTruth = (label, predictions) =>
  Promise.all(
    predictions.map(({ raw, config }) => {
      const req = new GroundTruthRequest();
      const gt = new GroundTruth();
      const client = getClientByConfig(config);
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
