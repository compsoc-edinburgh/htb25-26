import { cn } from "~/lib/utils";

interface CornerBracketsProps {
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
  size?: number;
}

const CornerBrackets = ({
  className,
  strokeColor = "black",
  strokeWidth = 1,
  size = 48,
}: CornerBracketsProps) => {
  return (
    <div className={cn("absolute inset-0 -z-10 h-full w-full", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-0 top-0"
      >
        <path
          d="M0.5 47.5V12.5L13 0.5H47.5"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </svg>

      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-0 top-0 rotate-90"
      >
        <path
          d="M0.5 47.5V12.5L13 0.5H47.5"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </svg>

      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 right-0 rotate-180"
      >
        <path
          d="M0.5 47.5V12.5L13 0.5H47.5"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </svg>

      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 left-0 -rotate-90"
      >
        <path
          d="M0.5 47.5V12.5L13 0.5H47.5"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </svg>
    </div>
  );
};

export default CornerBrackets;
