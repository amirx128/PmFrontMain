export interface I_Project {
  "id": number | string,
  "name": string,
  "masterId": number | string,
  "masterName": string,
  "createDate": string,
  "creatorUserId": number | string,
  "creatorUserName": string,
  "projectfloor": I_FLOOR[],
  "projectUnit": I_UNIT[]
}

export interface I_FLOOR {
  "id": number | string,
  "projectId": number,
  "projectName": string,
  "name": string,
  "code": string,
  "createDate": string,
  "projectUnit": I_UNIT[],
  "creatorUserId": string | number,
  "creatorUserName": string
}


export interface I_UNIT {
  "id": number | string,
  "projectId": number | string,
  "projectName": string,
  "projectfloorId": number,
  "projectfloorName": string,
  "name": string,
  "code": string,
  "createDate": string,
  "creatorUserId": string | number,
  "creatorUserName": string
}

export interface I_PERSON {
  "firstName": string,
  "lastName": string,
  "nationalCode": string,
  "mobileNumber": string,
  "phoneNumber": string,
  "address": string,
  "otherDescriptions": string,
  "businessRoles": I_Business_ROLE[]
}

export interface I_Business_ROLE {
  "id": number | string,
  "name": string,
  "title": string
}

export interface I_SCHEDULED_ACTIVITIES  {
  "id": number | string,
  "name": string,
  "descriptions": string
}