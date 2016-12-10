'use strict'

class Message {
  constructor(data = {}, type) {
    if (!data) {
      throw new Error('data is required');
    }

    if (!data.type) {
      if (!type) {
        throw new Error('type is required');
      }
      data.type = type;
    }

    if (!data.value) {
      throw new Error('value is required');
    }

    Object.assign(this, data);
  }
  get type() { return this._type; }
  set type(val) { this._type = val; }
  get value() { return this._value; }
  set value(val) { this._value = val; }

  toJSON() {
    return {type: this.type, value: this.value};
  }
}

module.exports = {
  Message
}

