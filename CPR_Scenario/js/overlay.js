
export function summaryOverlay(score, checkedPulse, lookedAround, earlyCPR, lateReaction) {
    console.log("overlaying");

    const overlay = document.createElement("div");
    const overlayStyles = {
        boxSizing: "border-box",

        backgroundColor: "black",
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        padding: "1em",

        fontFamily: "verdana, sans-serif",
    };

    const header = document.createElement("div");
    const headerStyles = {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "top",
        alignItems: "center",
    };

    const title = document.createElement("h1");
    title.textContent = "Congratulations! You saved him!";
    const titleStyles = {
        color: "white",
        fontSize: "3em",
        marginBottom: 0,
    };

    const summaryMessage = document.createElement("p");
    if (score == 2) {
        summaryMessage.textContent = "Excellent! You acted perfectly!";
    }
    else if (score >= 1) {
        summaryMessage.textContent = "Well done!";
    }
    else {
        summaryMessage.textContent = "You'll get better with practice!";
    }
    const summaryMessageStyles = {
        color: "white",
        fontSize: "2.5em",
        marginBottom: "3em",
    };

    const message1 = document.createElement("p");
    const message2 = document.createElement("p");
    const message3 = document.createElement("p");
    const message4 = document.createElement("p");
    if (checkedPulse) {
        message1.textContent = "There's no need to check for pulse. Lack of a response and normal breathing is enough to indicate the need for CPR";
        applyStyles(message1, {color: "red"});
    }
    else {
        message1.textContent = "Good job not checking the pulse. Checking for breathing is far easier and is sufficient.";
        applyStyles(message1, {color: "green"});
    }
    if (lookedAround) {
        message2.textContent = "Looking around for help is the way if you're unable to perform CPR, but it wastes valuable time!";
        applyStyles(message2, {color: "red"});
    }
    else {
        message2.textContent = "Great job staying focused on the task and not stopping to look for help.";
        applyStyles(message2, {color: "green"});
    }
    if (earlyCPR) {
        message3.textContent = "Don't perform CPR until you've quickly confirmed it's required (no response and no/irregular breathing)";
        applyStyles(message3, {color: "red"});
    }
    else {
        message3.textContent = "You started compressions at the right time after ensuring it was needed. Excellent!";
        applyStyles(message3, {color: "green"});
    }
    if (lateReaction) {
        message4.textContent = "Don't hesitate or wait for instructions. Every second is crucial!";
        applyStyles(message4, {color: 'red'});
    }
    else {
        message4.textContent = "Well done following your instincts and not delaying action!";
        applyStyles(message4, {color: 'green'});
    }
    const messageStyle = {
        fontSize: "1.5em",
        marginBottom: "3em",
    };


    applyStyles(overlay, overlayStyles);
    applyStyles(title, titleStyles);
    applyStyles(summaryMessage, summaryMessageStyles)
    applyStyles(header, headerStyles);
    applyStyles(message1, messageStyle);
    applyStyles(message2, messageStyle);
    applyStyles(message3, messageStyle);
    applyStyles(message4, messageStyle);

    header.append(title);
    header.append(summaryMessage);
    overlay.append(header);
    overlay.append(message1);
    overlay.append(message2);
    overlay.append(message3);
    overlay.append(message4);
    document.querySelector("body").append(overlay);
}

function applyStyles(elem, styles) {
    for (const property in styles) {
        if (styles.hasOwnProperty(property)) {
            elem.style[property] = styles[property];
        }
    }
}
