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