---
title: Nodes
description: Questions on Storidge node operations for Swarm and Kubernetes
lang: en-US
---

# Nodes

### Do you have a node label for Storidge or cio nodes? It would help for service constraints.

Active cio nodes have label 'cio=true'. When a cio node is cordoned for maintenance, the label will be changed to 'cio=false'

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
