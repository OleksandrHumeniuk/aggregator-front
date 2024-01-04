import type { City } from './city';

export enum DeliveryTypeEnum {
  WarehouseWarehouse = 'Склад-Склад',
  WarehouseDoors = 'Склад-Двері',
  DoorsWarehouse = 'Двері-Склад',
  DoorsDoors = 'Двері-Двері',
}

export enum ProviderEnum {
  NovaPoshta = 'Нова Пошта',
  UkrPoshta = 'УкрПошта',
  Delivery = 'Делівері',
}

export type DeliveryType = keyof typeof DeliveryTypeEnum;
export type ProviderType = keyof typeof ProviderEnum;

export type Query = {
  id: string;
  senderCity: City;
  receiverCity: City;
  weight: number;
  width: number;
  height: number;
  length: number;
  accessedCost: number;
  deliveryType: DeliveryType;
};

export type QueryResponse = Query & {
  provider: ProviderType;
  cost: number;
};
