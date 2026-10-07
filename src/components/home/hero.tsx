"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowDown, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/src/components/ui/button";
import type { Action, Photo } from "./types";

export function Hero({
  university,
  title,
  accent,
  description,
  image,
  primaryAction,
  secondaryAction,
}: {
  university: string;
  title: string;
  accent: string;
  description: string;
  image: Photo;
  primaryAction: Action;
  secondaryAction: Action;
}) {
  const root = useRef<HTMLElement>(null);
  const photo = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(photo.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    });
    return () => media.revert();
  }, []);
  return (
    <section
      ref={root}
      className="relative isolate min-h-[640px] overflow-hidden bg-brand-dark text-white lg:min-h-[710px]"
    >
      <div ref={photo} className="absolute -inset-y-16 inset-x-0 -z-20">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          preload
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="hero-overlay absolute inset-0 -z-10" />
      <div className="home-container relative pb-28 pt-20 lg:pb-32 lg:pt-28">
        <motion.div
          initial={reduced ? false : "hidden"}
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.14 } },
          }}
          className="max-w-3xl"
        >
          {[
            <p
              key="eyebrow"
              className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.23em]"
            >
              <span className="h-px w-9 bg-white/70" />
              {university} · Since 1912
            </p>,
            <h1
              key="title"
              className="text-5xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-6xl lg:text-[78px]"
            >
              {title}
              <br />
              <span className="font-serif italic font-normal text-brand-pale">
                {accent}
              </span>
            </h1>,
            <p
              key="description"
              className="mt-7 max-w-lg text-base leading-7 text-white/80 sm:text-lg"
            >
              {description}
            </p>,
            <div key="actions" className="mt-9 flex flex-wrap gap-4">
              <Button
                render={<Link href={primaryAction.href} />}
                className="h-12 rounded-lg px-6"
              >
                {primaryAction.label}
                <ArrowRight className="ml-3" />
              </Button>
              <Button
                render={<Link href={secondaryAction.href} />}
                variant="outline"
                className="h-12 border-white/40 bg-white/5 px-6 text-white hover:bg-white/15 hover:text-white"
              >
                {secondaryAction.label}
                <ArrowUpRightIcon />
              </Button>
            </div>,
          ].map((child, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 22 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
              }}
            >
              {child}
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="home-container absolute inset-x-0 bottom-7 flex justify-between text-xs text-white/75">
        <span className="flex items-center gap-2">
          <MapPin size={14} />
          Tianjin, China · A world of possibilities
        </span>
        <a href="#discover" className="hidden items-center gap-3 sm:flex">
          Scroll to discover
          <ArrowDown size={15} />
        </a>
      </div>
    </section>
  );
}
function ArrowUpRightIcon() {
  return <ArrowRight className="ml-2 -rotate-45" />;
}
