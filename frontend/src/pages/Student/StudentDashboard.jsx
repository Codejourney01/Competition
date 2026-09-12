import { useEffect, useState } from "react";
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  MessageSquare,
  Users,
  FileText,
  ArrowRight,
  CircleDot,
  CalendarDays,
  UserRound,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import DashboardHeader from "@/components/DashboardHeader";
import StatusBadge from "@/components/StatusBadge";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";

export default function StudentDashboard() {
  const navigate = useNavigate();

  // ==========================================
  // STATE
  // ==========================================

  const [student, setStudent] = useState(null);
  const [project, setProject] = useState(null);
  const [team, setTeam] = useState(null);

  const [submissions, setSubmissions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // ==========================================
  // FETCH STUDENT
  // ==========================================

  const fetchStudent = async () => {
    const response = await fetch(
      "http://localhost:5001/api/auth/me",
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to fetch student"
      );
    }

    setStudent(data.user);

    return data.user;
  };

  // ==========================================
  // FETCH TEAM
  // ==========================================

  const fetchTeam = async () => {
    const response = await fetch(
      "http://localhost:5001/api/teams/my-team",
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = await response.json();

    // 404 simply means student has no team
    if (response.status === 404) {
      setTeam(null);
      return null;
    }

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to fetch team"
      );
    }

    setTeam(data.team);

    return data.team;
  };

  // ==========================================
  // FETCH PROJECT
  // ==========================================

  const fetchProject = async () => {
    const response = await fetch(
      "http://localhost:5001/api/projects/my-project",
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = await response.json();

    // Student may not have created a project yet
    if (response.status === 404) {
      setProject(null);
      return null;
    }

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to fetch project"
      );
    }

    setProject(data.project);

    return data.project;
  };

  // ==========================================
  // FETCH PROJECT SUBMISSIONS
  // ==========================================
  //
  // This endpoint is useful for showing recent
  // progress submissions and mentor feedback.
  //
  // If your student submission route is not yet
  // created, this request is safely skipped.
  // ==========================================

  const fetchSubmissions = async () => {
    try {
      const response = await fetch(
        "http://localhost:5001/api/progress/my-submissions",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        setSubmissions([]);
        return;
      }

      const data = await response.json();

      setSubmissions(data.submissions || []);
    } catch (error) {
      console.error(
        "Fetch submissions error:",
        error
      );

      setSubmissions([]);
    }
  };

  // ==========================================
  // FETCH ALL DASHBOARD DATA
  // ==========================================

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      await fetchStudent();

      await Promise.all([
        fetchTeam(),
        fetchProject(),
        fetchSubmissions(),
      ]);
    } catch (error) {
      console.error(
        "Dashboard fetch error:",
        error
      );

      setErrorMessage(
        error.message ||
          "Failed to load dashboard data"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // ==========================================
  // LOADING STATE
  // ==========================================

  if (loading) {
    return (
      <div className="space-y-6">
        <DashboardHeader
          title="Student Dashboard"
          description="Track your project progress, mentor feedback and upcoming work."
        />

        <div className="flex min-h-[400px] items-center justify-center rounded-2xl border bg-card">
          <div className="text-center">

            <RefreshCw
              size={30}
              className="mx-auto animate-spin text-primary"
            />

            <p className="mt-4 font-medium">
              Loading your dashboard...
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Fetching your project, team and latest updates.
            </p>

          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR STATE
  // ==========================================

  if (errorMessage) {
    return (
      <div className="space-y-6">

        <DashboardHeader
          title="Student Dashboard"
          description="Track your project progress, mentor feedback and upcoming work."
        />

        <Card className="border-destructive/40">

          <CardContent className="flex flex-col items-center justify-center p-10 text-center">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <AlertCircle size={24} />
            </div>

            <h3 className="mt-4 text-lg font-semibold">
              Unable to load dashboard
            </h3>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              {errorMessage}
            </p>

            <Button
              className="mt-5"
              onClick={fetchDashboardData}
            >
              <RefreshCw size={17} />
              Try Again
            </Button>

          </CardContent>

        </Card>

      </div>
    );
  }

  // ==========================================
  // DERIVED DATA
  // ==========================================

  const progress =
    project?.progressPercentage ?? 0;

  const projectStatus =
    project?.status || "draft";

  const projectCount = project ? 1 : 0;

  const pendingTasks = project
    ? Math.max(
        0,
        100 - progress > 0
          ? Math.ceil((100 - progress) / 25)
          : 0
      )
    : 0;

  const feedbackCount = submissions.filter(
    (submission) =>
      submission.mentorComment &&
      submission.mentorComment.trim()
  ).length;

  const mentorName =
    project?.mentor?.name ||
    project?.mentor?.username ||
    "Not assigned";

  const teamName =
    team?.teamName || "No team";

  const teamMembers =
    team?.members || [];

  // ==========================================
  // ACTIVITY DATA
  // ==========================================

  const activities = submissions
    .slice(0, 4)
    .map((submission) => ({
      id: submission._id,
      title:
        submission.mentorComment
          ? "Mentor feedback received"
          : "Progress submitted",
      description:
        submission.mentorComment ||
        submission.description ||
        "Your project progress was submitted successfully.",
      time: submission.createdAt
        ? new Date(
            submission.createdAt
          ).toLocaleDateString()
        : "Recently",
      icon: submission.mentorComment ? (
        <MessageSquare size={18} />
      ) : (
        <FileText size={18} />
      ),
    }));

  // ==========================================
  // EMPTY PROJECT ACTIVITY
  // ==========================================

  if (
    activities.length === 0 &&
    project
  ) {
    activities.push({
      id: "project-created",
      title: "Project created",
      description:
        "Your project has been created successfully.",
      time: project.createdAt
        ? new Date(
            project.createdAt
          ).toLocaleDateString()
        : "Recently",
      icon: (
        <CheckCircle2 size={18} />
      ),
    });
  }

  return (
    <div className="space-y-6">

      {/* ======================================
          HEADER
      ====================================== */}

      <DashboardHeader
        title="Student Dashboard"
        description={
          student
            ? `Welcome back, ${student.name || "Student"}. Track your project progress, mentor feedback and upcoming work.`
            : "Track your project progress, mentor feedback and upcoming work."
        }
      />

      {/* ======================================
          STATS
      ====================================== */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* PROJECTS */}

        <Card>
          <CardContent className="flex items-center gap-4 p-5">

            <div className="rounded-lg bg-primary/10 p-3 text-primary">
              <FolderKanban size={22} />
            </div>

            <div>

              <p className="text-sm text-muted-foreground">
                My Projects
              </p>

              <p className="text-2xl font-bold">
                {projectCount}
              </p>

            </div>

          </CardContent>
        </Card>

        {/* PROGRESS */}

        <Card>
          <CardContent className="flex items-center gap-4 p-5">

            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <CircleDot size={22} />
            </div>

            <div>

              <p className="text-sm text-muted-foreground">
                Project Progress
              </p>

              <p className="text-2xl font-bold">
                {progress}%
              </p>

            </div>

          </CardContent>
        </Card>

        {/* PENDING */}

        <Card>
          <CardContent className="flex items-center gap-4 p-5">

            <div className="rounded-lg bg-orange-100 p-3 text-orange-600">
              <Clock size={22} />
            </div>

            <div>

              <p className="text-sm text-muted-foreground">
                Pending Tasks
              </p>

              <p className="text-2xl font-bold">
                {pendingTasks}
              </p>

            </div>

          </CardContent>
        </Card>

        {/* FEEDBACK */}

        <Card>
          <CardContent className="flex items-center gap-4 p-5">

            <div className="rounded-lg bg-purple-100 p-3 text-purple-600">
              <MessageSquare size={22} />
            </div>

            <div>

              <p className="text-sm text-muted-foreground">
                New Feedback
              </p>

              <p className="text-2xl font-bold">
                {feedbackCount}
              </p>

            </div>

          </CardContent>
        </Card>

      </div>

      {/* ======================================
          PROJECT + QUICK ACTIONS
      ====================================== */}

      <div className="grid gap-6 xl:grid-cols-3">

        {/* CURRENT PROJECT */}

        <Card className="xl:col-span-2">

          <CardHeader>

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

              <div>

                <CardTitle>
                  My Current Project
                </CardTitle>

                <CardDescription>
                  Overview of your active project.
                </CardDescription>

              </div>

              {project && (
                <Button
                  variant="outline"
                  onClick={() =>
                    navigate(
                      "/student/my-project"
                    )
                  }
                >
                  View Project
                  <ArrowRight size={18} />
                </Button>
              )}

            </div>

          </CardHeader>

          <CardContent className="space-y-6">

            {!project ? (

              <div className="rounded-xl border border-dashed p-10 text-center">

                <FolderKanban
                  size={34}
                  className="mx-auto text-muted-foreground"
                />

                <h3 className="mt-4 font-semibold">
                  No project yet
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Create your project proposal to get started.
                </p>

                <Button
                  className="mt-5"
                  onClick={() =>
                    navigate(
                      "/student/create-project"
                    )
                  }
                >
                  Create Project
                  <ArrowRight size={17} />
                </Button>

              </div>

            ) : (

              <div className="rounded-lg border p-5">

                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">

                  <div>

                    <div className="mb-3 flex flex-wrap items-center gap-2">

                      <h3 className="text-lg font-semibold">
                        {project.title}
                      </h3>

                      <StatusBadge
                        status={projectStatus}
                      />

                    </div>

                    <p className="text-sm text-muted-foreground">
                      {teamName}
                    </p>

                  </div>

                  <div className="rounded-lg bg-primary/10 p-3 text-primary">
                    <FolderKanban size={24} />
                  </div>

                </div>

                {/* PROGRESS */}

                <div className="mt-6">

                  <div className="mb-2 flex items-center justify-between">

                    <p className="text-sm font-medium">
                      Overall Progress
                    </p>

                    <p className="font-semibold">
                      {progress}%
                    </p>

                  </div>

                  <Progress
                    value={progress}
                    className="h-3"
                  />

                </div>

                {/* PROJECT DETAILS */}

                <div className="mt-6 grid gap-4 sm:grid-cols-2">

                  {/* MENTOR */}

                  <div className="flex items-center gap-3">

                    <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                      <UserRound size={18} />
                    </div>

                    <div>

                      <p className="text-xs text-muted-foreground">
                        Project Mentor
                      </p>

                      <p className="font-medium">
                        {mentorName}
                      </p>

                    </div>

                  </div>

                  {/* DEADLINE */}

                  <div className="flex items-center gap-3">

                    <div className="rounded-lg bg-orange-100 p-2 text-orange-600">
                      <CalendarDays size={18} />
                    </div>

                    <div>

                      <p className="text-xs text-muted-foreground">
                        Deadline
                      </p>

                      <p className="font-medium">
                        Not set
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            )}

            {/* PROJECT ACTIONS */}

            {project && (
              <div className="grid gap-3 sm:grid-cols-2">

                <Button
                  onClick={() =>
                    navigate(
                      "/student/submit-progress"
                    )
                  }
                >
                  <FileText />
                  Submit Progress
                </Button>

                <Button
                  variant="outline"
                  onClick={() =>
                    navigate(
                      "/student/feedback"
                    )
                  }
                >
                  <MessageSquare />
                  View Feedback
                </Button>

              </div>
            )}

          </CardContent>
        </Card>

        {/* QUICK ACTIONS */}

        <Card>

          <CardHeader>

            <CardTitle>
              Quick Actions
            </CardTitle>

            <CardDescription>
              Access your project tools quickly.
            </CardDescription>

          </CardHeader>

          <CardContent className="space-y-3">

            <Button
              variant="outline"
              className="w-full justify-between"
              onClick={() =>
                navigate(
                  "/student/my-project"
                )
              }
            >

              <span className="flex items-center gap-2">
                <FolderKanban size={18} />
                My Project
              </span>

              <ArrowRight size={18} />

            </Button>

            <Button
              variant="outline"
              className="w-full justify-between"
              onClick={() =>
                navigate(
                  "/student/submit-progress"
                )
              }
            >

              <span className="flex items-center gap-2">
                <FileText size={18} />
                Submit Progress
              </span>

              <ArrowRight size={18} />

            </Button>

            <Button
              variant="outline"
              className="w-full justify-between"
              onClick={() =>
                navigate(
                  "/student/feedback"
                )
              }
            >

              <span className="flex items-center gap-2">
                <MessageSquare size={18} />
                Mentor Feedback
              </span>

              <ArrowRight size={18} />

            </Button>

            <Button
              variant="outline"
              className="w-full justify-between"
              onClick={() =>
                navigate(
                  "/student/profile"
                )
              }
            >

              <span className="flex items-center gap-2">
                <UserRound size={18} />
                My Profile
              </span>

              <ArrowRight size={18} />

            </Button>

          </CardContent>

        </Card>

      </div>

      {/* ======================================
          ACTIVITY + TEAM
      ====================================== */}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* RECENT ACTIVITY */}

        <Card>

          <CardHeader>

            <CardTitle>
              Recent Activity
            </CardTitle>

            <CardDescription>
              Latest updates from your project.
            </CardDescription>

          </CardHeader>

          <CardContent className="space-y-5">

            {activities.length > 0 ? (

              activities.map((activity) => (

                <div
                  key={activity.id}
                  className="flex gap-4"
                >

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {activity.icon}
                  </div>

                  <div className="flex-1">

                    <div className="flex flex-col justify-between gap-1 sm:flex-row">

                      <p className="font-medium">
                        {activity.title}
                      </p>

                      <span className="text-xs text-muted-foreground">
                        {activity.time}
                      </span>

                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {activity.description}
                    </p>

                  </div>

                </div>

              ))

            ) : (

              <div className="rounded-xl border border-dashed p-8 text-center">

                <Clock
                  size={28}
                  className="mx-auto text-muted-foreground"
                />

                <p className="mt-3 text-sm text-muted-foreground">
                  No recent activity.
                </p>

              </div>

            )}

          </CardContent>

        </Card>

        {/* PROJECT TEAM */}

        <Card>

          <CardHeader>

            <CardTitle>
              Project Team
            </CardTitle>

            <CardDescription>
              Members working on your project.
            </CardDescription>

          </CardHeader>

          <CardContent className="space-y-4">

            {!team ? (

              <div className="rounded-xl border border-dashed p-8 text-center">

                <Users
                  size={28}
                  className="mx-auto text-muted-foreground"
                />

                <p className="mt-3 font-medium">
                  No team yet
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Create or join a team to start your project.
                </p>

              </div>

            ) : (

              <>
                {teamMembers
                  .slice(0, 5)
                  .map((member) => (

                    <div
                      key={member._id}
                      className="flex items-center gap-4 rounded-lg border p-4"
                    >

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">

                        {(
                          member.name ||
                          "U"
                        )
                          .charAt(0)
                          .toUpperCase()}

                      </div>

                      <div className="flex-1 min-w-0">

                        <p className="truncate font-medium">
                          {member.name}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          {String(team.leader) ===
                          String(member._id)
                            ? "Team Leader"
                            : "Team Member"}
                        </p>

                      </div>

                    </div>

                  ))}

                {teamMembers.length === 0 && (
                  <div className="rounded-xl border border-dashed p-8 text-center">

                    <p className="text-sm text-muted-foreground">
                      No team members found.
                    </p>

                  </div>
                )}

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    navigate(
                      "/student/my-project"
                    )
                  }
                >
                  <Users />
                  View Project Team
                </Button>
              </>

            )}

          </CardContent>

        </Card>

      </div>

    </div>
  );
}