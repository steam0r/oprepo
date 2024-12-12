const inActor = op.inObject("actor", null, "xstate actor");

const inTrigger = op.inTriggerButton("exec");
const inEvent = op.inString("event");

inTrigger.onTriggered = () => {
    const actor = inActor.get();
    const event = inEvent.get()
    if(actor && inEvent) {
        actor.send({ "type": event });
    }
}
