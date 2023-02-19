import type { Address, Cluster, Uuid } from '../types/models';
import { get } from './common';

export type LoadClusterResponse = Record<Uuid, Address>;
export type LoadClusterError = string;

export async function loadCluster(): Promise<LoadClusterResponse> {
    return get<LoadClusterResponse, LoadClusterError>('load_cluster');
}