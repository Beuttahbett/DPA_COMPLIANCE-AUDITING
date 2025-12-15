document.addEventListener("DOMContentLoaded", () => {
    // 1. Retrieve Data
    const savedData = localStorage.getItem('auditUserAnswers');
    if(!savedData) {
        alert("No audit data found. Redirecting to start.");
        window.location.href = "index.html";
        return;
    }
    const answers = JSON.parse(savedData);

    // 2. Variables for Scoring
    let totalPossible = 0;
    let earnedPoints = 0;
    let criticalFailures = []; // To store questions with "No" on Critical
    let gapAnalysis = []; // To store all Partial/No answers

    // 3. Process Logic
    // Flatten the questions structure
    const allQuestions = auditQuestions.flatMap(section => section.questions);

    // Profile Data (Section 1) - Just display
    const companyName = answers['q1'] || "Unspecified Entity";
    document.getElementById('company-name').textContent = `Entity: ${companyName}`;
    document.getElementById('timestamp').textContent = `Generated: ${new Date().toLocaleString()}`;

    // Loop Main Questions
    allQuestions.forEach(q => {
        if(q.weight > 0) {
            const userAns = answers[q.id];
            
            // Treat undefined (unanswered) as 0
            const val = (userAns === undefined || userAns === "") ? 0 : userAns;

            if(val !== "NA") {
                // Add to total
                totalPossible += q.weight;
                earnedPoints += (q.weight * val);

                // Critical Logic: If val is 0 and it's Critical
                if(q.critical && val == 0) {
                    criticalFailures.push(q);
                }

                // Gap Analysis: If score < 1 (Meaning No or Partial)
                if(val < 1) {
                    gapAnalysis.push({
                        text: q.text,
                        advice: q.legalContext,
                        isPartial: (val == 0.5)
                    });
                }
            }
        }
    });

    // 4. Calculate Final Score
    let finalPercentage = 0;
    if(totalPossible > 0) {
        finalPercentage = Math.round((earnedPoints / totalPossible) * 100);
    }

    // 5. Render Dashboard
    const scoreElem = document.getElementById('final-score');
    const badgeElem = document.getElementById('risk-badge');
    
    scoreElem.textContent = `${finalPercentage}%`;

    // Color Logic
    if(finalPercentage >= 90) {
        scoreElem.style.color = "#15803d"; // Green
        badgeElem.style.background = "#15803d";
        badgeElem.textContent = "LOW RISK / COMPLIANT";
    } else if (finalPercentage >= 70) {
        scoreElem.style.color = "#d97706"; // Orange
        badgeElem.style.background = "#d97706";
        badgeElem.textContent = "MODERATE RISK";
    } else {
        scoreElem.style.color = "#b91c1c"; // Red
        badgeElem.style.background = "#b91c1c";
        badgeElem.textContent = "HIGH REGULATORY RISK";
    }

    // Executive Summary
    const summary = document.getElementById('executive-summary');
    if(criticalFailures.length > 0) {
        summary.innerHTML = `<strong style="color:#b91c1c">IMMEDIATE ACTION REQUIRED.</strong> The audit identified ${criticalFailures.length} critical regulatory breaches. The entity is at high risk of penalties under CBK or Data Protection laws.`;
    } else if (finalPercentage < 100) {
        summary.innerHTML = `The entity shows a good compliance posture but has ${gapAnalysis.length} specific areas for improvement to meet full regulatory standards.`;
    } else {
        summary.innerHTML = `Excellent. The entity appears to be fully aligned with the audited regulatory frameworks.`;
    }

    // 6. Render Critical Failures
    if(criticalFailures.length > 0) {
        const critSection = document.getElementById('critical-section');
        critSection.classList.remove('critical-hidden');
        
        const tbody = document.getElementById('critical-table-body');
        criticalFailures.forEach(c => {
            tbody.innerHTML += `
                <tr>
                    <td><strong>${c.text}</strong></td>
                    <td style="color: #b91c1c; font-size: 0.85rem;">${c.legalContext}</td>
                </tr>
            `;
        });
    }

    // 7. Render Gap Analysis
    const gapContainer = document.getElementById('gap-cards-container');
    if(gapAnalysis.length === 0) {
        gapContainer.innerHTML = "<p>No specific control gaps identified.</p>";
    } else {
        gapAnalysis.forEach(g => {
            gapContainer.innerHTML += `
                <div class="gap-card">
                    <span class="gap-q">${g.text}</span>
                    <span class="gap-a"><strong>Legal Basis:</strong> ${g.advice}</span>
                </div>
            `;
        });
    }
});