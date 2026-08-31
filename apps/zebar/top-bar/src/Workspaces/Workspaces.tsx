import "./style.css";
import { Component, createEffect, createSignal, For } from "solid-js";
import { GlazeWmOutput } from "zebar";

interface WorkspacesProps {
  glazewm: GlazeWmOutput;
}

const Workspaces: Component<WorkspacesProps> = (props) => {
  const buttonRefs: Record<string, HTMLButtonElement> = {};
  const [refVersion, setRefVersion] = createSignal(0);

  const pillPos = createSignal({
    transform: "translateX(0px)",
    width: "0px",
    display: "none",
  });

  createEffect(() => {
    const focused = props.glazewm?.currentWorkspaces.find(
      (w) => w.hasFocus
    );
    refVersion();

    requestAnimationFrame(() => {
      if (!focused || !buttonRefs[focused.name]) {
        pillPos[1]({ display: "none", transform: "translateX(0px)", width: "0px" });
        return;
      }
      const btn = buttonRefs[focused.name];
      pillPos[1]({
        transform: `translateX(${btn.offsetLeft}px)`,
        width: `${btn.offsetWidth}px`,
        display: "",
      });
    });
  });

  return (
    <div class="workspaces">
      <div
        class="workspace-pill"
        style={{
          transform: pillPos[0]().transform,
          width: pillPos[0]().width,
          display: pillPos[0]().display,
        }}
      />
      <For each={props.glazewm?.currentWorkspaces ?? []}>
        {(workspace) => (
          <button
            ref={(el) => {
              buttonRefs[workspace.name] = el;
              setRefVersion((v) => v + 1);
            }}
            classList={{
              workspace: true,
              focused: workspace.hasFocus,
              displayed: workspace.isDisplayed,
            }}
            onClick={() =>
              props.glazewm.runCommand(`focus --workspace ${workspace.name}`)
            }
          >
              <span class="workspace-icon">
                {workspace.name}
              </span>
          </button>
        )}
      </For>
    </div>
  );
};

export default Workspaces;
