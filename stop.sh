kubectl delete service datadog-cluster-agent
kubectl delete service datadog-custom-metrics-server
kubectl delete service datadog-cluster-agent-metrics-api
kubectl delete service localhpatest

kubectl delete deploy datadog-cluster-agent

kubectl delete daemonset datadog-agent

kubectl delete secret datadog-auth-token
kubectl delete secret datadog-secret
kubectl delete hpa localhpatestext

kubectl delete deployment localhpatest

echo "all k8s resources stopped"
