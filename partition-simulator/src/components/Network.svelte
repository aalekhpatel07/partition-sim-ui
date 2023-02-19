<script lang="ts">
    import { cluster } from "../stores/cluster";
    import Icon from "./Icon.svelte";

    let loading = false;

    async function loadCluster() {
        loading = true;
        await cluster.load();
        loading = false;
    }

</script>
<div class="card">
    <div class="card-header">
        <div class="card-header-title">
            Cluster Info
        </div>
    </div>
    <div class="card-content">
        {JSON.stringify($cluster)}
    </div>
    <div class="card-footer">
        <div class="card-footer-item">
            <button 
                type="button" 
                class="button is-rounded is-primary"
                class:is-loading={loading}
                disabled={loading}
                on:click={loadCluster}
            >
                <Icon name="refresh" /> &nbsp; Reload
            </button>
        </div>
    </div>
</div>