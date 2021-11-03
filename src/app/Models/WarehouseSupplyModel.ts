export interface WarehouseSupplyModel {
  idWarehouseSupply: number;
  idShop: number;
  idOffice: number;
  idInventoryMovementType: any;
  idWarehouseOutput: any;
  warehouseOutputName: string;
  idWarehouseInput: any;
  warehouseInputName: string;
  tipoMovimiento: string;
  products: Array<any>;
  idProduct: number;
  productName: string;
  qty: number;
  qtyAviable: number;
  qtyUsed: number;
  receivedQty: number;
  description: string;
  idWarehouseManagementType: number;
  idClassification: number;
  dateEntryWarehouse: string;
  dateCreated: string;
  dateUpdated: string;
}