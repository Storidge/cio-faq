---
title: Kubernetes Storage
description: How do I create a persistent volume for Kubernetes pods?
lang: en-US
---

# Kubernetes Storage

### Which Kubernetes versions does Storidge CIO support?

Storidge CIO supports Kubernetes version 1.12, 1.13, 1.14, 1.15 and 1.16. We will continue to add support for additional Kubernetes versions in the future.

### Does Storidge have a CSI driver or volume plugin?

Yes, a [Storidge CSI driver](https://hub.docker.com/_/storidge-csi-driver) is available.

This driver passes requests for persistent volume claims or persistent volumes to the Storidge CIO software. The driver supports declarative input and enables storage for pods to be dynamically provisioned on demand based on [storage classes](https://docs.storidge.com/kubernetes_storage/storage_classes.html) or [profiles](https://docs.storidge.com/cio_cli/profile.html#cio-profile-create).

### Do I have to use cio CLI commands to create volumes for Kubernetes pods?

You can use either the [kubectl CLI](https://kubernetes.io/docs/reference/kubectl/) or [Storidge's cio CLI](https://docs.storidge.com/cio_cli/overview.html) to create volumes for Kubernetes pods.

Storidge provides a [CSI driver](https://hub.docker.com/_/storidge-csi-driver) that allows persistent volumes to be requested natively from the kubectl CLI.

Volumes can also be created using the cio CLI. See [cio volume](https://docs.storidge.com/cio_cli/volume.html) for examples.
