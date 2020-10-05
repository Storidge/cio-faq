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

### How do I restart or redeploy the Portainer service?

You can redeploy the Portainer service and agents with `docker stack deploy -c /etc/storidge/config/portainer.yml portainer`

However you may have to first clear the existing service. You do this with `docker stack remove portainer`.

### Does Storidge support Prometheus monitoring?

Storidge cluster metrics for Prometheus are available via a containerized exporter.

For instructions on enabling this feature and a list of exported metrics, please refer to [Prometheus integration](https://docs.storidge.com/integrations/prometheus.html).

### How do I use Grafana with Storidge?

Grafana is often paired with Prometheus to visualize metrics. Where Prometheus gathers time-series data, Grafana visualizes it.

Before running Grafana, first setup Prometheus to serve metrics for the Storidge cluster. Refer to [Prometheus integration](https://docs.storidge.com/integrations/prometheus.html) to expose cluster stats at port 16995 on the /metrics endpoint.

Next, follow steps in [Grafana integration](https://docs.storidge.com/integrations/grafana.html) to visualize the cluster metrics. You can download and use this [example Grafana dashboard](https://grafana.com/grafana/dashboards/11359) as a reference.

### Is there a Terraform reference for setting up Storidge cluster?

There is a [github repo](https://github.com/Storidge/terraform-aws-swarm-cio) for setting up a Storidge cluster on AWS and also an [example for DigitalOcean Cloud](https://github.com/Storidge/terraform-do-swarm-cio).

### Can I use Wireguard with Storidge?

Yes, Wireguard can be operated alongside the Storidge software. 

However since Wireguard requires a firewall to be enabled, the default firewall settings will block inter-node communications required by the Storidge cluster. 

The Storidge cluster uses these [ports](https://docs.storidge.com/prerequisites/ports.html) for inter-node communication. 

If you have ufw enabled on Ubuntu, you can add the required ports with:

```
sudo ufw allow 3260/tcp
sudo ufw allow 8282/tcp
sudo ufw allow 8383/tcp
sudo ufw allow 16990/tcp
sudo ufw allow 16995/tcp
sudo ufw allow 16996/tcp
sudo ufw allow 16997/tcp
sudo ufw allow 16998/tcp
sudo ufw allow 16999/tcp
```

Check status of the ports with `sudo ufw status`. 

If you are operating a Docker Swarm cluster for your applications, note that the following ports must also be open:
- TCP port 2377 for cluster management communications
- TCP and UDP port 7946 for communication among nodes
- UDP port 4789 for overlay network traffic

To add these ports to ufw, run: 

```
sudo ufw allow 2377/tcp
sudo ufw allow 7946/tcp
sudo ufw allow 7946/udp
sudo ufw allow 4789/udp
```

Example of what iptables look like after opening ports above: 
```
root@u1:~# iptables -L --line-numbers
Chain INPUT (policy DROP)
num  target     prot opt source               destination
1    ufw-before-logging-input  all  --  anywhere             anywhere
2    ufw-before-input  all  --  anywhere             anywhere
3    ufw-after-input  all  --  anywhere             anywhere
4    ufw-after-logging-input  all  --  anywhere             anywhere
5    ufw-reject-input  all  --  anywhere             anywhere
6    ufw-track-input  all  --  anywhere             anywhere

Chain FORWARD (policy DROP)
num  target     prot opt source               destination
1    DOCKER-USER  all  --  anywhere             anywhere
2    DOCKER-INGRESS  all  --  anywhere             anywhere
3    DOCKER-ISOLATION-STAGE-1  all  --  anywhere             anywhere
4    ACCEPT     all  --  anywhere             anywhere             ctstate RELATED,ESTABLISHED
5    DOCKER     all  --  anywhere             anywhere
6    ACCEPT     all  --  anywhere             anywhere
7    ACCEPT     all  --  anywhere             anywhere
8    ACCEPT     all  --  anywhere             anywhere             ctstate RELATED,ESTABLISHED
9    DOCKER     all  --  anywhere             anywhere
10   ACCEPT     all  --  anywhere             anywhere
11   ufw-before-logging-forward  all  --  anywhere             anywhere
12   ufw-before-forward  all  --  anywhere             anywhere
13   ufw-after-forward  all  --  anywhere             anywhere
14   ufw-after-logging-forward  all  --  anywhere             anywhere
15   ufw-reject-forward  all  --  anywhere             anywhere
16   ufw-track-forward  all  --  anywhere             anywhere
17   ACCEPT     all  --  anywhere             anywhere
18   DROP       all  --  anywhere             anywhere

Chain OUTPUT (policy ACCEPT)
num  target     prot opt source               destination
1    ufw-before-logging-output  all  --  anywhere             anywhere
2    ufw-before-output  all  --  anywhere             anywhere
3    ufw-after-output  all  --  anywhere             anywhere
4    ufw-after-logging-output  all  --  anywhere             anywhere
5    ufw-reject-output  all  --  anywhere             anywhere
6    ufw-track-output  all  --  anywhere             anywhere

Chain DOCKER (2 references)
num  target     prot opt source               destination
1    ACCEPT     tcp  --  anywhere             172.18.0.3           tcp dpt:portainer-agent

Chain DOCKER-INGRESS (1 references)
num  target     prot opt source               destination
1    ACCEPT     tcp  --  anywhere             anywhere             tcp dpt:portainer
2    ACCEPT     tcp  --  anywhere             anywhere             state RELATED,ESTABLISHED tcp spt:portainer
3    RETURN     all  --  anywhere             anywhere

Chain DOCKER-ISOLATION-STAGE-1 (1 references)
num  target     prot opt source               destination
1    DOCKER-ISOLATION-STAGE-2  all  --  anywhere             anywhere
2    DOCKER-ISOLATION-STAGE-2  all  --  anywhere             anywhere
3    RETURN     all  --  anywhere             anywhere

Chain DOCKER-ISOLATION-STAGE-2 (2 references)
num  target     prot opt source               destination
1    DROP       all  --  anywhere             anywhere
2    DROP       all  --  anywhere             anywhere
3    RETURN     all  --  anywhere             anywhere

Chain DOCKER-USER (1 references)
num  target     prot opt source               destination
1    RETURN     all  --  anywhere             anywhere

Chain ufw-after-forward (1 references)
num  target     prot opt source               destination

Chain ufw-after-input (1 references)
num  target     prot opt source               destination
1    ufw-skip-to-policy-input  udp  --  anywhere             anywhere             udp dpt:netbios-ns
2    ufw-skip-to-policy-input  udp  --  anywhere             anywhere             udp dpt:netbios-dgm
3    ufw-skip-to-policy-input  tcp  --  anywhere             anywhere             tcp dpt:netbios-ssn
4    ufw-skip-to-policy-input  tcp  --  anywhere             anywhere             tcp dpt:microsoft-ds
5    ufw-skip-to-policy-input  udp  --  anywhere             anywhere             udp dpt:bootps
6    ufw-skip-to-policy-input  udp  --  anywhere             anywhere             udp dpt:bootpc
7    ufw-skip-to-policy-input  all  --  anywhere             anywhere             ADDRTYPE match dst-type BROADCAST

Chain ufw-after-logging-forward (1 references)
num  target     prot opt source               destination
1    LOG        all  --  anywhere             anywhere             limit: avg 3/min burst 10 LOG level warning prefix "[UFW BLOCK] "

Chain ufw-after-logging-input (1 references)
num  target     prot opt source               destination
1    LOG        all  --  anywhere             anywhere             limit: avg 3/min burst 10 LOG level warning prefix "[UFW BLOCK] "

Chain ufw-after-logging-output (1 references)
num  target     prot opt source               destination

Chain ufw-after-output (1 references)
num  target     prot opt source               destination

Chain ufw-before-forward (1 references)
num  target     prot opt source               destination
1    ACCEPT     all  --  anywhere             anywhere             ctstate RELATED,ESTABLISHED
2    ACCEPT     icmp --  anywhere             anywhere             icmp destination-unreachable
3    ACCEPT     icmp --  anywhere             anywhere             icmp time-exceeded
4    ACCEPT     icmp --  anywhere             anywhere             icmp parameter-problem
5    ACCEPT     icmp --  anywhere             anywhere             icmp echo-request
6    ufw-user-forward  all  --  anywhere             anywhere

Chain ufw-before-input (1 references)
num  target     prot opt source               destination
1    ACCEPT     all  --  anywhere             anywhere
2    ACCEPT     all  --  anywhere             anywhere             ctstate RELATED,ESTABLISHED
3    ufw-logging-deny  all  --  anywhere             anywhere             ctstate INVALID
4    DROP       all  --  anywhere             anywhere             ctstate INVALID
5    ACCEPT     icmp --  anywhere             anywhere             icmp destination-unreachable
6    ACCEPT     icmp --  anywhere             anywhere             icmp time-exceeded
7    ACCEPT     icmp --  anywhere             anywhere             icmp parameter-problem
8    ACCEPT     icmp --  anywhere             anywhere             icmp echo-request
9    ACCEPT     udp  --  anywhere             anywhere             udp spt:bootps dpt:bootpc
10   ufw-not-local  all  --  anywhere             anywhere
11   ACCEPT     udp  --  anywhere             224.0.0.251          udp dpt:mdns
12   ACCEPT     udp  --  anywhere             239.255.255.250      udp dpt:1900
13   ufw-user-input  all  --  anywhere             anywhere

Chain ufw-before-logging-forward (1 references)
num  target     prot opt source               destination

Chain ufw-before-logging-input (1 references)
num  target     prot opt source               destination

Chain ufw-before-logging-output (1 references)
num  target     prot opt source               destination

Chain ufw-before-output (1 references)
num  target     prot opt source               destination
1    ACCEPT     all  --  anywhere             anywhere
2    ACCEPT     all  --  anywhere             anywhere             ctstate RELATED,ESTABLISHED
3    ufw-user-output  all  --  anywhere             anywhere

Chain ufw-logging-allow (0 references)
num  target     prot opt source               destination
1    LOG        all  --  anywhere             anywhere             limit: avg 3/min burst 10 LOG level warning prefix "[UFW ALLOW] "

Chain ufw-logging-deny (2 references)
num  target     prot opt source               destination
1    RETURN     all  --  anywhere             anywhere             ctstate INVALID limit: avg 3/min burst 10
2    LOG        all  --  anywhere             anywhere             limit: avg 3/min burst 10 LOG level warning prefix "[UFW BLOCK] "

Chain ufw-not-local (1 references)
num  target     prot opt source               destination
1    RETURN     all  --  anywhere             anywhere             ADDRTYPE match dst-type LOCAL
2    RETURN     all  --  anywhere             anywhere             ADDRTYPE match dst-type MULTICAST
3    RETURN     all  --  anywhere             anywhere             ADDRTYPE match dst-type BROADCAST
4    ufw-logging-deny  all  --  anywhere             anywhere             limit: avg 3/min burst 10
5    DROP       all  --  anywhere             anywhere

Chain ufw-reject-forward (1 references)
num  target     prot opt source               destination

Chain ufw-reject-input (1 references)
num  target     prot opt source               destination

Chain ufw-reject-output (1 references)
num  target     prot opt source               destination

Chain ufw-skip-to-policy-forward (0 references)
num  target     prot opt source               destination
1    DROP       all  --  anywhere             anywhere

Chain ufw-skip-to-policy-input (7 references)
num  target     prot opt source               destination
1    DROP       all  --  anywhere             anywhere

Chain ufw-skip-to-policy-output (0 references)
num  target     prot opt source               destination
1    ACCEPT     all  --  anywhere             anywhere

Chain ufw-track-forward (1 references)
num  target     prot opt source               destination

Chain ufw-track-input (1 references)
num  target     prot opt source               destination

Chain ufw-track-output (1 references)
num  target     prot opt source               destination
1    ACCEPT     tcp  --  anywhere             anywhere             ctstate NEW
2    ACCEPT     udp  --  anywhere             anywhere             ctstate NEW

Chain ufw-user-forward (1 references)
num  target     prot opt source               destination

Chain ufw-user-input (1 references)
num  target     prot opt source               destination
1    ACCEPT     tcp  --  anywhere             anywhere             tcp dpt:ssh
2    ACCEPT     udp  --  anywhere             anywhere             udp dpt:51820
3    ACCEPT     tcp  --  anywhere             anywhere             tcp dpt:iscsi-target
4    ACCEPT     tcp  --  anywhere             anywhere             tcp dpt:cio-api
5    ACCEPT     tcp  --  anywhere             anywhere             tcp dpt:8383
6    ACCEPT     tcp  --  anywhere             anywhere             tcp dpt:16990
7    ACCEPT     tcp  --  anywhere             anywhere             tcp dpt:cio-keycp
8    ACCEPT     tcp  --  anywhere             anywhere             tcp dpt:ciord
9    ACCEPT     tcp  --  anywhere             anywhere             tcp dpt:cio-kernel
10   ACCEPT     tcp  --  anywhere             anywhere             tcp dpt:cio-cli
11   ACCEPT     tcp  --  anywhere             anywhere             tcp dpt:cio-hbt
12   ACCEPT     tcp  --  anywhere             anywhere             tcp dpt:cio-tcp
13   ACCEPT     tcp  --  anywhere             anywhere             tcp dpt:2377
14   ACCEPT     tcp  --  anywhere             anywhere             tcp dpt:7946
15   ACCEPT     udp  --  anywhere             anywhere             udp dpt:7946
16   ACCEPT     udp  --  anywhere             anywhere             udp dpt:4789

Chain ufw-user-limit (0 references)
num  target     prot opt source               destination
1    LOG        all  --  anywhere             anywhere             limit: avg 3/min burst 5 LOG level warning prefix "[UFW LIMIT BLOCK] "
2    REJECT     all  --  anywhere             anywhere             reject-with icmp-port-unreachable

Chain ufw-user-limit-accept (0 references)
num  target     prot opt source               destination
1    ACCEPT     all  --  anywhere             anywhere

Chain ufw-user-logging-forward (0 references)
num  target     prot opt source               destination

Chain ufw-user-logging-input (0 references)
num  target     prot opt source               destination

Chain ufw-user-logging-output (0 references)
num  target     prot opt source               destination

Chain ufw-user-output (1 references)
num  target     prot opt source               destination
root@u1:~#
```
