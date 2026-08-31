import "./style.css";
import { Component } from "solid-js";
import { GlazeWmOutput } from "zebar";
import { useAnimatedClick } from "../hooks/useAnimatedClick";
import { ahkCommand } from "../scripts/ahkCommand";

interface WindowsButtonProps {
  glazewm: GlazeWmOutput;
}

const WindowsButton: Component<WindowsButtonProps> = (props) => {
  const { isActive, handleClick } = useAnimatedClick();

  const handleWindowsClick = () => {
    handleClick();
    props.glazewm.runCommand(ahkCommand("OpenStartMenu.ahk"));
  };

  return (
    <button
      class={`logo ${isActive() ? "clicked-animated" : ""}`}
      title="Start"
      onClick={handleWindowsClick}
    >
      <span class="content">
        <span class="kaomoji">.·°՞(っ-ᯅ-ς)՞°·.</span>
      </span>
    </button>
  );
};

export default WindowsButton;
