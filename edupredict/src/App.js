import { useState, useEffect, useCallback, useRef } from "react";

// ─── SYNTHETIC STUDENT DATA GENERATOR ───────────────────────────────────────
function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function generateStudents(n = 120) {
  const rng = seededRandom(42);
  const names = [
    "Aarav Sharma",
    "Priya Patel",
    "Rohan Gupta",
    "Ananya Singh",
    "Vikram Mehta",
    "Kavya Reddy",
    "Arjun Kumar",
    "Divya Nair",
    "Siddharth Joshi",
    "Pooja Verma",
    "Rahul Agarwal",
    "Sneha Iyer",
    "Karan Malhotra",
    "Riya Choudhary",
    "Aditya Bose",
    "Meera Pillai",
    "Nikhil Saxena",
    "Shreya Ghosh",
    "Tanvir Ahmed",
    "Lakshmi Rao",
    "Dhruv Kapoor",
    "Nisha Tiwari",
    "Arnav Bansal",
    "Kritika Das",
    "Varun Pandey",
    "Simran Chopra",
    "Harsh Sinha",
    "Aditi Mishra",
    "Manish Yadav",
    "Pallavi Shah",
    "Ritesh Jain",
    "Anjali Srivastava",
    "Kunal Desai",
    "Preeti Chauhan",
    "Ayush Tomar",
    "Shalini Dubey",
    "Parth Bhatt",
    "Neha Kulkarni",
    "Rohit Shukla",
    "Swati Goyal",
    "Abhinav Mathur",
    "Priyanka Nambiar",
    "Saurabh Patil",
    "Ruchi Aggarwal",
    "Vivek Oberoi",
    "Monika Sethi",
    "Deepak Bhatia",
    "Sunita Rajan",
    "Gaurav Khanna",
    "Alka Menon",
    "Rajesh Tripathi",
    "Vandana Naik",
    "Suresh Alawadhi",
    "Geeta Sood",
    "Vijay Sharma",
    "Rekha Bhattacharya",
    "Manoj Gupta",
    "Seema Joshi",
    "Vinod Kapoor",
    "Lata Mehta",
    "Pankaj Shetty",
    "Usha Rao",
    "Ramesh Pillai",
    "Gita Nair",
    "Babu Krishnan",
    "Asha Menon",
    "Sunil Narayanan",
    "Vimla Iyer",
    "Ravi Chandran",
    "Pushpa Nambiar",
    "Shyam Murali",
    "Kamla Varma",
    "Gopalan Krishnamurthy",
    "Malathi Subramanian",
    "Balan Venkatesh",
    "Indira Kannan",
    "Mani Pillai",
    "Saraswathi Prabhu",
    "Shankar Raghavan",
    "Leela Suresh",
    "Murugan Arunachalam",
    "Meenakshi Nadarajan",
    "Selvam Annamalai",
    "Kavitha Sundar",
    "Raja Gopal",
    "Saranya Muthukumar",
    "Dinesh Kumaran",
    "Suganya Ravi",
    "Venkat Swaminathan",
    "Devi Natarajan",
    "Kartik Anand",
    "Bhavna Suri",
    "Sameer Ahuja",
    "Namrata Walia",
    "Tarun Saini",
    "Ishaan Kohli",
    "Gauri Bakshi",
    "Yash Luthra",
    "Tejal Doshi",
    "Chirag Mehrotra",
    "Swapna Roy",
    "Debashish Dutta",
    "Moumita Basu",
    "Sourav Chakraborty",
    "Puja Banerjee",
    "Aniket Mukherjee",
    "Sangita Paul",
    "Subhajit Sen",
    "Kakoli Mondal",
    "Partha Ganguly",
    "Sunanda Sarkar",
    "Biswanath Chatterjee",
    "Ruma Ghosh",
    "Tapas Biswas",
    "Mimi Das",
    "Sovan Nandi",
    "Madhurima Roy",
    "Subrata Hazra",
    "Chandana Bera",
    "Prasanta Pal",
  ];

  const departments = [
    "CSE",
    "ECE",
    "ME",
    "CE",
    "EEE",
    "IT",
    "CSE-AIML",
    "CSE-DS",
  ];
  const semesters = [2, 3, 4, 5, 6];

  return Array.from({ length: n }, (_, i) => {
    const r = rng;
    const isAtRisk = rng() < 0.27;
    const noise = () => (rng() - 0.5) * 10;

    const attendance = isAtRisk
      ? Math.min(100, Math.max(20, 52 + noise() * 1.5))
      : Math.min(100, Math.max(60, 82 + noise()));

    const assignmentCompletion = isAtRisk
      ? Math.min(100, Math.max(20, 55 + noise() * 1.4))
      : Math.min(100, Math.max(60, 84 + noise()));

    const lmsLogins = isAtRisk
      ? Math.max(0.5, 2.1 + noise() * 0.3)
      : Math.max(2, 5.8 + noise() * 0.2);

    const quizScore = isAtRisk
      ? Math.min(100, Math.max(20, 48 + noise() * 1.4))
      : Math.min(100, Math.max(55, 74 + noise()));

    const midSemGrade = isAtRisk
      ? Math.min(100, Math.max(20, 44 + noise() * 1.5))
      : Math.min(100, Math.max(55, 72 + noise()));

    const peerInteraction = isAtRisk
      ? Math.max(0, 2 + noise() * 0.5)
      : Math.max(2, 6.5 + noise() * 0.3);
    const submissionTimeliness = isAtRisk
      ? Math.min(1, Math.max(0, 0.48 + rng() * 0.2))
      : Math.min(1, Math.max(0.5, 0.82 + rng() * 0.1));
    const resourceAccess = isAtRisk
      ? Math.max(1, Math.round(8 + noise()))
      : Math.max(5, Math.round(22 + noise()));

    // Derived features
    const attendanceTrend = isAtRisk
      ? rng() < 0.7
        ? "declining"
        : "stable"
      : rng() < 0.7
        ? "improving"
        : "stable";
    const engagementConsistency = Math.max(
      0,
      Math.min(1, isAtRisk ? 0.3 + rng() * 0.25 : 0.72 + rng() * 0.2),
    );

    // Risk score (logistic-style)
    const rawScore =
      (100 - attendance) * 0.312 +
      (100 - assignmentCompletion) * 0.271 +
      (1 - engagementConsistency) * 100 * 0.198 +
      (100 - midSemGrade) * 0.181 +
      (100 - quizScore) * 0.143 +
      (1 - submissionTimeliness) * 100 * 0.121 +
      Math.max(0, 30 - resourceAccess) * 0.087 +
      Math.max(0, 10 - peerInteraction) * 0.063;

    const riskProbability = Math.min(0.99, Math.max(0.01, rawScore / 80));
    const predictedRisk = riskProbability > 0.45;

    return {
      id: i + 1,
      name: names[i % names.length],
      rollNo: `2B${String(2022 + Math.floor(i / 60)).slice(-2)}${departments[i % departments.length].replace(/-/g, "").substring(0, 2)}${String(1000 + i).slice(1)}`,
      department: departments[i % departments.length],
      semester: semesters[i % semesters.length],
      attendance: Math.round(attendance * 10) / 10,
      assignmentCompletion: Math.round(assignmentCompletion * 10) / 10,
      lmsLoginsPerWeek: Math.round(lmsLogins * 10) / 10,
      quizScore: Math.round(quizScore * 10) / 10,
      midSemGrade: Math.round(midSemGrade * 10) / 10,
      peerInteraction: Math.round(peerInteraction * 10) / 10,
      submissionTimeliness: Math.round(submissionTimeliness * 100) / 100,
      resourceAccess,
      attendanceTrend,
      engagementConsistency: Math.round(engagementConsistency * 100) / 100,
      riskProbability: Math.round(riskProbability * 100) / 100,
      predictedRisk,
      riskLevel:
        riskProbability > 0.7
          ? "High"
          : riskProbability > 0.45
            ? "Medium"
            : riskProbability > 0.25
              ? "Low"
              : "Minimal",
    };
  });
}

