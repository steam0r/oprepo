const inActor = op.inObject("actor", null, "xstate actor");
const inState = op.inString("state");

const outMatches = op.outBoolNum("in state");

inActor.onChange=subscribe;
inState.onChange=subscribe;

function subscribe() {
    const actor = inActor.get();
    const watchState = inState.get();
    if(actor && watchState) {
        actor.subscribe((state) => {
            if(state && state.matches(watchState)) {
                outMatches.set(true);
            }else{
                outMatches.set(false);
            }
        });
    }
}