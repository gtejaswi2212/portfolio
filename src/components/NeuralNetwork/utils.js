export function makeNodeMap(nodes) {
  return nodes.reduce((acc, node) => {
    acc[node.id] = node;
    return acc;
  }, {});
}

export function buildConnectionMap(edges) {
  const map = new Map();

  edges.forEach(([a, b]) => {
    if (!map.has(a)) map.set(a, new Set());
    if (!map.has(b)) map.set(b, new Set());
    map.get(a).add(b);
    map.get(b).add(a);
  });

  return map;
}

export function getDistance(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function proximityValue(point, cursor, radius = 180) {
  if (!cursor) return 0;
  const distance = getDistance(point, cursor);
  return Math.max(0, 1 - distance / radius);
}

export function curvedPath(from, to, bend = 0.18) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const normalX = -dy;
  const normalY = dx;
  const normalLength = Math.max(1, Math.sqrt(normalX * normalX + normalY * normalY));

  const direction = from.layer <= to.layer ? 1 : -1;
  const curve = Math.min(32, Math.sqrt(dx * dx + dy * dy) * bend) * direction;

  const cx = mx + (normalX / normalLength) * curve;
  const cy = my + (normalY / normalLength) * curve;

  return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;
}

export function nodePixelPosition(node, bounds, parallax = { x: 0, y: 0 }) {
  const baseX = (node.x / 100) * bounds.width;
  const baseY = (node.y / 100) * bounds.height;

  return {
    x: baseX + parallax.x * node.depth,
    y: baseY + parallax.y * node.depth,
  };
}
