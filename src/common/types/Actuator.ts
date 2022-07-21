/**
 * 为了满足Spring Boot Actuator的返回值而定义的类型
 */

interface Measurement {
  statistic: String;
  value: Number | String;
}

interface Tag {
  tag: String;
  values: Array<String>;
}

interface Metrics {
  readonly name: String;
  readonly description: String;
  readonly baseUnit: String;
  readonly measurements: Array<Measurement>;
  readonly availableTags: Array<Tag>;
}

type Actuator = Metrics;

export default Actuator;
