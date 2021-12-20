/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateThingHistoryModel = /* GraphQL */ `
  subscription OnCreateThingHistoryModel {
    onCreateThingHistoryModel {
      id
      region
      thingName
      thingId
      command
      createTime
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateThingHistoryModel = /* GraphQL */ `
  subscription OnUpdateThingHistoryModel {
    onUpdateThingHistoryModel {
      id
      region
      thingName
      thingId
      command
      createTime
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteThingHistoryModel = /* GraphQL */ `
  subscription OnDeleteThingHistoryModel {
    onDeleteThingHistoryModel {
      id
      region
      thingName
      thingId
      command
      createTime
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateThingModel = /* GraphQL */ `
  subscription OnCreateThingModel($owner: String) {
    onCreateThingModel(owner: $owner) {
      id
      region
      thingName
      thingArn
      thingId
      PublicKey
      PrivateKey
      certificatePem
      certificateId
      certificateArn
      remark
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onUpdateThingModel = /* GraphQL */ `
  subscription OnUpdateThingModel($owner: String) {
    onUpdateThingModel(owner: $owner) {
      id
      region
      thingName
      thingArn
      thingId
      PublicKey
      PrivateKey
      certificatePem
      certificateId
      certificateArn
      remark
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onDeleteThingModel = /* GraphQL */ `
  subscription OnDeleteThingModel($owner: String) {
    onDeleteThingModel(owner: $owner) {
      id
      region
      thingName
      thingArn
      thingId
      PublicKey
      PrivateKey
      certificatePem
      certificateId
      certificateArn
      remark
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
