import dd_trace from 'dd-trace';

const dd_agent_host = process.env.DATADOG_TRACE_AGENT_HOSTNAME || 'localhost';
const trace_port = parseInt(process.env.DD_TRACE_PORT || 8126);
const statsd_port = parseInt(process.env.DD_STATSD_PORT || 8125);

const tags = {
  kube_namespace: 'localhpatest',
  kube_deployment: 'localhpatest',
  pod_name: 'local',
  docker_image: 'local',
  env: 'local'
};

/* APM tracer. Must be imported at the top of your source file before any
 * other imports.
 *
 * Dev Note: the tracer HAS to be initialized here rather than in the source
 * code that imports it. This is to make sure that the tracer is initialized
 * before any anything that it needs to autoinstrument is esm-imported
*/
export const tracer = dd_trace.init({
  hostname: dd_agent_host,
  service: 'localhpatest',
  tags,
  runtimeMetrics: true,
  port: trace_port,
  dogstatsd: {
    hostname: dd_agent_host,
    port: statsd_port,
  },
  env: 'local'
});
tracer.use('http', {splitByDomain: true, service: tags.kube_deployment});
console.log('dd tracer start')
