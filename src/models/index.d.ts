import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type ThingModelMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ThingHistoryModelMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class ThingModel {
  readonly id: string;
  readonly region?: string;
  readonly thingName?: string;
  readonly thingArn?: string;
  readonly thingId?: string;
  readonly publicKey?: string;
  readonly privateKey?: string;
  readonly certificatePem?: string;
  readonly certificateId?: string;
  readonly remark?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ThingModel, ThingModelMetaData>);
  static copyOf(source: ThingModel, mutator: (draft: MutableModel<ThingModel, ThingModelMetaData>) => MutableModel<ThingModel, ThingModelMetaData> | void): ThingModel;
}

export declare class ThingHistoryModel {
  readonly id: string;
  readonly region?: string;
  readonly thingName?: string;
  readonly thingId?: string;
  readonly command?: string;
  readonly untitledfield?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ThingHistoryModel, ThingHistoryModelMetaData>);
  static copyOf(source: ThingHistoryModel, mutator: (draft: MutableModel<ThingHistoryModel, ThingHistoryModelMetaData>) => MutableModel<ThingHistoryModel, ThingHistoryModelMetaData> | void): ThingHistoryModel;
}