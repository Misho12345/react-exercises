type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      className="search-input"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Търси курс..."
    />
  );
}
