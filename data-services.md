---
title: Data Services
description: What data services are available for docker containers and swarm services?
lang: en-US
---

# Data Services

### Can I limit the space a volume takes? Currently running out of space is show stopper for applications.

Storidge create volumes from a shared storage pool. Most Storidge volumes are thin provisioned (thick provisioning available also) at specified capacity. If the capacity is not grown, that's the limit the application is allowed to consume. Storidge provides event messages at 70%, 80% and 90% volume capacity used, so operators can take steps to grow capacity using resources from the storage pool.

In addition, Storidge has an auto expansion service. When a pre-defined capacity threshold is crossed, the volume is automatically increased at both the block and file system level. The capacity expansion happens while the application is online, which means there is no disruption to the application. See the guide on [auto capacity expansion](https://guide.storidge.com/getting_started/autoexpand.html)

### What is the impact of data locality on read performance and latency? For instance, after node fails and volume moves to a new node.

After the volume from the failed node is moved, as host I/Os comes in on the new node, locality rebuild is triggered if data is not found locally. Capacity is allocated locally and a copy of data is copied to the node (i.e. data is rebuilt), while a remote copy of the data is deallocated. So the penalty is only on the first read as subsequent reads will read the local copy.

The entire volume does not need to be rebuilt as a containerized application and its volume may eventually be rescheduled to other nodes for various reasons.

For more info, read the [Effortless Data Locality blog](https://storidge.com/blog/effortless-data-locality-with-storidge/)

### Can Storidge provide NFS services?

Yes, Storidge supports the concept of an interface container for NFS. This puts a stateless NFS container in front of any volume and allows access to the NFS share from anywhere in the cluster or outside the cluster.

Possible use case are 1) easy sharing of data between containerized workloads and apps running in virtual servers on the local subnet, 2) migrating data from outside the Storidge cluster to containerized workloads running in the cluster.

### How does the replication layer handle concurrent access from multiple hosts?

Multi access to a volume across a cluster of nodes requires a shared volume. Storidge allows any volume to be turned into a shared volume through an NFS interface container. This associates a stateless NFS container with the volume which travels with the volume if it is rescheduled to a different node. Since the NFS container is assigned a persistent IP address off a macvlan interface, this means moving the shared volume to a new node is transparent to the service replicas using it, e.g. on a node failure.

On the backend as host I/Os are received by the NFS instance, the I/Os are passed through the file system to the shared volume presented by our block device driver. The replication for the volume happens at the block level and is strictly consistent.
