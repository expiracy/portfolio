"use client"

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FiMail, FiGithub, FiLinkedin, FiMessageCircle, FiGlobe } from "react-icons/fi";
import { CONTACT_FIELDS, ProfileField, filterContact } from "@/data/content";
import { TerminalPage } from "@/components/terminal-page";
import { terminalColors as T } from "@/lib/tokens";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  EMAIL: FiMail,
  LINKEDIN: FiLinkedin,
  GITHUB: FiGithub,
};

const FALLBACK_ICON = FiGlobe;

function useContainerSize(ref: React.RefObject<HTMLDivElement | null>) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return size;
}

function useGraphLayout(width: number, height: number) {
  return useMemo(() => {
    const minDim = Math.min(width, height);
    const cx = width / 2;
    const cy = height / 2;
    const radius = minDim * 0.3;
    const nodeR = minDim * 0.065;
    const hubR = minDim * 0.085;
    const labelSize = Math.min(16, Math.max(14, minDim * 0.035));
    const valueSize = Math.min(14, Math.max(12, minDim * 0.03));
    const hubLabelSize = Math.min(16, Math.max(14, minDim * 0.035));
    const iconSize = nodeR * 0.75;
    const hubIconSize = hubR * 0.7;
    const strokeBase = Math.max(0.5, minDim * 0.002);
    const dashArray = `${minDim * 0.01} ${minDim * 0.0075}`;
    const packetR = minDim * 0.005;

    return {
      cx, cy, radius, nodeR, hubR,
      labelSize, valueSize, hubLabelSize,
      iconSize, hubIconSize,
      strokeBase, dashArray, packetR,
    };
  }, [width, height]);
}

function getNodePositions(count: number, cx: number, cy: number, radius: number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i * 2 * Math.PI) / count - Math.PI / 2;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  });
}

