# General

### Will there always be a "community" (free) edition? Or do I get presented with a license fee later?

Yes, there will always be a Community Edition (free). Note that the free edition is up to 5 nodes and 10 TBs of capacity.

The generous limits are there so the Community Edition can be deployed for serious work.

### Can Storidge run in the cloud? On premise? Both?

Storidge clusters run in cloud instances, virtual machines or bare metal servers on premise. 

Delivering the same API, CLI and user experience across all platforms saves time as there is no more waiting for data center resources to free up. Developers can write apps off a VirtualBox cluster on their laptop and know that it will operate the same way on the cloud. 

### When is support for 4.15 Linux kernel available?

We are waiting for Centos 8 to drop before adding support. This will likely happen in the next few weeks, at which point we will port for both Centos 8 and Ubuntu 18.04. Actual port is partially completed already.

### The docs.storidge.com and guide.storidge.com domains are unavailable for me

Check your DNS settings and company VPN. 

Since the documentation are Vuepress based with github repos, they can also be made accessible locally. See the repo for [user guide](https://github.com/Storidge/cio-userguide and [docs](https://github.com/Storidge/cio-userdocs). 

You can git clone the projects, run `vuepress build` in a Vuepress environment, and view the documentation locally.
