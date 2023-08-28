
export interface I_LOGISTIC_Q {
  "requesterUser": string,
  "purchaseOrderCount": number,
  "purchaseOrderId": number,
  "purchaseOrderTrackingCode": string,
  "requestCaseId": number,
  "requestCaseTrackingCode": string,
  "requestCaseCreateDate": string,
  "commodityId": number,
  "requestCaseCommodityId": number,
  "countOfDone": number,
  "commodityName": string,
  "purchaseTrackingCode": string,
  "requiredDate": string,
  "purchaseOrderDetailsId": number,
  "warehouseOrderId": number,
  "warehouseTrackingCode": string
}

export interface I_PURCHASE_ORDER_DATA {
  "purchaseId": number,
  "purchaseTrackingCode": string,
  "commodityId": number,
  "commodity": string,
  "createDate": string,
  "requestCaseId": number,
  "requestCaseTrackingCode": string,
  "requestCaseUser": string,
  "requestCasePurchaseHavingCount": number,
  "requestCasePurchaseRemainingCount": number,
  "purchaseDetails": I_PURCHASE_ORDER_DETAIL_DATA[]
}

export interface I_PURCHASE_ORDER_DETAIL_DATA {
  "id": number,
  "createDate": string,
  "logisticsUserId": string,
  "logisticsUser": string,
  "baravordFeeKala": number,
  "baravordkolMandeh": number,
  "supporterUser": string,
  "supporterUserId": string,
  "etebar": number,
  "financialDataEntryDate": string,
  "financialUserId": string,
  "financialUser": string,
  "count": number,
  "approveStateId": number,
  "approveState": string,
  "approveDate": string,
  "approverUserId": string,
  "approverUser": string,
  "warehouseOrderTrackingCode": string,
  "warehouseOrderId": number,
  "purchaseOrderId": number,
  "purchaseOrderTrackingCode": string,
  "requestCaseTrackingCode": string,
  "requestCaseId": number
}


export interface I_FINANCIAL_Q {
  "requesterUser": string,
  "purchaseOrderCount": number,
  "purchaseOrderId": number,
  "purchaseOrderTrackingCode": string,
  "requestCaseId": number,
  "requestCaseTrackingCode": string,
  "requestCaseCreateDate": string,
  "commodityId": number,
  "requestCaseCommodityId": number,
  "countOfDone": number,
  "commodityName": string,
  "purchaseTrackingCode": string,
  "requiredDate": string,
  "purchaseOrderDetailsId": number,
  "warehouseOrderId": number,
  "warehouseTrackingCode": string
}



