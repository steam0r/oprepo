const inDefinition = op.inObject("definition", null, "xstate definition");
const inTrigger = op.inTriggerButton("start");
const outActor = op.outObject("actor", null, "xstate actor");
const outState = op.outString("state");

const { createMachine, actions, interpret } = XState;

let actor = null;

inTrigger.onTriggered = () =>
{
    if (actor) actor.start();
};

inDefinition.onChange = () =>
{
    const definition = inDefinition.get();
    if (definition)
    {
        const machine = createMachine(definition);
        actor = interpret(machine);
        outActor.set(actor);
        actor.subscribe((state) =>
        {
            outState.set(state ? state.toStrings().join(".") : null);
        });
        actor.start();
    }
};
