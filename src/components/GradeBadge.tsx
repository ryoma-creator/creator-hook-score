import { Grade, gradeColor } from "@/lib/scoreHook";

interface GradeBadgeProps {
  grade: Grade;
}

export default function GradeBadge({ grade }: GradeBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-4 py-1.5 rounded-full border text-lg font-black tracking-wider ${gradeColor(grade)}`}
    >
      Grade {grade}
    </span>
  );
}
