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

  // ==========================================
  // FILE
  // ==========================================

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

      // Only fields that exist in Project.js
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

      console.log("Project data:", projectData);

      const response = await fetch(
        "http://localhost:5001/api/projects",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(projectData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create project"
        );
      }

      console.log("Project created:", data);

      setCreatedProject(data.project);

      if (status === "draft") {
        setSuccessMessage(
          "Project draft saved successfully."
        );
      } else {
        setSuccessMessage(
          "Project proposal submitted successfully. It is now ready for mentor assignment."
        );
      }
    } catch (error) {
      console.error("Create project error:", error);

      setErrorMessage(
        error.message || "Failed to create project"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // SAVE DRAFT
  // ==========================================

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
    <div className="space-y-6 pb-10">
      <DashboardHeader
        title="Create New Project"
        description="Set up your project, define objectives, add your team, and submit your proposal."
      />

      {/* WORKFLOW */}

      <Card className="overflow-hidden border-primary/20">
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Lightbulb size={22} />
            </div>

            <div>
              <h3 className="font-semibold">
                Project Submission Workflow
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Create your project, submit the proposal, and wait
                for the administrator to assign a mentor.
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
            team
              ? "border-green-500/30"
              : "border-yellow-500/30"
          }
        >
          <CardContent className="flex items-center gap-4 p-4">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                team
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              <Users size={20} />
            </div>

            <div>
              {team ? (
                <>
                  <p className="font-semibold">
                    Team: {team.teamName}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {team.members?.length || 0} team member
                    {team.members?.length === 1 ? "" : "s"} added
                  </p>
                </>
              ) : (
                <>
                  <p className="font-semibold">
                    No team found
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Create or join a team before creating a project.
                  </p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ERROR */}

      {errorMessage && (
        <Card className="border-destructive/40">
          <CardContent className="flex items-start justify-between gap-4 p-4">
            <div>
              <p className="font-semibold text-destructive">
                Please check your project details
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {errorMessage}
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setErrorMessage("")}
            >
              <X size={18} />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* SUCCESS */}

      {successMessage && (
        <Card className="border-green-500/40 bg-green-50/50 dark:bg-green-950/10">
          <CardContent className="flex items-start justify-between gap-4 p-5">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30">
                <CheckCircle2 size={22} />
              </div>

              <div>
                <p className="font-semibold text-green-700 dark:text-green-400">
                  Success
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {successMessage}
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSuccessMessage("")}
            >
              <X size={18} />
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

            <CardDescription>
              Enter the main details and purpose of your project.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            {/* TITLE */}

            <div className="space-y-2">
              <Label>Project Title *</Label>

              <Input
                placeholder="Example: AI Based Student Performance Analysis"
                value={projectTitle}
                onChange={(e) => {
                  setProjectTitle(e.target.value);
                  clearMessages();
                }}
              />
            </div>

            {/* DOMAIN */}

            <div className="space-y-2">
              <Label>Project Domain *</Label>

              <Select
                value={domain}
                onValueChange={(value) => {
                  setDomain(value);
                  clearMessages();
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select project domain" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Web Development">
                    Web Development
                  </SelectItem>

                  <SelectItem value="Mobile Application">
                    Mobile Application
                  </SelectItem>

                  <SelectItem value="Artificial Intelligence">
                    Artificial Intelligence
                  </SelectItem>

                  <SelectItem value="Machine Learning">
                    Machine Learning
                  </SelectItem>

                  <SelectItem value="Data Science">
                    Data Science
                  </SelectItem>

                  <SelectItem value="Cyber Security">
                    Cyber Security
                  </SelectItem>

                  <SelectItem value="Internet of Things">
                    Internet of Things
                  </SelectItem>

                  <SelectItem value="Cloud Computing">
                    Cloud Computing
                  </SelectItem>

                  <SelectItem value="Other">
                    Other
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* PROBLEM */}

            <div className="space-y-2">
              <Label>Problem Statement *</Label>

              <Textarea
                placeholder="What problem does your project solve? Clearly explain the problem you are addressing..."
                className="min-h-32 resize-none"
                value={problemStatement}
                onChange={(e) => {
                  setProblemStatement(e.target.value);
                  clearMessages();
                }}
              />

              <p className="text-xs text-muted-foreground">
                Describe the real-world problem or challenge your
                project is solving.
              </p>
            </div>

            {/* DESCRIPTION */}

            <div className="space-y-2">
              <Label>Project Description *</Label>

              <Textarea
                placeholder="Describe your project, its main features, users, and how the solution will work..."
                className="min-h-36 resize-none"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  clearMessages();
                }}
              />

              <p className="text-xs text-muted-foreground">
                Explain what your project does and how the proposed
                solution works.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* SUMMARY */}

        <Card className="h-fit xl:sticky xl:top-6">
          <CardHeader>
            <CardTitle>Project Summary</CardTitle>

            <CardDescription>
              Live overview of your project.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Project Title
              </p>

              <p className="mt-1 font-semibold">
                {projectTitle || "Not added yet"}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Domain
              </p>

              <p className="mt-1 font-semibold">
                {domain || "Not selected"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border p-3">
                <p className="text-xs text-muted-foreground">
                  Objectives
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {objectives.length}
                </p>
              </div>

              <div className="rounded-xl border p-3">
                <p className="text-xs text-muted-foreground">
                  Technologies
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {technologies.length}
                </p>
              </div>

              <div className="rounded-xl border p-3">
                <p className="text-xs text-muted-foreground">
                  Team Members
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {team?.members?.length || 0}
                </p>
              </div>

              <div className="rounded-xl border p-3">
                <p className="text-xs text-muted-foreground">
                  Progress
                </p>

                <p className="mt-1 text-2xl font-bold">
                  0%
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-muted p-4">
              <p className="text-sm font-medium">
                Current Status
              </p>

              <Badge
                variant="secondary"
                className="mt-2"
              >
                {createdProject?.status === "submitted"
                  ? "Submitted"
                  : "Draft"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* OBJECTIVES */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target size={20} />
            Project Objectives
          </CardTitle>

          <CardDescription>
            Add the main goals you want to achieve through this project.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              placeholder="Example: Build a centralized system for project monitoring"
              value={objectiveInput}
              onChange={(e) =>
                setObjectiveInput(e.target.value)
              }
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
            >
              <Plus size={18} />
              Add Objective
            </Button>
          </div>

          {objectives.length > 0 ? (
            <div className="space-y-3">
              {objectives.map((objective, index) => (
                <div
                  key={objective}
                  className="flex items-center justify-between gap-4 rounded-xl border p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {index + 1}
                    </div>

                    <p className="text-sm font-medium">
                      {objective}
                    </p>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      removeObjective(objective)
                    }
                  >
                    <Trash2 size={17} />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed p-8 text-center">
              <Target
                size={28}
                className="mx-auto text-muted-foreground"
              />

              <p className="mt-3 text-sm text-muted-foreground">
                No objectives added yet.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* TECHNOLOGY */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 size={20} />
            Technology Stack
          </CardTitle>

          <CardDescription>
            Add the technologies, frameworks, and tools planned for
            your project.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              placeholder="Example: React, Node.js, MongoDB"
              value={technologyInput}
              onChange={(e) =>
                setTechnologyInput(e.target.value)
              }
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
            >
              <Plus size={18} />
              Add Technology
            </Button>
          </div>

          {technologies.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {technologies.map((technology) => (
                <Badge
                  key={technology}
                  variant="secondary"
                  className="gap-2 px-3 py-2"
                >
                  {technology}

                  <button
                    type="button"
                    onClick={() =>
                      removeTechnology(technology)
                    }
                    className="cursor-pointer rounded-sm opacity-70 transition-opacity hover:opacity-100"
                  >
                    <X size={14} />
                  </button>
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No technologies added yet.
            </p>
          )}
        </CardContent>
      </Card>

      {/* TEAM */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users size={20} />
            Team Members
          </CardTitle>

          <CardDescription>
            Your team members are loaded automatically from your
            current team.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {loadingTeam ? (
            <div className="rounded-xl border border-dashed p-8 text-center">
              <p className="text-sm text-muted-foreground">
                Loading your team...
              </p>
            </div>
          ) : team?.members?.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {team.members.map((member) => (
                <div
                  key={member._id}
                  className="flex items-center rounded-xl border p-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                      {member.name
                        ?.charAt(0)
                        .toUpperCase() || "U"}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-medium">
                        {member.name}
                      </p>

                      <p className="truncate text-xs text-muted-foreground">
                        {member.email}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed p-8 text-center">
              <Users
                size={28}
                className="mx-auto text-muted-foreground"
              />

              <p className="mt-3 text-sm text-muted-foreground">
                No team members found.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* LINKS + PROPOSAL */}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* LINKS */}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 size={20} />
              Project Links
            </CardTitle>

            <CardDescription>
              Add optional links related to your project.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            {/* GITHUB */}

            <div className="space-y-2">
              <Label>GitHub Repository URL</Label>

              <div className="relative">
                <GitBranchPlus
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />

                <Input
                  className="pl-10"
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
              <Label>Demo URL</Label>

              <div className="relative">
                <ExternalLink
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />

                <Input
                  className="pl-10"
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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText size={20} />
              Proposal Document
            </CardTitle>

            <CardDescription>
              Upload your project proposal document if available.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />

            {proposalFile ? (
              <div className="flex items-center justify-between gap-4 rounded-xl border p-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FileText size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {proposalFile.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {(proposalFile.size / 1024 / 1024).toFixed(
                        2
                      )}{" "}
                      MB
                    </p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
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
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className="flex w-full flex-col items-center justify-center rounded-xl border border-dashed p-8 transition-colors hover:bg-muted/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                  <Upload size={22} />
                </div>

                <p className="mt-4 font-medium">
                  Upload Proposal Document
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  PDF, DOC or DOCX
                </p>
              </button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* CREATED PROJECT */}

      {createdProject && (
        <Card className="border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2
                size={20}
                className="text-primary"
              />
              Project Ready
            </CardTitle>

            <CardDescription>
              Your latest project submission status.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">
                {createdProject.title}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Current milestone:{" "}
                {createdProject.currentMilestone ||
                  "Proposal"}
              </p>
            </div>

            <Badge
              variant={
                createdProject.status === "submitted"
                  ? "default"
                  : "secondary"
              }
              className="w-fit px-3 py-1.5"
            >
              {createdProject.status === "submitted"
                ? "Proposal Submitted"
                : "Draft Saved"}
            </Badge>
          </CardContent>
        </Card>
      )}

      {/* ACTIONS */}

      <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Button
          variant="ghost"
          onClick={resetProject}
          disabled={loading}
        >
          Reset Form
        </Button>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            disabled={loading}
          >
            <Save size={18} />

            {loading ? "Saving..." : "Save as Draft"}
          </Button>

          <Button
            onClick={handleSubmitProposal}
            disabled={loading}
          >
            <Send size={18} />

            {loading ? "Submitting..." : "Submit Proposal"}
          </Button>
        </div>
      </div>
    </div>
  );
}