import {EdgifyServiceClient} from 'edgify-agent-api';
import {
    PredictionRequest,
    GroundTruthRequest,
    GroundTruth,
} from 'edgify-agent-api/prediction_pb';

const getGRPCUrl = port => {
    const pageHostname = window.location.host.split(":")[0]
    const pageProtocol = window.location.protocol
    return `${pageProtocol}\\\\${pageHostname}:${port}`
}

const request = new XMLHttpRequest ();
request.open ('GET', '/clients/config.json', false);
request.send (null);
const { ports } = JSON.parse (request.response);

const clients = ports.map(port => new EdgifyServiceClient(getGRPCUrl(port)))

export const makePredictions = () =>
    Promise.all(clients.map(client =>
        new Promise ((resolve, reject) => {
            const req = new PredictionRequest ()
            client.getPrediction (req, (err, resp) => {
                if (err) {
                    reject (err)
                } else {
                    resolve (resp)
                }
            });
        })
    ))

export const createGroundTruth = (label, predictions) =>
    Promise.all(predictions.map(prediction => {
        const req = new GroundTruthRequest ()
        const gt = new GroundTruth ()
        gt.setPrediction (prediction)
        gt.setLabel (label)
        req.setGroundTruth (gt)
        return new Promise ((resolve, reject) => {
            clients[0].createGroundTruth (req, (err, resp) => {
                if (err) {
                    reject (err)
                } else {
                    resolve ()
                }
            })
        })
    }))
