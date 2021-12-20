import { DataStore } from '@aws-amplify/datastore';
import { ThingModel } from './models';

await DataStore.save(
  new ThingModel({
    region: 'Lorem ipsum dolor sit amet',
    thingName: 'Lorem ipsum dolor sit amet',
    thingArn: 'Lorem ipsum dolor sit amet',
    thingId: 'Lorem ipsum dolor sit amet',
    PublicKey: 'Lorem ipsum dolor sit amet',
    PrivateKey: 'Lorem ipsum dolor sit amet',
    certificatePem: 'Lorem ipsum dolor sit amet',
    certificateId: 'Lorem ipsum dolor sit amet',
    certificateArn: 'Lorem ipsum dolor sit amet',
    remark: 'Lorem ipsum dolor sit amet'
  })
);
