/* @refresh reload */
import "./index.css";
import { render } from "solid-js/web";
import { createStore } from "solid-js/store";
import * as zebar from "zebar";
import WindowsButton from "./Buttons/WindowsButton";
import Workspaces from "./Workspaces/Workspaces";
import TilingBinding from "./TilingBinding/TilingBinding";
import MediaStatus from "./Media/MediaStatus";
import WindowTitle from "./WindowTitle/WindowTitle";
import CurrentApps from "./CurrentApps/CurrentApps";
import Systray from "./Systray/Systray";
import InputMethodStatus from "./InputMethod/InputMethodStatus";
import CpuStatus from "./Cpu/CpuStatus";
import MemoryStatus from "./Memory/MemoryStatus";
import DiskStatus from "./Disk/DiskStatus";
import WeatherStatus from "./Weather/WeatherStatus";
import VolumeStatus from "./Volume/VolumeStatus";
import NetworkStatus from "./Network/NetworkStatus";
import TimeStatus from "./Time/TimeStatus";

const providers = zebar.createProviderGroup({
  glazewm: { type: "glazewm" },
  systray: { type: "systray" },
  keyboard: { type: "keyboard" },
  cpu: { type: "cpu", refreshInterval: 5000 },
  memory: { type: "memory", refreshInterval: 5000 },
  disk: { type: "disk", refreshInterval: 60000 },
  weather: { type: "weather" },
  network: { type: "network", refreshInterval: 2000 },
  audio: { type: "audio" },
  date: { type: "date", formatting: "EEE MMM d HH:mm" },
  media: { type: "media" },
});

render(() => <App />, document.getElementById("root")!);

function App() {
  const [output, setOutput] = createStore(providers.outputMap);

  providers.onOutput((outputMap) => setOutput(outputMap));

  return (
    <div class="app">
      <div class="left">
        <WindowsButton glazewm={output.glazewm} />
        <Workspaces glazewm={output.glazewm} />
        <TilingBinding glazewm={output.glazewm} />
        <MediaStatus media={output.media} />
      </div>
      <div class="center">
        <CurrentApps glazewm={output.glazewm} />
      </div>
      <div class="right">
        <Systray systray={output.systray} glazewm={output.glazewm} />
        <InputMethodStatus glazewm={output.glazewm} keyboard={output.keyboard} />
        <CpuStatus cpu={output.cpu} glazewm={output.glazewm} />
        <MemoryStatus memory={output.memory} />
        <DiskStatus disk={output.disk} glazewm={output.glazewm} />
        {output.weather && <WeatherStatus weather={output.weather} />}
        <NetworkStatus network={output.network} glazewm={output.glazewm} />
        <VolumeStatus audio={output.audio} glazewm={output.glazewm} />
        <TimeStatus date={output.date} glazewm={output.glazewm} />
      </div>
    </div>
  );
}
