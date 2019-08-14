# Cluster

### Do you have a node label for cio nodes? It would help for service constraints.

Active cio nodes have label 'cio=true'. When a cio node is cordoned for maintenance, the label will be changed to 'cio=false'

### If we have to migrate volumes to another location, is it easy with this plugin?

Moving a volume from one cluster to another cluster at a different location is a roadmap item.

Concept is similar to Docker engine but for storage. As long as a Storidge engine is there, you can move the volume with a `volume move` command to a different cluster.

### What about split brain? Do you need three managers minimum like Swarm?

Certain nodes have a manager/leader function. For Storidge, the leader is the sds node. This represents the control plane through which commands go to for processing. There are two other backup controller nodes to ensure there is no single point failure for the control plane.

### Mounting cloud service provider block storage is already one mount. On node failure, isn't remounting the block storage on a new node adding more latency?

Mounting and unmounting cloud block storage takes a long time and is sometimes not consistent or reliable. That's why the Storidge software leaves the cloud block storage mounted on instances, and creates a shared storage pool/abstraction layer from the mounted block storage.

Virtual volumes for containers are created from the storage pool. The virtual volumes are seen as local Linux block devices which are formatted with the filesystem of choice. This enables the Storidge volumes to be quickly and reliably mounted/unmounted on demand, as the scheduler restarts apps on different nodes. This abstraction layer shields applications from the limitations of the underlying cloud infrastructure.

For more info on the abstraction layer, read the [How It Works blog](https://docs.storidge.com/introduction/how_it_works.html)

### We need to dynamically add new nodes for more services, and then pull them when not needed.

Adding and removing nodes dynamically is already supported and really simple.

Checkout the guide for [Adding a node](https://guide.storidge.com/getting_started/add_node.html), and [Removing a node](https://guide.storidge.com/getting_started/remove_node.html).

### What happens to the volume if a container is rescheduled to another node?

Storidge has a storage orchestrator built in. If a container is rescheduled, we automatically move the volume to the new node.

If a node fails, the volume is detached and parked on a backup node. When the scheduler restarts the container on a new node, the storage orchestrator will reattach the volume to the new node. The Storidge abstraction layer ensures that a container always has access to their data even as recovery operations to rebuild data redundancy is running in the background.

### Can services on a node consume more capacity than amount of storage attached to that node?

Storidge auto discovers and adds all attached block storage to a storage pool. The resources in the storage pool are shared and presented as an abstraction layer to applications. This abstraction layer makes it possible for services on a node to consume more capacity than is actually attached to a node.

### Currently rebooting all my cluster instances for patches means tons of downtime. How does updates for Storidge work?

Storidge supports online updates. The `cioctl node update` command is provided to simplify updates.

If an update is available, the node is cordoned, services drained to other nodes, update software is downloaded and installed. When the software installation is completed, the node is rebooted and automatically rejoins the cluster.

See the [docs for node maintenance](https://docs.storidge.com/cioctl_cli/node.html#cioctl-node-add). 
