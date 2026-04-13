import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState<boolean>(false);

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button type="button" onClick={() => setDark((current) => !current)}>
      {dark ? "Светъл режим" : "Тъмен режим"}
    </button>
  );
}
