import {EdgifyServiceClient} from 'edgify-agent-api';
import {
  PredictionRequest,
  GroundTruthRequest,
  GroundTruth,
} from 'edgify-agent-api/prediction_pb';

const grpcPort = process.env.REACT_APP_EDGIFY_SERVICE_PORT
const pageHostname = window.location.host.split(":")[0]
const pageProtocol = window.location.protocol

const grpcUrl =`${pageProtocol}\\\\${pageHostname}:${grpcPort}`

const client = new EdgifyServiceClient (
  grpcUrl
);

export const makePrediction = () =>
  new Promise ((resolve, reject) => {
    const req = new PredictionRequest ();
    client.getPrediction (req, (err, resp) => {
      if (err) {
        reject (err);
      } else {
        resolve (resp);
      }
    });
  });

export const createGroundTruth = (label, prediction) => {
  const req = new GroundTruthRequest ();
  const gt = new GroundTruth ();
  gt.setPrediction (prediction);
  gt.setLabel (label);
  req.setGroundTruth (gt);
  return new Promise ((resolve, reject) => {
    client.createGroundTruth (req, (err, resp) => {
      if (err) {
        reject (err);
      } else {
        resolve ();
      }
    });
  });
};
