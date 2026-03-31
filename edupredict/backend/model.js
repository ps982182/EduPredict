function predictRisk(student) {
  const { attendance, marks, studyHours } = student;

  let score = 0;

  if (attendance < 60) score += 2;
  else if (attendance < 75) score += 1;

  if (marks < 50) score += 2;
  else if (marks < 70) score += 1;

  if (studyHours < 2) score += 2;
  else if (studyHours < 4) score += 1;

  if (score >= 4) return "High Risk";
  if (score >= 2) return "Medium Risk";
  return "Low Risk";
}

module.exports = { predictRisk };