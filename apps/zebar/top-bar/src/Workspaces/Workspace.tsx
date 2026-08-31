import "./style.css";
import { Component } from "solid-js";
import { GlazeWmOutput } from "zebar";

interface WorkspaceProps {
  workspace: GlazeWmOutput["currentWorkspaces"][number];
  glazewm: GlazeWmOutput;
  ref?: (el: HTMLButtonElement) => void;
}

const Workspace: Component<WorkspaceProps> = (props) => {
  const label = () => {
    const name = props.workspace.name;
    if (name.includes(".")) return name.split(".")[1];
    return name;
  };

  return (
    <button
      ref={props.ref}
      classList={{
        workspace: true,
        sub: props.workspace.name.includes("."),
        focused: props.workspace.hasFocus,
        displayed: props.workspace.isDisplayed,
      }}
      onClick={() =>
        props.glazewm.runCommand(`focus --workspace ${props.workspace.name}`)
      }
      title={props.workspace.name}
      id={props.workspace.name}
    >
      <span class="workspace-icon">
        {label()}
      </span>
    </button>
  );
};

export default Workspace;
