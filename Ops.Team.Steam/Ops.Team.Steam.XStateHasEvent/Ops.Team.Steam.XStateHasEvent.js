const inActor = op.inObject("actor", null, "xstate actor");
const inEvent = op.inString("event");

const outMatches = op.outBoolNum("has");

inActor.onChange=subscribe;
inEvent.onChange=subscribe;

function subscribe() {
    const actor = inActor.get();
    const watchState = inEvent.get();
    if(actor && watchState) {
        actor.subscribe((state) => {
            if(state && state.can(watchState)) {
                outMatches.set(true);
            }else{
                outMatches.set(false);
            }
        });
    }
}