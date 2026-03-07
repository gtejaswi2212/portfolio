import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BackgroundEffects } from './BackgroundEffects';
import { Edge } from './Edge';
import { Node } from './Node';
import { edges, mobileVisibleNodes, nodes } from './networkData';
import {
  buildConnectionMap,
  curvedPath,
  makeNodeMap,
  nodePixelPosition,
  proximityValue,
} from './utils';

function useContainerBounds(ref) {
  const [bounds, setBounds] = useState({ width: 1, height: 1 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const update = () => {
      const rect = element.getBoundingClientRect();
      setBounds({ width: rect.width, height: rect.height });
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(element);

    return () => observer.disconnect();
  }, [ref]);

  return bounds;
}

function useViewportWidth() {
  const [width, setWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return width;
}

export function NeuralNetwork() {
  const containerRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const viewportWidth = useViewportWidth();
  const bounds = useContainerBounds(containerRef);

  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [cursor, setCursor] = useState(null);

  const isMobile = viewportWidth < 768;
  const isTablet = viewportWidth >= 768 && viewportWidth < 1100;

  const visibleNodes = useMemo(() => {
    if (isMobile) {
      return nodes.filter((node) => mobileVisibleNodes.has(node.id));
    }
    return nodes;
  }, [isMobile]);

  const visibleNodeIds = useMemo(() => new Set(visibleNodes.map((node) => node.id)), [visibleNodes]);
  const nodeMap = useMemo(() => makeNodeMap(visibleNodes), [visibleNodes]);

  const visibleEdges = useMemo(() => {
    const base = edges.filter(([a, b]) => visibleNodeIds.has(a) && visibleNodeIds.has(b));
    if (isMobile) {
      return base.filter(([a, b], index) => index % 2 === 0 || a === 'rag' || b === 'rag');
    }
    if (isTablet) {
      return base.filter((_, index) => index % 4 !== 0);
    }
    return base;
  }, [isMobile, isTablet, visibleNodeIds]);

  const connectionMap = useMemo(() => buildConnectionMap(visibleEdges), [visibleEdges]);

  const connectedNodeIds = useMemo(() => {
    if (!hoveredNodeId) return new Set();
    const connected = connectionMap.get(hoveredNodeId) || new Set();
    return new Set([hoveredNodeId, ...connected]);
  }, [hoveredNodeId, connectionMap]);

  const parallax = useMemo(() => {
    if (!cursor) return { x: 0, y: 0 };
    const x = (cursor.x / bounds.width - 0.5) * 18;
    const y = (cursor.y / bounds.height - 0.5) * 16;
    return { x, y };
  }, [cursor, bounds.height, bounds.width]);

  const nodePositions = useMemo(() => {
    const mapped = {};
    visibleNodes.forEach((node) => {
      mapped[node.id] = nodePixelPosition(node, bounds, reduceMotion ? { x: 0, y: 0 } : parallax);
    });
    return mapped;
  }, [visibleNodes, bounds, parallax, reduceMotion]);

  const edgeModels = useMemo(() => {
    return visibleEdges
      .map(([fromId, toId], index) => {
        const fromNode = nodeMap[fromId];
        const toNode = nodeMap[toId];
        const from = nodePositions[fromId];
        const to = nodePositions[toId];

        if (!from || !to || !fromNode || !toNode) return null;

        const path = curvedPath({ ...from, layer: fromNode.layer }, { ...to, layer: toNode.layer }, 0.15);
        const fromProximity = proximityValue(from, cursor, 220);
        const toProximity = proximityValue(to, cursor, 220);

        const highlighted =
          hoveredNodeId && (hoveredNodeId === fromId || hoveredNodeId === toId || (connectedNodeIds.has(fromId) && connectedNodeIds.has(toId)));

        return {
          id: index,
          path,
          intensity: Math.max(fromProximity, toProximity),
          highlighted,
        };
      })
      .filter(Boolean);
  }, [visibleEdges, nodeMap, nodePositions, cursor, hoveredNodeId, connectedNodeIds]);

  const handlePointerMove = (event) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    setCursor({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handlePointerLeave = () => {
    setCursor(null);
    setHoveredNodeId(null);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.45 }}
      className="relative"
    >
      <h3 className="text-lg font-semibold text-foreground">Stack Highlights</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Technologies and systems I use to build intelligent, scalable AI applications.
      </p>

      <div
        ref={containerRef}
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
        className="cursor-card relative mt-4 h-[360px] overflow-hidden rounded-3xl border border-border/70 bg-card/70 p-5 shadow-soft sm:h-[420px] lg:h-[460px]"
      >
        <BackgroundEffects />

        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox={`0 0 ${bounds.width} ${bounds.height}`}>
          <g>
            {edgeModels.map((edge) => (
              <Edge key={`edge-${edge.id}`} id={edge.id} path={edge.path} intensity={edge.intensity} highlighted={edge.highlighted} />
            ))}
          </g>
        </svg>

        <div className="absolute inset-0">
          {visibleNodes.map((node) => {
            const position = nodePositions[node.id] || { x: 0, y: 0 };
            const proximity = proximityValue(position, cursor, 170);
            const hovered = node.id === hoveredNodeId;
            const connected = connectedNodeIds.has(node.id);

            return (
              <Node
                key={node.id}
                node={node}
                position={position}
                proximity={proximity}
                hovered={hovered}
                connected={connected}
                parallax={parallax}
                onHover={setHoveredNodeId}
                onLeave={() => setHoveredNodeId(null)}
              />
            );
          })}
        </div>

        <div className="pointer-events-none absolute left-5 top-4 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[10px] uppercase tracking-[0.17em] text-primary/90">
          Live AI Systems Map
        </div>
      </div>
    </motion.section>
  );
}
