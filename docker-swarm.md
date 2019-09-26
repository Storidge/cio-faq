---
title: Docker Swarm
description: Are swarm nodes in storidge cluster or are they separate?
lang: en-US
---

# Docker Swarm

### Do Swarm cluster nodes join the Storidge cluster, or they are separate?

The Storidge software runs hyper-converged with the Swarm, i.e. they can be the same nodes. Just as Swarm provides orchestration for containers, Storidge provides orchestration for volumes in the cluster.

### Do all Swarm nodes need to be members of the Storidge cluster, or can Storidge nodes be a subset of Swarm?

Not all Swarm manager nodes have to be in the Storidge cluster. The Storidge cluster just needs to have at least one Swarm manager node.

### How can I setup a Storidge cluster without running your install script? We bootstrap Swarm nodes already.

The install script handles installation into pre-existing clusters. It first checks for Kubernetes and Docker swarm. If neither is present that it configures a Swarm cluster and launches a Portainer service. If either K8S or Swarm is present, it only setups the CIO cluster.

For pre-existing Swarm clusters, the Storidge software still needs 3 raw block devices per node, i.e. no filesystems or partitions. The install will automatically discover and add any raw devices available to the storage pool.
