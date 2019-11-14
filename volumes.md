---
title: Volumes
description: What is the maximum size for a volume provisioned by Storidge?
lang: en-US
---

# Volumes

### What is the maximum size for a volume provisioned by Storidge?

Volumes provisioned by Storidge can be up to 64TiB in capacity.

### What is the minimum size for a volume provisioned by Storidge?

Volumes provisioned by Storidge starts from 1GiB. Since volumes can be thin provisioned, the actual capacity consumed could be as little as 32MiB.  

### Can a Storidge volume be bigger than the size or capacity of drives on a node?

A Storidge volume can be bigger than the capacity on a node. However data access will not be local for some read I/Os.
