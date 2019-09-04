# Integrations

### Does CIO integrate with other tools I’m using?

Storidge is already tightly integrated with the Portainer user interface for managing a Swarm cluster. In addition, there are references for Ansible, Packer and Terraform to create images and automate deployment of clusters. These tools are available through our repos on https://github.com/storidge.

Integrations are also planned for monitoring and logging frameworks. We prioritize development based on user requests so please do notify us of your preferred tools.

### Is there an Ansible playbook for setting up a Storidge cluster?

You can modify the [reference playbook](https://github.com/Storidge/terraform-aws-swarm-cio/blob/master/playbook.yml) for setting up a Storidge cluster on AWS.

### Is there any way to have a "canned" Packer image with Storidge software?

There is a github repo with Packer templates for generating AWS AMIs and DigitalOcean snapshot images. This uses the community edition of the Storidge CIO software. See https://github.com/Storidge/packer-cio

### How is Portainer integrated with Storidge?

In a Swarm cluster, Storidge will deploy a Portainer service and Portainer agent after initializing a cluster.

The Portainer service integrates through the [Storidge AP](https://storidge.com/api) and automatically detects the Storidge components and presents an enhanced interface for you to manage the cluster. Look at the [Portainer integration](https://docs.storidge.com/integrations/portainer.html) for more info.

### Is there a Terraform reference for setting up Storidge cluster?

There is a github repo for [setting up a Storidge cluster on AWS](https://github.com/Storidge/terraform-aws-swarm-cio) and also an [example for DigitalOcean Cloud](https://github.com/Storidge/terraform-do-swarm-cio).
