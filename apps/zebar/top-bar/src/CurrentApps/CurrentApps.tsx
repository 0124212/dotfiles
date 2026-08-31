import "./style.css";
import { Component, For, Show, createMemo } from "solid-js";
import { GlazeWmOutput } from "zebar";
import { Window } from "glazewm";
import Application from "./Application";

interface CurrentAppsProps {
  glazewm: GlazeWmOutput | undefined;
}

/** Recursively collect all Window nodes from a tree of children. */
function collectWindows(
  children: GlazeWmOutput["allWorkspaces"][0]["children"]
): Window[] {
  const result: Window[] = [];
  for (const child of children ?? []) {
    if (child.type === "window") {
      result.push(child as Window);
    } else if (child.type === "split" && (child as any).children) {
      result.push(...collectWindows((child as any).children));
    }
  }
  return result;
}

const CurrentApps: Component<CurrentAppsProps> = (props) => {
  /** Windows on the active workspace (visible, tiling + floating). */
  const activeWindows = createMemo(() => {
    const ws = props.glazewm?.allWorkspaces ?? [];
    return ws
      .filter((w) => w.isDisplayed)
      .flatMap((w) => collectWindows(w.children));
  });

  /** Minimized windows from any workspace on the focused monitor. */
  const minimizedWindows = createMemo(() => {
    const ws = props.glazewm?.allWorkspaces ?? [];
    return ws
      .flatMap((w) => collectWindows(w.children))
      .filter((win) => (win as any).state === "minimized");
  });

  const hasSeparator = createMemo(
    () => activeWindows().length > 0 && minimizedWindows().length > 0
  );

  return (
    <div class="template">
      <For each={activeWindows()}>
        {(win) => <Application window={win} glazewm={props.glazewm!} />}
      </For>

      <Show when={hasSeparator()}>
        <span class="app-separator" />
      </Show>

      <For each={minimizedWindows()}>
        {(win) => (
          <Application window={win} glazewm={props.glazewm!} isMinimized />
        )}
      </For>
    </div>
  );
};

export default CurrentApps;
