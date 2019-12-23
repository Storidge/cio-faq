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

### Can a Storidge volume be bigger than the size or capacity of drives on a node?

Since capacity is a shared cluster resource, a Storidge volume can be bigger than the local capacity on a node. However data access will not be local for some read I/Os.

### How many volumes can I create on a node?

Storidge CIO supports up to 4095 volumes on each node. This enables running more containerized applications on each node as the number of attached drives per cloud instance is very limited.
