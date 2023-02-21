import type { Address, Cluster, Uuid } from '../types/models';
import { get } from './common';

interface LoadClusterResponseObject {
  uuid: Uuid;
  address: Address;
}
export type LoadClusterResponse = Array<LoadClusterResponseObject>;
export type LoadClusterError = string;

export async function loadCluster(): Promise<LoadClusterResponse> {
    return get<LoadClusterResponse, LoadClusterError>('load_cluster');
}