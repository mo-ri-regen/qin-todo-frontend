import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleOnChange = () => {
    (e) => {
      return setTheme(e.target.value);
    };
  };
  // When mounted on client, now we can show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className='mt-12'>
      {theme !== undefined && (
        <select value={theme} onBlur={handleOnChange}>
          <option value='dark'>Dark</option>
          <option value='light'>Light</option>
          <option value='system'>System</option>
        </select>
      )}
    </div>
  );
};
