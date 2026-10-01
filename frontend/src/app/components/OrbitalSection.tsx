"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

const fixedOrbitLabels = [
  { label: "DESIGN", position: "top", type: "image", src: "/a.svg" },
  { label: "PLANNING", position: "right", type: "image", src: "/b.svg" },
  { label: "BUILDING", position: "bottom", type: "image", src: "/c.svg" },
  { label: "EXCELLENCE", position: "left", type: "image", src: "/d.svg" },
];

const orbitServiceLabels = [
  { label: "DESIGNING", position: "top" },
  { label: "PLANNING", position: "right" },
  { label: "BUILDING", position: "bottom" },
  { label: "DELIVERING EXCELLENCE", position: "left" },
];

export function Orbit() {
  const [selectedImage, setSelectedImage] = useState<{ label: string; src: string } | null>(null);

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImage(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  return (
    <>
      <div
        className="orbital-stage"
        tabIndex={0}
        aria-label="RAWAL Engineering capabilities"
      >
      <div className="orbital-ring orbital-ring-inner" />
      <div className="orbital-fixed-labels">
        {fixedOrbitLabels.map(item =>
          item.type === "image" ? (
            <button
              key={item.position}
              type="button"
              className={`orbital-fixed-label orbital-fixed-label-${item.position} orbital-fixed-label-image`}
              aria-label={`Open ${item.label} image full screen`}
              onClick={() => setSelectedImage({ label: item.label, src: item.src })}
            >
              <Image src={item.src ?? "/a.svg"} alt={item.label} width={160} height={90} className="orbital-fixed-label-image-inner" />
              <span className="orbital-fixed-label-image-caption">{item.label}</span>
            </button>
          ) : (
            <span key={item.position} className={`orbital-fixed-label orbital-fixed-label-${item.position}`}>{item.label}</span>
          )
        )}
      </div>
      <div className="orbital-service-labels" aria-label="Designing, planning, building, and delivering excellence">
        {orbitServiceLabels.map(item => (
          <span key={item.position} className={`orbital-service-label orbital-service-label-${item.position}`}>
            {item.label}
          </span>
        ))}
      </div>
      <div className="orbital-center">
        <Image src="/logo-transparent.svg" alt="" fill className="orbital-center-logo" aria-hidden="true" />
      </div>
      <span className="orbital-dot" aria-hidden="true" />
      </div>
      {selectedImage && (
        <div
          className="image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedImage.label} image preview`}
          onClick={() => setSelectedImage(null)}
        >
          <Link href="/" className="image-lightbox-home">
            Back to home
          </Link>
          <button
            type="button"
            className="image-lightbox-close"
            aria-label="Close full-screen image"
            onClick={() => setSelectedImage(null)}
          >
            <X size={22} strokeWidth={2.5} aria-hidden="true" />
          </button>
          <Image
            src={selectedImage.src}
            alt={selectedImage.label}
            width={1080}
            height={720}
            className="image-lightbox-image"
            onClick={event => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

export function OrbitalSection() {
  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState<{ x: number; y: number; offsetX: number; offsetY: number } | null>(null);

  const handleImagePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragStart({ x: event.clientX, y: event.clientY, offsetX: imageOffset.x, offsetY: imageOffset.y });
  };

  const handleImagePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStart) return;
    setImageOffset({
      x: dragStart.offsetX + event.clientX - dragStart.x,
      y: dragStart.offsetY + event.clientY - dragStart.y,
    });
  };

  const handleImagePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    setDragStart(null);
  };

  return (
    <section className="orbital-section" aria-labelledby="orbital-heading">
      <div className="mx-auto max-w-7xl">
        <p id="orbital-heading" className="eyebrow text-center">One connected team</p>
        <div className="orbital-top-images" aria-label="Featured RAWAL architectural designs">
          <div className="orbital-top-image orbital-top-image-left">
            <Image src="/left-top.svg" alt="RAWAL left top design" fill className="orbital-top-image-inner" draggable={false} />
          </div>
          <div className="orbital-top-image orbital-top-image-right">
            <Image src="/right-top.svg" alt="RAWAL right top design" fill className="orbital-top-image-inner" draggable={false} />
          </div>
        </div>
        <div className="orbital-layout">
          <div
            className={`orbital-side-image orbital-side-image-left ${dragStart ? "is-dragging" : ""}`}
            onPointerDown={handleImagePointerDown}
            onPointerMove={handleImagePointerMove}
            onPointerUp={handleImagePointerUp}
            onPointerCancel={handleImagePointerUp}
            role="img"
            aria-label="Draggable RAWAL architectural design"
          >
            <Image src="/pic.svg" alt="" fill className="orbital-side-image-inner" style={{ transform: `translate(${imageOffset.x}px, ${imageOffset.y}px)` }} draggable={false} />
          </div>
          <Orbit />
          <div className="orbital-side-image orbital-side-image-right">
            <Image src="/right.svg" alt="RAWAL project design" fill className="orbital-side-image-inner" draggable={false} />
          </div>
        </div>
      </div>
    </section>
  );
}