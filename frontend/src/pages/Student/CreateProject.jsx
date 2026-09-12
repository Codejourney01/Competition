import { useRef, useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  FolderPlus,
  Users,
  Code2,
  FileText,
  Target,
  ExternalLink,
  Upload,
  CheckCircle2,
  Save,
  Send,
  X,
  Lightbulb,
  GitBranchPlus,
  Sparkles,
} from "lucide-react";

import DashboardHeader from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function CreateProject() {
  const fileInputRef = useRef(null);

  // ==========================================
  // PROJECT FORM
  // ==========================================

  const [projectTitle, setProjectTitle] = useState("");
  const [domain, setDomain] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [description, setDescription] = useState("");

  const [objectiveInput, setObjectiveInput] = useState("");
  const [objectives, setObjectives] = useState([]);

  const [technologyInput, setTechnologyInput] = useState("");
  const [technologies, setTechnologies] = useState([]);

  const [githubUrl, setGithubUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");

  const [proposalFile, setProposalFile] = useState(null);

  // ==========================================
  // TEAM
  // ==========================================

  const [team, setTeam] = useState(null);
  const [loadingTeam, setLoadingTeam] = useState(true);

  // ==========================================
  // SUBMISSION
  // ==========================================

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [createdProject, setCreatedProject] = useState(null);

  // ==========================================
  // GET CURRENT STUDENT TEAM
  // ==========================================

  useEffect(() => {
    const fetchMyTeam = async () => {
      try {
        setLoadingTeam(true);
        setErrorMessage("");

        const response = await fetch(
          "http://localhost:5001/api/teams/my-team",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to get team");
        }

        setTeam(data.team);
      } catch (error) {
        console.error("Get team error:", error);

        setTeam(null);

        setErrorMessage(
          error.message ||
            "Unable to load your team. Please create or join a team first."
        );
      } finally {
        setLoadingTeam(false);
      }
    };

    fetchMyTeam();
  }, []);

  // ==========================================
  // CLEAR MESSAGES
  // ==========================================

  const clearMessages = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  // ==========================================
  // OBJECTIVES
  // ==========================================

  const addObjective = () => {
    const value = objectiveInput.trim();
    if (!value) return;
    if (objectives.includes(value)) {
      setErrorMessage("This objective is already added");
      return;
    }
    clearMessages();

    setObjectives((prev) => [...prev, value]);
    setObjectiveInput("");
  };

  const removeObjective = (objective) => {
    setObjectives((prev) =>
      prev.filter((item) => item !== objective)
    );
  };

  // ==========================================
  // TECHNOLOGIES
  // ==========================================

  const addTechnology = () => {
    const value = technologyInput.trim();
    if (!value) return;
    if (technologies.includes(value)) {
      setErrorMessage("This technology is already added");
      return;
    }
    clearMessages();

    setTechnologies((prev) => [...prev, value]);
    setTechnologyInput("");
  };

  const removeTechnology = (technology) => {
    setTechnologies((prev) =>
      prev.filter((item) => item !== technology)
    );
  };

  const addMember = () => {
    const value = memberInput.trim();
    if (!value) return;
    if (teamMembers.includes(value)) {
      setErrorMessage("This team member is already added");
      return;
    }
    clearMessages();
    setTeamMembers([...teamMembers, value]);
    setMemberInput("");
  };

  const removeMember = (member) => {
    setTeamMembers(teamMembers.filter((item) => item !== member));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setProposalFile(file);
    clearMessages();
  };

  // ==========================================
  // VALIDATE PROJECT
  // ==========================================

  const validateProject = () => {
    if (!projectTitle.trim()) {
      setErrorMessage("Please enter the project title");
      return false;
    }
    if (!domain.trim()) {
      setErrorMessage("Please select a project domain");
      return false;
    }
      setErrorMessage("Please select a project domain");
      return false;
    }
    if (!problemStatement.trim()) {
      setErrorMessage("Please enter the problem statement");
      return false;
    }
    if (!description.trim()) {
      setErrorMessage("Please enter the project description");
      return false;
    }
    if (objectives.length === 0) {
      setErrorMessage(
        "Please add at least one project objective"
      );
      return false;
    }
    if (technologies.length === 0) {
      setErrorMessage(
        "Please add at least one technology"
      );
      return false;
    }
    if (!team?._id) {
      setErrorMessage(
        "You must create or join a team before creating a project"
      );
      return false;
    }

    if (teamMembers.length === 0) {
      setErrorMessage("Please add at least one team member");
      return false;
    }
      return false;
    }
    return true;
  };

  // ==========================================
  // CREATE PROJECT API
  // ==========================================

  const submitProjectToAPI = async (status) => {
    clearMessages();
    if (status === "submitted" && !validateProject()) {
      return;
    }

    if (status === "draft" && !projectTitle.trim()) {
      setErrorMessage(
        "Please enter at least a project title to save a draft"
      );
      return;
    }

    if (!team?._id) {
      setErrorMessage(
        "You must create or join a team before creating a project"
      );
      return;
    }

    try {
      setLoading(true);

      const projectData = {
        title: projectTitle.trim(),
        domain: domain.trim(),
        problemStatement: problemStatement.trim(),
        objectives,
        description: description.trim(),
        technologies,
        team: team._id,
        proposalFile: proposalFile?.name || "",
        githubUrl: githubUrl.trim(),
        demoUrl: demoUrl.trim(),
        status,
        progressPercentage: 0,
        currentMilestone: "Proposal",
      };

      const response = await fetch("http://localhost:5001/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create project");
      }

      setCreatedProject(data.project);

      if (status === "draft") {
        setSuccessMessage("Project draft saved successfully.");
      } else {
        setSuccessMessage(
          "Project proposal submitted successfully. It is now ready for mentor assignment."
        );
      }
    } catch (error) {
      console.error("Create project error:", error);

      setErrorMessage(error.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    await submitProjectToAPI("draft");
  };

  // ==========================================
  // SUBMIT PROPOSAL
  // ==========================================

  const handleSubmitProposal = async () => {
    await submitProjectToAPI("submitted");
  };

  // ==========================================
  // RESET FORM
  // ==========================================

  const resetProject = () => {
    setProjectTitle("");
    setDomain("");
    setProblemStatement("");
    setDescription("");
    setObjectiveInput("");
    setObjectives([]);
    setTechnologyInput("");
    setTechnologies([]);
    setMemberInput("");
    setTeamMembers([]);
    setGithubUrl("");
    setDemoUrl("");
    setProposalFile(null);
    setSuccessMessage("");
    setErrorMessage("");
    setCreatedProject(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="min-h-screen bg-sky-50/50 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header section matching login card theme */}
      <div className="relative overflow-hidden rounded-3xl border border-sky-100 bg-white p-6 sm:p-8 shadow-xl shadow-sky-100/50">
        <div className="absolute top-0 right-0 p-8 opacity-10 hidden sm:block pointer-events-none text-sky-500">
          <Sparkles size={100} />
        </div>
        <div className="relative z-10">
          <Badge className="mb-3 bg-sky-50 text-sky-600 border border-sky-200 px-3 py-1 font-medium shadow-2xs">
            Project Workspace
          </Badge>
          <DashboardHeader
            title="Create New Project"
            description="Set up your project, define core objectives, build your tech stack, and submit your proposal."
          />
        </div>
      </div>

      {/* WORKFLOW */}
      <Card className="overflow-hidden border border-sky-100 bg-white shadow-md shadow-sky-100/50">
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-500 text-black shadow-md shadow-sky-500/20">
              <Lightbulb size={24} />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Project Submission Workflow
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Create your project, submit the proposal, and wait for the administrator to assign a mentor.
              </p>
            </div>
          </div>

          <Badge
            variant="secondary"
            className="w-fit px-3 py-1.5"
          >
            Step 1 of 5
          </Badge>
        </CardContent>
      </Card>

      {/* TEAM STATUS */}
      {!loadingTeam && (
        <Card
          className={
            team ? "border-green-500/30" : "border-yellow-500/30"
          }
        >
          <CardContent className="flex items-center gap-4 p-4">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                team ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
              }`}
            >
              <Users size={20} />
            </div>

            <div>
              {team ? (
                <>
                  <p className="font-semibold">Team: {team.teamName}</p>
                  <p className="text-sm text-muted-foreground">
                    {team.members?.length || 0} team member
                    {team.members?.length === 1 ? "" : "s"} added
                  </p>
                </>
              ) : (
                <>
                  <p className="font-semibold">No team found</p>
                  <p className="text-sm text-muted-foreground">
                    Create or join a team before creating a project.
                  </p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {errorMessage && (
      {errorMessage && (
        <Card className="border border-rose-200 bg-rose-50 shadow-md animate-in fade-in-50">
          <CardContent className="flex items-start justify-between gap-4 p-4">
            <div>
              <p className="font-semibold text-rose-600">Please check your project details</p>
              <p className="mt-1 text-sm text-rose-500">{errorMessage}</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500 hover:bg-rose-100" onClick={() => setErrorMessage("")}>
              <X size={16} />
            </Button>
          </CardContent>
        </Card>
      )}

      {successMessage && (
      {successMessage && (
        <Card className="border border-emerald-200 bg-emerald-50 shadow-md animate-in fade-in-50">
          <CardContent className="flex items-start justify-between gap-4 p-5">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md shadow-emerald-500/20">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <p className="font-semibold text-emerald-700">Success</p>
                <p className="mt-1 text-sm text-emerald-600">{successMessage}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-700 hover:bg-emerald-100" onClick={() => setSuccessMessage("")}>
              <X size={16} />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* BASIC INFORMATION */}
      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderPlus size={20} />
              Basic Project Information
            </CardTitle>
            <CardDescription className="text-slate-500">Enter the main details and purpose of your project.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pt-6">
            {/* TITLE */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">Project Title <span className="text-rose-500">*</span></Label>
              <Input
                placeholder="Example: AI Based Student Performance Analysis"
                value={projectTitle}
                className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                onChange={(e) => {
                  setProjectTitle(e.target.value);
                  clearMessages();
                }}
              />
            </div>

            {/* DOMAIN */}

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">Project Domain <span className="text-rose-500">*</span></Label>
              <Select
                value={domain}
                onValueChange={(value) => {
                  setDomain(value);
                  clearMessages();
                }}
              >
                <SelectTrigger className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100">
                  <SelectValue placeholder="Select project domain" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border border-slate-200 bg-white shadow-lg">
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="Mobile Application">Mobile Application</SelectItem>
                  <SelectItem value="Artificial Intelligence">Artificial Intelligence</SelectItem>
                  <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Cyber Security">Cyber Security</SelectItem>
                  <SelectItem value="Internet of Things">Internet of Things</SelectItem>
                  <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
                </SelectContent>
              </Select>
            </div>

            {/* PROBLEM */}

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">Problem Statement <span className="text-rose-500">*</span></Label>
              <Textarea
                placeholder="What problem does your project solve? Clearly explain the problem you are addressing..."
                className="min-h-[130px] rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 resize-none"
                value={problemStatement}
                onChange={(e) => {
                  setProblemStatement(e.target.value);
                  clearMessages();
                }}
              />
              <p className="text-xs text-slate-400">
                Describe the real-world problem or challenge your project is solving.
              </p>
            </div>

            {/* DESCRIPTION */}

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">Project Description <span className="text-rose-500">*</span></Label>
              <Textarea
                placeholder="Describe your project, its main features, users, and how the solution will work..."
                className="min-h-[140px] rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 resize-none"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  clearMessages();
                }}
              />
              <p className="text-xs text-slate-400">
                Explain what your project does and how the proposed solution works.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* SUMMARY */}
        <Card className="h-fit xl:sticky xl:top-6 shadow-xl border border-sky-100 bg-white">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-base text-slate-900">Project Summary</CardTitle>
            <CardDescription className="text-slate-500">Live overview of your project.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-5 pt-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Project Title</p>
              <p className="mt-1 font-semibold text-sm text-slate-800 line-clamp-2">{projectTitle || <span className="text-slate-400 italic">Not added yet</span>}</p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Domain
              </p>
              <p className="mt-1 font-semibold text-sm text-slate-800">
                {domain || <span className="text-slate-400 italic">Not selected</span>}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-200 bg-sky-50/30 p-3">
                <p className="text-xs text-slate-500">Objectives</p>
                <p className="mt-1 text-xl font-bold text-sky-600">{objectives.length}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-sky-50/30 p-3">
                <p className="text-xs text-slate-500">Technologies</p>
                <p className="mt-1 text-xl font-bold text-sky-600">{technologies.length}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-sky-50/30 p-3">
                <p className="text-xs text-slate-500">Team Members</p>
                <p className="mt-1 text-xl font-bold text-sky-600">
                  {team?.members?.length || teamMembers.length || 0}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-sky-50/30 p-3">
                <p className="text-xs text-slate-500">Progress</p>
                <p className="mt-1 text-xl font-bold text-sky-600">0%</p>
              </div>
            </div>

            <div className="rounded-xl bg-sky-50 border border-sky-100 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-sky-700 mb-1.5">
                Current Status
              </p>
              <Badge
                variant="secondary"
                className="px-2.5 py-0.5 text-xs font-medium bg-sky-500 text-white shadow-2xs"
              >
                {createdProject?.status === "submitted" ? "Submitted" : "Draft"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* OBJECTIVES */}
      <Card className="shadow-xl border border-sky-100 bg-white">
        <CardHeader className="pb-4 border-b border-slate-100">
          <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
            <Target size={20} className="text-sky-600" />
            Project Objectives
          </CardTitle>
          <CardDescription className="text-slate-500">Add the main goals you want to achieve through this project.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-5 pt-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              placeholder="Example: Build a centralized system for project monitoring"
              value={objectiveInput}
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
              onChange={(e) => setObjectiveInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addObjective();
                }
              }}
            />
            <Button
              type="button"
              onClick={addObjective}
              className="h-11 shrink-0 px-5 gap-2 bg-black hover:bg-zinc-900 text-white font-semibold shadow-md"
            >
              <Plus size={16} />
              Add Objective
            </Button>
          </div>

          {objectives.length > 0 ? (
            <div className="space-y-3">
              {objectives.map((objective, index) => (
                <div key={objective} className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-2xs transition-all hover:border-sky-300">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-50 text-xs font-bold text-sky-600 border border-sky-200">
                      {index + 1}
                    </div>
                    <p className="text-sm font-medium text-slate-800">{objective}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                    onClick={() => removeObjective(objective)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center bg-sky-50/20">
              <Target size={28} className="mx-auto text-slate-400" />
              <p className="mt-3 text-sm font-medium text-slate-500">No objectives added yet.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* TECHNOLOGY */}
      <Card className="shadow-xl border border-sky-100 bg-white">
        <CardHeader className="pb-4 border-b border-slate-100">
          <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
            <Code2 size={20} className="text-sky-600" />
            Technology Stack
          </CardTitle>
          <CardDescription className="text-slate-500">
            Add the technologies, frameworks, and tools planned for your project.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5 pt-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              placeholder="Example: React, Node.js, MongoDB"
              value={technologyInput}
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
              onChange={(e) => setTechnologyInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTechnology();
                }
              }}
            />
            <Button
              type="button"
              onClick={addTechnology}
              className="h-11 shrink-0 px-5 gap-2 bg-black hover:bg-zinc-900 text-white font-semibold shadow-md"
            >
              <Plus size={16} />
              Add Technology
            </Button>
          </div>

          {technologies.length > 0 ? (
            <div className="flex flex-wrap gap-2 pt-1">
              {technologies.map((technology) => (
                <Badge key={technology} variant="secondary" className="gap-2 px-3.5 py-1.5 text-sm font-medium bg-sky-50 text-sky-700 border border-sky-200">
                  {technology}
                  <button
                    type="button"
                    onClick={() => removeTechnology(technology)}
                    className="cursor-pointer rounded-xs opacity-75 transition-opacity hover:opacity-100"
                  >
                    <X size={13} />
                  </button>
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400 italic">No technologies added yet.</p>
          )}
        </CardContent>
      </Card>

      {/* TEAM */}
      <Card className="shadow-xl border border-sky-100 bg-white">
        <CardHeader className="pb-4 border-b border-slate-100">
          <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
            <Users size={20} className="text-sky-600" />
            Team Members
          </CardTitle>
          <CardDescription className="text-slate-500">
            Add the students who are working together on this project.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5 pt-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              placeholder="Enter team member name"
              value={memberInput}
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
              onChange={(e) => setMemberInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addMember();
                }
              }}
            />
            <Button
              type="button"
              onClick={addMember}
              className="h-11 shrink-0 px-5 gap-2 bg-black hover:bg-zinc-900 text-white font-semibold shadow-md"
            >
              <Plus size={16} />
              Add Member
            </Button>
          </div>

          {loadingTeam ? (
            <div className="rounded-xl border border-dashed p-8 text-center">
              <p className="text-sm text-muted-foreground">Loading your team...</p>
            </div>
          ) : team?.members?.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {team.members.map((member) => (
                <div key={member._id} className="flex items-center rounded-xl border p-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                      {member.name?.charAt(0).toUpperCase() || "U"}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-medium">{member.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : teamMembers.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member) => (
                <div key={member} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-50 font-bold text-sky-600 text-sm border border-sky-200">
                      {member.charAt(0).toUpperCase()}
                    </div>
                    <p className="truncate text-sm font-medium text-slate-800">{member}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                    onClick={() => removeMember(member)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center bg-sky-50/20">
              <Users size={28} className="mx-auto text-slate-400" />
              <p className="mt-3 text-sm font-medium text-slate-500">No team members added yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center bg-sky-50/20">
              <Users size={28} className="mx-auto text-slate-400" />
              <p className="mt-3 text-sm font-medium text-slate-500">No team members added yet.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* LINKS + PROPOSAL */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* LINKS */}
        <Card className="shadow-xl border border-sky-100 bg-white">
          <CardHeader className="pb-4 border-b border-slate-100">
            <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
              <Code2 size={20} className="text-sky-600" />
              Project Links
            </CardTitle>
            <CardDescription className="text-slate-500">Add optional links related to your project.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-5 pt-6">
            {/* GITHUB */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">GitHub Repository URL</Label>
              <div className="relative">
                <GitBranchPlus size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  className="pl-10 h-11 rounded-xl border border-slate-200 bg-white text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  placeholder="https://github.com/username/project"
                  value={githubUrl}
                  onChange={(e) =>
                    setGithubUrl(e.target.value)
                  }
                />
              </div>
            </div>

            {/* DEMO */}

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">Demo URL</Label>
              <div className="relative">
                <ExternalLink size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  className="pl-10 h-11 rounded-xl border border-slate-200 bg-white text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  placeholder="https://your-project-demo.com"
                  value={demoUrl}
                  onChange={(e) =>
                    setDemoUrl(e.target.value)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PROPOSAL */}
        <Card className="shadow-xl border border-sky-100 bg-white">
          <CardHeader className="pb-4 border-b border-slate-100">
            <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
              <FileText size={20} className="text-sky-600" />
              Proposal Document
            </CardTitle>
            <CardDescription className="text-slate-500">Upload your project proposal document if available.</CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />

            {proposalFile ? (
              <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
                <div className="flex min-w-0 items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 border border-sky-200">
                    <FileText size={22} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-800">{proposalFile.name}</p>
                    <p className="text-xs text-slate-400">
                      {(proposalFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                  onClick={() => {
                    setProposalFile(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 p-8 transition-all hover:bg-sky-50/40 hover:border-sky-300 group cursor-pointer"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 transition-transform group-hover:scale-105 border border-sky-200">
                  <Upload size={22} className="text-sky-600" />
                </div>
                <p className="mt-4 font-semibold text-sm text-slate-700">
                  Upload Proposal Document
                </p>
                <p className="mt-1 text-xs text-slate-400">PDF, DOC or DOCX</p>
              </button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* CREATED PROJECT */}
      {createdProject && (
        <Card className="border border-sky-200 bg-sky-50/50 shadow-xl">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base text-sky-800">
              <CheckCircle2 size={18} className="text-sky-600" />
              Project Ready
            </CardTitle>
            <CardDescription className="text-slate-500">Your latest project submission status.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-0">
            <div>
              <p className="font-semibold text-sm text-slate-900">{createdProject.title}</p>
              <p className="mt-0.5 text-xs text-slate-500">
                Current milestone: {createdProject.currentMilestone || "Proposal"}
              </p>
            </div>
            <Badge
              variant={
                createdProject.status === "submitted" ? "default" : "secondary"
              }
              className="w-fit px-3 py-1 font-medium bg-sky-600 text-white shadow-2xs"
            >
              {createdProject.status === "submitted" ? "Proposal Submitted" : "Draft Saved"}
            </Badge>
          </CardContent>
        </Card>
      )}

      {/* ACTIONS */}
      <div className="flex flex-col-reverse gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Button variant="ghost" onClick={resetProject} className="text-slate-500 hover:text-slate-900 hover:bg-slate-100" disabled={loading}>
          Reset Form
        </Button>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            className="gap-2 h-11 px-5 border-slate-200 bg-white text-slate-700 hover:bg-sky-50/50 hover:text-slate-900"
            disabled={loading}
          >
            <Save size={16} />
            {loading ? "Saving..." : "Save as Draft"}
          </Button>
          <Button
            onClick={handleSubmitProposal}
            className="gap-2 h-11 px-6 shadow-md bg-black hover:bg-zinc-900 text-white font-semibold"
            disabled={loading}
          >
            <Send size={16} />
            {loading ? "Submitting..." : "Submit Proposal"}
          </Button>
        </div>
      </div>
    </div>
  );
}