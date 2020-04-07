---
title: General
description: What is Storidge CIO, what problems does it solve, and what are the key advantages?
lang: en-US
---

# General

### What is Storidge CIO?

Storidge CIO is the easiest way to automate your cloud storage infrastructure. It operates your storage infrastructure, ensuring data availability so you can focus on the things that matter the most.

Storidge CIO makes it really simple to deploy persistent storage for containerized applications. Support for standard tools, such as Vagrant, Terraform and Ansible, means developers and operators can programmatically deploy an environment for developing and running stateful applications.

See [Introduction](https://guide.storidge.com/what_is_cio/introduction.html) for benefits CIO provides to developers and operators.

### How does Storidge CIO work?

Storidge CIO creates a software abstraction layer using storage resources from a group of hosts. These hosts are bare metal, virtual servers, or cloud instances managed by an orchestration system. Storidge CIO enables you to easily provision volumes from the abstraction layer so stateful apps can persist, manage and share data.

Without Storidge CIO, you have to wait for IT to provision from enterprise storage systems, or provision storage using cloud provider APIs. With Storidge CIO you can use standard tools such as Terraform and Ansible to deploy persistent storage as part of your development environment.

See the [intro guide](https://guide.storidge.com/what_is_cio/introduction.html#why-cio) of the Storidge software and its benefits for developers and operators.

The [How it works](https://docs.storidge.com/introduction/how_it_works.html) link covers how Storidge abstracts infrastructure to create a data management platform for orchestration systems such as Docker Swarm and Kubernetes.

### What key problems does Storidge CIO uniquely solve?

**Automated Storage**
Modern apps run in orchestrated environments with IT out of the provisioning cycle. This is why Storidge developed automated storage with developers and operators as key users.

Automated storage means minimal or no dependency on scarce IT resources. It means storage infrastructure for stateful apps deployable as code. Automated storage provisions volumes on demand, moving data to rescheduled containers, and automatically expanding volume capacity as needed. It means automating failover to ensure high availability for applications, and recovery of data when infrastructure fails - with no operator effort.

**Guaranteed Performance**
Production environments consist of containers with different workloads running on the same server. The higher density of containers with many workloads competing for performance can create unpredictable response times for critical apps.

Storidge solves contention of adjacent container workloads through performance isolation. This unique capability to set granular performance boundaries ensures consistent performance for critical apps, making it easier to predictably scale application performance.

**Data Locality**
Orchestration systems reschedule applications to new nodes for various reasons. This introduces variable network latency and inconsistent performance, creating issues for latency sensitive applications.  

Storidge's automatic data locality rebuilds data on the same node as your container. Only the data used on the new node is rebuilt instead of the entire volume. This both ensures consistent performance while efficiently using a scarce network resource. Operations is greatly simplified as the extra effort to set node constraints or manage API extensions for data locality are eliminated.

**Developer Centric**
Designed for developers, a Storidge cluster is deployable as code using workflow tools such as Packer, Terraform and Ansible. Volumes for stateful apps are easily self-provisioned on demand through CLI/API interfaces, and with declarative inputs using application profiles. Automated storage operations and recovery means developers are no longer dependent on IT availability.

With a storage abstraction layer isolating dependencies on underlying infrastructure, developers continue to work within native environments instead of learning and coding to cloud providers APIs.

**Core, Edge & CLoud**
Applications no longer just run in enterprise data centers. ITOps teams must deploy apps on a variety of platforms and environments - at the core, edge of network, and on the cloud.

Storidge delivers the same CLI, API and user experiences on all platforms, so you can consistently deploy anywhere that best fits your workloads. Applying the same knowledge and processes everywhere speeds workflow, minimizes learning and ensures knowledge, tools and practices are reusable. This uniform approach also eliminates platform lock-in.

**Storage-as-a-Service**
With orchestration systems, IT is out of the provisioning cycle. This is why persistent storage must be delivered as a service so developers and operators can spend their best energies solving business problems and creating value. The storage stack should be an invisible member that is easily integrated into an application stack.

This is why Storidge delivered storage as a software abstraction layer that automates the complexity of storage infrastructure management to deliver storage as a service. Tight integration with orchestration systems enables block, file and object datastores to be provisioned on demand through declarative, programmatic interfaces for cloud native apps and legacy applications.

### What are the major advantages of Storidge CIO?

- Storidge CIO enables development teams to be more productive and operations to be more efficient. It automates storage infrastructure management, so developers can focus on writing applications which create business value.

- Storidge ensures that your stateful applications stay responsive by providing guaranteed performance. This unique capability to set granular performance boundaries ensures consistent performance for critical apps, making it easier to predictably scale application performance.

- Storidge's automatic data locality rebuilds data on the same node as your container. This both ensures consistent performance while efficiently using a scarce network resource. Operations is greatly simplified as the extra effort to set node constraints or manage API extensions for data locality are eliminated.

- A Storidge cluster is deployable as code using workflow tools such as Packer, Terraform and Ansible. Volumes for stateful apps are easily self-provisioned on demand with declarative inputs using application profiles. Automated storage operations and recovery means developers are no longer dependent on IT availability.

- Storidge delivers the same CLI, API and user experiences on all platforms, so you can consistently deploy anywhere that best fits your workloads. Applying the same knowledge and processes everywhere speeds workflow, minimizes learning and ensures knowledge, tools and practices are reusable.

- The Storidge software automates storage infrastructure management to deliver storage as a service. Tight integration with orchestration systems enables block, file and object datastores to be provisioned on demand through declarative, programmatic interfaces for both cloud native apps and legacy applications.

### Which operating systems does Storidge CIO support?

Storidge CIO software currently supports CentOS 7 (3.10 kernel), RHEL 7 (3.10 kernel), Ubuntu 16.04LTS (4.4 kernel), and Ubuntu 18.04LTS (4.15 kernel).

### How does automating performance management benefit my applications?

- Automated performance management enables cloud native applications to scale both vertically and horizontally with consistent and predictable performance.

- Automated isolation between applications delivers guaranteed performance for all applications, without a conflict for resources.

- Storage orchestration and automated data locality ensure frequently accessed data is close to the application, without node constraints or API extensions.

- Performance boundaries can be set or changed to meet growing demands with minimal operator effort.

### How does Storidge CIO compare to cloud native storage, software defined storage, or enterprise storage?

Storidge CIO is a more complete solution to delivering scalable, persistent storage for containers than anything in the market, due to its purpose-built, automated storage stack.

Docker volumes, software defined storage, and enterprise storage are not automated, nor are they specifically designed around orchestrated microservices and highly scalable containers.

Refer to [CIO vs Others](https://guide.storidge.com/cio_vs_others/overview.html) for a more complete comparison.

### Will there always be a "community" (free) edition? Or do I get presented with a license fee later?

Yes, there will always be a Community Edition (free). Note that the free edition is up to 5 nodes and 10 TBs of capacity.

The generous limits are there so the Community Edition can be deployed for serious work.

### What are limits of the Community Edition (CE)?

The Community Edition is free forever. It does have a limit of up to 5 Storidge nodes in a Swarm or Kubernetes cluster. The storage capacity in the cluster is limited to 10 TBs.

### Can Storidge run in the cloud? On premise? Both?

Storidge clusters run in cloud instances, virtual machines or bare metal servers on premise.

Delivering the same API, CLI and user experience across all platforms saves time as there is no more waiting for data center resources to free up. Developers can write apps off a VirtualBox cluster on their laptop and know that it will operate the same way on the cloud.

### Is Ubuntu 18.04 LTS supported?

Support for Ubuntu 18.04 was added in release V1.0.0-2968.

We will be adding support for RHEL 8 and Centos 8, once Centos 8 to be released. We expect this to happen soon and anticipate support in early Q4.

### When is support for 4.15 Linux kernel available?

Support for Ubuntu 18.04 was added in release V1.0.0-2968.

We are waiting for Centos 8 to drop before adding support for both RHEL8 and Centos 8. This is expected to happen early Q4.

### Does Storidge have training resources? Where I can learn more or share with others?

Yes, you can get an overview of the key capabilities and benefits of the CIO software through our [Introduction](https://guide.storidge.com/what_is_cio/introduction.html).

Next our [Getting Started guide](https://guide.storidge.com/getting_started/install.html) has exercises that step through software installation, creation of a cluster, and highlights commonly used commands and important use cases. Step through these exercise at your own pace and share them with your team.

### I would like to dig deeper into Storidge CIO capabilities? What resources do you have available?

Here is a [list of resources](https://github.com/Storidge/resources) to get started. We will be continuing to update the list with more integrations, tools and information so please check back.

### What is a noisy neighbor issue?

A noisy neighbor issue is a term used in the storage industry for a situation that happens when the same resource (file system or storage system) is being used for multiple services or workloads. These 'neighbors' are sharing the same resource.

Just as having loud neighbors prevents you from hearing your own television, having a neighbor in your file system who takes up more bandwidth or performance than you do prevents you from running your own application optimally.

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

### What is data locality?

The idea is to keep compute resources close to data to maximize data processing. This is used in a number of contexts.

With big data and Hadoop, data locality means moving the computation to the node that has the data. This is because the data is often too big to move efficiently. The same approach is applied in computational storage where the data is processed at the storage device level to reduce the amount of data that has to be moved.

Data locality is also used with hyper-converged infrastructure (HCI). Here the idea is to keep a full copy of the data on the node where a virtual server or VM is running. This can be done through smart placement since VMs are generally static. When a VM is moved to a different node, the associated data can be migrated (e.g. storage vMotion).  

For orchestrated environments running containerized workloads, maintaining data locality is a much harder problem. Workloads are short lived and can be rescheduled to different nodes dynamically. Node constraints can be used to maintain data locality but is costly in operator effort. API extensions can be installed to coordinate workload placement with schedulers, but adds another component to be managed.

[Storidge's automatic data locality](https://storidge.com/blog/effortless-data-locality-with-storidge/) eliminates the need to set node constraints or use API extensions to force data locality for containers. Instead a storage orchestrator moves a volume to the container when it is rescheduled. As host I/Os comes in on the new node, the accessed data is automatically rebuilt to maintain data locality.

### What is automatic data locality?

Data locality is the idea of keeping compute resources close to data to maximize data processing.

For orchestrated environments such as Docker Swarm and Kubernetes, maintaining data locality for stateful applications is a much harder problem. Containerized workloads are short lived and can be rescheduled to different nodes dynamically.

[Storidge automates data locality](https://storidge.com/blog/effortless-data-locality-with-storidge/) for containerized workloads so no operator effort is required. When a container is rescheduled, a storage orchestrator automatically moves its volume to the new node. As host I/Os comes in on the new node, the accessed data is automatically rebuilt by Storidge so data locality is maintained.

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
