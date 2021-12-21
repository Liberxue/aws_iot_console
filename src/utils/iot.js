const AWS = require('aws-sdk');

AWS.config.update({
  // accessKeyId: process.env.ACCESS_KEY_ID,
  // secretAccessKey: process.env.SECRET_ACCESS_KEY,
  // region: process.env.REGION
  accessKeyId: 'AKIAVVYGLS733LXNE4X5',
  secretAccessKey: '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',
  region: 'us-east-1'
});

// TODO - when something fails in function we need to delete whatever created earlier, like "certificates,things"
const iot = new AWS.Iot();
const createThingAndAttachCerts = async (event) => {
  var result = {};
  try {
    // 1. Create new certificate
    const certRes = await new Promise((resolve, reject) => {
      const params = {
        setAsActive: true
      };
      iot.createKeysAndCertificate(params, function (err, data) {
        if (err) reject(err);
        else resolve(data);
      });
    });
    result.certRes = certRes;
    // 2. Attaching policy to certificate
    const policyToCertRes = await new Promise((resolve, reject) => {
      iot.attachPolicy(
        {
          policyName: 'iotpolicy',
          target: certRes.certificateArn
        },
        (err, data) => {
          if (err) reject(err);
          else resolve(data);
        }
      );
    });
    result.policyToCertRes = policyToCertRes;
    // 3. Create Thing
    console.info('createThing', event.thingName);
    const thingRes = await new Promise((resolve, reject) => {
      iot.createThing(
        { thingName: event.thingName },
        // { thingName: event.queryStringParameters.iotDevice }, // this is for lamda
        function (err, data) {
          if (err) reject(err);
          else resolve(data);
        }
      );
    });
    result.thingRes = thingRes;
    // 4. Attach certificate to thing
    const attachedCertThingRes = await new Promise((resolve, reject) => {
      const params = {
        principal: certRes.certificateArn,
        thingName: thingRes.thingName
      };
      iot.attachThingPrincipal(params, function (err, attachCertRes) {
        if (err) reject(err);
        else resolve(attachCertRes);
      });
    });
    result.attachedCertThingRes = attachedCertThingRes;
    return result;
  } catch (e) {
    console.log(e);
    return result;
  }
};
// let data =  createThingAndAttachCerts({ thingName: '11:11:11:11:11:11' })
// console.log(data.then(result => {
//     console.log(result)
// }))

export { createThingAndAttachCerts };
