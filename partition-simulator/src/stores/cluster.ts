import { writable } from 'svelte/store';
import type { Cluster } from '../types/models';
import { loadCluster } from '../api/cluster';

function createCluster() {
    const { subscribe, set } = writable<Cluster>({
        mapping: {},
        nodeIds: []
    });

    return {
        subscribe,
        load: async () => {
            return loadCluster().then((response) => {
              set({
                nodeIds: response.map((node) => node.uuid),
                mapping: Object.fromEntries(
                  response.map((node) => [node.uuid, node.address])
                ),
              });
            });
        },
    }
}

export const cluster = createCluster();