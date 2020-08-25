# config necessary role based access control for dd-agent and cluster-agent
kubectl apply -f manifests/cluster-agent-rbac.yaml
kubectl apply -f manifests/agent-rbac.yaml

# create secrets
kubectl create secret generic datadog-secret --from-literal=api-key="$DD_API_KEY" --from-literal=app-key="$DD_APP_KEY"
echo -n '<32_CHARACTER_LONG_STRING>' | base64
kubectl create secret generic datadog-auth-token --from-literal=token=PDMyX0NIQVJBQ1RFUl9MT05HX1NUUklORz4=

# create other kube resources
kubectl apply -f manifests/cluster-agent.yaml
kubectl apply -f manifests/agent.yaml
kubectl apply -f manifests/metrics-api.yaml
kubectl apply -f manifests/cluster-agent-hpa-svc.yaml
kubectl apply -f manifests/hpa-rbac.yaml
kubectl apply -f manifests/hpa.yaml

# build and deploy the testing node service
docker build -t localhpatest .
kubectl apply -f manifests/main-manifest.yml

