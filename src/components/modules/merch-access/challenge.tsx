const Rules = () => (
  <div className="space-y-2">
    <h3 className="text-accent-yellow">Rules of access code:</h3>
    <ul className="list-inside list-disc space-y-1 text-sm text-gray-300 md:text-base [&>li]:font-sans">
      <li>The access code must be a contiguous subsequence of the intercepted fragments</li>
      <li>The sum of the numbers in this subsequence must be divisible by a given modulus</li>
    </ul>
  </div>
)

const Description = () => (
  <div className="rounded-lg bg-black/60 p-4">
    <h2 className="mb-4 text-accent-yellow">Mission Brief:</h2>
    <p className="font-sans text-sm leading-relaxed text-gray-300 lg:text-base">
      You see fragmented data while poking around in the hackathon webpage&apos;s security system. Each
      fragment is a number, and now you must use your brainpower to piece together the longest access code
      that satisfies some constraints. Think of it as a sudoku, but cooler.
    </p>
  </div>
)

export const Challenge = {
  Description,
  Rules,
} as const;
