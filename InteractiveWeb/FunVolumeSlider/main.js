(()=>{

    var vol = 50,
        timer, angle, adjustment, clicked, clickx, clicky, middlex, middley, momentum = 0,
        resetOnMouseUp = true,
        friction = 0.01,
        bounce = 0.4;

    function getCenter() {
        middlex = document.getElementById("container").getBoundingClientRect().left + 100;
        middley = document.getElementById("container").getBoundingClientRect().top + 15;
        timer = setInterval(updateVolume, 5);
    }

    function updateVolume() {
        var dead = 0,
            sp = 0.5,
            adjusted = angle - adjustment;

        if (adjusted > dead) {
            momentum += (90 - Math.abs(adjusted - 90)) / 90 * sp;
        } else if (adjusted < -dead) {
            momentum -= (90 - Math.abs(adjusted - (-90))) / 90 * sp;
        }

        // friction
        if (momentum > 0) {
            if (momentum > friction) {
                momentum = momentum - friction;
            } else {
                momentum = 0;
            }
        } else if (momentum < 0) {
            if (momentum < -friction) {
                momentum = momentum + friction;
            } else {
                momentum = 0;
            }
        }
        vol += momentum;

        if (vol > 100) {
            vol = 100;
            if (momentum > 0.01) {
                momentum = -momentum * bounce;
            } else {
                momentum = 0;
            }
        } else if (vol < 0) {
            vol = 0;
            if (momentum < -0.01) {
                momentum = -momentum * bounce;
            } else {
                momentum = 0;
            }
        }
        document.getElementById("slider").value = vol;
        document.getElementById("volumeText").innerHTML = "Volume: " + parseInt(vol);
    }

    function mouseDown(event) {
        clickx = event.clientX;
        clicky = event.clientY;
        clicked = true;
        if (clickx > middlex) {
            angle = (Math.atan2(event.clientY - middley, event.clientX - middlex) * 180 / Math.PI);
        } else {
            angle = (Math.atan2(middley - event.clientY, middlex - event.clientX) * 180 / Math.PI);
        }
        adjustment = angle;
        document.getElementById("container").style.transform = "rotate(" + (angle - adjustment) + "deg)";
        document.getElementById("container").classList.remove("resetting");
    }

    function mouseUp(event) {
        clicked = false;

        if (resetOnMouseUp) {
            document.getElementById("container").style.transform = "rotate(0deg)";
            adjustment = 0;
            angle = 0;
            document.getElementById("container").classList.add("resetting");
        }
    }

    function mouseMove(event) {
        if (clicked) {
            if (clickx > middlex) {
                angle = (Math.atan2(event.clientY - middley, event.clientX - middlex) * 180 / Math.PI);
            } else {
                angle = (Math.atan2(middley - event.clientY, middlex - event.clientX) * 180 / Math.PI);
            }
            document.getElementById("container").style.transform = "rotate(" + (angle - adjustment) + "deg)";
        }
    }

    getCenter();


})();