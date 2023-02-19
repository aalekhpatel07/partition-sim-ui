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
            return loadCluster()
            .then(mapping => {
                set({
                    nodeIds: Object.keys(mapping),
                    mapping
                });
            });
        },
    }
}

export const cluster = createCluster();