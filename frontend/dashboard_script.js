const ROLE_SKILLS = {
  FULL_STACK_DEVELOPER: [
    "JAVASCRIPT",
    "DSA",
    "HTML",
    "CSS",
    "REACT",
    "NODE_JS",
    "REST_API",
    "SQL",
    "MONGODB",
    "GIT",
  ],
  BACKEND_DEVELOPER: [
    "PYTHON",
    "JAVA",
    "NODE_JS",
    "REST_API",
    "SQL",
    "SYSTEM_DESIGN",
    "AUTHENTICATION",
    "GIT",
  ],
  SOFTWARE_TEST_ENGINEER: [
    "UNIT_TESTING",
    "API_TESTING",
    "SELENIUM",
    "BUG_TRACKING",
    "CI_CD",
    "GIT",
  ],
  AI_ENGINEER: [
    "PYTHON",
    "MACHINE_LEARNING",
    "DEEP_LEARNING",
    "STATISTICS",
    "LINEAR_ALGEBRA",
    "DATA_LIBRARIES",
    "MODEL_EVALUATION",
    "FEATURE_ENGINEERING",
    "GIT",
  ],
  MACHINE_LEARNING_ENGINEER: [
    "PYTHON",
    "MACHINE_LEARNING",
    "MODEL_DEPLOYMENT",
    "MLOPS",
    "DATA_PIPELINES",
    "STATISTICS",
    "GIT",
  ],
  EMBEDDED_SYSTEMS_ENGINEER: [
    "C",
    "MICROCONTROLLERS",
    "RTOS",
    "PCB_DESIGN",
    "SENSORS",
    "CIRCUIT_ANALYSIS",
  ],
  VLSI_DESIGN_ENGINEER: [
    "DIGITAL_ELECTRONICS",
    "VERILOG",
    "FPGA",
    "CMOS",
    "VLSI_TOOLS",
    "CIRCUIT_SIMULATION",
  ],
  CAD_DESIGN_ENGINEER: [
    "AUTOCAD",
    "SOLIDWORKS",
    "CATIA",
    "GD_T",
    "ENGINEERING_DRAWINGS",
  ],
  ROBOTICS_AUTOMATION_ENGINEER: [
    "PLC",
    "CONTROL_SYSTEMS",
    "SENSORS",
    "MECHATRONICS",
    "ROBOTICS_BASICS",
  ],
  DATA_ANALYST: [
    "PYTHON",
    "SQL",
    "STATISTICS",
    "DATA_CLEANING",
    "EDA",
    "DATA_VISUALIZATION",
    "EXCEL",
    "BI_TOOLS",
    "REPORTING",
  ],
};

const LEARNING_RESOURCES = {
  PYTHON: "https://www.youtube.com/watch?v=rfscVS0vtbw",
  JAVASCRIPT: "https://www.youtube.com/watch?v=W6NZfCO5SIk",
  REACT: "https://www.youtube.com/watch?v=bMknfKXIFA8",
  NODE_JS: "https://www.youtube.com/watch?v=TlB_eWDSMt4",
  SQL: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
  MACHINE_LEARNING: "https://www.youtube.com/watch?v=Gv9_4yMHFhI",
  DEEP_LEARNING: "https://www.youtube.com/watch?v=aircAruvnKk",
  STATISTICS: "https://www.youtube.com/watch?v=xxpc-HPKN28",
  LINEAR_ALGEBRA: "https://www.youtube.com/watch?v=ZK3O402wf1c",
  DATA_CLEANING: "https://www.youtube.com/watch?v=vmEHCJofslg",
  C: "https://www.youtube.com/watch?v=KJgsSFOSQv0",
  RTOS: "https://www.youtube.com/watch?v=9Lr1r-B7UG8",
  PCB_DESIGN: "https://www.youtube.com/watch?v=b6p14h2N8H8",
  SENSORS: "https://www.youtube.com/watch?v=0lJ5nCk4Eiw",
  CIRCUIT_ANALYSIS: "https://www.youtube.com/watch?v=2Jw9cbeLYj0",
};

