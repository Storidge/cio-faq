---
title: Troubleshooting
description: Troubleshooting errors reported by Storidge CIO software
lang: en-US
---

# Troubleshooting

### Where is the report from the `cioctl report` command?

The output of the `cioctl report` command is in the /var/lib/storidge directory.

Please forward the report to support@storidge.com with details of the error you are troubleshooting.

### Insufficient cluster capacity available to create this vdisk

Error message:  "Fail: Add vd: Insufficient cluster capacity available to create this vdisk. Use smaller size"

If you are running a Storidge cluster on virtual servers or VMs, this error comes from a data collection process that creates twenty volumes and runs fio to collect performance data for Storidge's QoS feature.

The Storidge software will normally only run the data collection on physical servers. However the data collection can be started on virtual servers or VMs that are not on the supported list.

Please run the `cioctl report` command and forward the report in /var/lib/storidge directory to support@storidge.com. The report command will collect configuration information and logs including information on the virtual server. When forwarding the report, please make a request to add the virtual server to the supported list.

### `cio node ls` shows node in maintenance mode and missing the node name. How do I recover the node?

This situation is likely a result of a node being cordoned or shutdown for maintenance. Then the cluster was rebooted or power cycled.

Once the cluster is rebooted, the node that was previously in maintenance mode will still stay in maintenance mode. The output of the `cio node ls` command may look something like this:

```
root@u1:~# cio node ls
NODENAME             IP                NODE_ID    ROLE       STATUS      VERSION
                     192.168.3.95      d12a81bd   sds        maintenance
u3                   192.168.3.29      7517e436   backup1    normal      V1.0.0-2986
u4                   192.168.3.91      91a78c14   backup2    normal      V1.0.0-2986
u1                   192.168.3.165     a11314f0   storage    normal      V1.0.0-2986
u5                   192.168.3.160     888a7dd3   storage    normal      V1.0.0-2986
```

To restore the cordoned node, you can:
1. Login to the cordoned node and run `cioctl node uncordon` to rejoin the node to the cluster

2. Uncordon the node by running `cioctl node uncordon <IP address>` from any node. In the example above, run `cioctl node uncordon 192.168.3.95`. The Storidge software does not depend on identifiers that can be changed by users, e.g. hostname.

3. Reset or power cycle the cordoned node and it will automatically rejoin the cluster after rebooting
