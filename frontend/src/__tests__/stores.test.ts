import { describe, it, expect, beforeEach } from "vitest";
import { useStore } from "../stores";

describe("Zustand Store", () => {
  beforeEach(() => {
    // Reset store to defaults before each test
    useStore.setState({
      dark: false,
      volume: 100,
      brightness: 80,
      wifi: true,
      bluetooth: true,
      airdrop: true,
      fullscreen: false,
      dockSize: 50,
      dockMag: 2,
      typoraMd: "",
      faceTimeImages: {},
    });
  });

  describe("System slice", () => {
    it("initializes with correct defaults", () => {
      const state = useStore.getState();
      expect(state.dark).toBe(false);
      expect(state.volume).toBe(100);
      expect(state.brightness).toBe(80);
      expect(state.wifi).toBe(true);
      expect(state.bluetooth).toBe(true);
      expect(state.airdrop).toBe(true);
      expect(state.fullscreen).toBe(false);
    });

    it("toggleDark flips dark mode", () => {
      useStore.getState().toggleDark();
      expect(useStore.getState().dark).toBe(true);

      useStore.getState().toggleDark();
      expect(useStore.getState().dark).toBe(false);
    });

    it("toggleWIFI flips wifi", () => {
      useStore.getState().toggleWIFI();
      expect(useStore.getState().wifi).toBe(false);

      useStore.getState().toggleWIFI();
      expect(useStore.getState().wifi).toBe(true);
    });

    it("toggleBluetooth flips bluetooth", () => {
      useStore.getState().toggleBluetooth();
      expect(useStore.getState().bluetooth).toBe(false);

      useStore.getState().toggleBluetooth();
      expect(useStore.getState().bluetooth).toBe(true);
    });

    it("toggleAirdrop flips airdrop", () => {
      useStore.getState().toggleAirdrop();
      expect(useStore.getState().airdrop).toBe(false);

      useStore.getState().toggleAirdrop();
      expect(useStore.getState().airdrop).toBe(true);
    });

    it("toggleFullScreen updates fullscreen state", () => {
      useStore.getState().toggleFullScreen(true);
      expect(useStore.getState().fullscreen).toBe(true);

      useStore.getState().toggleFullScreen(false);
      expect(useStore.getState().fullscreen).toBe(false);
    });

    it("setVolume updates volume", () => {
      useStore.getState().setVolume(50);
      expect(useStore.getState().volume).toBe(50);
    });

    it("setBrightness updates brightness", () => {
      useStore.getState().setBrightness(30);
      expect(useStore.getState().brightness).toBe(30);
    });
  });

  describe("Dock slice", () => {
    it("initializes with correct defaults", () => {
      const state = useStore.getState();
      expect(state.dockSize).toBe(50);
      expect(state.dockMag).toBe(2);
    });

    it("setDockSize updates dock size", () => {
      useStore.getState().setDockSize(70);
      expect(useStore.getState().dockSize).toBe(70);
    });

    it("setDockMag updates dock magnification", () => {
      useStore.getState().setDockMag(3);
      expect(useStore.getState().dockMag).toBe(3);
    });
  });

  describe("User slice", () => {
    it("setTyporaMd updates markdown", () => {
      useStore.getState().setTyporaMd("# Hello");
      expect(useStore.getState().typoraMd).toBe("# Hello");
    });

    it("addFaceTimeImage creates a new object (immutability)", () => {
      const before = useStore.getState().faceTimeImages;
      useStore.getState().addFaceTimeImage("data:image/png;base64,abc");
      const after = useStore.getState().faceTimeImages;
      expect(after).not.toBe(before);
    });

    it("addFaceTimeImage adds an image", () => {
      useStore.getState().addFaceTimeImage("data:image/png;base64,abc");
      const images = useStore.getState().faceTimeImages;
      const keys = Object.keys(images);
      expect(keys.length).toBe(1);
      expect(images[keys[0]]).toBe("data:image/png;base64,abc");
    });

    it("delFaceTimeImage removes an image", () => {
      useStore.setState({ faceTimeImages: { "123": "img1", "456": "img2" } });
      useStore.getState().delFaceTimeImage("123");
      const images = useStore.getState().faceTimeImages;
      expect(images["123"]).toBeUndefined();
      expect(images["456"]).toBe("img2");
    });
  });
});
