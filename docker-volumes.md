---
title: Docker Volumes
description: How do I create a docker volume for compose, dockerfile,or docker service?
lang: en-US
---

# Docker Volumes

### Do I have to use cio CLI commands to create volumes for docker containers or services?

You can use either the docker CLI or Storidge's cio CLI to create volumes for docker containers and services.

Storidge provides a docker volume plugin that allows volumes to be requested natively from the docker CLI. See [Volumes with Docker CLI](https://guide.storidge.com/getting_started/docker_volumes.html) for examples.

Volumes can also be created using the cio CLI. See [cio volume](https://docs.storidge.com/cio_cli/volume.html) for examples.

Storidge uses the concept of [profiles](https://guide.storidge.com/getting_started/why_profiles.html) to greatly simplify volume management. Profiles are managed using the cio CLI.

### How do I create a Storidge cio volume using the `docker volume create` command?

Use `--driver cio` in the `docker volume create` command. This passes the request for creating the volume to the Storidge CIO volume plugin, e.g.:

```
docker volume create --driver cio --name foo --opt capacity=15
```

For more examples, see [Volumes with Docker CLI](https://guide.storidge.com/getting_started/docker_volumes.html).

### How do I create Storidge volumes from a docker compose or docker stack file?

See [Volumes for Docker Compose](https://docs.storidge.com/docker_volumes/volumes_for_docker_compose.html) for examples of how to set definitions for Storidge volumes within a docker compose or docker stack file.  

In general, pass a named volume in the volumes section of a service definition, e.g. mysql-data:
```
services:
  db:
    image: mysql:5.7
    volumes:
        # Pass volume named mysql-data to mysql container
      - "mysql-data:/var/lib/mysql"
```

Then add a definition to create the named volume, e.g. mysql-data referenced above. This creates volume mysql-data with default parameters.

```
volumes:
  mysql-data:
    driver: cio
```

To create a volume using a [profile](https://guide.storidge.com/getting_started/why_profiles.html), use driver options to pass the profile name, e.g. profile MYSQL below:   

```
volumes:
  mysql-data:
    driver: cio
    driver_opts:
      profile: "MYSQL"
```

### Can I create a unique volume for each task of a docker swarm service using the replicas flag?

You can use a templatized notation to create and mount a unique volume into each task of a service. The example below deploys a service with 5 tasks with the `.Task.Slot` template assigning volume N to task N.

```
docker service create \
--mount source={{.Service.Name}}-{{.Task.Slot}},target=/var/lib/mysql,volume-driver=cio,volume-opt=profile=MYSQL \
--replicas 5 \
--detach=false \
-e MYSQL_ROOT_PASSWORD=mysecret \
--name mysql \
mysql
```

Refer to [Volumes for Services](https://docs.storidge.com/docker_volumes/volumes_for_services.html#create) for more info on using volumes with `docker service create`.

### Does Storidge have a docker volume plugin?

Yes, Storidge provides a [docker volume plugin](https://hub.docker.com/plugins/storidge-volume-plugin) which is automatically installed as part of a Storidge CIO software installation.

This volume plugin enables request for storage to be passed to the Storidge CIO software whether from a `docker run`, `docker service create`, `docker volume create` command or Docker Compose file.  

For more details, refer to [About Volume Plugins](https://docs.storidge.com/docker_volumes/about_volume_plugins.html).

### How do I upgrade Storidge's docker volume plugin?

To upgrade the volume plugin, use the `docker plugin` command to disable the plugin, upgrade, then re-enable the plugin.

Refer to [Upgrade CIO Volume Plugin](https://docs.storidge.com/docker_volumes/upgrade_cio_volume_plugin.html) for details on using the `docker plugin` command.

### Does Storidge have a CSI driver or volume plugin?

Yes, a [Storidge CSI driver](https://hub.docker.com/_/storidge-csi-driver) is available.

This driver passes requests for persistent volume claims or persistent volumes to the Storidge CIO software. The driver supports declarative input and enables storage for pods to be dynamically provisioned on demand based on storage classes or profiles.
