# General

### Will there always be a "community" (free) edition? Or do I get presented with a license fee later?

Yes, there will always be a Community Edition (free). Note that the free edition is up to 5 nodes and 10 TBs of capacity.

The generous limits are there so the Community Edition can be deployed for serious work.

### What are the limits of the Community Edition (CE)?

The Community Edition is free forever. It does have a limit of up to 5 Storidge nodes in a Swarm or Kubernetes cluster. The storage capacity in the cluster is limited to 10 TBs.

We will be announcing Workgroup Edition and Enterprise Edition if you want to add extra functionality, e.g. more nodes and capacity, multi-zones for higher availability, auto tiering, etc.

### Can Storidge run in the cloud? On premise? Both?

Storidge clusters run in cloud instances, virtual machines or bare metal servers on premise.

Delivering the same API, CLI and user experience across all platforms saves time as there is no more waiting for data center resources to free up. Developers can write apps off a VirtualBox cluster on their laptop and know that it will operate the same way on the cloud.

### Is there a plan on Ubuntu 18.04 LTS support?

We are currently porting to the 4.15 Linux kernel. RHEL 8 and Ubuntu 18.04 is out but we are just waiting for Centos 8 to be released. We expect this to happen soon and anticipate Ubuntu 18.04 support in early Q4.

### When is support for 4.15 Linux kernel available?

We are waiting for Centos 8 to drop before adding support. This will likely happen in the next few weeks, at which point we will port for both Centos 8 and Ubuntu 18.04. Actual port is partially completed already.

### Does Storidge have training resources where I can learn more or share with others?

