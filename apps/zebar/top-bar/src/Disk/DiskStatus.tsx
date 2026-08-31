import "./style.css";
import { Component, createMemo } from "solid-js";
import { DiskOutput, GlazeWmOutput } from "zebar";
import { useAnimatedClick } from "../hooks/useAnimatedClick";

interface DiskStatusProps {
  disk: DiskOutput;
  glazewm: GlazeWmOutput;
}

const DiskStatus: Component<DiskStatusProps> = (props) => {
  const primary = createMemo(() => {
    const disks = props.disk?.disks ?? [];
    return (
      disks.find((d) => d.mountPoint?.toUpperCase().startsWith("C:")) ??
      disks.find((d) => !d.isRemovable) ??
      disks[0]
    );
  });

  const usedPercent = createMemo(() => {
    const d = primary();
    if (!d?.totalSpace?.bytes) return 0;
    const used = d.totalSpace.bytes - (d.availableSpace?.bytes ?? 0);
    return Math.round((used / d.totalSpace.bytes) * 100);
  });

  const freeLabel = createMemo(() => {
    const d = primary();
    if (!d?.availableSpace) return "";
    const v = d.availableSpace.iecValue ?? d.availableSpace.siValue;
    const u = d.availableSpace.iecUnit ?? d.availableSpace.siUnit;
    return `${Math.round(v)}${u}`;
  });

  const getUsageRate = (usage: number) => {
    if (usage > 90) return "extreme-usage";
    if (usage > 75) return "high-usage";
    if (usage > 50) return "medium-usage";
    return "low-usage";
  };

  const { isActive, handleClick } = useAnimatedClick();

  const handleDiskClick = () => {
    handleClick();
    props.glazewm.runCommand('shell-exec cmd /c start "" "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\CrystalDiskInfo\\CrystalDiskInfo MSI Mei Mihoshi Edition.lnk"');
  };

  return (
    <button
      classList={{
        disk: true,
        [getUsageRate(usedPercent())]: true,
        "clicked-animated": isActive(),
      }}
      title={freeLabel() ? `${freeLabel()} free` : "Disk"}
      onClick={handleDiskClick}
    >
      <span class="content">
        <span class="i-disk">󰋊</span>
        <span class="disk-bar">{usedPercent()}%</span>
      </span>
    </button>
  );
};

export default DiskStatus;
