---
title: Volumes
description: Questions on Storidge volumes for Docker Swarm and Kubernetes
lang: en-US
---

# Volumes

### What is the maximum size for a volume provisioned by Storidge?

Volumes provisioned by Storidge can be up to 64TiB in capacity. This is a limit of filesystems and not the Storidge driver.

### What is the minimum size for a volume provisioned by Storidge?

Volumes provisioned by Storidge starts from 1GiB. Since volumes can be thin provisioned, the actual capacity consumed by a volume could be as little as 32MiB.

### Is my maximum Storidge volume size equal to total size of physical disks attached to a node?

Storidge aggregates all storidge devices in the cluster into a storage pool. This allows any volume to be larger than actual capacity on a node. This is the advantage of having a true abstraction layer. The underlying physical limitations are invisible to applications.

For example, three 100GB drives attached to each node of a five node cluster means total storage pool size of 1.5TB. A single volume could be as large as 700GB, assuming a 2-copy volume.

When a volume exceeds local attached capacity, some of the read I/Os will have to cross the network to capacity on other nodes.

### How many volumes can I create on a node?

Storidge CIO supports up to 4095 volumes on each node. This enables running more containerized applications on each node as the number of attached drives per cloud instance is very limited.
