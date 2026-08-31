import "./style.css";
import { Component, createMemo } from "solid-js";
import { NetworkOutput, GlazeWmOutput } from "zebar";
import { useAnimatedClick } from "../hooks/useAnimatedClick";
import { ahkCommand } from "../scripts/ahkCommand";
import WifiIcon from "./WifiIcon";

interface NetworkStatusProps {
  network: NetworkOutput;
  glazewm: GlazeWmOutput;
}

const ICON_BASE = "./assets/icons/";
const ICONS = {
  ethernet: "wired-network-32.png",
  noNetwork: "no-network-32.png",
} as const;

function formatRate(measure?: {
  bytes?: number;
  siValue?: number;
  siUnit?: string;
}) {
  if (!measure) return "0K";
  const value = measure.siValue ?? 0;
  const unit = (measure.siUnit ?? "B").replace(/B$/, "");
  if (value >= 10) return `${Math.round(value)}${unit || "B"}`;
  if (value >= 1) return `${value.toFixed(1)}${unit || "B"}`;
  return `${Math.max(0, Math.round(value * 10) / 10)}${unit || "B"}`;
}

const NetworkStatus: Component<NetworkStatusProps> = (props) => {
  const { isActive, handleClick } = useAnimatedClick();

  const handleOpenActionCenterClick = () => {
    handleClick();
    props.glazewm.runCommand(ahkCommand("OpenActionCenter.ahk"));
  };

  const isWifi = createMemo(
    () => props.network?.defaultInterface?.type === "wifi"
  );

  const isWifiConnected = createMemo(
    () =>
      isWifi() &&
      props.network?.defaultGateway !== null &&
      props.network?.defaultGateway !== undefined
  );

  const wifiStrength = createMemo(
    () => props.network?.defaultGateway?.signalStrength
  );

  const down = createMemo(() =>
    formatRate(props.network?.traffic?.received)
  );
  const up = createMemo(() =>
    formatRate(props.network?.traffic?.transmitted)
  );

  const getNetworkIcon = () => {
    const networkType = props.network?.defaultInterface?.type;

    switch (networkType) {
      case "ethernet":
        return (
          <img
            src={ICON_BASE + ICONS.ethernet}
            class="i-eth"
            width="16"
            height="16"
            alt="Ethernet"
          />
        );
      case "wifi":
        return (
          <WifiIcon
            signalStrength={wifiStrength()}
            isConnected={isWifiConnected()}
            class="i-wifi"
          />
        );
      default:
        return (
          <img
            src={ICON_BASE + ICONS.noNetwork}
            class="i-eth"
            width="16"
            height="16"
            alt="No network"
          />
        );
    }
  };

  return (
    <button
      class={`network ${isActive() ? "clicked-animated" : ""}`}
      title={`↓${down()}  ↑${up()}`}
      onClick={handleOpenActionCenterClick}
    >
      <span class="content">
        {getNetworkIcon()}
        <span class="net-rates">
          <span class="net-rate">↓{down()}</span>
          <span class="net-rate">↑{up()}</span>
        </span>
      </span>
    </button>
  );
};

export default NetworkStatus;
