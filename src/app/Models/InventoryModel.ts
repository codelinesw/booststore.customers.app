export interface InventoryModel {
  idInventory: number;
  idShop: number;
  idWarehouse: number;
  warehouses: string;
  idProduct: number;
  productName: string;
  qty: number;
  qtyAvailable: number;
  qtyUsed: number;
  description: string;
  dateCreated: string;
  dateUpdated: string;
}