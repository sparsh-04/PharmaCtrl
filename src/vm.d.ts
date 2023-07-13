export interface ILogin {
  // CompanyName: string;
  // Password: string;
  // UserID: string;
  Company: string;
  networkid: string;
  password: string;
}

export interface IStandardAPIResponse<T = any> {
  // Success: Boolean;
  // Message: string;
  // Data: T;

  id: any;
  resultMessage: string;
  sqlString: any;
  errorNo: number;
  dTable: any[];
  columnDetails: any[];
  formLoadData: any;
}
export interface IMenuItem {
  Name: string;
  URL: string;
}
export interface IMenuGroup {
  MenuGroup: string;
  MenuItems: IMenuItem[];
}

export interface IStatusContextType {
  message: string;
  type: string;
  updateStatus: Function;
}
export interface ISideMenuManageContextType {
  open: boolean;
  selectedMenuGroup: string;
  menuGroups: string[];
  updateOpenStats: Function;
  updateSelectedMenuGroup: Function;
  updateMenuGroups: Function;
}

export interface IModelingSearch {
  batcH_SIZE?: string;
  effectivE_DATE?: string;
  haS_WIP?: string;
  Company?: string;
  name?: string;
  BOMID?: string;
  revision?: string;
  boM_STATUSID?: string;
  ordeR_STATUSID?: string;
}

export interface IDrawerOpen {
  isOpen: boolean;
  index?: number;
}
export interface IGRNdetails {
  grNumber: string;
  material: string;
  vendorId: string;
  preparedBy: string;
  arNo: string;
  grnDate: string;
  verifiedBy: string;
  verifiedOn: string;
  company: string;
  shipmentNumber: string;
  sentToQABy: string;
  sentToQAOn: string;
  analyzedBy: string;
  analyzedOn: string;
  qaRemarks: string;
  qaTestDate: string;
  qcApprovedBy: string;
  qcApprovedOn: string;
  qaApprovedBy: string;
  qaApprovedOn: string;
}
export interface IGRNdetail {
  prNumber: string;
  pcDate: string;
  moRecipt: string;
  cForm: string;
  address: string;
  pID: string;
  batchNumber: string;
  mfgDate: string;
  receiptStatus: string;
  expDate: string;
  conditionOfSample: string;
  classificationOfComplaint: string;
  natureOfComplaint: string;
  dateOfReply: string;
  followUp: string;
  remark: string;
}

export interface IMaterialReturns {
  order: string;
  containerId: string;
  workOrder: string;
  materialDispatchNoteId: string;
  line: string;
  createdOn: string;
  workOrderStatus: string;
  batchSize: string;
  status: string;
  effectiveDate: string;
  material: string;
  sfgCode: string;
  description: string;
  quantityIssued: string;
  materialReturnsNoteId: string;
}
