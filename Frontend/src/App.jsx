import React, { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import SideNav from "./components/SideNav.jsx";
import Toast from "./components/Toast.jsx";
import Modal from "./components/Modal.jsx";
import ManagerDashboard from "./views/ManagerDashboard.jsx";
import EmployeeDashboard from "./views/EmployeeDashboard.jsx";
import * as api from "./services/api.js";
import { ensureSeed } from "./utils/seed.js";

export default function App() {
 
  useEffect(() => { ensureSeed(); }, []);

  const [role, setRole] = useState("manager");
  const [activeSection, setActiveSection] = useState("sec-eval");
  const [toast, setToast] = useState({ show: false, msg: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPrefill, setModalPrefill] = useState({ name: "", desc: "", date: "", priority: "Medium" });

  
  const [evalData, setEvalData] = useState([]);
  const [feedbackData, setFeedbackData] = useState([]);
  const [memberData, setMemberData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [goals, setGoals] = useState([]);

  
  useEffect(() => {
    (async () => {
      setEvalData(await api.getEvaluations());
      setFeedbackData(await api.getFeedbacks());
      setMemberData(await api.getTeamMembers());
      setRoleData(await api.getRoles());
      setGoals(await api.getGoals());
    })();
  }, []);

  const refreshGoals = async () => setGoals(await api.getGoals());
  const refreshEvaluations = async () => setEvalData(await api.getEvaluations());
  const refreshFeedbacks = async () => setFeedbackData(await api.getFeedbacks());

  const showToast = (msg) => setToast({ show: true, msg });

 
  useEffect(() => {
    const onKey = (e) => {
      const k = e.key.toLowerCase();
      if (k === "m") setRole("manager");
      if (k === "e") setRole("employee");
      if (k === "n") setModalOpen(true);
      if (e.key === "/") {
        e.preventDefault();
        document.getElementById("evalSearch")?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  
  const openGoalModal = (name = "", desc = "", date = "", priority = "Medium") => {
    setModalPrefill({ name, desc, date, priority });
    setModalOpen(true);
  };

  const saveGoal = async ({ employee, description, targetDate, priority }) => {
    if (!description || !targetDate) {
      showToast("Please fill description and date");
      return false;
    }
    await api.createGoal({ employee, description, targetDate, priority });
    await refreshGoals();
    setModalOpen(false);
    showToast("Goal saved");
    return true;
  };

  
  const assignRole = async (memberId, roleLabel) => {
    if (roleLabel !== "manager" && roleLabel !== "employee") return showToast("Invalid role");
    await api.assignRole(memberId, roleLabel);
    showToast(`Member ${memberId} assigned to ${roleLabel}`);
  };

  const createUser = async ({ name, email, department = 'General', role: userRole='employee' }) => {
    if (!name) { showToast('Please enter a name'); return; }
    if (userRole !== 'manager' && userRole !== 'employee') { showToast('Invalid role'); return; }
    await api.createUser({ name, email, department, role: userRole });
    setMemberData(await api.getTeamMembers());
    showToast(`${userRole === 'manager' ? 'Manager' : 'Employee'} added`);
  };

  const createManager = async ({ name, email, department = 'General' }) => createUser({ name, email, department, role: 'manager' });
  const createEmployee = async ({ name, email, department = 'General' }) => createUser({ name, email, department, role: 'employee' });

 
  const addEvaluation = async (payload) => {
    await api.createEvaluation(payload);
    await refreshEvaluations();
    showToast("Evaluation added");
  };
  const updateFeedback = async (id, patch) => {
    await api.updateFeedback(id, patch);
    await refreshFeedbacks();
    showToast("Feedback updated");
  };

  const managerProps = useMemo(
    () => ({
      evalData,
      setEvalData, 
      feedbackData,
      setFeedbackData, 
      goals,
      setGoals,
      memberData,
      roleData,
      openGoalModal,
      showToast,
      assignRole,
      activeSection,
      setActiveSection,
      addEvaluation,
      updateFeedback,
      createUser,
      createManager,
      createEmployee,
    }),
    [
      evalData, feedbackData, goals, memberData, roleData, activeSection
    ]
  );

  const employeeProps = useMemo(
    () => ({
      feedbackData,
      goals,
      openGoalModal,
      showToast,
    }),
    [feedbackData, goals]
  );

  return (
    <div className="app-root">
      <Header
        role={role}
        setRole={setRole}
        onSearch={() => document.getElementById("evalSearch")?.focus()}
        onNewGoal={() => openGoalModal()}
      />

      <main className="app">
        {role === "manager" ? (
          <div className="grid">
            <SideNav activeSection={activeSection} setActiveSection={setActiveSection} />
            <section id="content">
              <ManagerDashboard {...managerProps} />
            </section>
          </div>
        ) : (
          <section id="content">
            <EmployeeDashboard {...employeeProps} />
          </section>
        )}
      </main>

      <Toast show={toast.show} onHide={() => setToast({ show: false, msg: "" })}>
        {toast.msg}
      </Toast>

      <Modal
        open={modalOpen}
        title="Set new goal"
        onClose={() => setModalOpen(false)}
        prefill={modalPrefill}
        employees={[...new Set(evalData.map((e) => e.name))]}
        onSave={saveGoal}
      />
    </div>
  );
}