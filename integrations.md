---
title: Integrations
description: How does Storidge integrate with other tools I am using?
lang: en-US
---

# Integrations

### Will my existing Docker Swarm or Kubernetes applications work?

Storidge CIO integrates with Docker Swarm and Kubernetes through volume plugins and is compatible with apps running on any standard Swarm or Kubernetes environment.

You can easily migrate data from docker named volumes to a Storidge volumes using the `cioctl migrate docker` command. Once migrated, no code modifications are needed to restart the application using the Storidge volume.

### Does Storidge CIO integrate with other tools I’m using?

Storidge is already tightly integrated with the Portainer user interface for managing a Swarm cluster. In addition, there are references for Ansible, Grafana, Packer and Terraform to create images and automate deployment of clusters. These tools are available through our repos on https://github.com/storidge.

Integrations are also planned for monitoring and logging frameworks. We prioritize development based on user requests so please do notify us of your preferred tools.

### Is there an Ansible playbook for setting up a Storidge cluster?

You can modify the [reference playbook](https://github.com/Storidge/terraform-aws-swarm-cio/blob/master/playbook.yml) for setting up a Storidge cluster on AWS.

### How do I create Storidge volumes in an Ansible playbook?

Ansible provides a [docker_swarm_service module](https://docs.ansible.com/ansible/latest/modules/docker_swarm_service_module.html) that enables docker services to be managed through a manager node.

Storidge volumes are specified in the mounts specification of a playbook. The `source` parameter naming the volume, and the `target` parameter sets the path within the container. The `driver_config` parameter directs the volume create request to the Storidge cio volume plugin.

See the [Storidge volumes with Ansible](https://docs.storidge.com/docker_volumes/volumes_with_ansible.html) guide for examples.

### Is there any way to have a "canned" Packer image with Storidge software?

There is a [github repo with Packer templates](https://github.com/Storidge/packer-cio) for generating AWS AMIs and DigitalOcean snapshot images. This uses the Community Edition of the Storidge CIO software.

Step through the [Packer guide](https://docs.storidge.com/integrations/packer.html) for an example of building an AWS AMI with Packer and Storidge.

### How is Portainer integrated with Storidge?

In a Swarm cluster, Storidge will deploy a Portainer service and Portainer agent after initializing a cluster.

The Portainer service integrates through the [Storidge AP](https://storidge.com/api) and automatically detects the Storidge components and presents an enhanced interface for you to manage the cluster. Look at the [Portainer integration](https://docs.storidge.com/integrations/portainer.html) for more info.

### Can Portainer be accessed behind a proxy like nginx? This avoids exposing Portainer port to internet

The Portainer service needs to run on a public overlay network to detect IP addresses for API communications, e.g. the Storidge API.

For example, in your compose file you can specify this with:

```
networks:
  priv_net:
    internal: true
  pub_net:
    internal: false

portainer:
    volumes:
      - portainer_data:/data
    networks:
      pub_net:
        aliases:
          - public-portainer
      priv_net:
        aliases:
          - private-portainer
```

Note there isn’t any externally available ports exposed.

### Does Storidge support Prometheus monitoring?

Storidge cluster metrics for Prometheus are available via a containerized exporter.

For instructions on enabling this feature and a list of exported metrics, please refer to [Prometheus integration](https://docs.storidge.com/integrations/prometheus.html).

### How do I use Grafana with Storidge?

Grafana is often paired with Prometheus to visualize metrics. Where Prometheus gathers time-series data, Grafana visualizes it.

Before running Grafana, first setup Prometheus to serve metrics for the Storidge cluster. Refer to [Prometheus integration](https://docs.storidge.com/integrations/prometheus.html) to expose cluster stats at port 16995 on the /metrics endpoint.

Next, follow steps in [Grafana integration](https://docs.storidge.com/integrations/grafana.html) to visualize the cluster metrics. You can download and use this [example Grafana dashboard](https://grafana.com/grafana/dashboards/11359) as a reference.

### Is there a Terraform reference for setting up Storidge cluster?

There is a [github repo](https://github.com/Storidge/terraform-aws-swarm-cio) for setting up a Storidge cluster on AWS and also an [example for DigitalOcean Cloud](https://github.com/Storidge/terraform-do-swarm-cio).
