// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { ThingHistoryModel, ThingModel } = initSchema(schema);

export {
  ThingHistoryModel,
  ThingModel
};