# General

### Will there always be a "community" (free) edition? Or do I get presented with a license fee later?

Yes, there will always be a Community Edition (free). Note that the free edition is up to 5 nodes and 10 TBs of capacity.

The generous limits are there so the Community Edition can be deployed for serious work.

### What are the limits of the Community Edition (CE)?

The Community Edition is free forever. It does have a limit of up to 5 Storidge nodes in a Swarm or Kubernetes cluster. The storage capacity in the cluster is limited to 10 TBs.

We will be announcing Workgroup Edition and Enterprise Edition if you want to add extra functionality, e.g. more nodes and capacity, multi-zones for higher availability, auto tiering, etc.

### Can Storidge run in the cloud? On premise? Both?

Storidge clusters run in cloud instances, virtual machines or bare metal servers on premise.

Delivering the same API, CLI and user experience across all platforms saves time as there is no more waiting for data center resources to free up. Developers can write apps off a VirtualBox cluster on their laptop and know that it will operate the same way on the cloud.

### Is there a plan on Ubuntu 18.04 LTS support?

We are currently porting to the 4.15 Linux kernel. RHEL 8 and Ubuntu 18.04 is out but we are just waiting for Centos 8 to be released. We expect this to happen soon and anticipate Ubuntu 18.04 support in early Q4.

### When is support for 4.15 Linux kernel available?

We are waiting for Centos 8 to drop before adding support. This will likely happen in the next few weeks, at which point we will port for both Centos 8 and Ubuntu 18.04. Actual port is partially completed already.

### Does Storidge have training resources where I can learn more or share with others?

Yes, you can get an overview of the key capabilities and benefits of the CIO software through our [Introduction](https://guide.storidge.com/what_is_cio/introduction.html).

Next our [Getting Started guide](https://guide.storidge.com/getting_started/install.html) has exercises that step through software installation, creation of a cluster, and highlights commonly used commands and important use cases. Step through these exercise at your own pace and share them with your team.

### The docs.storidge.com and guide.storidge.com domains are unavailable for me

Check your DNS settings and company VPN.

Since the documentation are Vuepress based with github repos, they can also be made accessible locally. See the repo for [user guide](https://github.com/Storidge/cio-userguide and [docs](https://github.com/Storidge/cio-userdocs).

You can git clone the projects, run `vuepress build` in a Vuepress environment, and view the documentation locally.
