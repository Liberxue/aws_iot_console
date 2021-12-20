// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { ThingModel, ThingHistoryModel } = initSchema(schema);

export {
  ThingModel,
  ThingHistoryModel
};