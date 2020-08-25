# K8S HPA Using External Metrics

## Prerequisites
1. Have docker & k8s running on local. [Guide](https://www.docker.com/blog/docker-mac-kubernetes/)

## Getting Started

1. Set up your DD keys as env variables

```
export DD_API_KEY=<your_dd_api_key>
export DD_APP_KEY=<your_dd_app_key>
```

2. Install all NPM deps
```
npm i
```

3. Start all k8s resources
```
./start.sh
# wait for 1 minute for all resources to spin up
```

4. Check pods and hpa status, you should see 2 replicas running
```
kubectl get pods,hpa
```

5. Add stress
```
npm start test
```

6. Wait for 2 minutes. Check status again in another tab. Shoud you see 5 replicas.
```
kubectl get pods,hpa
```

## Manifest Introduction
All manifests are located in the manifest directory.

1. *-rbac.yaml: All files containing rbac are for Role Base Access Control purpose. They will make sure the communication among node-agnent, cluster-agent and metrics api sever are properly set.
2. agent.yaml: Service and deploy for datadog node level agent.
3. cluster-agent.yaml: Service and deploy for datadog cluster level agent.
4. cluster-agent-hpa-svc.yaml: A service that connects the cluster agent and metrics service
5. hpa.yaml: the rule for hpa
6. metrics-api: the metrics api service
