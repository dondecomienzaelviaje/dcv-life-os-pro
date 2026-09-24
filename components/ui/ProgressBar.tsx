type ProgressBarProps = {
    percent: number;
    className?: string;
  };
  
  export default function ProgressBar({ percent, className = "" }: ProgressBarProps) {
    const clamped = Math.min(100, Math.max(0, percent));
  
    return (
      <div className={`h-1.5 rounded-full bg-surface-2 overflow-hidden ${className}`}>
        <div
          className="h-full bg-gold rounded-full transition-all"
          style={{ width: `${clamped}%` }}
        />
      </div>
    );
  }