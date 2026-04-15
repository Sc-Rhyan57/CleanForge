"use client";
import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  IconBrightnessDown,
  IconBrightnessUp,
  IconCaretRightFilled,
  IconCaretUpFilled,
  IconChevronUp,
  IconMicrophone,
  IconMoon,
  IconPlayerSkipForward,
  IconPlayerTrackNext,
  IconPlayerTrackPrev,
  IconTable,
  IconVolume,
  IconVolume2,
  IconVolume3,
  IconSearch,
  IconWorld,
  IconCommand,
  IconCaretLeftFilled,
  IconCaretDownFilled,
} from "@tabler/icons-react";
import BlurFade from "../magicui/blur-fade";
import type { ReactNode } from "react";

export const MacbookComponent = ({
  src,
  showGradient,
  title,
  badge,
  outro,
  lid,
}: {
  src?: string;
  showGradient?: boolean;
  title?: string | ReactNode;
  outro?: string | ReactNode;
  lid?: string | ReactNode;
  badge?: ReactNode;
}) => {
  return (
    <div className="min-h-[125vh] flex flex-col items-center py-0 md:py-80 justify-start flex-shrink-0 [perspective:800px] transform max-md:scale-90 max-sm:scale-[0.55]">
      <h2 style={{ opacity: 1 }} className="text-white text-3xl font-bold mb-20 text-center">
        {title || <span>Built with precision engineering.</span>}
      </h2>

      <BlurFade delay={0.45}>
        <Lid src={src} scaleX={1.2} scaleY={0.6} rotate={-28} translate={1} lid={lid} />
        <div className="h-[22rem] w-[32rem] bg-[#272729] rounded-2xl overflow-hidden relative -z-10">
          <div className="h-10 w-full relative">
            <div className="absolute inset-x-0 mx-auto w-[80%] h-4 bg-[#050505]" />
          </div>
          <div className="flex relative">
            <div className="mx-auto w-[10%] overflow-hidden h-full">
              <SpeakerGrid />
            </div>
            <div className="mx-auto w-[80%] h-full">
              <Keypad />
            </div>
            <div className="mx-auto w-[10%] overflow-hidden h-full">
              <SpeakerGrid />
            </div>
          </div>
          <Trackpad />
          <div className="h-2 w-20 mx-auto inset-x-0 absolute bottom-0 bg-gradient-to-t from-[#272729] to-[#050505] rounded-tr-3xl rounded-tl-3xl" />
          {showGradient && (
            <div className="h-40 w-full absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f] to-transparent z-50" />
          )}
          {badge && <div className="absolute bottom-4 left-4">{badge}</div>}
        </div>
      </BlurFade>

      {outro != null && typeof outro !== "string" && outro}
      {(outro == null || typeof outro === "string") && (
        <h2 style={{ opacity: 1 }} className="text-white text-3xl font-bold mb-20 text-center">
          {outro || ""}
        </h2>
      )}
    </div>
  );
};

export const Lid = memo(
  ({
    scaleX,
    scaleY,
    rotate,
    translate,
    src,
    lid,
  }: {
    scaleX: number;
    scaleY: number;
    rotate: number;
    translate: number;
    src?: string;
    lid?: string | ReactNode;
  }) => {
    return (
      <div className="relative [perspective:800px]">
        <div
          style={{
            transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
            transformOrigin: "bottom",
            transformStyle: "preserve-3d",
          }}
          className="h-[12rem] w-[32rem] bg-[#010101] rounded-2xl p-2 relative"
        >
          <div
            style={{ boxShadow: "0px 2px 0px 2px var(--neutral-900) inset" }}
            className="absolute inset-0 bg-[#010101] rounded-lg flex items-center justify-center"
          >
            {lid && typeof lid === "string" ? (
              <span className="text-white">{lid}</span>
            ) : (
              lid
            )}
          </div>
        </div>
        <motion.div
          style={{
            scaleX,
            scaleY,
            rotateX: rotate,
            translateY: translate,
            transformStyle: "preserve-3d",
            transformOrigin: "top",
          }}
          className="h-96 w-[32rem] absolute inset-0 bg-[#010101] rounded-2xl p-2"
        >
          <div className="absolute inset-0 bg-[#272729] rounded-lg" />
          {src && (
            <img
              src={src}
              alt="screen"
              className="object-cover absolute rounded-lg inset-0 h-full w-full"
            />
          )}
        </motion.div>
      </div>
    );
  }
);
Lid.displayName = "LidMac";

