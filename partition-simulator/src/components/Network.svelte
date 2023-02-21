<script lang="ts">
    import { onMount } from "svelte";
    import { Network } from "vis-network/standalone/umd/vis-network.min";
    import type { Options as NetworkOptions } from "vis-network/standalone/umd/vis-network.min";
    import type { Node as NetworkNode, Edge as NetworkEdge } from "../types/network";
    import { loadCluster } from "../api/cluster";

    let network: Network;
    let container: HTMLElement;

    let nodes: Array<NetworkNode<string>> = [];
    let edges: Array<NetworkEdge> = [];
    
    let isLoading: boolean = false;

    async function loadGraphData(): Promise<{ nodes: Array<NetworkNode<string>>, edges: Array<NetworkEdge> }> {
        let cluster = await loadCluster();
        nodes = cluster.map(node => ({
            id: node.uuid,
            label: node.address
        }));

        edges = [];
        nodes.forEach(nodeFrom => {
            nodes.forEach(nodeTo => {
                if (nodeFrom.id !== nodeTo.id) {
                    edges.push({
                        from: nodeFrom.id,
                        to: nodeTo.id,
                    });
                }
            })
        });

        return {
            nodes,
            edges
        }
    }

    let options: NetworkOptions = {
        interaction: { 
            hover: true,
            selectConnectedEdges: false
        },
        manipulation: {
            enabled: true,
            addNode: false,
            editEdge: false,
            deleteNode: false
        },
        autoResize: true,
        edges: {
            physics: false,
            arrows: 'to',
            label: "can talk to"
        },
    };


    function handleEdgeSelected(e: any) {
        console.log("edge selected", e);
    }
    function handleEdgeDeselected(e: any) {
        console.log("edge deselected", e);
    }

    async function refresh() {
        isLoading = true;
        network.setData(await loadGraphData());
        isLoading = false;
    }

    onMount(() => {
        network = new Network(
            container, 
            {
                nodes: [],
                edges: []
            },
            options
        );
        network.on('selectEdge', handleEdgeSelected);
        network.on('deselectEdge', handleEdgeDeselected);
        refresh();
    });

</script>
<div class="h-full w-full" bind:this={container}></div>