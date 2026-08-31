import "./style.css";
import { Component } from "solid-js";
import { AudioOutput, GlazeWmOutput } from "zebar";
import { useAnimatedClick } from "../hooks/useAnimatedClick";
import { ahkCommand } from "../scripts/ahkCommand";


interface VolumeStatusProps {
  audio: AudioOutput;
  glazewm: GlazeWmOutput;
}

const ICON_BASE = "./assets/icons/";

const VolumeStatus: Component<VolumeStatusProps> = (props) => {
  const { isActive, handleClick } = useAnimatedClick();

  const handleVolumeClick = () => {
    handleClick();
    props.glazewm.runCommand(ahkCommand("OpenEarTrumpet.ahk"));
  };

  const VolumeIcon = () => {
    const dev = props.audio?.defaultPlaybackDevice;
    if (!dev) return null;

    const vol = dev.volume;
    let icon = "audio-0-32.png";

    if (dev.isMuted) {
      icon = "audio-0-32.png";
    } else if (vol > 80) {
      icon = "audio-3-32.png";
    } else if (vol > 40) {
      icon = "audio-2-32.png";
    } else if (vol > 0) {
      icon = "audio-1-32.png";
    }

    return (
      <img
        src={ICON_BASE + icon}
        class="i-volume"
        width="16"
        height="16"
        alt=""
      />
    );
  };

  return (
    <>
      {props.audio?.defaultPlaybackDevice && (
        <button
          class={`volume ${isActive() ? "clicked-animated" : ""}`}
          title={`Volume ${props.audio.defaultPlaybackDevice.volume}%${
            props.audio.defaultPlaybackDevice.isMuted ? " (muted)" : ""
          }`}
          onClick={handleVolumeClick}
        >
          <span class="content">
            <VolumeIcon />
            <span class="volume-bar">
              {props.audio.defaultPlaybackDevice.volume}%
            </span>
          </span>
        </button>
      )}
    </>
  );
};

export default VolumeStatus;
