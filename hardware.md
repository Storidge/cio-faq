---
title: Hardware
description: What are the hardware requirements to run Storidge software?
lang: en-US
---

# Hardware

### Is there a hardware compatibility list?

There is no compatibility list. However there are minimum resource recommendation listed [here](https://docs.storidge.com/prerequisites/hardware.html).

### Does Storidge come as a hardware appliance?

Storidge is delivered as software only. However we do work with hardware vendors for users who prefer an integrated appliance.

### Should nodes in a cluster be configured exactly the same?

No. Nodes in a cluster can have different configurations of drives and drive type. Storidge will automatically discover and group drives accordingly.

However, it is recommended to have balanced capacity across nodes to maximize capacity usage and minimize recovery time when a node fails.

### Is dual 10GbE required? How much would performance be degraded by single 1GbE?

The network interface will depend on your application performance requirements, i.e. data throughput. The Storidge CIO software will work fine with both. We’ve also tested with 100GbE on bare metal servers.

A 1GbE support max 125MB/s. After deducting for encoding and overhead, you can assume a sustained throughput of  60MB/s on the conservative side. 10GbE will be about 10x the throughput so if you need more performance, then 10GbE can be considered.

The Storidge CIO software has a data locality feature. So unlike most software defined storage, the network bandwidth is efficiently used since most of the read I/Os are local to the node, i.e. the network bandwidth is used mostly for write I/Os. You can factor this into your decision for network requirements.

### Why are dual network interfaces recommended in hardware requirements, e.g. dual 1GbE or dual 10GbE?

While Storidge CIO will operate off one network interface, dual interfaces provides greater network bandwidth and isolation. It allows one interface to be dedicated to internode storage traffic (backend), and the second interface assigned for frontend applications.

This is particularly important for use cases where data throughput from frontend applications conflicts with internode storage traffic. Use a dedicated network interface for the storage network.

When creating the Storidge cluster, you can specify which network interface to use with the `--ip` flag, e.g. run `cioctl create --ip 10.0.1.51`. When you run the `cioctl node join` command on the storage nodes, it will suggest an IP address from the same subnet.

### Does Storidge CIO work on 100GbE interfaces?

Yes, Storidge CIO has been tested with 100GbE interfaces on bare metal servers.

### How do I specify which network interface Storidge uses? I have multiple network interfaces

When you run `cioctl create` to start a cluster, it detects the network interfaces, lists them, and will suggest the first IP address. Example:

```
root@cio1:~# cioctl create
There are multiple IP addresses on this system (138.68.50.155 on eth0, 10.46.0.5 on eth0, 10.138.148.183 on eth1).
Re-run the create command by specifying the IP address with the --ip flag, e.g.:
    cioctl create --ip 138.68.50.155
```

In this example, Storidge lists three IP address and suggests the first one (138.68.50.155). However you may want to use something else. Replace the suggested IP address using the `--ip` flag.

For example, to specify network interface eth1 on subnet 10.138.148.0, run `cioctl create --ip 10.138.148.183` to start the cluster.
