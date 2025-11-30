
const KEY = {
  evaluations: "perf_evaluations",
  feedbacks: "perf_feedbacks",
  goals: "perf_goals",
  teamMembers: "perf_team_members",
  roles: "perf_roles",
  assignments: "perf_assignments",
};

const read = (key) => JSON.parse(localStorage.getItem(key) || "[]");
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

async function safeFetch(url, options = {}) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error("Fetch error");
    return await res.json();
  } catch (e) {
    return null;
  }
}

export async function getEvaluations() {
  const remote = await safeFetch('/api/evaluations');
  if (remote) return remote;
  return read(KEY.evaluations);
}
export async function createEvaluation(payload) {
  const remote = await safeFetch('/api/evaluations', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) });
  if (remote) return remote;
  const list = read(KEY.evaluations);
  const next = { id: Date.now(), ...payload };
  list.push(next); write(KEY.evaluations, list);
  return next;
}

export async function getFeedbacks() {
  const remote = await safeFetch('/api/feedbacks');
  if (remote) return remote;
  return read(KEY.feedbacks);
}
export async function updateFeedback(id, patch) {
  const remote = await safeFetch(`/api/feedbacks/${id}`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify(patch) });
  if (remote) return remote;
  const list = read(KEY.feedbacks).map(f => f.id === id ? { ...f, ...patch } : f);
  write(KEY.feedbacks, list);
  return list.find(f => f.id === id);
}

export async function getGoals() {
  const remote = await safeFetch('/api/goals');
  if (remote) return remote;
  return read(KEY.goals);
}
export async function createGoal(payload) {
  const remote = await safeFetch('/api/goals', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  if (remote) return remote;
  const list = read(KEY.goals);
  const next = { id: Date.now(), employee: payload.employee || 'Unassigned', description: payload.description, targetDate: payload.targetDate, priority: payload.priority || 'Medium' };
  list.push(next); write(KEY.goals, list);
  return next;
}
export async function deleteGoal(id) {
  const remote = await safeFetch(`/api/goals/${id}`, { method: 'DELETE' });
  if (remote !== null) return true;
  const list = read(KEY.goals).filter(g => g.id !== id);
  write(KEY.goals, list);
  return true;
}

export async function getTeamMembers() {
  const remote = await safeFetch('/api/users');
  if (remote) return remote;
  return read(KEY.teamMembers);
}
export async function getRoles() {
  const remote = await safeFetch('/api/roles');
  if (remote) return remote;
  return read(KEY.roles);
}

export async function assignRole(memberId, roleLabel) {
  const res = await safeFetch(`/api/users/${memberId}/role`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(roleLabel) });
  if (res) return res;
  const map = JSON.parse(localStorage.getItem(KEY.assignments) || "{}");
  map[memberId] = roleLabel; localStorage.setItem(KEY.assignments, JSON.stringify(map));
  return { memberId, roleLabel };
}

export async function createUser(payload) {
  const remote = await safeFetch('/api/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  if (remote) return remote;
  const list = read(KEY.teamMembers);
  const next = { id: Date.now(), ...payload }; list.push(next); write(KEY.teamMembers, list); return next;
}