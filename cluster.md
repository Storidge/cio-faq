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

### How does updates for Storidge cluster work? Currently rebooting all my cluster instances for patches means tons of downtime.

Storidge supports online updates. The `cioctl node update` command is provided to simplify updates.

If an update is available, the node is cordoned, services drained to other nodes, update software is downloaded and installed. When the software installation is completed, the node is rebooted and automatically rejoins the cluster.

See the [docs for node maintenance](https://docs.storidge.com/cioctl_cli/node.html#cioctl-node-add).

### Why does Storidge do data collection during cluster initialization?

On physical servers with flash memory devices (e.g. SSD or NVME drives), the Storidge software runs a data collection process as part of cluster initialization. This is about a 30 minute process to gather performance data on the cluster. The end result is an IOPS and bandwidth budget that is used by the QoS capability to allocate performance on demand to individual volumes.

As performance limits are assigned to applications, the Storidge software will adjust the IOPS and bandwidth budget. If there is insufficient performance available to support guaranteed performance for all apps, you will get an event notification.

### If I create a single node cluster do I still run `cioctl init <token>` command?

For single node cluster, run `cioctl create` to start a cluster, then run the `cioctl init <token>` command to initialize the cluster for use. When initialization completes, you can login and start running apps.

You can also run the `cioctl create --single-node` command to create a single node cluster. This will automatically create a cluster and initialize it. When initialization completes, just login and begin running apps.

### How is total capacity, used capacity, free capacity and provisioned capacity calculated?

The `cio info` command returns information about total, used, free and provisioned capacity in the cluster.

**Total capacity** is the raw capacity of all drives in the storage pool, minus space allocated for metadata. Storidge reserves 1GiB per drive for metadata. Using a 5 node cluster with three 100GiB drives per node as an example:

   5 nodes x 3 100GiB = 1500GiB - (1GiB x 15 drives) = 1485GiB total capacity in storage pool

**Used capacity** is capacity that is allocated to both thin and thick provisioned volumes, plus capacity that is pre-allocated to each node. When data requests are received, the pre-allocated capacity are assigned to thin provisioned volumes so I/O requests can be completed immediately. This eliminates the latency of issuing a request across the network to another node to get volume capacity allocated.

For example, with a 100GiB, 2 copy thick provisioned volume:

   100GiB x 2 copy = 200GiB used by volumes

5 nodes x 50 allocation units x 16MiB = 4GiB pre-allocated capacity

   200GiB + 4GiB = 204GiB used capacity

**Free capacity** is total capacity in storage pool minus the used capacity, i.e.

   Total capacity - Used capacity = Free capacity

**Provisioned capacity** is the specified capacity for all volumes (thin or thick provisioned) and includes capacity used for data redundancy. Since volumes can be thin provisioned, the provisioned capacity can be much larger than physical capacity actually in the cluster, i.e. capacity can be overprovisioned.

Example with one 100GB, 2 copy thin provisioned volume and one 100GB, 3 copy thin provisioned volume:

   (1 volume x 100GiB x 2 copy) + (1 volume x 100GiB x 3 copy) = 500GiB provisioned capacity

**Allocated %** is the percentage number of allocation units assigned to a volume. Thick provisioned volumes are always 100% allocated. For example a 1GiB, 2 copy thick provisioned volume will have 128 allocation units:

   1GiB x 2 copy = 2GiB / 16MiB = 128 allocation units

A 1GiB, 2 copy thin provisioned volume with 8 allocation units (128MiB) is:

  8 / 128 x 100 = 6.3% allocated

### Can I reboot a cluster with a missing or failed node?

Storidge supports booting a cluster with one missing or failed node. After the cluster is reformed, the missing or failed node will show status 'maintenance'.

The Storidge software allows 30 minutes for a maintenance node to be restored. If the maintenance node is not recovered and rejoined to the cluster within 30 minutes, it will be automatically removed so rebuild of data that was on the maintenance node can proceed.
