import {EdgifyServiceClient} from 'edgify-agent-api';
import {
  PredictionRequest,
  GroundTruthRequest,
  GroundTruth,
} from 'edgify-agent-api/prediction_pb';

console.log ('GRPC URL is: ', process.env.REACT_APP_EDGIFY_SERVICE_URL);
const client = new EdgifyServiceClient (
  process.env.REACT_APP_EDGIFY_SERVICE_URL
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
