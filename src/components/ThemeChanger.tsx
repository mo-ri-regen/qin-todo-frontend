import { useTheme } from "next-themes";
import type { ChangeEvent, VFC } from "react";
import { useEffect, useState } from "react";

export const ThemeChanger: VFC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
  };

  // When mounted on client, now we can show the UI
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className='mt-12'>
      {theme !== undefined && (
        <select value={theme} onBlur={handleOnChange} onChange={handleOnChange}>
          <option value='dark'>Dark</option>
          <option value='light'>Light</option>
          <option value='system'>System</option>
        </select>
      )}
    </div>
  );
};
