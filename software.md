---
title: Software
description: Questions on running the Storidge software
lang: en-US
---

# Storidge Software

### FTP download is blocked for me. Is there another way to install the Storidge software?

FTP access may not be allowed from certain countries or locations. You can try using http to download and install:

`curl -fsSL http://download.storidge.com/pub/ce/cio-ce | sudo bash`

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
curl -fsSL ftp://104.131.153.182/pub/ce/cio-ce | sudo bash -s -- -f -r 3062
```

The `-s` option directs bash to accept stdin and execute it. Parameters after `--` are presented to the script for processing. `-f` specifies FTP protocol to download release 3062.

### How do I update a cluster to a specific version of Storidge software?

The `cioctl node update` command by defaults updates to the latest release of the Storidge software. However you can specify a specific release by using the `--version` flag. For example, to update to build 3249, run:

```
cioctl node update NODENAME --version 3249
```
