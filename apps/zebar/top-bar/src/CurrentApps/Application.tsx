import "./style.css";
import { Component } from "solid-js";
import { GlazeWmOutput } from "zebar";
import { Window } from "glazewm";
import { useAnimatedClick } from "../hooks/useAnimatedClick";
import {
  ICON_MAP,
  TITLE_ICON_RULES,
  ICON_BASE,
  DEFAULT_ICON_FILE,
} from "./IconConfig";
import { ahkCommand } from "../scripts/ahkCommand";

interface ApplicationProps {
  glazewm: GlazeWmOutput;
  window: Window;
  isMinimized?: boolean;
}

function getIconSrc(processName: string, title?: string): string {
  const titleKey = title?.trim() ?? "";
  for (const rule of TITLE_ICON_RULES) {
    if (rule.match.test(titleKey)) {
      return `${ICON_BASE}${rule.icon}`;
    }
  }

  const key = processName.toLowerCase().trim();
  const fileName = ICON_MAP[key] ?? DEFAULT_ICON_FILE;
  return `${ICON_BASE}${fileName}`;
}

function renderIcon(processName: string, title?: string) {
  const src = getIconSrc(processName, title);
  return (
    <img
      src={src}
      class="app-icon"
      alt={`${processName} icon`}
      title={processName}
    />
  );
}

const Application: Component<ApplicationProps> = (props) => {
  const { isActive, handleClick } = useAnimatedClick();

  const handleAppClick = () => {
    handleClick();
    props.glazewm.runCommand(
      ahkCommand("FocusWindow.ahk", props.window.handle)
    );
  };

  return (
    <button
      classList={{
        element: true,
        focus: props.window.hasFocus,
        minimized: props.isMinimized ?? false,
        "clicked-animated": isActive(),
      }}
      title={props.window.title}
      onClick={handleAppClick}
    >
      {renderIcon(props.window.processName, props.window.title)}
    </button>
  );
};

export default Application;
