import { Field, isReady, shutdown, Mina } from 'snarkyjs';
import { StateUpdates } from "./index";

describe('index.ts', () => {

  afterAll(async () => {
    await shutdown();
  });

  it('updates state', async () => {
    await isReady;

    const Local = Mina.LocalBlockchain();
    Mina.setActiveInstance(Local);
    const account = Local.testAccounts[0].privateKey;
    let stateUpdates: StateUpdates;

    await Mina.transaction(account, async () => {
      stateUpdates = new StateUpdates(account.toPublicKey());
    }).send().wait();

    await Mina.transaction(account, async () => {
      await stateUpdates.update(Field(2), Field(2), Field(2));
    }).send().wait();

    let snappStateUp: Array<Field>;
    await Mina.transaction(account, async () => {
      snappStateUp = (await Mina.getAccount(account.toPublicKey())).snapp.appState;
    }).send().wait();

    await Mina.transaction(account, async () => {
      let f1Up = snappStateUp[0];
      expect(f1Up).toEqual(new Field(2));
    }).send().wait();
  });
});
