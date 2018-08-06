import Entity from './abstract/Entity';

export default class Agent extends Entity {
  constructor() {
    super();

    this.personality = {
      extraversion: 0.5,
      agreeableness: 0.5,
      openness: 0.5,
      conscientiousness: 0.5,
      neuroticism: 0.5,
    }

    this.morals = {
      lust: 0.5,      // vs chastity
      gluttony: 0.5,  // vs abstinence
      greed: 0.5,     // vs generosity
      sloth: 0.5,     // vs diligence
      wrath: 0.5,     // vs patience
      envy: 0.5,      // vs kindness
      pride: 0.5,     // vs humility
    }

    this.intelligence = {
      comprehension: 0.5,
      recall: 0.5
    }

    this.talents = {
      strength: 0.5,
      dexterity: 0.5,
      constitution: 0.5, // resistance to environmental factors (physiological / safety)
      charisma: 0.5, // resistance to psychological factors (love, esteem)
      luck: 0.5,
    }

    this.needs = {
      physiological: {
        food: 0,
        water: 0,
        warmth: 0,
        rest: 0,
      },

      safety: {
        stability: 0, // looking back at the past
        security: 0, // looking forward at the future
      },

      love: {
        eros: 0, // intimacy
        filia: 0, // friendship
        agape: 0, // family
      },

      esteem: {
        prestige: 0, // recognition by people you don't know
        respect: 0, // recognition by people you do care about
        confidence: 0, // recognition of self
      },

      actualization: {
        morality: 0,
        creativity: 0,
      }
    }

    this.phenotype = {
      color: {
        primary: '#444444',
        secondary: 'skyBlue',
      },

      shape: {
        width: 10,
        height: 10,
        radius: 3,
      }
    }

    this.relationships = [];

    Agent.all[this.id] = this;
  }

  step(currentStep, environment) {
    if (!this.birthday) {
      this.birthday = currentStep;
    }
    // TODO
  }

  die() {
    this.tile.remove(this);
    delete Agent.all[this.id];
  }
}

Agent.all = {};
