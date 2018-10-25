# History

presented at [EclipseCon Europe 2018](https://www.eclipsecon.org/europe2018/sessions/introduction-kubernetes)

# Demo-Script

The demo has been inspired by the [Hello Minikube Tutorial](https://kubernetes.io/docs/tutorials/hello-minikube/)


## prerequisite
1. have docker installed and the `docker` command working
2. have kubernetes installed and the `kubectrl` command working

## 1. demo web server running in node
1. `cd server`
2. `node server.js`
3. Open `localhost:8080` in web browser
4. `CMD+C` to stop server

## 2. run demo web server in docker
1. `cd server`
2. `docker build -t hello-node:v1 .`
3. `docker run -p 8080:8080 hello-node:v1`
4. Open `localhost:8080` in web browser
5. in second terminal, run `docker ps` to get container ID and `docker stop <containerid>` to stop container

## 3. run in kubernetes
1. `kubectl apply -f k8s.yaml`
2. `kubectl get all` to show running pods, deployment and service
3. Open `localhost:8080` in web browser
4. `kubectl logs <pod-name>`

## 4. heal
1. in second terminal, run `while true; do curl localhost:8080; sleep 0.1; done`
2. `kubectl exec -it <pod-name> bash`
3. `ps aux` to find process-id (pid) of node process
4. `kill <node-pid>`
5. observe the container to be restarted, and the second terminal keep getting responses from node server

## 5. scale up/down
1. edit `k8s.yaml` and increase `replicas` to `3`
2. `kubectl apply -f k8s.yaml`
3. in second terminal, obseve responses from servers with three different ids
4. `kubectl get pods` to see three pods running

## 6. rolling update
1. `cd server`
2. edit `server.js` and increase `version` to `2`
3. `docker build -t hello-node:v2 .`
4. `cd ..`
5. `kubectl apply -f k8s.yaml`
6. in scrond terminal, observer servers responding with version=2. Also note that there was NO DOWNTIME of your service.

## cleanup

`kubectl delete service/hello-node deployment/hello-node`
