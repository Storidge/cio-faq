---
title: Nodes
description: Questions on Storidge node operations for Swarm and Kubernetes
lang: en-US
---

# Nodes

### Do you have a node label for Storidge or cio nodes? It would help for service constraints.

Active cio nodes have label 'cio=true'. When a cio node is cordoned for maintenance, the label will be changed to 'cio=false'

### How do I add a node label cio=true for Storidge node?

To add back a missing label for node NODENAME, run:

```
docker node update --label-add cio=true NODENAME
```

### Can I add new nodes for more services, and then pull them when not needed?

Adding and removing nodes dynamically is supported and really simple. Run the `cioctl join-token` command to create a session token. Then copy and paste the `cioctl add` command string to the new node.

For examples, checkout the guide for [Adding a node](https://guide.storidge.com/getting_started/add_node.html), and [Removing a node](https://guide.storidge.com/getting_started/remove_node.html).

### What happens to the volume if a container is rescheduled to another node?

Storidge has a storage orchestrator built in. If a container is rescheduled, the storage orchestrator automatically moves the volume to the new node so the scheduler can restart the app immediately.

If a node fails, the volume is detached and temporarily attached (parked) on a backup node. When the scheduler restarts the container on a new node, the storage orchestrator will reattach the volume to the new node. The Storidge abstraction layer ensures that a container always has access to their data even as recovery operations to rebuild data redundancy are running in the background.

### Can services on a node consume more capacity than amount of storage attached to that node?

Storidge auto discovers and adds all attached block storage to a storage pool. The resources in the storage pool are shared and presented as an abstraction layer to applications. This abstraction layer makes it possible for services on a node to consume more capacity than is actually attached to a node.

See [How it works](https://docs.storidge.com/introduction/how_it_works.html) for more info on the Storidge abstraction layer.

### What happens to the data when a node is in maintenance mode? Does all the data have to be rebuilt?

When a node is placed in maintenance mode, Storidge turns on Changed Block Tracking (CBT) to keep track of which blocks have been changed. When a node exits maintenance mode and rejoins the cluster, Storidge will automatically rebuild the changed blocks on the previously cordoned node. With CBT, the rebuild operation completes much faster and have minimal performance impact on running applications.

### Does Storidge support changed block tracking to minimize time for node rebuilds?

Yes, when a node is placed in maintenance mode, Storidge turns on Changed Block Tracking (CBT) to keep track of which blocks have been changed. When a node exits maintenance mode and rejoins the cluster, Storidge will automatically rebuild the changed blocks on the previously cordoned node. With CBT, the rebuild operation completes much faster and have minimal performance impact on running applications.

### How do I 'clean state' a node?

Sometimes it may be necessary to clean state a failed node for reuse. This removes configuration information that makes a node part of a cluster.

Run `cioctl node clean --force` to ignore current node status, and force a node to clean state.

To verify that a node is clean, run `cio info`. It should return a message that the system is not initialized. Example:

```
[root@c4 ~]# cio info
System is not initialized
```

### `docker node ls` shows one of the node status is down? How do I recover?

Run `systemctl restart docker` to restart the docker daemon.

If the node status is still down, run `docker ps` on the node to verify there are no services running on the node. Then perform a hard reset or power cycle the node.


### What is the maximum configuration for number of drives, volumes, volume capacity, IOPS, etc.?

The Storidge software supports logical limits that exceeds what most environments will hit. For example, you can attach up to 100 drives per node, provision up to 4095 volumes per node, and support up to 64TB volume capacity.

The IOPS minimum is 30 but IOPS maximum is only limited by the actual hardware. On NVME drives, we've tested 800K IOPS on a 2-copy, 30GB volume at 4K I/O block sizes. The performance numbers were collected with fio.
