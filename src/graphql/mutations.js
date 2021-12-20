/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createThingHistoryModel = /* GraphQL */ `
  mutation CreateThingHistoryModel(
    $input: CreateThingHistoryModelInput!
    $condition: ModelThingHistoryModelConditionInput
  ) {
    createThingHistoryModel(input: $input, condition: $condition) {
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
export const updateThingHistoryModel = /* GraphQL */ `
  mutation UpdateThingHistoryModel(
    $input: UpdateThingHistoryModelInput!
    $condition: ModelThingHistoryModelConditionInput
  ) {
    updateThingHistoryModel(input: $input, condition: $condition) {
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
export const deleteThingHistoryModel = /* GraphQL */ `
  mutation DeleteThingHistoryModel(
    $input: DeleteThingHistoryModelInput!
    $condition: ModelThingHistoryModelConditionInput
  ) {
    deleteThingHistoryModel(input: $input, condition: $condition) {
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
export const createThingModel = /* GraphQL */ `
  mutation CreateThingModel(
    $input: CreateThingModelInput!
    $condition: ModelThingModelConditionInput
  ) {
    createThingModel(input: $input, condition: $condition) {
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
export const updateThingModel = /* GraphQL */ `
  mutation UpdateThingModel(
    $input: UpdateThingModelInput!
    $condition: ModelThingModelConditionInput
  ) {
    updateThingModel(input: $input, condition: $condition) {
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
export const deleteThingModel = /* GraphQL */ `
  mutation DeleteThingModel(
    $input: DeleteThingModelInput!
    $condition: ModelThingModelConditionInput
  ) {
    deleteThingModel(input: $input, condition: $condition) {
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
