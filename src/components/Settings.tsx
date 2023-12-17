import { useEffect, useState, useContext } from "react";
import { settingCtx } from "../App";

export type userPreference = {
  sound: "HiHat" | "kick" | "snare";
  backgroundTick: boolean;
  onlyTickOnAccents: boolean;
  regularTickBgColor: string;
  accentTickBgColor: string;
};

export default function Settings() {
  const setting = useContext(settingCtx);

  const [sound, setSound] = useState(setting ? setting.value?.sound : "HiHat");
  const [backgroundTick, setBackgroundTick] = useState(
    setting ? setting.value?.backgroundTick : false
  );
  const [onlyTickOnAccents, setOnlyTickOnAccents] = useState(
    setting ? setting.value?.onlyTickOnAccents : false
  );

  const [regularTickBgColor, setRegularTickBgColor] = useState(
    setting ? setting.value?.regularTickBgColor : "#5f5faf"
  );
  const [accentTickBgColor, setAccentTickBgColor] = useState(
    setting ? setting.value?.accentTickBgColor : "#fd4444"
  );

  function handleSoundChange(sound: "HiHat" | "kick" | "snare") {
    setSound(sound);
  }

  const userPreference = {
    sound,
    backgroundTick,
    onlyTickOnAccents,
    regularTickBgColor,
    accentTickBgColor,
  };

  useEffect(() => {
    if (setting) {
      setting.updateValue(userPreference as userPreference);
    }

    const stringifyPreference = JSON.stringify(userPreference);
    localStorage.setItem("userPreference", stringifyPreference);
  }, [
    sound,
    backgroundTick,
    onlyTickOnAccents,
    accentTickBgColor,
    regularTickBgColor,
  ]);

  return (
    <>
      <div className="flex w-full flex-col gap-4 px-2">
        <div className="w-full">
          <ol>
            <h2 className="mb-2 text-base font-semibold">Tick Sound</h2>
            <li
              className="ml-4 flex gap-1"
              onClick={() => handleSoundChange("HiHat")}
            >
              <input
                type="radio"
                name="tickSound"
                value="sound1"
                checked={sound === "HiHat"}
                readOnly
              />
              <label>Hi Hat</label>
            </li>
            <li
              className="ml-4 flex gap-1"
              onClick={() => handleSoundChange("kick")}
            >
              <input
                type="radio"
                name="tickSound"
                value="sound2"
                checked={sound === "kick"}
                readOnly
              />
              <label>Kick</label>
            </li>
            <li
              className="ml-4 flex gap-1"
              onClick={() => handleSoundChange("snare")}
            >
              <input
                type="radio"
                name="tickSound"
                value="sound3"
                checked={sound === "snare"}
                readOnly
              />
              <label>Snare</label>
            </li>
          </ol>
        </div>

        <div className="w-full">
          <h2 className="mb-2 text-base font-semibold">Background Click</h2>

          <div
            className="ml-4 flex gap-1"
            onClick={() => setBackgroundTick((prev) => !prev)}
          >
            <input type="checkbox" checked={backgroundTick} readOnly />
            <span>Background Click</span>
          </div>

          <div
            className={`ml-4 flex gap-1 ${
              !backgroundTick ? "text-gray-400" : ""
            }`}
            onClick={() => setOnlyTickOnAccents((prev) => !prev)}
          >
            <input
              type="checkbox"
              disabled={!backgroundTick}
              checked={onlyTickOnAccents}
            />
            <span>Click Only on Accents</span>
          </div>

          <div className="mt-2 flex gap-6 text-center">
            <div className="flex flex-col items-center justify-center gap-1">
              <h2
                className={`font-semibold ${
                  !backgroundTick ? "text-gray-400" : ""
                }`}
              >
                Accent Color
              </h2>
              <input
                disabled={!backgroundTick}
                type="color"
                value={accentTickBgColor}
                onChange={(e) => setAccentTickBgColor(e.target.value)}
              />
            </div>

            <div className="flex flex-col items-center justify-center gap-1">
              <h2
                className={`font-semibold ${
                  !backgroundTick ? "text-gray-400" : ""
                }`}
              >
                Regular Color
              </h2>
              <input
                disabled={!backgroundTick}
                type="color"
                value={regularTickBgColor}
                onChange={(e) => setRegularTickBgColor(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
