(async () => {
    function triggerMouseEvent(node, eventType) {
        var clickEvent = document.createEvent("MouseEvents");
        clickEvent.initEvent(eventType, true, true);
        node.dispatchEvent(clickEvent);
    }

    function simulateClick(targetNode) {
        triggerMouseEvent(targetNode, "mouseover");
        triggerMouseEvent(targetNode, "mousedown");
        triggerMouseEvent(targetNode, "mouseup");
        triggerMouseEvent(targetNode, "click");
    }

    function tick(ms) {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log("tick");
                resolve();
            }, ms ?? 25);
        });
    }

    await tick(3000);
    const input = document.querySelector(`[data-testid="compose-modal-desktop"] [data-testid="address-book-input"]`);

    const added = new Set();
    let didAdd = true;
    while (didAdd) {
        didAdd = false;
        input.focus();
        simulateClick(input);
        await tick(1500);
        // const btn = document.querySelector(`[data-testid="compose-modal-desktop"] [data-testid="address-button"]`);
        const menu = document.querySelector(`[data-testid="address-book-popover"]`);
        for (const child of menu.children) {
            if (child.tagName === "SPAN" && child.innerText !== "Back") {
                const name = child.innerText.trim();
                if (added.has(name))
                    continue;
                added.add(name);
                console.log(added);
                simulateClick(child.querySelector("div"));
                document.activeElement.blur();
                await tick();
                document.activeElement.blur();
                didAdd = true;
                break;
            }
        }
    }
    console.log(added);

})();
