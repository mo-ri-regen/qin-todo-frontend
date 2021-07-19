import { useTheme } from "next-themes";
import type {
  DetailedHTMLProps,
  SelectHTMLAttributes,
  VFC,
} from "react";
import { useEffect, useState } from "react";

export const themeChanger: VFC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleOnChange: DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >["onChange"] = (e) => {
    setTheme(e.target.value);
  };
  const handleOnBlur: DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >["onBlur"] = (e) => {
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
        <select value={theme} onBlur={handleOnBlur} onChange={handleOnChange}>
          <option value='dark'>Dark</option>
          <option value='light'>Light</option>
          <option value='system'>System</option>
        </select>
      )}
    </div>
  );
};
