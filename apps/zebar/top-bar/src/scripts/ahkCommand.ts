/** Explicit AHK binary so GlazeWM doesn't rely on .ahk file association. */
const AHK64 =
  "%localappdata%/Programs/AutoHotkey/v2/AutoHotkey64.exe";
const SCRIPT_DIR =
  "%userprofile%/.glzr/zebar/paix/top-bar/dist/assets/scripts";

export function ahkCommand(scriptName: string, ...args: Array<string | number>) {
  const script = `${SCRIPT_DIR}/${scriptName}`;
  const rest = args.length ? ` ${args.join(" ")}` : "";
  return `shell-exec ${AHK64} ${script}${rest}`;
}
