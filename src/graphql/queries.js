/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getThingModel = /* GraphQL */ `
  query GetThingModel($id: ID!) {
    getThingModel(id: $id) {
      id
      region
      thingName
      thingArn
      thingId
      remark
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listThingModels = /* GraphQL */ `
  query ListThingModels(
    $filter: ModelThingModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listThingModels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        region
        thingName
        thingArn
        thingId
        remark
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncThingModels = /* GraphQL */ `
  query SyncThingModels(
    $filter: ModelThingModelFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncThingModels(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        region
        thingName
        thingArn
        thingId
        remark
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getThingHistoryModel = /* GraphQL */ `
  query GetThingHistoryModel($id: ID!) {
    getThingHistoryModel(id: $id) {
      id
      region
      thingName
      thingId
      command
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listThingHistoryModels = /* GraphQL */ `
  query ListThingHistoryModels(
    $filter: ModelThingHistoryModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listThingHistoryModels(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        region
        thingName
        thingId
        command
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncThingHistoryModels = /* GraphQL */ `
  query SyncThingHistoryModels(
    $filter: ModelThingHistoryModelFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncThingHistoryModels(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        region
        thingName
        thingId
        command
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
