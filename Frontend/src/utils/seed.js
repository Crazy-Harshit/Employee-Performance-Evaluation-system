export function ensureSeed() {
  const hasSeed = localStorage.getItem("perf_seed_done");
  if (hasSeed) return;

  const evaluations = [
    { id:1, name:"John Doe", criteria:"Productivity", rating:8 },
    { id:2, name:"Jane Smith", criteria:"Communication", rating:7 },
    { id:3, name:"James Johnson", criteria:"Leadership", rating:9 },
    { id:4, name:"Emily Davis", criteria:"Teamwork", rating:8 },
    { id:5, name:"Aarav Patel", criteria:"Quality", rating:6 },
  ];
  const feedbacks = [
    { id:1, name:"John Doe", comments:"Excellent performance!", rating:8 },
    { id:2, name:"Jane Smith", comments:"Needs improvement in clarity.", rating:6 },
    { id:3, name:"James Johnson", comments:"Great job leading sprints!", rating:9 },
    { id:4, name:"Emily Davis", comments:"Supports team well.", rating:8 },
  ];
  const goals = [
    { id:1, employee:"John Doe", description:"Improve productivity", targetDate:"2025-12-01", priority:"High" },
    { id:2, employee:"Jane Smith", description:"Enhance collaboration", targetDate:"2025-12-10", priority:"Medium" },
    { id:3, employee:"James Johnson", description:"Reduce defects", targetDate:"2026-01-05", priority:"High" },
    { id:4, employee:"Emily Davis", description:"Sharpen communication", targetDate:"2026-01-12", priority:"Low" },
  ];
  const teamMembers = [
    { id:1, name:"John Doe", initials:"JD" },
    { id:2, name:"Jane Smith", initials:"JS" },
    { id:3, name:"James Johnson", initials:"JJ" },
    { id:4, name:"Emily Davis", initials:"ED" },
    { id:5, name:"Aarav Patel", initials:"AP" },
  ];
  const roles = [
    { id:"lead", label:"Team Lead" },
    { id:"qa", label:"QA Specialist" },
    { id:"dev", label:"Senior Developer" },
    { id:"ux", label:"UX Designer" },
  ];

  localStorage.setItem("perf_evaluations", JSON.stringify(evaluations));
  localStorage.setItem("perf_feedbacks", JSON.stringify(feedbacks));
  localStorage.setItem("perf_goals", JSON.stringify(goals));
  localStorage.setItem("perf_team_members", JSON.stringify(teamMembers));
  localStorage.setItem("perf_roles", JSON.stringify(roles));
  localStorage.setItem("perf_assignments", JSON.stringify({}));

  localStorage.setItem("perf_seed_done", "1");
}