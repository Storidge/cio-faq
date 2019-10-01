---
title: Troubleshooting
description: Troubleshooting errors reported by Storidge CIO software
lang: en-US
---

# Troubleshooting

### Insufficient cluster capacity available to create this vdisk

Error message:  "Fail: Add vd: Insufficient cluster capacity available to create this vdisk. Use smaller size"

If you are running a Storidge cluster on virtual servers or VMs, this error comes from a data collection process that creates twenty volumes and runs fio to collect performance data for Storidge's QoS feature.

The Storidge software will normally only run the data collection on physical servers. However the data collection can be started on virtual servers or VMs that are not on the supported list.

Please run the `cioctl report` command and forward the report in /var/lib/storidge directory to support@storidge.com. The report command will collect configuration information and logs including information on the virtual server. When forwarding the report, please make a request to add the virtual server to the supported list. 
