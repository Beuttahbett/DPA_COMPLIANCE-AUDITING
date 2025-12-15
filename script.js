let currentSectionIndex = 0;
let userAnswers = {};

// On Load
document.addEventListener("DOMContentLoaded", () => {
    // Optional: Restore previous session
});

function startAudit() {
    document.getElementById('landing-screen').classList.replace('active-screen', 'hidden-screen');
    document.getElementById('audit-form-screen').classList.replace('hidden-screen', 'active-screen');
    renderSection(0);
}

function renderSection(index) {
    const section = auditQuestions[index];
    const container = document.getElementById('questions-container');
    container.innerHTML = ""; // Clear prev

    // Set Section Title
    document.getElementById('section-title-display').textContent = section.sectionTitle;
    document.getElementById('nav-step').textContent = `Step ${index + 1}: ${section.sectionTitle}`;

    // Update Progress
    const pct = Math.round(((index) / auditQuestions.length) * 100);
    document.getElementById('progress-bar').style.width = `${pct}%`;
    document.getElementById('progress-text').textContent = `${pct}%`;

    // Render Questions
    section.questions.forEach(q => {
        const card = document.createElement('div');
        card.className = "q-card";

        // Label with tooltip
        let labelHTML = `<label class="q-label">${q.text}`;
        if(q.legalContext) {
            labelHTML += `<span class="tooltip" data-tip="${q.legalContext}">?</span>`;
        }
        labelHTML += `</label>`;
        
        let inputHTML = "";

        // Standard Scoring Question
        if(q.weight > 0) {
            const safeId = q.id;
            // Check if already answered to pre-fill
            const existingVal = userAnswers[safeId] !== undefined ? userAnswers[safeId] : "";

            inputHTML = `
                <div class="radio-group">
                    <label class="radio-option">
                        <input type="radio" name="${safeId}" value="1" ${existingVal === 1 ? 'checked' : ''} onclick="saveAnswer('${safeId}', 1)">
                        <span>Yes</span>
                    </label>
                    <label class="radio-option">
                        <input type="radio" name="${safeId}" value="0.5" ${existingVal === 0.5 ? 'checked' : ''} onclick="saveAnswer('${safeId}', 0.5)">
                        <span>Partially</span>
                    </label>
                    <label class="radio-option">
                        <input type="radio" name="${safeId}" value="0" ${existingVal === 0 ? 'checked' : ''} onclick="saveAnswer('${safeId}', 0)">
                        <span>No</span>
                    </label>
                    <label class="radio-option">
                        <input type="radio" name="${safeId}" value="NA" ${existingVal === "NA" ? 'checked' : ''} onclick="saveAnswer('${safeId}', 'NA')">
                        <span>N/A</span>
                    </label>
                </div>
            `;
        } 
        // Text/Select Inputs (Section 1)
        else {
            if(q.type === 'select') {
                inputHTML = `<select onchange="saveAnswer('${q.id}', this.value)">
                    <option value="">-- Select --</option>
                    ${q.options.map(opt => `<option value="${opt}" ${userAnswers[q.id] === opt ? 'selected' : ''}>${opt}</option>`).join('')}
                </select>`;
            } else {
                inputHTML = `<input type="text" value="${userAnswers[q.id] || ''}" onchange="saveAnswer('${q.id}', this.value)">`;
            }
        }

        card.innerHTML = labelHTML + inputHTML;
        container.appendChild(card);
    });

    // Update Buttons
    document.getElementById('prev-btn').disabled = (index === 0);
    if(index === auditQuestions.length - 1) {
        document.getElementById('next-btn').classList.add('hidden-btn');
        document.getElementById('finish-btn').classList.remove('hidden-btn');
    } else {
        document.getElementById('next-btn').classList.remove('hidden-btn');
        document.getElementById('finish-btn').classList.add('hidden-btn');
    }
}

function saveAnswer(id, val) {
    userAnswers[id] = val;
}

function nextSection() {
    // Optional: Add validation here "Please answer all..."
    currentSectionIndex++;
    renderSection(currentSectionIndex);
    window.scrollTo(0,0);
}

function prevSection() {
    if(currentSectionIndex > 0) {
        currentSectionIndex--;
        renderSection(currentSectionIndex);
    }
}

function submitAudit() {
    // 1. Calculate Score inside JS to keep logic clean, but pass RAW data to Results
    // We save to LocalStorage to pass to next page
    localStorage.setItem('auditUserAnswers', JSON.stringify(userAnswers));
    
    // Redirect
    window.location.href = "results.html";
}