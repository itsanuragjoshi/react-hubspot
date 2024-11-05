import { Moon, Sun } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { useTheme } from "../hooks/useTheme";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <>
      <div className="flex border border-input hover:bg-hover-background">
        <Button
          variant="ghost"
          size="sm"
          icon={Sun}
          showIcon={true}
          showText={false}
          onClick={() => setTheme("light")}
          aria-label="Set light theme"
          title="Light"
        >
          Light
        </Button>
        <Button
          variant="ghost"
          size="sm"
          icon={Moon}
          showIcon={true}
          showText={false}
          onClick={() => setTheme("dark")}
          aria-label="Set dark theme"
          title="Dark"
        >
          Dark
        </Button>
      </div>
    </>
  );
}