Yes, you can get an overview of the key capabilities and benefits of the CIO software through our [Introduction](https://guide.storidge.com/what_is_cio/introduction.html).

Next our [Getting Started guide](https://guide.storidge.com/getting_started/install.html) has exercises that step through software installation, creation of a cluster, and highlights commonly used commands and important use cases. Step through these exercise at your own pace and share them with your team.

### I would like to dig deeper into Storidge CIO capabilities? What resources do you have available?

Here is a [list of resources](https://github.com/Storidge/resources) to get started. We will be continuing to update the list with more integrations, tools and information so please check back.

### What is a “noisy neighbor” issue?

A noisy neighbor issue is a term used in the storage industry for a situation that happens when the same resource (file system or storage system) is being used for multiple services or workloads. These 'neighbors' are sharing the same resource. Just as having loud neighbors prevents you from hearing your own television, having a neighbor in your file system who takes up more bandwidth or performance than you do prevents you from running your own processes at optimal capacity.

### How is block storage better for noisy neighbor issues?

Solving noisy neighbor issues requires performance isolation to limit impact and to enable active quality of service (QoS) management. Block storage can be architected for low latency to enable performance management per application. Non-shared volumes with QoS is the best way to isolate noisy neighbors and deliver guaranteed service level agreement (SLA) for applications.

### Why do you use block storage instead of file system?

File systems are a shared medium. While file systems can aggregate the performance of multiple drives and multiple nodes, the overhead and added latencies makes it difficult to optimize the storage stack, and deliver performance management for individual applications.

This is why Storidge starts with a block storage foundation for low latency, and then layer in the desired file system for each application on demand.

### Why use containers when VMs provide better isolation and security?

It is not an either or choice. For some applications, containers can be deployed inside of VMs for improved security. For single tenant, single application environments containers provides tremendous savings from server consolation by avoiding overhead of running in VMs.

The value of containers is in enabling a new way of building applications based on “micro-services.” Many new applications that might have been deployed directly in VMs can now be deployed in containers. This will have profound effects on programming, systems management and the operational model. Ultimately containers will erode virtualization positions even in environments where it is not completely eliminated.

### Why is consistent hashing not the future for primary storage?

When [consistent hashing](https://www.acodersjourney.com/system-design-interview-consistent-hashing/) is applied to storage, the computed hash determines the location of data within a cluster (i.e. it locks the data to one location and to one drive type). The location of the data is only re-computed when the size of the cluster changes (e.g. when additional capacity or nodes is added). While this works well for object storage, it creates limitations for applications where high performance and manageability is valued:   

-	With data location fixed by a hash, data locality is not possible (i.e. cannot place data on node where the application is running). This can be mitigated with additional cost through a local cache, however caching does not work for some use cases. Consistent hashing results in greater network bandwidth consumed even for read operations. This issue is exacerbated for large file transfers where data is stripped across multiple nodes (e.g. media files or video streaming).

-	In addition to consuming network bandwidth that could have been otherwise used for write operations, crossing the network also adds variable latency. As latencies increase, delivering quality of service (QoS) guarantees to applications becomes very difficult or impossible. This is why no software defined storage implementation provide minimum IOPS guarantees.

-	With data locked to one drive type, automatic tiering of data based on frequency of access is not possible. Instead a decision to select the correct storage type must be made prior to deployment. Changing the storage type to optimize performance or cost requires planned data migration and administrative overhead.

### Why is automatic data locality better than consistent hashing?

Storidge’s automatic data locality feature means most application I/Os are serviced on the local node. Unlike [consistent hashing](https://www.acodersjourney.com/system-design-interview-consistent-hashing/) which introduces variable network latency, data locality ensures consistent performance for applications when a container is rescheduled to a different node. It also makes more efficient use of available network bandwidth and delivers greater data throughput.

Automatic data locality eliminates the need to set node constraints to force data locality. It also saves the need to install and maintain APIs for coordinating workload placement with a scheduler. Instead the scheduler can freely place workloads based on available resources, and data is automatically moved to the application.

### Why present volumes as “local storage” on a node? Are you swapping one kind of latency for another?

Storidge presents storage as a local block device. This approach greatly reduces latency, similar to how NVMe flash devices deliver much higher performance than SSDs by eliminating the overhead of SCSI protocols.

Storidge supports shared storage by enabling any volume to be shared through protocols such NFS, SMB, S3, etc. These network interfaces are presented as a stateless service. This approach means that the latency and compute costs of network storage is only incurred by a minority of applications. The majority of containerized applications benefit from having high performance, direct access to storage.

### Why is Storidge more scalable?

Scalability is inversely related to complexity, latency and degree of sharing. For example, storage area networks are hard to scale because of widely disparate components (servers, network, storage systems). High latencies greatly reduce the rate of atomic operations which are necessary for maintaining data consistency. Sharing requires synchronization methods, which in turn creates bottlenecks (e.g. metadata of file systems).

Storidge is built around the concept of small building blocks that are interchangeable horizontally across nodes, and vertically across tiers of storage. This is much simpler than trying to manage non-homogeneous storage boxes with different performance and capabilities.

Storidge is architected to minimize latency in the storage stack. Methods include a block based foundation, in kernel modules, and presenting storage as a local device to eliminate latency and the compute costs of network storage protocols.

The metadata in a Storidge cluster is truly distributed. Unlike file systems with centralized metadata and ultimately limited scalability, each node in a Storidge cluster manages the metadata of the virtual disks for which it has ownership. Since metadata is in the data path, this eliminates the latency of referencing a “master controller”.

### What is persistent storage? I thought all storage persists data

Persistent storage is any storage device or system that retains data after power is turned off. Persistent storage can be in the form of file, block or object storage. Because data persistence is assumed, this property is rarely mentioned in specifications for storage devices and systems.

Storage persistence was recently raised as an issue because of the rapid adoption of Docker containers for developing, packaging and deploying applications. Containers were initially stateless and did not support data persistence. Any data created by a containerized app would disappear when the application stopped running and the container was deleted.

Later it became obvious there are use cases where data need to persist beyond the lifecycle of a container. This gave rise to concepts of [bind mounts](https://docs.docker.com/storage/bind-mounts/), [data containers](https://hackernoon.com/docker-data-containers-cb250048d162), and [docker volumes](https://docs.docker.com/v17.09/engine/admin/volumes/volumes/) with varying degrees of persistence.

Today persistent storage options for containers has expanded greatly through [volume plugins](https://docs.docker.com/engine/extend/plugins_volume/) which enable many forms of storage, including traditional and external network storage, to provide data persistence for containerized apps. In particular, the industry has coalesced around the [Container Storage Interface](https://github.com/container-storage-interface/spec) specifications to unify the storage interface for container orchestration systems like Docker Swarm and Kubernetes.

Storidge's CIO software provisions and simplifies management of persistent storage for containerized applications.

### What is cloud native storage?

The Cloud Native Computing Foundation defines [cloud native](https://github.com/cncf/toc/blob/master/DEFINITION.md) as an approach to building and running scalable apps in dynamic, automated environments. Containers, microservices, and immutable infrastructure managed through declarative APIs on an orchestration system exemplifies this approach.

Cloud-native applications are containerized apps designed to run on cloud infrastructure, hence the term ‘native’. The storage consumed by such apps could be ephemeral. However storage for stateful apps must be persistent.

Cloud native storage is a term used to describe storage for cloud native applications. This description is however overly broad, and easily misused. A better approach is to clarify the qualities cloud native storage must have to efficiently cope with very scalable apps in a dynamic environment, managed by highly automated systems. Cloud native storage should:

- automate storage operations and abstract underlying storage infrastructure

- tightly integrate and interoperate with container orchestrators

- easily scale capacity and performance to address elastic demand

- ensure consistent performance for dynamic, mobile containerized apps

- provide differing storage capabilities and services according to workloads

- automate the lifecycle of storage

Refer to [Cloud Native Storage](https://guide.storidge.com/cio_vs_others/cloud_native_storage.html) for details on the challenges cloud native environments pose to storage.

### The docs.storidge.com and guide.storidge.com domains are unavailable for me

Check your DNS settings and company VPN.

Since the documentation are Vuepress based with github repos, they can also be made accessible locally. See the repo for [user guide](https://github.com/Storidge/cio-userguide) and [docs](https://github.com/Storidge/cio-userdocs).

You can git clone the projects, run `vuepress build` in a Vuepress environment, and view the documentation locally.
