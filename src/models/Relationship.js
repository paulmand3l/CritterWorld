import Entity from './abstract/Entity';

export default class Relationship extends Entity {
  constructor(source, target) {
    super();

    this.source = source;
    this.target = target;

    this.warmth = 0;
    this.competence = 0;
    this.discomfort = 0;
  }
}
