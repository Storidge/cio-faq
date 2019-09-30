---
title: Cluster
description: Questions on operating a Storidge cluster for Swarm and Kubernetes
lang: en-US
---

# Cluster

### If we have to migrate volumes to another location, is it easy with this plugin?

Moving a volume from one cluster to another cluster at a different location is a roadmap item.

Concept is similar to Docker engine but for storage. As long as a Storidge engine is there, you can move the volume with a `volume move` command to a different cluster.

### What about split brain? Do you need three managers minimum like Swarm?

Certain nodes have a manager/leader function. For Storidge, the leader is the sds node. This represents the control plane through which commands go to for processing. There are two other backup controller nodes to ensure there is no single point failure for the control plane.

### Mounting cloud service provider block storage is already one mount. On node failure, isn't remounting the block storage on a new node adding more latency?

Mounting and unmounting cloud block storage takes a long time and is sometimes not consistent or reliable. That's why the Storidge software leaves the cloud block storage mounted on instances, and creates a shared storage pool/abstraction layer from the mounted block storage.

Virtual volumes for containers are created from the storage pool. The virtual volumes are seen as local Linux block devices which are formatted with the filesystem of choice. This enables the Storidge volumes to be quickly and reliably mounted/unmounted on demand, as the scheduler restarts apps on different nodes. This abstraction layer shields applications from the limitations of the underlying cloud infrastructure.

For more info on the abstraction layer, read the [How It Works blog](https://docs.storidge.com/introduction/how_it_works.html)

### Currently rebooting all my cluster instances for patches means tons of downtime. How does updates for Storidge cluster work?

Storidge supports online updates. The `cioctl node update` command is provided to simplify updates.

If an update is available, the node is cordoned, services drained to other nodes, update software is downloaded and installed. When the software installation is completed, the node is rebooted and automatically rejoins the cluster.

See the [docs for node maintenance](https://docs.storidge.com/cioctl_cli/node.html#cioctl-node-add).

### Why does Storidge do data collection during cluster initialization?

On physical servers with flash memory devices (e.g. SSD or NVME drives), the Storidge software runs a data collection process as part of cluster initialization. This is about a 30 minute process to gather performance data on the cluster. The end result is an IOPS and bandwidth budget that is used by the QoS capability to allocate performance on demand to individual volumes.

As performance limits are assigned to applications, the Storidge software will adjust the IOPS and bandwidth budget. If there is insufficient performance available to support guaranteed performance for all apps, you will get an event notification.

### If I create a single node cluster do I still run `cioctl init <token>` command?

For single node cluster, run `cioctl create` to start a cluster, then run the `cioctl init <token>` command to initialize the cluster for use. When initialization completes, you can login and start running apps.

You can also run the `cioctl create --single-node` command to create a single node cluster. This will automatically create a cluster and initialize it. When initialization completes, just login and begin running apps.

### If I have four VMs with 3 x 100GB drives, how much usable storage does that create?

The Storidge software only uses 1GB per drive for metadata, so the rest is usable capacity.

We do pre-allocate capacity from each node at the beginning, so the available capacity may look a bit lower. The reason is so that as host I/Os comes in, we can allocate capacity to thin provisioned volumes on the fly. This eliminates the latency of issuing a request across the network to another node to get new volume capacity allocated.
