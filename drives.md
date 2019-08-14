# Drives

### Can Storidge work with any drive vendor?

Yes. Storidge can work with any drive type or vendor. For physical devices, the drive capacity and IOPS capability is auto discovered, aggregated and managed as a shared resource. 

### Linux device names may not be consistent after system reboots. Is this an issue?

This is not a problem as Storidge assigns and uses virtual serial numbers for consistency, instead of utilizing Linux drive letters. 

In addition, if a drive is faulted, removed from the storage pool and later added back as a good drive, Storidge will still assign a new serial number instead of reusing the old one. 

### Does Storidge need to take over all the drives on a node?

No. Storidge is designed for installation into a running cluster. To avoid accidental data loss, Storidge will automatically discover and add only raw devices (i.e. no file system or partitions) to the storage pool.

### Can storage be added to a node after it has joined a cluster?

Yes. Drives can be added to expand storage capacity. 

This is easily done through the `cioctl drive add` command and is non-disruptive. Follow this [link](https://docs.storidge.com/cioctl_cli/drive.html) for drive management commands. 

### If I need more capacity, can cloud block storage be expanded? Will it be detected and used?

Storidge supports adding cloud block storage (or physical drives) to nodes. These new resources will be detected and can be easily added to the storage pool with the `cioctl drive add` command. See info for [adding drive](https://docs.storidge.com/cioctl_cli/drive.html#cioctl-drive-add)

### What happens when a drive fails?

Storidge's software supports fail-in-place for drives. When host I/O failures are detected, the drive is marked 'faulty'. The 'faulty' event triggers a background rebuilding process to immediately restore data redundancy to affected volumes. 

The compute workload and I/O load from rebuilds are distributed across multiple nodes and drives to minimize impact to running applications. When the drive rebuild completes, the failed drive can be left in place to be swapped out at a convenient time. Replacement of the drive is non-distruptive for running applications. 

### Should I use a hardware RAID controller or present drives directly to Storidge?

Storidge can work with drives passed through a RAID controller. However, since RAID controllers will bottleneck performance, it is recommended to have Storidge operate drives directly to maximize performance. 
