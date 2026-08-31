import "./style.css";
import { Component } from "solid-js";
import * as zebar from "zebar";
import { DateOutput, GlazeWmOutput } from "zebar";
import { useAnimatedClick } from "../hooks/useAnimatedClick";

interface TimeStatusProps {
  date: DateOutput;
  glazewm: GlazeWmOutput;
}

const TimeStatus: Component<TimeStatusProps> = (props) => {
  const { isActive, handleClick } = useAnimatedClick();

  const handleTimeClick = () => {
    handleClick();
    // try zebar shellExec first (needs zpack privilege), fallback to glazewm
    zebar
      .shellExec("C:\\Program Files\\Betterbird\\betterbird.exe")
      .catch(() =>
        props.glazewm.runCommand(
          'shell-exec "C:\\Program Files\\Betterbird\\betterbird.exe"',
        ),
      );
  };

  return (
    <button
      class={`date ${isActive() ? "clicked-animated" : ""}`}
      title={props.date?.formatted}
      onClick={handleTimeClick}
    >
      <span class="content">
        <span class="time">{props.date?.formatted}</span>
      </span>
    </button>
  );
};

export default TimeStatus;
