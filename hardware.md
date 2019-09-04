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
