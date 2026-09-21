/* ==================== */
/* SCREEN NAVIGATION */
/* ==================== */

function showScreen(screenId) {

    const screens =
        document.querySelectorAll(".screen");


    screens.forEach(function(screen) {

        screen.classList.remove("active");

    });


    const selectedScreen =
        document.getElementById(screenId);


    selectedScreen.classList.add("active");


    /* Load history when Screen 5 opens */

    if (screenId === "historyScreen") {

        displayHistory();

    }
}

/* ==================== */
/* PASSWORD CHECKING */
/* ==================== */

function checkPassword() {


const password =
    document.getElementById("passwordInput").value;


const hasLength =
    password.length >= 8;


const hasUppercase =
    /[A-Z]/.test(password);


const hasLowercase =
    /[a-z]/.test(password);


const hasNumber =
    /[0-9]/.test(password);


const hasSpecial =
    /[^A-Za-z0-9]/.test(password);


updateRequirement(
    "lengthRequirement",
    hasLength,
    "At least 8 characters"
);


updateRequirement(
    "uppercaseRequirement",
    hasUppercase,
    "Uppercase letter"
);


updateRequirement(
    "lowercaseRequirement",
    hasLowercase,
    "Lowercase letter"
);


updateRequirement(
    "numberRequirement",
    hasNumber,
    "Number"
);


updateRequirement(
    "specialRequirement",
    hasSpecial,
    "Special character"
);


let score = 0;


if (hasLength) {
    score++;
}


if (password.length >= 12) {
    score++;
}


if (hasUppercase) {
    score++;
}


if (hasLowercase) {
    score++;
}


if (hasNumber) {
    score++;
}


if (hasSpecial) {
    score++;
}


updateStrength(score);
```

}

/* ==================== */
/* UPDATE REQUIREMENTS */
/* ==================== */

function updateRequirement(
elementId,
condition,
text
) {


const element =
    document.getElementById(elementId);


if (condition) {

    element.textContent =
        "✓ " + text;

} else {

    element.textContent =
        "✗ " + text;
}


}

/* ==================== */
/* UPDATE STRENGTH */
/* ==================== */

function updateStrength(score) {


const strengthText =
    document.getElementById("strengthText");


const strengthFill =
    document.getElementById("strengthFill");


if (score === 0) {

    strengthText.textContent = "-";

    strengthFill.style.width = "0%";

}

else if (score <= 2) {

    strengthText.textContent = "WEAK";

    strengthFill.style.width = "30%";

}

else if (score <= 4) {

    strengthText.textContent = "MEDIUM";

    strengthFill.style.width = "65%";

}

else {

    strengthText.textContent = "STRONG";

    strengthFill.style.width = "100%";
}


}

/* ==================== */
/* SHOW / HIDE PASSWORD */
/* ==================== */

function togglePassword() {


const passwordInput =
    document.getElementById("passwordInput");


if (passwordInput.type === "password") {

    passwordInput.type = "text";

} else {

    passwordInput.type = "password";
}
```

}

/* ==================== */
/* TEMPORARY TEST */
/* ==================== */

function analyzePassword() {

    const password =
        document.getElementById("passwordInput").value;


    const hasLength =
        password.length >= 8;

    const hasUppercase =
        /[A-Z]/.test(password);

    const hasLowercase =
        /[a-z]/.test(password);

    const hasNumber =
        /[0-9]/.test(password);

    const hasSpecial =
        /[^A-Za-z0-9]/.test(password);


    let score = 0;


    if (hasLength) {
        score++;
    }

    if (password.length >= 12) {
        score++;
    }

    if (hasUppercase) {
        score++;
    }

    if (hasLowercase) {
        score++;
    }

    if (hasNumber) {
        score++;
    }

    if (hasSpecial) {
        score++;
    }


    let percentage =
        Math.round((score / 6) * 100);


    let strength;


    if (score <= 2) {

        strength = "WEAK";

    } else if (score <= 4) {

        strength = "MEDIUM";

    } else {

        strength = "STRONG";
    }


    /* Send information to Screen 3 */

    document.getElementById("resultStrength")
        .textContent = strength;


    document.getElementById("scoreText")
        .textContent = percentage + "%";


    document.getElementById("scoreFill")
        .style.width = percentage + "%";


    document.getElementById("resultLength")
        .textContent =
        (hasLength ? "✓ " : "✗ ") +
        "8+ characters";


    document.getElementById("resultUppercase")
        .textContent =
        (hasUppercase ? "✓ " : "✗ ") +
        "Uppercase letter";


    document.getElementById("resultLowercase")
        .textContent =
        (hasLowercase ? "✓ " : "✗ ") +
        "Lowercase letter";


    document.getElementById("resultNumber")
        .textContent =
        (hasNumber ? "✓ " : "✗ ") +
        "Number";


    document.getElementById("resultSpecial")
        .textContent =
        (hasSpecial ? "✓ " : "✗ ") +
        "Special character";


    /* Result message */

    if (strength === "STRONG") {

        document.getElementById("resultIcon")
            .textContent = "🟢";

        document.getElementById("resultMessage")
            .textContent =
            "Your password is strong!";

    }

    else if (strength === "MEDIUM") {

        document.getElementById("resultIcon")
            .textContent = "🟡";

        document.getElementById("resultMessage")
            .textContent =
            "Your password could be stronger.";

    }

    else {

        document.getElementById("resultIcon")
            .textContent = "🔴";

        document.getElementById("resultMessage")
            .textContent =
            "Your password is weak. Try improving it.";

    }


    /* Open Screen 3 */
    saveHistory(strength, percentage);
    showScreen("analysisScreen");
}
/* ==================== */
/* PASSWORD HISTORY */
/* ==================== */

function saveHistory(strength, score) {

    let history =
        JSON.parse(localStorage.getItem("passwordHistory")) || [];


    const record = {

        strength: strength,

        score: score,

        date: new Date().toLocaleString()

    };


    history.unshift(record);


    /* Keep only the latest 5 checks */

    if (history.length > 5) {

        history = history.slice(0, 5);

    }


    localStorage.setItem(
        "passwordHistory",
        JSON.stringify(history)
    );
}


/* ==================== */
/* DISPLAY HISTORY */
/* ==================== */

function displayHistory() {

    const historyList =
        document.getElementById("historyList");

    const noHistory =
        document.getElementById("noHistory");


    let history =
        JSON.parse(localStorage.getItem("passwordHistory")) || [];


    historyList.innerHTML = "";


    if (history.length === 0) {

        noHistory.style.display = "block";

        return;

    }


    noHistory.style.display = "none";


    history.forEach(function(record) {

        const item =
            document.createElement("div");

        item.className = "history-item";


        item.innerHTML = `

            <div>

                <div class="history-password">
                    🔐 Password checked
                </div>

                <div class="history-date">
                    ${record.date}
                </div>

            </div>

            <div class="history-strength">

                ${record.strength}
                (${record.score}%)

            </div>

        `;


        historyList.appendChild(item);

    });
}


/* ==================== */
/* CLEAR HISTORY */
/* ==================== */

function clearHistory() {

    localStorage.removeItem("passwordHistory");

    displayHistory();

}