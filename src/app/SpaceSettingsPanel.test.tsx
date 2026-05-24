import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { SpaceSettingsPanel } from "./SpaceSettingsPanel";
import { useSpaceSettingsStore } from "./spaceSettingsStore";

beforeEach(() => {
  useSpaceSettingsStore.getState().reset();
});

describe("SpaceSettingsPanel — slider boundary constraints", () => {
  function openPanel() {
    render(<SpaceSettingsPanel open onClose={() => {}} />);
  }

  it("min speed slider max attr is one step below the max speed value", () => {
    useSpaceSettingsStore.getState().setCometSpeedMax(2000);
    openPanel();
    const minSlider = screen.getByLabelText("Min speed");
    expect(Number(minSlider.getAttribute("max"))).toBe(2000 - 10);
  });

  it("min tail slider max attr is one step below the max tail value", () => {
    useSpaceSettingsStore.getState().setCometSizeMax(600);
    openPanel();
    const minSlider = screen.getByLabelText("Min tail");
    expect(Number(minSlider.getAttribute("max"))).toBe(600 - 5);
  });

  it("min interval slider max attr is one step below the max interval value", () => {
    useSpaceSettingsStore.getState().setCometSpawnMax(60);
    openPanel();
    const minSlider = screen.getByLabelText("Min interval");
    expect(Number(minSlider.getAttribute("max"))).toBeCloseTo(60 - 0.5);
  });

  it("min radius slider max attr is one step below the max radius value", () => {
    useSpaceSettingsStore.getState().setStarSizeMax(5);
    openPanel();
    const minSlider = screen.getByLabelText("Min radius");
    expect(Number(minSlider.getAttribute("max"))).toBeCloseTo(5 - 0.1);
  });

  it("dragging min speed slider to its maximum does not change the max speed slider value", () => {
    useSpaceSettingsStore.getState().setCometSpeedMax(2000);
    openPanel();
    const minSlider = screen.getByLabelText("Min speed");
    const maxSlider = screen.getByLabelText("Max speed");
    const minCeiling = Number(minSlider.getAttribute("max")); // 1990
    fireEvent.change(minSlider, { target: { value: String(minCeiling) } });
    // max slider's value must remain at 2000 — it must not have moved
    expect(Number(maxSlider.getAttribute("value") ?? maxSlider.getAttribute("value"))).toBe(2000);
    expect(useSpaceSettingsStore.getState().cometSpeedMax).toBe(2000);
  });
});
