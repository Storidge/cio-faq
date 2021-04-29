---
title: Software
description: Questions on running the Storidge software
lang: en-US
---

# Storidge Software

### FTP download is blocked for me. Is there another way to install the Storidge software?

FTP access may not be allowed from certain countries or locations. You can try using http to download and install:

`curl -fsSL https://download.storidge.com/pub/ce/cio-ce | sudo bash`

### How do I restart the API server cio-api?

Run `cio-api &`

### How do I reinstall the Storidge software? I already have it downloaded

The working directory for installations is /var/lib/storidge. Change directory to where the Storidge tarball was extracted and run `./install`.

For example, for release 3249 on Ubuntu 18.04, run: 
```
cd /var/lib/storidge/cio-3249-u18.amd64
./install
```

### How do I install a specific version of Storidge software?

The install script supports installing a particular version which matches the version on the running cluster. For example, to install build 3062, run:

```
curl -fsSL https://download.storidge.com/pub/ce/cio-ce | sudo bash -s -- -r 3411
```

The `-s` option directs bash to accept stdin and execute it. Parameters after `--` are presented to the script for processing. `-r` specifies release 3411.

### How do I update a cluster to a specific version of Storidge software?

The `cioctl node update` command by defaults updates to the latest release of the Storidge software. However you can specify a specific release by using the `--version` flag. For example, to update to build 3249, run:

```
cioctl node update NODENAME --version 3249
```

### How to update a Storidge cluster from release v1.0.0-3249 and below to latest release?

Storidge software release v2.0.0-3336 and above introduced a protocol change for internode communications. This protocol change was made for enhanced security. However this change breaks the use of `cioctl node update` command for cluster aware updates, i.e. non-disruptive upgrades of nodes to the latest release.

To upgrade clusters running v1.0.0-3249, an `update3249` script is provided to simplify the upgrade process. 

::: tip
Note: For clusters running releases older than v1.0.0-3249, please update to build 3249 first. 
:::

The upgrade from build 3249 to latest release consists of three stages. At each stage, the upgrade is initiated by running the `update3249` script. 

**Download update3249 script**

To proceed with upgrade, first download the `update3249` script:

```
curl -fsSL https://download.storidge.com/pub/ce/update3249 > update3249
chmod 755 update3249
```

**Stage 1**

Before proceeding with the upgrade, it is recommended to stop all services running on the cluster. 

Then run `./update3249` to start Stage 1. Example: 

```
[root@c1 ~]# ./update3249
Stage 1:

Before proceeding, stop all services and applications. The cluster update will
require internet access to download the latest software release.

The cluster update consists of three stages. At the end of Stage 1, each node
will be rebooted. After rebooting, verify all nodes are ready before running
'update3249' script again to start Stage 2.

If you are not ready to update, type ^C to abort. Otherwise enter Y at the prompt.

Are you ready? y

Downloading 3373 release
Loading cio software for: c7xl3  (3.10.0-1062.el7.x86_64)
Starting upgrade using cio-3373-c7xl3-ce.amd64.txz

Unpacking 3373 release

Disabling CIO services

Rebooting into Stage 2
```

**Stage 2**

Verify that all nodes have rebooted. Then run `./update3249` to start Stage 2. Example: 

```
[root@c1 ~]# ./update3249
Stage 2:

Files for the new release will be installed. After installation, all nodes will be
rebooted. After rebooting, verify all nodes are ready before running 'update3249'
script again to start Stage 3.

Please confirm all nodes are ready. Enter Y at prompt to proceed.

Are all nodes ready? y
Starting Stage 2
Removing 3249 release files

Installing 3373 release files

Create and distribute certificates and keys

Enabling CIO services

Rebooting into Stage 3
```

**Stage 3**

Verify that all nodes have rebooted. Then run `./update3249` to start Stage 3. Example: 

```

[root@c1 ~]# ./update3249
Starting Stage 3
Checking nodes in the cluster
01:    192.168.1.212  c2 is reachable
02:    192.168.1.213  c3 is reachable
03:    192.168.1.214  c4 is reachable
04:    192.168.1.215  c5 is reachable

Check cio daemon started


Cio node ls
NODENAME             IP                NODE_ID    ROLE       STATUS      VERSION
c1                   192.168.1.211     a3df58f4   sds        normal      V2.0.0-3373
c2                   192.168.1.212     ef1b5371   backup1    normal      V2.0.0-3373
c3                   192.168.1.213     c8b56f4f   backup2    normal      V2.0.0-3373
c4                   192.168.1.214     163d60bf   storage    normal      V2.0.0-3373
c5                   192.168.1.215     a5186b98   storage    normal      V2.0.0-3373


Docker node ls
ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS      ENGINE VERSION
h24r2ekhcfwr1n7kdalah8jhc     c1                  Ready               Active              Reachable           19.03.8
oudzsbg3d9j0yq4ema2nz24d4     c2                  Ready               Active              Reachable           19.03.8
t57uwq9gadnzep84934joln4y     c3                  Ready               Active              Reachable           19.03.8
5792baw6scl0hnke2kx4k8oxt *   c4                  Ready               Active              Leader              19.03.8
giaxbxmrstb5ses8b9402iijs     c5                  Ready               Active              Reachable           19.03.8
[root@c1 ~]#
```