// ─── COUNTERFACTUAL GENERATOR ────────────────────────────────────────────────
function generateCounterfactuals(student) {
  const cfs = [];
  const {
    attendance,
    assignmentCompletion,
    lmsLoginsPerWeek,
    midSemGrade,
    quizScore,
  } = student;

  if (attendance < 75) {
    const delta = Math.ceil(75 - attendance);
    cfs.push({
      feature: "Attendance Rate",
      current: `${attendance}%`,
      required: `${attendance + delta}%`,
      change: `+${delta} pp`,
      outcome: delta <= 15 ? "Not at risk" : "Borderline",
    });
  }
  if (assignmentCompletion < 80) {
    const delta = Math.ceil(80 - assignmentCompletion);
    cfs.push({
      feature: "Assignment Completion",
      current: `${assignmentCompletion}%`,
      required: `${assignmentCompletion + delta}%`,
      change: `+${delta} pp`,
      outcome: delta <= 18 ? "Not at risk" : "Borderline",
    });
  }
  if (attendance < 75 && assignmentCompletion < 80) {
    const d1 = Math.ceil((75 - attendance) * 0.7);
    const d2 = Math.ceil((80 - assignmentCompletion) * 0.7);
    cfs.push({
      feature: "Attendance + Assignment",
      current: `${attendance}%, ${assignmentCompletion}%`,
      required: `${attendance + d1}%, ${assignmentCompletion + d2}%`,
      change: `+${d1} pp each`,
      outcome: "Not at risk",
    });
  }
  if (midSemGrade < 55) {
    const delta = Math.ceil(55 - midSemGrade);
    cfs.push({
      feature: "Mid-Semester Grade",
      current: `${midSemGrade}%`,
      required: `${midSemGrade + delta}%`,
      change: `+${delta} pp`,
      outcome: "Borderline",
    });
  }
  if (lmsLoginsPerWeek < 4) {
    cfs.push({
      feature: "LMS Engagement",
      current: `${lmsLoginsPerWeek}x/week`,
      required: "4-5x/week",
      change: "Increase logins",
      outcome: "Borderline",
    });
  }
  return cfs.length > 0
    ? cfs
    : [
        {
          feature: "Overall Improvement",
          current: "Current profile",
          required: "Sustained engagement",
          change: "Maintain trend",
          outcome: "Not at risk",
        },
      ];
}

// ─── SHAP-STYLE FEATURE SCORES ───────────────────────────────────────────────
const FEATURE_WEIGHTS = [
  {
    key: "attendance",
    label: "Attendance Rate",
    weight: 0.312,
    color: "#5DCAA5",
  },
  {
    key: "assignmentCompletion",
    label: "Assignment Completion",
    weight: 0.271,
    color: "#7F77DD",
  },
  {
    key: "engagementConsistency",
    label: "LMS Engagement Consistency",
    weight: 0.198,
    color: "#378ADD",
  },
  {
    key: "midSemGrade",
    label: "Mid-Semester Grade",
    weight: 0.181,
    color: "#EF9F27",
  },
  {
    key: "quizScore",
    label: "Quiz Performance",
    weight: 0.143,
    color: "#D85A30",
  },
  {
    key: "submissionTimeliness",
    label: "Submission Timeliness",
    weight: 0.121,
    color: "#D4537E",
  },
  {
    key: "resourceAccess",
    label: "Resource Access Count",
    weight: 0.087,
    color: "#639922",
  },
  {
    key: "peerInteraction",
    label: "Peer Interaction Index",
    weight: 0.063,
    color: "#888780",
  },
];

function getShapScore(student, feat) {
  const val = student[feat.key];
  let normalized = 0;
  if (
    feat.key === "attendance" ||
    feat.key === "assignmentCompletion" ||
    feat.key === "midSemGrade" ||
    feat.key === "quizScore"
  )
    normalized = val / 100;
  else if (feat.key === "lmsLoginsPerWeek") normalized = Math.min(val / 8, 1);
  else if (
    feat.key === "submissionTimeliness" ||
    feat.key === "engagementConsistency"
  )
    normalized = val;
  else if (feat.key === "resourceAccess") normalized = Math.min(val / 30, 1);
  else if (feat.key === "peerInteraction") normalized = Math.min(val / 10, 1);
  const contribution = (1 - normalized) * feat.weight;
  return Math.round(contribution * 1000) / 1000;
}

