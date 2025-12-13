import { Day } from './day.js'


interface Point {
  x: number,
  y: number,
  z: number
}

interface Edge {
  u: number,
  v: number,
  weight: number
}

// It's a good day when you get to use a union find
class UnionFind {
  representatives: Map<number, number>;
  sizes: Map<number, number>; // From canonical rep -> sze

  constructor() {
    this.representatives = new Map<number, number>()
    this.sizes = new Map<number, number>();
  }

  add(i: number) {
    this.representatives.set(i, i)
    this.sizes.set(i, 1)
  }

  union(i: number, j: number) {
    let k = this.representatives.get(i);
    let l = this.representatives.get(j);
    this.representatives.set(k, l)
    this.sizes.set(l, this.sizes.get(k) + this.sizes.get(l));
    this.sizes.delete(k);
  }

  find(i: number) {
    if (this.representatives.get(i) == i) {
      return i;
    } else {
      let j = this.find(this.representatives.get(i))
      this.representatives.set(i, j);
      return j;
    }
  }
}

function distance(p1: Point, p2: Point): number {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2 + (p1.z - p2.z) ** 2);
}


export const day08 = {
  run: (input: string) => {
    const lines = input.trim().split(/\r?\n/);
    const points: Point[] = lines.map(l => l.split(',')).map(([i, j, k]) => { return { x: parseInt(i), y: parseInt(j), z: parseInt(k) } })

    let edges: Edge[] = []

    let ds = new UnionFind();

    for (let i = 0; i < points.length; ++i) {
      ds.add(i);
      for (let j = i + 1; j < points.length; ++j) {
        edges.push({ u: i, v: j, weight: distance(points[i], points[j]) })
      }
    }

    edges.sort((a, b) => a.weight - b.weight);

    let i = 0;

    let connections = 0;
    for (; i != edges.length && connections < 1000; ++i) {
      let e: Edge = edges[i];
      if (ds.find(e.u) == ds.find(e.v)) {
        connections++;
        continue;
      }

      ds.union(e.u, e.v);
      connections++;
    }

    // Now we want the sizes of the three largest circuits...
    let circuits = Array.from(ds.sizes.values());
    circuits.sort((a, b) => b - a);

    let sol1 = circuits[0] * circuits[1] * circuits[2];


    console.log(`Part 1: ${sol1}`)

    let last: Edge;

    for (; i != edges.length; ++i) {
      let e: Edge = edges[i];
      if (ds.find(e.u) == ds.find(e.v)) {
        continue;
      }

      ds.union(e.u, e.v);
      last = e;
    }

    let sol2 = points[last.u].x * points[last.v].x

    console.log(`Part 2: ${sol2}`)

  }
}