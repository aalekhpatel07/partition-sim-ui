
export type Uuid = string;
export type Address = string;

export interface Cluster { 
    mapping: Record<Uuid, Address>,
    nodeIds: Array<Uuid>,
}