// ─── API CALL ─────────────────────────────────────────────────────────────────
async function callLLM(messages, systemPrompt) {
  try {
    const response = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages, systemPrompt }),
    });

    // ✅ FIXED ERROR HANDLING
    if (!response.ok) {
      const errText = await response.text();
      console.error("API error:", errText);
      return "LLM API failed";
    }

    const data = await response.json();

    console.log("Frontend got:", data);

    return data.reply || "No response";
  } catch (err) {
    console.error("Frontend error:", err);
    return "Error connecting to AI";
  }
}

// ─── COLORS ──────────────────────────────────────────────────────────────────
const riskColor = (level) =>
  ({
    High: { bg: "#FCEBEB", text: "#A32D2D", border: "#F09595" },
    Medium: { bg: "#FAEEDA", text: "#854F0B", border: "#FAC775" },
    Low: { bg: "#EAF3DE", text: "#3B6D11", border: "#C0DD97" },
    Minimal: { bg: "#E1F5EE", text: "#0F6E56", border: "#9FE1CB" },
  })[level] || { bg: "#F1EFE8", text: "#5F5E5A", border: "#D3D1C7" };

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const STUDENTS = generateStudents(120);

export default function EduPredictX() {
  const [view, setView] = useState("dashboard");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRisk, setFilterRisk] = useState("All");
  const [filterDept, setFilterDept] = useState("All");
  const [sortBy, setSortBy] = useState("riskProbability");
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const chatEndRef = useRef(null);

  const depts = [
    "All",
    ...Array.from(new Set(STUDENTS.map((s) => s.department))).sort(),
  ];
  const riskLevels = ["All", "High", "Medium", "Low", "Minimal"];

  const filteredStudents = STUDENTS.filter((s) => {
    const q = searchQuery.toLowerCase();
    if (
      q &&
      !s.name.toLowerCase().includes(q) &&
      !s.rollNo.toLowerCase().includes(q)
    )
      return false;
    if (filterRisk !== "All" && s.riskLevel !== filterRisk) return false;
    if (filterDept !== "All" && s.department !== filterDept) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === "riskProbability")
      return b.riskProbability - a.riskProbability;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "attendance") return a.attendance - b.attendance;
    return 0;
  });

  const stats = {
    total: STUDENTS.length,
    atRisk: STUDENTS.filter((s) => s.predictedRisk).length,
    high: STUDENTS.filter((s) => s.riskLevel === "High").length,
    medium: STUDENTS.filter((s) => s.riskLevel === "Medium").length,
    avgAttendance:
      Math.round(
        (STUDENTS.reduce((a, s) => a + s.attendance, 0) / STUDENTS.length) * 10,
      ) / 10,
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleStudentSelect = async (student) => {
    setSelectedStudent(student);
    setView("student");
    setAnalysisResult(null);
    setAnalysisLoading(true);
    const cfs = generateCounterfactuals(student);
    const shapScores = FEATURE_WEIGHTS.map((f) => ({
      ...f,
      score: getShapScore(student, f),
    })).sort((a, b) => b.score - a.score);

    const systemPrompt = `You are EduPredict-X+, an academic risk intelligence system. You analyze student data and provide concise, actionable insights for educators. Be empathetic, specific, and solution-oriented. Keep responses under 200 words. Use plain language without statistics jargon.`;

    const userMsg = `Analyze this student's academic risk profile and give 3 specific, actionable recommendations:
Student: ${student.name} | Semester: ${student.semester} | Department: ${student.department}
Risk Level: ${student.riskLevel} (${Math.round(student.riskProbability * 100)}% risk probability)
Attendance: ${student.attendance}% | Assignment Completion: ${student.assignmentCompletion}% | LMS Logins/week: ${student.lmsLoginsPerWeek}
Mid-sem Grade: ${student.midSemGrade}% | Quiz Score: ${student.quizScore}% | Engagement Consistency: ${Math.round(student.engagementConsistency * 100)}%
Top risk factor: ${shapScores[0].label} (SHAP: ${shapScores[0].score})
Key counterfactual: If ${cfs[0].feature} changes from ${cfs[0].current} to ${cfs[0].required}, outcome becomes ${cfs[0].outcome}.
Provide: 1) One-sentence risk summary 2) Top 3 numbered intervention steps 3) One motivational note for the student`;

    try {
      const result = await callLLM(
        [{ role: "user", content: userMsg }],
        systemPrompt,
      );
      setAnalysisResult(result);
    } catch {
      setAnalysisResult(
        "AI analysis unavailable. Review the risk factors and counterfactuals below for manual assessment.",
      );
    }
    setAnalysisLoading(false);
  };

  const handleChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = chatInput.trim();
    setChatInput("");
    setChatMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setChatLoading(true);

    const atRiskList = STUDENTS.filter((s) => s.predictedRisk)
      .slice(0, 10)
      .map(
        (s) =>
          `${s.name} (${s.department}, Sem ${s.semester}): ${s.riskLevel} risk, ${s.attendance}% attendance, ${s.assignmentCompletion}% assignments`,
      )
      .join("\n");

    const systemPrompt = `You are EduPredict-X+, an AI-powered academic risk intelligence assistant for educators. You have access to a dataset of ${STUDENTS.length} students. Be concise, helpful, and data-driven. Format lists clearly. Never reveal personal data beyond what's academically relevant.

Current cohort stats:
- Total students: ${stats.total}
- At-risk students: ${stats.atRisk} (${Math.round((stats.atRisk / stats.total) * 100)}%)
- High risk: ${stats.high} | Medium risk: ${stats.medium}
- Average attendance: ${stats.avgAttendance}%

Top at-risk students:
${atRiskList}`;

    const messages = [
      ...chatMessages.map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: userMsg },
    ];

    try {
      const reply = await callLLM(messages, systemPrompt);
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply },
      ]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm having trouble connecting. Please try again.",
        },
      ]);
    }
    setChatLoading(false);
  };

  const styles = {
    app: {
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      minHeight: "100vh",
      background: "var(--color-background-tertiary)",
      color: "var(--color-text-primary)",
    },
    sidebar: {
      width: 220,
      background: "var(--color-background-primary)",
      borderRight: "0.5px solid var(--color-border-tertiary)",
      display: "flex",
      flexDirection: "column",
      padding: "1.5rem 0",
      position: "fixed",
      top: 0,
      left: 0,
      height: "100vh",
      zIndex: 10,
    },
    main: { marginLeft: 220, padding: "1.5rem", minHeight: "100vh" },
    logo: {
      padding: "0 1.25rem 1.5rem",
      borderBottom: "0.5px solid var(--color-border-tertiary)",
    },
    navItem: (active) => ({
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "0.6rem 1.25rem",
      cursor: "pointer",
      fontSize: 14,
      fontWeight: active ? 500 : 400,
      color: active ? "#185FA5" : "var(--color-text-secondary)",
      background: active ? "#E6F1FB" : "transparent",
      borderLeft: active ? "3px solid #185FA5" : "3px solid transparent",
      transition: "all 0.15s",
    }),
    card: {
      background: "var(--color-background-primary)",
      border: "0.5px solid var(--color-border-tertiary)",
      borderRadius: 12,
      padding: "1.25rem",
    },
    statCard: {
      background: "var(--color-background-secondary)",
      borderRadius: 8,
      padding: "1rem",
      flex: 1,
    },
    badge: (level) => ({
      display: "inline-flex",
      alignItems: "center",
      padding: "3px 10px",
      borderRadius: 20,
      fontSize: 12,
      fontWeight: 500,
      background: riskColor(level).bg,
      color: riskColor(level).text,
      border: `0.5px solid ${riskColor(level).border}`,
    }),
    btn: {
      padding: "0.5rem 1rem",
      borderRadius: 8,
      border: "0.5px solid var(--color-border-secondary)",
      background: "transparent",
      color: "var(--color-text-primary)",
      cursor: "pointer",
      fontSize: 14,
      fontWeight: 400,
    },
    btnPrimary: {
      padding: "0.5rem 1.25rem",
      borderRadius: 8,
      border: "none",
      background: "#185FA5",
      color: "#fff",
      cursor: "pointer",
      fontSize: 14,
      fontWeight: 500,
    },
    input: {
      width: "100%",
      padding: "0.5rem 0.75rem",
      borderRadius: 8,
      border: "0.5px solid var(--color-border-secondary)",
      background: "var(--color-background-primary)",
      color: "var(--color-text-primary)",
      fontSize: 14,
      outline: "none",
      boxSizing: "border-box",
    },
    select: {
      padding: "0.45rem 0.75rem",
      borderRadius: 8,
      border: "0.5px solid var(--color-border-secondary)",
      background: "var(--color-background-primary)",
      color: "var(--color-text-primary)",
      fontSize: 13,
      outline: "none",
    },
    table: { width: "100%", borderCollapse: "collapse", fontSize: 14 },
    th: {
      padding: "0.6rem 0.75rem",
      textAlign: "left",
      fontSize: 12,
      fontWeight: 500,
      color: "var(--color-text-secondary)",
      borderBottom: "0.5px solid var(--color-border-tertiary)",
    },
    td: {
      padding: "0.65rem 0.75rem",
      borderBottom: "0.5px solid var(--color-border-tertiary)",
      color: "var(--color-text-primary)",
    },
  };

  const navItems = [
    { id: "dashboard", icon: "◈", label: "Dashboard" },
    { id: "students", icon: "◉", label: "Student Cohort" },
    { id: "analytics", icon: "◎", label: "Analytics" },
    { id: "chat", icon: "◐", label: "AI Assistant" },
  ];

  return (
    <div style={styles.app}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.logo}>
          <div
            style={{
              fontSize: 18,
              fontWeight: 500,
              color: "#185FA5",
              letterSpacing: "-0.3px",
            }}
          >
            EduPredict-X+
          </div>
          <div
            style={{
              fontSize: 11,
              color: "var(--color-text-tertiary)",
              marginTop: 2,
            }}
          >
            Academic Risk Intelligence
          </div>
        </div>
        <div style={{ flex: 1, paddingTop: "1rem" }}>
          {navItems.map((item) => (
            <div
              key={item.id}
              style={styles.navItem(
                view === item.id ||
                  (view === "student" && item.id === "students"),
              )}
              onClick={() => {
                setView(item.id);
                if (item.id !== "student") setSelectedStudent(null);
              }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        <div
          style={{
            padding: "1rem 1.25rem",
            borderTop: "0.5px solid var(--color-border-tertiary)",
          }}
        >
          <div style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>
            ABES Engineering College
          </div>
          <div style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>
            Academic Year 2024–25
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        {/* ── DASHBOARD ── */}
        {view === "dashboard" && (
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <h1 style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>
                Dashboard
              </h1>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: 14,
                  color: "var(--color-text-secondary)",
                }}
              >
                Real-time academic risk overview • XGBoost + Explainable AI
              </p>
            </div>

            {/* Stats */}
            <div
              style={{
                display: "flex",
                gap: 12,
                marginBottom: "1.5rem",
                flexWrap: "wrap",
              }}
            >
              {[
                {
                  label: "Total Students",
                  value: stats.total,
                  sub: "across all departments",
                },
                {
                  label: "At-Risk Identified",
                  value: stats.atRisk,
                  sub: `${Math.round((stats.atRisk / stats.total) * 100)}% of cohort`,
                  accent: "#A32D2D",
                },
                {
                  label: "High Risk",
                  value: stats.high,
                  sub: "immediate intervention",
                  accent: "#854F0B",
                },
                {
                  label: "Avg. Attendance",
                  value: `${stats.avgAttendance}%`,
                  sub: "cohort average",
                },
                {
                  label: "Analysis Time",
                  value: "−64%",
                  sub: "vs manual review",
                  accent: "#0F6E56",
                },
              ].map((s, i) => (
                <div key={i} style={{ ...styles.statCard, minWidth: 140 }}>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--color-text-secondary)",
                      marginBottom: 4,
                    }}
                  >
                    {s.label}
                  </div>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 500,
                      color: s.accent || "var(--color-text-primary)",
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--color-text-tertiary)",
                      marginTop: 2,
                    }}
                  >
                    {s.sub}
                  </div>
                </div>
              ))}
            </div>

            {/* Top at-risk + Feature importance */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.4fr 1fr",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <div style={styles.card}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    marginBottom: "1rem",
                  }}
                >
                  Top At-Risk Students
                </div>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      {[
                        "Student",
                        "Dept",
                        "Risk",
                        "Attendance",
                        "Assignment",
                      ].map((h) => (
                        <th key={h} style={styles.th}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {STUDENTS.filter((s) => s.predictedRisk)
                      .sort((a, b) => b.riskProbability - a.riskProbability)
                      .slice(0, 8)
                      .map((s) => (
                        <tr
                          key={s.id}
                          style={{ cursor: "pointer" }}
                          onClick={() => handleStudentSelect(s)}
                        >
                          <td style={styles.td}>
                            <div style={{ fontWeight: 500, fontSize: 13 }}>
                              {s.name}
                            </div>
                            <div
                              style={{
                                fontSize: 11,
                                color: "var(--color-text-tertiary)",
                              }}
                            >
                              {s.rollNo}
                            </div>
                          </td>
                          <td style={styles.td}>
                            <span
                              style={{
                                fontSize: 12,
                                color: "var(--color-text-secondary)",
                              }}
                            >
                              {s.department}
                            </span>
                          </td>
                          <td style={styles.td}>
                            <span style={styles.badge(s.riskLevel)}>
                              {s.riskLevel}
                            </span>
                          </td>
                          <td style={styles.td}>
                            <span
                              style={{
                                color:
                                  s.attendance < 65
                                    ? "#A32D2D"
                                    : "var(--color-text-primary)",
                                fontSize: 13,
                              }}
                            >
                              {s.attendance}%
                            </span>
                          </td>
                          <td style={styles.td}>
                            <span
                              style={{
                                color:
                                  s.assignmentCompletion < 65
                                    ? "#A32D2D"
                                    : "var(--color-text-primary)",
                                fontSize: 13,
                              }}
                            >
                              {s.assignmentCompletion}%
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div style={styles.card}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    marginBottom: "1rem",
                  }}
                >
                  Global Feature Importance (SHAP)
                </div>
                {FEATURE_WEIGHTS.map((f) => (
                  <div key={f.key} style={{ marginBottom: 10 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 12,
                        marginBottom: 4,
                      }}
                    >
                      <span style={{ color: "var(--color-text-secondary)" }}>
                        {f.label}
                      </span>
                      <span
                        style={{
                          fontWeight: 500,
                          color: "var(--color-text-primary)",
                        }}
                      >
                        {f.weight.toFixed(3)}
                      </span>
                    </div>
                    <div
                      style={{
                        height: 6,
                        background: "var(--color-background-secondary)",
                        borderRadius: 3,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${(f.weight / 0.312) * 100}%`,
                          height: "100%",
                          background: f.color,
                          borderRadius: 3,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Distribution */}
            <div style={styles.card}>
              <div
                style={{ fontSize: 14, fontWeight: 500, marginBottom: "1rem" }}
              >
                Risk Distribution by Department
              </div>
              <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                {depts
                  .filter((d) => d !== "All")
                  .map((dept) => {
                    const dStudents = STUDENTS.filter(
                      (s) => s.department === dept,
                    );
                    const dAtRisk = dStudents.filter(
                      (s) => s.predictedRisk,
                    ).length;
                    const pct = Math.round((dAtRisk / dStudents.length) * 100);
                    return (
                      <div
                        key={dept}
                        style={{ textAlign: "center", minWidth: 80 }}
                      >
                        <div
                          style={{
                            fontSize: 20,
                            fontWeight: 500,
                            color:
                              pct > 30
                                ? "#A32D2D"
                                : pct > 20
                                  ? "#854F0B"
                                  : "#0F6E56",
                          }}
                        >
                          {pct}%
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: "var(--color-text-secondary)",
                          }}
                        >
                          {dept}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: "var(--color-text-tertiary)",
                          }}
                        >
                          {dAtRisk}/{dStudents.length}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}

        {/* ── STUDENTS ── */}
        {view === "students" && !selectedStudent && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: "1.25rem",
              }}
            >
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>
                  Student Cohort
                </h1>
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: 14,
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {filteredStudents.length} students shown
                </p>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <input
                  style={{ ...styles.input, width: 200 }}
                  placeholder="Search name or roll no..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select
                  style={styles.select}
                  value={filterRisk}
                  onChange={(e) => setFilterRisk(e.target.value)}
                >
                  {riskLevels.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
                <select
                  style={styles.select}
                  value={filterDept}
                  onChange={(e) => setFilterDept(e.target.value)}
                >
                  {depts.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
                <select
                  style={styles.select}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="riskProbability">Sort: Risk ↓</option>
                  <option value="name">Sort: Name</option>
                  <option value="attendance">Sort: Attendance ↑</option>
                </select>
              </div>
            </div>

            <div style={styles.card}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {[
                      "Student",
                      "Dept",
                      "Sem",
                      "Risk Level",
                      "Attendance",
                      "Assignment",
                      "Mid-sem",
                      "LMS/wk",
                      "Action",
                    ].map((h) => (
                      <th key={h} style={styles.th}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((s) => (
                    <tr
                      key={s.id}
                      style={{
                        cursor: "pointer",
                        transition: "background 0.1s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "var(--color-background-secondary)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                      onClick={() => handleStudentSelect(s)}
                    >
                      <td style={styles.td}>
                        <div style={{ fontWeight: 500, fontSize: 13 }}>
                          {s.name}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: "var(--color-text-tertiary)",
                          }}
                        >
                          {s.rollNo}
                        </div>
                      </td>
                      <td style={{ ...styles.td, fontSize: 12 }}>
                        {s.department}
                      </td>
                      <td style={{ ...styles.td, fontSize: 13 }}>
                        {s.semester}
                      </td>
                      <td style={styles.td}>
                        <span style={styles.badge(s.riskLevel)}>
                          {s.riskLevel} {Math.round(s.riskProbability * 100)}%
                        </span>
                      </td>
                      <td
                        style={{
                          ...styles.td,
                          color:
                            s.attendance < 65
                              ? "#A32D2D"
                              : "var(--color-text-primary)",
                          fontSize: 13,
                        }}
                      >
                        {s.attendance}%
                      </td>
                      <td
                        style={{
                          ...styles.td,
                          color:
                            s.assignmentCompletion < 65
                              ? "#A32D2D"
                              : "var(--color-text-primary)",
                          fontSize: 13,
                        }}
                      >
                        {s.assignmentCompletion}%
                      </td>
                      <td style={{ ...styles.td, fontSize: 13 }}>
                        {s.midSemGrade}%
                      </td>
                      <td style={{ ...styles.td, fontSize: 13 }}>
                        {s.lmsLoginsPerWeek}x
                      </td>
                      <td style={styles.td}>
                        <button
                          style={{
                            ...styles.btn,
                            fontSize: 12,
                            padding: "3px 10px",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStudentSelect(s);
                          }}
                        >
                          Analyze →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── STUDENT DETAIL ── */}
        {view === "student" &&
          selectedStudent &&
          (() => {
            const s = selectedStudent;
            const cfs = generateCounterfactuals(s);
            const shapScores = FEATURE_WEIGHTS.map((f) => ({
              ...f,
              score: getShapScore(s, f),
            })).sort((a, b) => b.score - a.score);

            return (
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: "1.25rem",
                  }}
                >
                  <button
                    style={styles.btn}
                    onClick={() => {
                      setView("students");
                      setSelectedStudent(null);
                    }}
                  >
                    ← Back
                  </button>
                  <div>
                    <h1 style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>
                      {s.name}
                    </h1>
                    <p
                      style={{
                        margin: "2px 0 0",
                        fontSize: 13,
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {s.rollNo} • {s.department} • Semester {s.semester}
                    </p>
                  </div>
                  <span
                    style={{
                      ...styles.badge(s.riskLevel),
                      fontSize: 14,
                      padding: "5px 14px",
                      marginLeft: "auto",
                    }}
                  >
                    {s.riskLevel} Risk — {Math.round(s.riskProbability * 100)}%
                  </span>
                </div>

                {/* Risk bar */}
                <div style={{ ...styles.card, marginBottom: "1rem" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 13,
                      marginBottom: 8,
                    }}
                  >
                    <span style={{ color: "var(--color-text-secondary)" }}>
                      Risk Probability
                    </span>
                    <span style={{ fontWeight: 500 }}>
                      {Math.round(s.riskProbability * 100)}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: 10,
                      background: "var(--color-background-secondary)",
                      borderRadius: 5,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${s.riskProbability * 100}%`,
                        height: "100%",
                        background:
                          s.riskLevel === "High"
                            ? "#E24B4A"
                            : s.riskLevel === "Medium"
                              ? "#EF9F27"
                              : "#1D9E75",
                        borderRadius: 5,
                        transition: "width 0.6s ease",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 11,
                      color: "var(--color-text-tertiary)",
                      marginTop: 4,
                    }}
                  >
                    <span>Minimal</span>
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  {/* Raw metrics */}
                  <div style={styles.card}>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        marginBottom: "1rem",
                      }}
                    >
                      Academic Metrics
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 10,
                      }}
                    >
                      {[
                        {
                          label: "Attendance",
                          val: `${s.attendance}%`,
                          warn: s.attendance < 75,
                        },
                        {
                          label: "Assignments",
                          val: `${s.assignmentCompletion}%`,
                          warn: s.assignmentCompletion < 75,
                        },
                        {
                          label: "Mid-sem Grade",
                          val: `${s.midSemGrade}%`,
                          warn: s.midSemGrade < 50,
                        },
                        {
                          label: "Quiz Score",
                          val: `${s.quizScore}%`,
                          warn: s.quizScore < 50,
                        },
                        {
                          label: "LMS Logins/wk",
                          val: `${s.lmsLoginsPerWeek}x`,
                          warn: s.lmsLoginsPerWeek < 3,
                        },
                        {
                          label: "Peer Interaction",
                          val: `${s.peerInteraction}/10`,
                          warn: s.peerInteraction < 4,
                        },
                        {
                          label: "Submission Rate",
                          val: `${Math.round(s.submissionTimeliness * 100)}%`,
                          warn: s.submissionTimeliness < 0.7,
                        },
                        {
                          label: "Resources Accessed",
                          val: s.resourceAccess,
                          warn: s.resourceAccess < 10,
                        },
                      ].map((m, i) => (
                        <div
                          key={i}
                          style={{
                            background: "var(--color-background-secondary)",
                            borderRadius: 8,
                            padding: "0.75rem",
                            border: m.warn
                              ? "0.5px solid #F09595"
                              : "0.5px solid transparent",
                          }}
                        >
                          <div
                            style={{
                              fontSize: 11,
                              color: "var(--color-text-tertiary)",
                            }}
                          >
                            {m.label}
                          </div>
                          <div
                            style={{
                              fontSize: 18,
                              fontWeight: 500,
                              color: m.warn
                                ? "#A32D2D"
                                : "var(--color-text-primary)",
                            }}
                          >
                            {m.val}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div
                      style={{
                        marginTop: 12,
                        fontSize: 12,
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      Attendance trend:{" "}
                      <span
                        style={{
                          fontWeight: 500,
                          color:
                            s.attendanceTrend === "declining"
                              ? "#A32D2D"
                              : s.attendanceTrend === "improving"
                                ? "#0F6E56"
                                : "var(--color-text-primary)",
                        }}
                      >
                        {s.attendanceTrend}
                      </span>
                    </div>
                  </div>

                  {/* SHAP */}
                  <div style={styles.card}>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        marginBottom: "1rem",
                      }}
                    >
                      SHAP Feature Attribution
                    </div>
                    {shapScores.map((f) => (
                      <div key={f.key} style={{ marginBottom: 10 }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: 12,
                            marginBottom: 3,
                          }}
                        >
                          <span
                            style={{ color: "var(--color-text-secondary)" }}
                          >
                            {f.label}
                          </span>
                          <span style={{ fontWeight: 500 }}>
                            {f.score.toFixed(3)}
                          </span>
                        </div>
                        <div
                          style={{
                            height: 6,
                            background: "var(--color-background-secondary)",
                            borderRadius: 3,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: `${(f.score / 0.3) * 100}%`,
                              height: "100%",
                              background: f.color,
                              borderRadius: 3,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    <div
                      style={{
                        marginTop: 8,
                        fontSize: 11,
                        color: "var(--color-text-tertiary)",
                      }}
                    >
                      Higher score = greater contribution to risk
                    </div>
                  </div>
                </div>

                {/* Counterfactuals */}
                <div style={{ ...styles.card, marginBottom: "1rem" }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      marginBottom: "0.75rem",
                    }}
                  >
                    Counterfactual Explanations — What-If Scenarios
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "var(--color-text-secondary)",
                      marginBottom: "1rem",
                    }}
                  >
                    Changes needed to move this student out of the at-risk
                    category:
                  </div>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        {[
                          "Feature",
                          "Current",
                          "Required",
                          "Change Needed",
                          "Predicted Outcome",
                        ].map((h) => (
                          <th key={h} style={styles.th}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {cfs.map((cf, i) => (
                        <tr key={i}>
                          <td
                            style={{
                              ...styles.td,
                              fontWeight: 500,
                              fontSize: 13,
                            }}
                          >
                            {cf.feature}
                          </td>
                          <td
                            style={{
                              ...styles.td,
                              color: "#A32D2D",
                              fontSize: 13,
                            }}
                          >
                            {cf.current}
                          </td>
                          <td
                            style={{
                              ...styles.td,
                              color: "#0F6E56",
                              fontSize: 13,
                            }}
                          >
                            {cf.required}
                          </td>
                          <td style={{ ...styles.td, fontSize: 13 }}>
                            <span
                              style={{
                                background: "#E6F1FB",
                                color: "#185FA5",
                                padding: "2px 8px",
                                borderRadius: 12,
                                fontSize: 12,
                              }}
                            >
                              {cf.change}
                            </span>
                          </td>
                          <td style={styles.td}>
                            <span
                              style={{
                                ...styles.badge(
                                  cf.outcome === "Not at risk"
                                    ? "Minimal"
                                    : cf.outcome === "Borderline"
                                      ? "Low"
                                      : "Medium",
                                ),
                                fontSize: 12,
                              }}
                            >
                              {cf.outcome}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* AI Analysis */}
                <div style={styles.card}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      marginBottom: "0.75rem",
                    }}
                  >
                    AI-Generated Intervention Analysis
                  </div>
                  {analysisLoading ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        color: "var(--color-text-secondary)",
                        fontSize: 14,
                      }}
                    >
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          border: "2px solid #185FA5",
                          borderTopColor: "transparent",
                          borderRadius: "50%",
                          animation: "spin 0.8s linear infinite",
                        }}
                      />
                      Generating AI analysis...
                    </div>
                  ) : analysisResult ? (
                    <div
                      style={{
                        fontSize: 14,
                        lineHeight: 1.7,
                        color: "var(--color-text-primary)",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {analysisResult}
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })()}

        {/* ── ANALYTICS ── */}
        {view === "analytics" && (
          <div>
            <h1
              style={{ fontSize: 22, fontWeight: 500, margin: "0 0 0.25rem" }}
            >
              Analytics
            </h1>
            <p
              style={{
                margin: "0 0 1.5rem",
                fontSize: 14,
                color: "var(--color-text-secondary)",
              }}
            >
              Cohort-level insights and model performance
            </p>

            {/* Model accuracy comparison */}
            <div style={{ ...styles.card, marginBottom: "1rem" }}>
              <div
                style={{ fontSize: 14, fontWeight: 500, marginBottom: "1rem" }}
              >
                Model Accuracy Comparison
              </div>
              {[
                { model: "SVM (2025)", acc: 96, note: "No explainability" },
                {
                  model: "EduPredict-X+ (Ours)",
                  acc: 93.8,
                  note: "Full XAI + LLM",
                  highlight: true,
                },
                { model: "Random Forest (2025)", acc: 92, note: "Black-box" },
                {
                  model: "SHAP Model (2025)",
                  acc: 92,
                  note: "No conversational interface",
                },
                {
                  model: "ANN-BiLSTM (2025)",
                  acc: 90,
                  note: "High complexity",
                },
                {
                  model: "Logistic Regression (2025)",
                  acc: 84,
                  note: "Limited accuracy",
                },
              ].map((m, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: 12,
                    padding: m.highlight ? "0.75rem" : "0",
                    background: m.highlight ? "#E6F1FB" : "transparent",
                    borderRadius: m.highlight ? 8 : 0,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 13,
                      marginBottom: 4,
                    }}
                  >
                    <span style={{ fontWeight: m.highlight ? 500 : 400 }}>
                      {m.model}
                    </span>
                    <div
                      style={{ display: "flex", gap: 12, alignItems: "center" }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          color: "var(--color-text-tertiary)",
                        }}
                      >
                        {m.note}
                      </span>
                      <span style={{ fontWeight: 500 }}>{m.acc}%</span>
                    </div>
                  </div>
                  <div
                    style={{
                      height: 8,
                      background: "var(--color-background-secondary)",
                      borderRadius: 4,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${m.acc}%`,
                        height: "100%",
                        background: m.highlight ? "#185FA5" : "#B4B2A9",
                        borderRadius: 4,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Time efficiency */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <div style={styles.card}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    marginBottom: "1rem",
                  }}
                >
                  Time Efficiency Gains
                </div>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      {["Task", "Manual", "EduPredict-X+", "Saved"].map((h) => (
                        <th key={h} style={styles.th}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Per-student review", "11.2 min", "4.0 min", "64%"],
                      ["Cohort (50 students)", "186 min", "67 min", "64%"],
                      ["Top 10 at-risk query", "22 min", "0.3 min", "99%"],
                      ["Intervention recs", "18 min", "5.2 min", "71%"],
                    ].map(([task, manual, auto, saved], i) => (
                      <tr key={i}>
                        <td style={{ ...styles.td, fontSize: 13 }}>{task}</td>
                        <td
                          style={{
                            ...styles.td,
                            color: "#A32D2D",
                            fontSize: 13,
                          }}
                        >
                          {manual}
                        </td>
                        <td
                          style={{
                            ...styles.td,
                            color: "#0F6E56",
                            fontSize: 13,
                          }}
                        >
                          {auto}
                        </td>
                        <td style={styles.td}>
                          <span
                            style={{
                              background: "#EAF3DE",
                              color: "#3B6D11",
                              padding: "2px 8px",
                              borderRadius: 12,
                              fontSize: 12,
                              fontWeight: 500,
                            }}
                          >
                            −{saved}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={styles.card}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    marginBottom: "1rem",
                  }}
                >
                  Attendance Distribution
                </div>
                {[
                  [
                    "< 60%",
                    "Critical",
                    STUDENTS.filter((s) => s.attendance < 60).length,
                    "#E24B4A",
                  ],
                  [
                    "60–74%",
                    "Low",
                    STUDENTS.filter(
                      (s) => s.attendance >= 60 && s.attendance < 75,
                    ).length,
                    "#EF9F27",
                  ],
                  [
                    "75–84%",
                    "Adequate",
                    STUDENTS.filter(
                      (s) => s.attendance >= 75 && s.attendance < 85,
                    ).length,
                    "#378ADD",
                  ],
                  [
                    "≥ 85%",
                    "Good",
                    STUDENTS.filter((s) => s.attendance >= 85).length,
                    "#1D9E75",
                  ],
                ].map(([range, label, count, color]) => (
                  <div key={range} style={{ marginBottom: 10 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 12,
                        marginBottom: 4,
                      }}
                    >
                      <span style={{ color: "var(--color-text-secondary)" }}>
                        {range} — {label}
                      </span>
                      <span style={{ fontWeight: 500 }}>{count} students</span>
                    </div>
                    <div
                      style={{
                        height: 8,
                        background: "var(--color-background-secondary)",
                        borderRadius: 4,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${(count / STUDENTS.length) * 100}%`,
                          height: "100%",
                          background: color,
                          borderRadius: 4,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── AI CHAT ── */}
        {view === "chat" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "calc(100vh - 3rem)",
            }}
          >
            <div style={{ marginBottom: "1rem" }}>
              <h1 style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>
                AI Assistant
              </h1>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: 14,
                  color: "var(--color-text-secondary)",
                }}
              >
                Natural language interface powered by LLM + RAG over student
                risk profiles
              </p>
            </div>

            {/* Chat area */}
            <div
              style={{
                ...styles.card,
                flex: 1,
                overflowY: "auto",
                marginBottom: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {chatMessages.length === 0 && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "2rem",
                    color: "var(--color-text-tertiary)",
                  }}
                >
                  <div style={{ fontSize: 32, marginBottom: 12 }}>◐</div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 500,
                      marginBottom: 8,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    Ask me anything about your students
                  </div>
                  <div style={{ fontSize: 13, marginBottom: "1.5rem" }}>
                    I have full context on all {STUDENTS.length} students and
                    their risk profiles.
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                      justifyContent: "center",
                    }}
                  >
                    {[
                      "Who are the top 5 highest-risk students?",
                      "Which department has the most at-risk students?",
                      "What are the most common risk factors?",
                      "Suggest intervention strategies for low-attendance students",
                      "How many students are at high risk this semester?",
                    ].map((q) => (
                      <button
                        key={q}
                        style={{
                          ...styles.btn,
                          fontSize: 13,
                          padding: "0.4rem 0.8rem",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setChatInput(q);
                        }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {chatMessages.map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent:
                      m.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "80%",
                      padding: "0.75rem 1rem",
                      borderRadius: 12,
                      background:
                        m.role === "user"
                          ? "#185FA5"
                          : "var(--color-background-secondary)",
                      color:
                        m.role === "user"
                          ? "#fff"
                          : "var(--color-text-primary)",
                      fontSize: 14,
                      lineHeight: 1.6,
                      whiteSpace: "pre-wrap",
                      borderBottomRightRadius: m.role === "user" ? 4 : 12,
                      borderBottomLeftRadius: m.role === "assistant" ? 4 : 12,
                    }}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    alignItems: "center",
                    padding: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      background: "#B4B2A9",
                      borderRadius: "50%",
                      animation: "bounce 1s infinite",
                    }}
                  />
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      background: "#B4B2A9",
                      borderRadius: "50%",
                      animation: "bounce 1s 0.2s infinite",
                    }}
                  />
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      background: "#B4B2A9",
                      borderRadius: "50%",
                      animation: "bounce 1s 0.4s infinite",
                    }}
                  />
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div style={{ display: "flex", gap: 8 }}>
              <input
                style={{ ...styles.input, flex: 1 }}
                placeholder="Ask about student risk profiles, intervention strategies, cohort analysis..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && !e.shiftKey && handleChat()
                }
              />
              <button
                style={{ ...styles.btnPrimary, whiteSpace: "nowrap" }}
                onClick={handleChat}
                disabled={chatLoading}
              >
                Send ↗
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes bounce { 0%,80%,100% { transform: translateY(0); } 40% { transform: translateY(-6px); } }
        * { box-sizing: border-box; }
        input:focus, select:focus { border-color: #185FA5 !important; box-shadow: 0 0 0 2px rgba(24,95,165,0.15); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: var(--color-border-secondary); border-radius: 3px; }
      `}</style>
    </div>
  );
}