function formatSkill(skill) {
  return skill.replaceAll("_", " ");
}

function getBurnoutText(score) {
  if (score <= 30) return { label: "Low", className: "low", advice: "Your workload is balanced. Keep your routine stable." };
  if (score <= 60) return { label: "Moderate", className: "moderate", advice: "You are under moderate strain. Improve recovery time and reduce overload." };
  return { label: "High", className: "high", advice: "Your burnout risk is high. Prioritize sleep, rest, and a lighter schedule." };
}

document.addEventListener("DOMContentLoaded", () => {
  const role = localStorage.getItem("userRole") || "FULL_STACK_DEVELOPER";
  const name = localStorage.getItem("userName") || "Engineer";
  const branch = localStorage.getItem("userBranch") || "CSE";
  const selectedSkills = JSON.parse(localStorage.getItem("selectedSkills") || "[]");
  const sleep = Number(localStorage.getItem("sleep") || 0);
  const stress = Number(localStorage.getItem("stress") || 0);
  const focus = Number(localStorage.getItem("focus") || 0);
  const study = Number(localStorage.getItem("study") || 0);

  const targetSkills = ROLE_SKILLS[role] || [];
  const matchedSkills = selectedSkills.filter((skill) => targetSkills.includes(skill));
  const missingSkills = targetSkills.filter((skill) => !selectedSkills.includes(skill));
  const matchPercent = targetSkills.length
    ? Math.round((matchedSkills.length / targetSkills.length) * 100)
    : 0;

  document.getElementById("userInfo").innerHTML = `
    <strong>${name}</strong> • ${branch} • ${role.replaceAll("_", " ")}
  `;

  const progressBar = document.getElementById("progressBar");
  progressBar.style.width = `${matchPercent}%`;
  document.getElementById("matchPercent").textContent = `${matchPercent}%`;

  if (missingSkills.length > 0) {
    let html = "<strong>Missing Skills:</strong><ul>";
    missingSkills.slice(0, 4).forEach((skill) => {
      const link = LEARNING_RESOURCES[skill] || `https://www.youtube.com/results?search_query=${encodeURIComponent(formatSkill(skill))}`;
      html += `<li><a href="${link}" target="_blank" rel="noreferrer" class="learn-link">${formatSkill(skill)}</a></li>`;
    });
    html += "</ul>";
    document.getElementById("missingSkills").innerHTML = html;
  } else {
    document.getElementById("missingSkills").innerHTML = "<strong>Placement Ready 🚀</strong>";
  }

  const burnoutScore = Math.max(
    0,
    Math.min(100, Math.round((10 - sleep) * 7 + stress * 6 + (10 - focus) * 5 + (10 - study) * 4))
  );
  const burnout = getBurnoutText(burnoutScore);
  document.getElementById("burnoutLevel").textContent = burnout.label;
  document.getElementById("burnoutLevel").className = `big-number ${burnout.className}`;
  document.getElementById("burnoutAdvice").innerHTML = `<div class="recommendation-text">${burnout.advice}</div>`;

  document.getElementById("smartAdvice").innerHTML = `
    <div class="recommendation-text">
      You have matched <strong>${matchedSkills.length}</strong> of the required skills for <strong>${role.replaceAll("_", " ")}</strong>.<br>
      Focus next on: <strong>${missingSkills.slice(0, 3).map(formatSkill).join(", ") || "maintaining consistency"}</strong>.
    </div>
  `;

  const ctx = document.getElementById("skillChart");
  if (ctx && window.Chart) {
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Matched", "Missing"],
        datasets: [{
          data: [matchedSkills.length, Math.max(1, missingSkills.length)],
          backgroundColor: ["#6366f1", "#e2e8f0"],
          borderWidth: 0,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: "#fff" } } },
      },
    });
  }

  document.getElementById("restartBtn").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "index.html";
  });
});