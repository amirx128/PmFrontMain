export interface I_ROLE {
  "id": number | string,
  "roleName": string,
  "roleTitle": string,
  "rolesActions": I_ROLE_ACTION[]
}

export interface I_ROLE_ACTION {
  "id": number | string,
  "actionTitle": string,
  "descriptions": string,
  "controllerName": string,
  "actionName": string,
  "roleName": string,
  "roleId": number | string
}