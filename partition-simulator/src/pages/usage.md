---
title: Usage
layout: ../layouts/MarkdownPage.astro
---

# Usage

Individual `node`s work as docker containers and form a cluster of test nodes. They register their address and ports with `Consul` when they're ready
to serve requests. The nodes also register an http healthcheck with Consul so that they can be monitored periodically.

The `supervisor` node is the orchestrator node that tweaks the `iptables` rules on the whole test cluster. The supervisor loads the state of the cluster
by querying Consul. Once the cluster under test is loaded by the supervisor (via `/api/v1/load_cluster`), the supervisor is ready to serve the Partition API.

The supervisor understands the following network-related mutations and queries:

1. `Partition` - `POST api/v1/partition/<source_id>/<target_id>`: Given ids of a source and a target node, configure the firewall on the target node such that all packets coming from the source node are dropped.
2. `Heal` - `POST api/v1/heal/<source_id>/<target_id>`: Given ids of a source and a target node, configure the firewall on the target node such that all packets coming from the source node are accepted.
3. `Restore` - `POST api/v1/restore`: Clear all the firewall rules across the cluster so that all nodes can communicate with each other.
4. `Rules` - `GET api/v1/rules/<target_id>`: Given id of a target node, list all the `INPUT` rules currently configured on the target node. -->