export const Trackpad = memo(() => (
  <div
    className="w-[40%] mx-auto h-32 rounded-xl my-1"
    style={{ boxShadow: "0px 0px 1px 1px #00000020 inset" }}
  />
));
Trackpad.displayName = "TrackpadMac";

export const Keypad = memo(() => {
  return (
    <div className="h-full rounded-md bg-[#050505] mx-1 p-1">
      <Row>
        <KBtn className="w-10 items-end justify-start pl-[4px] pb-[2px]" childrenClassName="items-start">esc</KBtn>
        <KBtn><IconBrightnessDown className="h-[6px] w-[6px]" /><span className="inline-block mt-1">F1</span></KBtn>
        <KBtn><IconBrightnessUp className="h-[6px] w-[6px]" /><span className="inline-block mt-1">F2</span></KBtn>
        <KBtn><IconTable className="h-[6px] w-[6px]" /><span className="inline-block mt-1">F3</span></KBtn>
        <KBtn><IconSearch className="h-[6px] w-[6px]" /><span className="inline-block mt-1">F4</span></KBtn>
        <KBtn><IconMicrophone className="h-[6px] w-[6px]" /><span className="inline-block mt-1">F5</span></KBtn>
        <KBtn><IconMoon className="h-[6px] w-[6px]" /><span className="inline-block mt-1">F6</span></KBtn>
        <KBtn><IconPlayerTrackPrev className="h-[6px] w-[6px]" /><span className="inline-block mt-1">F7</span></KBtn>
        <KBtn><IconPlayerSkipForward className="h-[6px] w-[6px]" /><span className="inline-block mt-1">F8</span></KBtn>
        <KBtn><IconPlayerTrackNext className="h-[6px] w-[6px]" /><span className="inline-block mt-1">F9</span></KBtn>
        <KBtn><IconVolume3 className="h-[6px] w-[6px]" /><span className="inline-block mt-1">F10</span></KBtn>
        <KBtn><IconVolume2 className="h-[6px] w-[6px]" /><span className="inline-block mt-1">F11</span></KBtn>
        <KBtn><IconVolume className="h-[6px] w-[6px]" /><span className="inline-block mt-1">F12</span></KBtn>
        <KBtn><div className="h-4 w-4 rounded-full bg-gradient-to-b from-20% from-neutral-900 via-black via-50% to-neutral-900 to-95% p-px"><div className="bg-black h-full w-full rounded-full" /></div></KBtn>
      </Row>
      <Row>
        <KBtn><span className="block">~</span><span className="block mt-1">`</span></KBtn>
        {["1","2","3","4","5","6","7","8","9","0"].map(k => <KBtn key={k}><span className="block">{k}</span></KBtn>)}
        <KBtn><span className="block">—</span><span className="block">_</span></KBtn>
        <KBtn><span className="block">+</span><span className="block">=</span></KBtn>
        <KBtn className="w-10 items-end justify-end pr-[4px] pb-[2px]" childrenClassName="items-end">delete</KBtn>
      </Row>
      <Row>
        <KBtn className="w-10 items-end justify-start pl-[4px] pb-[2px]" childrenClassName="items-start">tab</KBtn>
        {"QWERTYUIOP".split("").map(k => <KBtn key={k}><span className="block">{k}</span></KBtn>)}
        <KBtn><span className="block">{"{"}</span><span className="block">{"["}</span></KBtn>
        <KBtn><span className="block">{"}"}</span><span className="block">{"]"}</span></KBtn>
        <KBtn><span className="block">{"|"}</span><span className="block">{"\\"}  </span></KBtn>
      </Row>
      <Row>
        <KBtn className="w-[2.8rem] items-end justify-start pl-[4px] pb-[2px]" childrenClassName="items-start">caps lock</KBtn>
        {"ASDFGHJKL".split("").map(k => <KBtn key={k}><span className="block">{k}</span></KBtn>)}
        <KBtn><span className="block">:</span><span className="block">;</span></KBtn>
        <KBtn><span className="block">{'"'}</span><span className="block">{"'"}</span></KBtn>
        <KBtn className="w-[2.85rem] items-end justify-end pr-[4px] pb-[2px]" childrenClassName="items-end">return</KBtn>
      </Row>
      <Row>
        <KBtn className="w-[3.65rem] items-end justify-start pl-[4px] pb-[2px]" childrenClassName="items-start">shift</KBtn>
        {"ZXCVBNM".split("").map(k => <KBtn key={k}><span className="block">{k}</span></KBtn>)}
        <KBtn><span className="block">{"<"}</span><span className="block">{","}</span></KBtn>
        <KBtn><span className="block">{">"}</span><span className="block">{"."}</span></KBtn>
        <KBtn><span className="block">?</span><span className="block">/</span></KBtn>
        <KBtn className="w-[3.65rem] items-end justify-end pr-[4px] pb-[2px]" childrenClassName="items-end">shift</KBtn>
      </Row>
      <Row>
        <KBtn childrenClassName="h-full justify-between py-[4px]">
          <div className="flex justify-end w-full pr-1"><span className="block">fn</span></div>
          <div className="flex justify-start w-full pl-1"><IconWorld className="h-[6px] w-[6px]" /></div>
        </KBtn>
        <KBtn childrenClassName="h-full justify-between py-[4px]">
          <div className="flex justify-end w-full pr-1"><IconChevronUp className="h-[6px] w-[6px]" /></div>
          <div className="flex justify-start w-full pl-1"><span className="block">control</span></div>
        </KBtn>
        <KBtn childrenClassName="h-full justify-between py-[4px]">
          <div className="flex justify-end w-full pr-1"><OptionKey className="h-[6px] w-[6px]" /></div>
          <div className="flex justify-start w-full pl-1"><span className="block">option</span></div>
        </KBtn>
        <KBtn className="w-8" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex justify-end w-full pr-1"><IconCommand className="h-[6px] w-[6px]" /></div>
          <div className="flex justify-start w-full pl-1"><span className="block">command</span></div>
        </KBtn>
        <KBtn className="w-[8.2rem]" />
        <KBtn className="w-8" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex justify-start w-full pl-1"><IconCommand className="h-[6px] w-[6px]" /></div>
          <div className="flex justify-start w-full pl-1"><span className="block">command</span></div>
        </KBtn>
        <KBtn childrenClassName="h-full justify-between py-[4px]">
          <div className="flex justify-start w-full pl-1"><OptionKey className="h-[6px] w-[6px]" /></div>
          <div className="flex justify-start w-full pl-1"><span className="block">option</span></div>
        </KBtn>
        <div className="w-[4.9rem] mt-[2px] h-6 p-[0.5px] rounded-[4px] flex flex-col justify-end items-center">
          <KBtn className="w-6 h-3"><IconCaretUpFilled className="h-[6px] w-[6px]" /></KBtn>
          <div className="flex">
            <KBtn className="w-6 h-3"><IconCaretLeftFilled className="h-[6px] w-[6px]" /></KBtn>
            <KBtn className="w-6 h-3"><IconCaretDownFilled className="h-[6px] w-[6px]" /></KBtn>
            <KBtn className="w-6 h-3"><IconCaretRightFilled className="h-[6px] w-[6px]" /></KBtn>
          </div>
        </div>
      </Row>
    </div>
  );
});
Keypad.displayName = "KeypadMac";

export const KBtn = memo(
  ({
    className,
    children,
    childrenClassName,
    backlit = true,
  }: {
    className?: string;
    children?: ReactNode;
    childrenClassName?: string;
    backlit?: boolean;
  }) => (
    <div className={cn("p-[0.5px] rounded-[4px]", backlit && "bg-white/[0.2] shadow-xl shadow-white")}>
      <div
        className={cn("h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center", className)}
        style={{ boxShadow: "0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset" }}
      >
        <div className={cn("text-neutral-200 text-[5px] w-full flex justify-center items-center flex-col", childrenClassName, backlit && "text-white")}>
          {children}
        </div>
      </div>
    </div>
  )
);
KBtn.displayName = "KBtnMac";

export const Row = memo(({ children }: { children: ReactNode }) => (
  <div className="flex gap-[2px] mb-[2px] w-full flex-shrink-0">{children}</div>
));
Row.displayName = "RowMac";

export const SpeakerGrid = memo(() => (
  <div
    className="flex px-[0.5px] gap-[2px] mt-2 h-40"
    style={{
      backgroundImage: "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",
      backgroundSize: "3px 3px",
    }}
  />
));
SpeakerGrid.displayName = "SpeakerMac";

export const OptionKey = memo(({ className }: { className: string }) => (
  <svg fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={className}>
    <rect stroke="currentColor" strokeWidth={2} x="18" y="5" width="10" height="2" />
    <polygon stroke="currentColor" strokeWidth={2} points="10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25" />
    <rect className="st0" width="32" height="32" stroke="none" />
  </svg>
));
OptionKey.displayName = "OptionKeyMac";
