import { Field, SmartContract, state, State, method } from 'snarkyjs';

/**
 * Creates 3 state fields and exposes a smart contract method to update them.
 */
export class StateUpdates extends SmartContract {
  @state(Field) f1 = State<Field>();
  @state(Field) f2 = State<Field>();
  @state(Field) f3 = State<Field>();

  // initialization
  deploy() {
    super.deploy();
  }

  @method async update(f1: Field, f2: Field, f3: Field) {
    this.f1.set(f1);
    this.f2.set(f2);
    this.f3.set(f3);
  }
}
