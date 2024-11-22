// Declare variables using let and const where appropriate
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

// Function to calculate the average and percentages
function calculateLearnerData(assignments, submissions) {
  const results = [];
  const latePenalty = 15;

  for (const submissionGroup of submissions) {
    let totalScore = 0;
    let totalPoints = 0;
    const percentages = {};

    try {
      for (const submission of submissionGroup) {
        const assignment = assignments.find(
          (a) => a.id === submission.assignment_id
        );
        if (!assignment) throw new Error("Assignment not found");

        const isLate =
          new Date(submission.submission.submitted_at) >
          new Date(assignment.due_at);
        let score = submission.submission.score;

        if (isLate) {
          score = Math.max(0, score - latePenalty);
        }

        percentages[assignment.id] = (
          score / assignment.points_possible
        ).toFixed(2);
        totalScore += score;
        totalPoints += assignment.points_possible;
      }

      const avg = (totalScore / totalPoints).toFixed(3);
      results.push({ id: submissionGroup[0].learner_id, avg, ...percentages });
    } catch (err) {
      console.error("Error processing data:", err.message);
    }
  }

  return results;
}

// Group submissions by learner ID
const groupedSubmissions = LearnerSubmissions.reduce((acc, sub) => {
  acc[sub.learner_id] = acc[sub.learner_id] || [];
  acc[sub.learner_id].push(sub);
  return acc;
}, {});

// Calculate learner data
const learnerData = calculateLearnerData(
  AssignmentGroup.assignments,
  Object.values(groupedSubmissions)
);

console.log(learnerData);
