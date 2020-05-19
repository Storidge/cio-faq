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
