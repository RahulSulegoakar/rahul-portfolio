"use client";

import React from "react";

type Obstacle = {
  id: number;
  x: number; // 0 - 1 (percentage across width)
  y: number; // 0 - 1 (percentage down height)
};

const PLAYER_SPEED = 0.6; // viewport width per second
const OBSTACLE_SPEED = 0.5; // viewport height per second
const SPAWN_INTERVAL = 900; // ms
const PLAYER_WIDTH = 0.08;
const PLAYER_HEIGHT = 0.26;
const OBSTACLE_SIZE = 0.08;

export function StickmanDodger() {
  const [isRunning, setIsRunning] = React.useState(false);
  const [isGameOver, setIsGameOver] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [bestScore, setBestScore] = React.useState<number | null>(null);
  const [obstacles, setObstacles] = React.useState<Obstacle[]>([]);
  const [playerX, setPlayerX] = React.useState(0.5);

  const lastTimeRef = React.useRef<number | null>(null);
  const spawnTimerRef = React.useRef(0);
  const directionRef = React.useRef(0); // -1, 0, 1
  const rafRef = React.useRef<number | null>(null);
  const nextIdRef = React.useRef(1);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem("stickman-dodger-best");
    if (stored) {
      const parsed = Number.parseInt(stored, 10);
      if (Number.isFinite(parsed)) {
        setBestScore(parsed);
      }
    }
  }, []);

  const resetGame = React.useCallback(() => {
    setIsGameOver(false);
    setIsRunning(true);
    setScore(0);
    setObstacles([]);
    setPlayerX(0.5);
    lastTimeRef.current = null;
    spawnTimerRef.current = 0;
    directionRef.current = 0;
  }, []);

  const endGame = React.useCallback((finalScore: number) => {
    setIsGameOver(true);
    setIsRunning(false);
    setScore(Math.floor(finalScore));
    if (typeof window !== "undefined") {
      setBestScore((prev) => {
        const next =
          prev == null
            ? Math.floor(finalScore)
            : Math.max(prev, Math.floor(finalScore));
        window.localStorage.setItem("stickman-dodger-best", String(next));
        return next;
      });
    }
  }, []);

  React.useEffect(() => {
    if (!isRunning) {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    const loop = (timestamp: number) => {
      if (!isRunning) return;

      if (lastTimeRef.current == null) {
        lastTimeRef.current = timestamp;
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      const delta = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      // Move player
      if (directionRef.current !== 0) {
        setPlayerX((prev) => {
          const next = prev + directionRef.current * PLAYER_SPEED * delta;
          return Math.max(
            PLAYER_WIDTH / 2,
            Math.min(1 - PLAYER_WIDTH / 2, next)
          );
        });
      }

      // Spawn obstacles
      spawnTimerRef.current += delta * 1000;
      const newObstacles: Obstacle[] = [];
      setObstacles((current) => {
        let updated = current.map((obs) => ({
          ...obs,
          y: obs.y + OBSTACLE_SPEED * delta,
        }));
        updated = updated.filter((obs) => obs.y < 1.2);

        if (spawnTimerRef.current >= SPAWN_INTERVAL) {
          spawnTimerRef.current = 0;
          newObstacles.push({
            id: nextIdRef.current++,
            x: Math.random() * (1 - OBSTACLE_SIZE) + OBSTACLE_SIZE / 2,
            y: -0.1,
          });
        }

        if (newObstacles.length) {
          updated = updated.concat(newObstacles);
        }

        return updated;
      });

      // Update score and check collisions using latest values inside state setters
      setScore((prev) => prev + delta * 10);

      setObstacles((current) => {
        let collided = false;
        const playerLeft = playerX - PLAYER_WIDTH / 2;
        const playerRight = playerX + PLAYER_WIDTH / 2;
        const playerTop = 1 - PLAYER_HEIGHT;

        for (const obs of current) {
          const obsLeft = obs.x - OBSTACLE_SIZE / 2;
          const obsRight = obs.x + OBSTACLE_SIZE / 2;
          const obsBottom = obs.y + OBSTACLE_SIZE / 2;

          if (
            obsBottom >= playerTop &&
            obs.y <= 1 &&
            obsRight >= playerLeft &&
            obsLeft <= playerRight
          ) {
            collided = true;
            break;
          }
        }

        if (collided) {
          endGame(score + delta * 10);
          return [];
        }

        return current;
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [endGame, isRunning, playerX, score]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
        directionRef.current = -1;
      } else if (
        event.key === "ArrowRight" ||
        event.key === "d" ||
        event.key === "D"
      ) {
        directionRef.current = 1;
      } else if (event.key === " " && !isRunning) {
        resetGame();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight" ||
        event.key === "a" ||
        event.key === "A" ||
        event.key === "d" ||
        event.key === "D"
      ) {
        directionRef.current = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isRunning, resetGame]);

  const displayScore = Math.floor(score);

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        {/* Obstacles */}
        {obstacles.map((obs) => (
          <div
            key={obs.id}
            className="absolute rounded-full bg-zinc-900/80 shadow-sm dark:bg-zinc-100/80"
            style={{
              left: `${obs.x * 100}%`,
              top: `${obs.y * 100}%`,
              width: `${OBSTACLE_SIZE * 100}%`,
              height: `${OBSTACLE_SIZE * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}

        {/* Stickman (very minimal) */}
        <div
          className="absolute flex flex-col items-center justify-center"
          style={{
            left: `${playerX * 100}%`,
            bottom: `${(PLAYER_HEIGHT * 100) / 4}%`,
            transform: "translateX(-50%)",
          }}
        >
          <div className="h-[10%] w-[10%] rounded-full bg-current" />
          <div className="h-[40%] w-px bg-current" />
          <div className="flex h-[20%] w-full items-start justify-between">
            <div className="h-full w-px -rotate-12 bg-current" />
            <div className="h-full w-px rotate-12 bg-current" />
          </div>
          <div className="flex h-[30%] w-full items-start justify-between">
            <div className="h-full w-px rotate-6 bg-current" />
            <div className="h-full w-px -rotate-6 bg-current" />
          </div>
        </div>
      </div>

      {/* Overlay UI */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-3 text-[11px] sm:p-4 sm:text-xs">
        <div className="flex items-center justify-between gap-2 text-zinc-100/90 mix-blend-difference">
          <div className="inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-0.5 backdrop-blur">
            <span className="font-medium tracking-tight">Stickman Dodger</span>
          </div>
          <div className="flex gap-1.5">
            <span className="rounded-full bg-black/40 px-2 py-0.5 font-mono tabular-nums backdrop-blur">
              {displayScore.toString().padStart(3, "0")}s
            </span>
            {bestScore != null && (
              <span className="rounded-full bg-black/30 px-2 py-0.5 font-mono text-[10px] tabular-nums opacity-80 backdrop-blur">
                best {bestScore.toString().padStart(3, "0")}s
              </span>
            )}
          </div>
        </div>

        <div className="flex items-end justify-between text-zinc-100/80 mix-blend-difference">
          <div className="flex flex-col gap-0.5">
            <span>← → or A/D to move</span>
            <span className="text-[10px] opacity-80">
              Dodge the falling orbs
            </span>
          </div>
          {!isRunning && (
            <div
              className="pointer-events-auto inline-flex cursor-pointer items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-[11px] font-medium tracking-tight backdrop-blur"
              onClick={resetGame}
            >
              {isGameOver ? "Play again" : "Press space to start"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
