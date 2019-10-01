---
title: Drives
description: What drive vendors are supported, can drive be mixed, can drive be added?
lang: en-US
---

# Drives

### Can Storidge work with any drive vendor?

Yes. Storidge can work with any drive type or vendor. For physical devices, the drive capacity and IOPS capability is auto discovered, aggregated and managed as a shared resource.

### Do the three drives inside a node have to be exactly the same size (e.g. 512GB vs 500GB)?

The drives to not have to be the same size because Storidge breaks any device down into small building blocks. Drives look like a collection of building blocks, some with more and some with less. This allows newer devices with larger capacity to be added later, or newer models to replace older devices while fully utilizing all available capacity.

It is recommended to have fairly even capacity distributed across nodes. This minimizes the amount of rebuild time if a node goes down. Also having a node with much greater capacity going down, means the lost capacity has to absorbed by other nodes. This can greatly reduce the available capacity in the storage pool after rebuilding completes.

### Can I mix drives in a node (e.g. two NVME plus one SSD) or they must be same model, speed, etc.?

It is fine to mix SSD and NVME since we virtualize them into the same pool. We may want to differentiate them in the future but for now we treat them the same.

For bare metal servers, Storidge will collect performance data during cluster initialization. This cluster performance data collected becomes an IOPS and bandwidth resource that is managed by the QoS feature, i.e. you can set min and max setting for each volume/application. Depending on configuration, mixing NVME and SSD devices may negatively impact the accuracy of the collected performance data.

### Is it possible to run Storidge CIO with 3 x 24GB drives on a node?

Yes, you can run with 3 x 24GB drives per node on a virtual server. Although the recommendation is to use 100GB drives, smaller capacities will work for testing the Storidge software. However if a data collection process was started because the Storidge software thinks you have a physical server, the 3 x 24GB drives will not work.

The Storidge software runs a data collection process after initialization on physical servers. This is to create an IOPS and bandwidth budget that is allocated on demand to individual volumes. As performance limits are assigned to applications, the Storidge software will update you if there is not enough performance available to support apps.  

You can forward a report from the `cioctl report` command to support@storidge.com to confirm if your VM instance and environment is on the supported list.

### Linux device names may not be consistent after system reboots. Is this an issue?

This is not a problem as Storidge assigns and uses virtual serial numbers for consistency, instead of utilizing Linux drive letters.

In addition, if a drive is faulted, removed from the storage pool and later added back as a good drive, Storidge will still assign a new serial number instead of reusing the old one.

### Does Storidge need to take over all the drives on a node?

No. Storidge is designed for installation into a running cluster. To avoid accidental data loss, Storidge will automatically discover and add only raw devices (i.e. drives with no file system or partitions) to the storage pool.

### How do I check if a drive can be used by Storidge?

Use the `file -sL <device>` command to check. For example, drives sdb, sdc and sdd below can be automatically discovered and consumed by Storidge. However drive sda below will be skipped by Storidge.

```
root@ubuntu-16:~# file -sL /dev/sd*
/dev/sda:  DOS/MBR boot sector
/dev/sda1: Linux rev 1.0 ext2 filesystem data (mounted or unclean), UUID=f838091f-e90f-4037-8352-4d7d2775667a (large files)
/dev/sda2: DOS/MBR boot sector; partition 1 : ID=0x8e, start-CHS (0x5d,113,21), end-CHS (0x3ff,254,63), startsector 2, 40439808 sectors, extended partition table (last)
/dev/sda5: LVM2 PV (Linux Logical Volume Manager), UUID: Tx8zdm-LIyl-Am4b-0Bbu-iJxv-yKsI-IR9NtO, size: 20705181696
/dev/sdb:  data
/dev/sdc:  data
/dev/sdd:  data
```

### How do I clear the drive metadata so that it can be used by Storidge?

Since Storidge will only add raw devices to the storage pool, you may have to clear the metadata first. Unmount the drive if it is mounted, then clear the metadata using `dd`. For example, to clear the metadata on drive sdb run:

```
dd if=/dev/zero of=/dev/sdb bs=1M count=300
```

### Can storage be added to a node after it has joined a cluster?

Yes. Drives can be added to expand storage capacity.

This is easily done through the `cioctl drive add` command and is non-disruptive. Follow this [link](https://docs.storidge.com/cioctl_cli/drive.html) for drive management commands.

### If I need more capacity, can cloud block storage be expanded? Will it be detected and used?

Storidge supports adding cloud block storage (or physical drives) to nodes. These new resources will be detected and can be easily added to the storage pool with the `cioctl drive add` command. See info for [adding drive](https://docs.storidge.com/cioctl_cli/drive.html#cioctl-drive-add)

### What happens when a drive fails?

Storidge's software supports fail-in-place for drives. When host I/O failures are detected, the drive is marked 'faulty'. The 'faulty' event triggers a background rebuilding process to immediately restore data redundancy to affected volumes.

The compute workload and I/O load from rebuilds are distributed across multiple nodes and drives to minimize impact to running applications. When the drive rebuild completes, the failed drive can be left in place to be swapped out at a convenient time.

Replacement of the drive is non-distruptive to running applications.

### Should I use a hardware RAID controller or present drives directly to Storidge?

Storidge can work with drives passed through a RAID controller. However, since RAID controllers will bottleneck performance, it is recommended to have Storidge operate drives directly to maximize performance.
