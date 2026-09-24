type HeaderProps = {
    title: string;
    subtitle?: string;
  };
  
  export default function Header({ title, subtitle }: HeaderProps) {
    return (
      <div className="mb-7">
        <h1 className="font-display text-2xl font-semibold">{title}</h1>
        {subtitle && <p className="text-muted text-sm mt-1.5">{subtitle}</p>}
      </div>
    );
  }