function ContactGraph({ fields }: { fields: ProfileField[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useContainerSize(containerRef);
  const [hovered, setHovered] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const reduceMotion = useReducedMotion();

  const handleCopyEmail = useCallback((value: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      // Clipboard unavailable (insecure context or permission denied) — skip feedback.
    });
  }, []);

  const layout = useGraphLayout(width, height);
  const {
    cx, cy, radius, nodeR, hubR,
    labelSize, valueSize, hubLabelSize,
    iconSize, hubIconSize,
    strokeBase, dashArray, packetR,
  } = layout;

  const positions = getNodePositions(fields.length, cx, cy, radius);
  const ready = width > 0 && height > 0;

  return (
    <div ref={containerRef} className="w-full h-full min-h-[250px]">
      {ready && (
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Connection lines */}
          {positions.map((pos, i) => {
            const active = hovered === i;
            return (
              <g key={`line-${i}`}>
                <motion.line
                  x1={cx}
                  y1={cy}
                  x2={pos.x}
                  y2={pos.y}
                  stroke={T.green}
                  strokeDasharray={dashArray}
                  animate={
                    reduceMotion
                      ? {
                          strokeWidth: active ? strokeBase * 2 : strokeBase,
                          strokeOpacity: active ? 0.6 : 0.2,
                        }
                      : {
                          strokeDashoffset: [0, -(width * 0.035)],
                          strokeWidth: active ? strokeBase * 2 : strokeBase,
                          strokeOpacity: active ? 0.6 : 0.2,
                        }
                  }
                  transition={{
                    strokeDashoffset: {
                      duration: active ? 0.5 : 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    },
                    strokeWidth: { duration: 0.2 },
                    strokeOpacity: { duration: 0.2 },
                  }}
                />
                {!reduceMotion && (
                  <motion.circle
                    r={active ? packetR * 1.6 : packetR}
                    fill={T.green}
                    animate={{
                      cx: [cx, pos.x],
                      cy: [cy, pos.y],
                      opacity: [0, 0.8, 0.8, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      delay: i * 0.8 + 1,
                      repeat: Infinity,
                      repeatDelay: active ? 0.2 : 2.5,
                      ease: "linear",
                    }}
                  />
                )}
              </g>
            );
          })}

          {/* Central hub */}
          <motion.g
            initial={reduceMotion ? false : { opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 14 }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          >
            <circle
              cx={cx}
              cy={cy}
              r={hubR}
              fill={T.bg}
              stroke={T.green}
              strokeWidth={strokeBase * 2}
            />
            <foreignObject
              x={cx - hubIconSize / 2}
              y={cy - hubIconSize / 2}
              width={hubIconSize}
              height={hubIconSize}
            >
              <FiMessageCircle
                className="text-terminal-green"
                style={{ width: "100%", height: "100%", margin: "0 auto" }}
              />
            </foreignObject>
            <text
              x={cx}
              y={cy + hubR + labelSize * 2}
              textAnchor="middle"
              fontSize={labelSize}
              fontFamily="'Fira Code', 'Courier New', monospace"
              fill={T.green}
              fontWeight="bold"
              stroke={T.bg}
              strokeWidth={labelSize * 0.35}
              paintOrder="stroke"
            >
              CONTACT ME
            </text>
          </motion.g>

          {/* Satellite nodes */}
          {positions.map((pos, i) => {
            const field = fields[i];
            const isEmail = field.key === "EMAIL";
            const Icon = ICON_MAP[field.key] || FALLBACK_ICON;
            const active = hovered === i;

            const nodeContent = (
              <>
                {/* Hover glow ring */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={nodeR * 1.15}
                  fill="none"
                  stroke={T.green}
                  strokeWidth={strokeBase * 0.7}
                  opacity={active ? 0.4 : 0}
                  style={{ transition: "opacity 0.2s" }}
                />

                {/* Node circle */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={nodeR}
                  fill={T.bg}
                  stroke={active ? T.green : T.border}
                  strokeWidth={active ? strokeBase * 2 : strokeBase}
                  style={{ transition: "stroke 0.2s, stroke-width 0.2s" }}
                />

                {/* Icon */}
                <foreignObject
                  x={pos.x - iconSize / 2}
                  y={pos.y - iconSize / 2}
                  width={iconSize}
                  height={iconSize}
                >
                  <Icon
                    className={active ? "text-terminal-green" : "text-terminal-dim"}
                    style={{
                      width: iconSize * 0.875,
                      height: iconSize * 0.875,
                      margin: "0 auto",
                      transition: "color 0.2s",
                    }}
                  />
                </foreignObject>

                {/* Value */}
                <text
                  x={pos.x}
                  y={pos.y + nodeR + valueSize * 2}
                  textAnchor="middle"
                  fontSize={valueSize}
                  fontFamily="'Fira Code', 'Courier New', monospace"
                  fontWeight="bold"
                  fill={active ? T.green : T.dim}
                  stroke={T.bg}
                  strokeWidth={valueSize * 0.35}
                  paintOrder="stroke"
                  style={{ transition: "fill 0.2s" }}
                >
                  {isEmail && copied ? "COPIED!" : field.value}
                </text>
              </>
            );

            return (
              <motion.g
                key={field.key}
                initial={reduceMotion ? false : { opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: i * 0.15 + 0.2,
                  type: "spring",
                  stiffness: 180,
                  damping: 14,
                }}
                style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onTouchStart={() => setHovered(i)}
                onTouchEnd={() => setHovered(null)}
                className="cursor-pointer"
              >
                {isEmail ? (
                  <g
                    onClick={() => handleCopyEmail(field.value)}
                    role="button"
                    aria-label={`Copy email: ${field.value}`}
                  >
                    {nodeContent}
                  </g>
                ) : (
                  <a
                    href={field.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${field.key}: ${field.value}`}
                  >
                    {nodeContent}
                  </a>
                )}
              </motion.g>
            );
          })}
        </svg>
      )}
    </div>
  );
}

export const ContactPage: React.FC = () => {
  return (
    <TerminalPage
      command="netstat ~/contacts"
      footer={(search) => {
        const q = search.toLowerCase();
        const filtered = CONTACT_FIELDS.filter(
          (f) => !q || filterContact(f, q),
        );
        return filtered.length === CONTACT_FIELDS.length
          ? `${CONTACT_FIELDS.length} nodes · all connections active`
          : `${filtered.length} of ${CONTACT_FIELDS.length} nodes`;
      }}
    >
      {(search) => {
        const q = search.toLowerCase();
        const filtered = CONTACT_FIELDS.filter(
          (f) => !q || filterContact(f, q),
        );
        return <ContactGraph fields={filtered} />;
      }}
    </TerminalPage>
  );
};
