const FALLBACK_ROLE_SKILLS = {
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

const API_URL = "http://127.0.0.1:8000";

function renderSkillList(skills) {
  const container = document.getElementById("skillsContainer");
  if (!container) return;

  container.innerHTML = "";

  skills.forEach((skill) => {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = skill;

    label.appendChild(checkbox);
    label.append(" " + skill.replaceAll("_", " "));
    container.appendChild(label);
  });
}

function loadSkillsFromRole(role) {
  const skills = FALLBACK_ROLE_SKILLS[role] || [];
  renderSkillList(skills);
}

function getRoleFromStorage() {
  return localStorage.getItem("userRole") || "FULL_STACK_DEVELOPER";
}

document.addEventListener("DOMContentLoaded", () => {
  const role = getRoleFromStorage();
  loadSkillsFromRole(role);

  const btn = document.getElementById("generateBtn");
  if (btn) {
    btn.addEventListener("click", generateReport);
  }
});

async function generateReport() {
  const selectedSkills = [];

  document
    .querySelectorAll("#skillsContainer input:checked")
    .forEach((cb) => selectedSkills.push(cb.value));

  const sleep = document.getElementById("sleep").value;
  const stress = document.getElementById("stress").value;
  const focus = document.getElementById("focus").value;
  const study = document.getElementById("study").value;

  if (!sleep || !stress || !focus || !study) {
    alert("Please fill all metrics.");
    return;
  }

  const generateBtn = document.getElementById("generateBtn");
  generateBtn.disabled = true;
  generateBtn.textContent = "Saving...";

  try {
    const response = await fetch(`${API_URL}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: localStorage.getItem("userName"),
        branch: localStorage.getItem("userBranch"),
        target_role: getRoleFromStorage(),
        skills: selectedSkills,
        sleep_hours: Number(sleep),
        focus_score: Number(focus),
        stress_level: Number(stress),
        study_hours: Number(study),
      }),
    });

    if (!response.ok) {
      throw new Error(`The server returned ${response.status}.`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    alert(`Unable to save your assessment: ${message}`);
    return;
  } finally {
    generateBtn.disabled = false;
    generateBtn.textContent = "Generate Report";
  }

  localStorage.setItem("selectedSkills", JSON.stringify(selectedSkills));
  localStorage.setItem("sleep", sleep);
  localStorage.setItem("stress", stress);
  localStorage.setItem("focus", focus);
  localStorage.setItem("study", study);

  window.location.href = "dashboard.html";
}