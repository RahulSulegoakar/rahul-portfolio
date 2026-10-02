// Built on the Daikanoid 404 game from chanhdai.com, with lives,
// angled paddle bounce, and synthesized SFX instead of CDN assets.

"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";
import p5 from "p5";

import { cn } from "@/lib/utils";

import { LEVELS } from "./levels";
import { resumeSounds, sounds } from "./sounds";

const WIDTH = 800;
const HEIGHT = 600;

const BALL_SIZE = 16;
const BALL_START_SPEED = 7;
const BALL_MAX_SPEED = 13;
const BALL_SPEEDUP = 0.06;
const MAX_BOUNCE_ANGLE = Math.PI / 3;

const PADDLE_WIDTH = 104;
const PADDLE_HEIGHT = 20;
const PADDLE_SPEED = 14;

const BRICK_HEIGHT = 24;
const BRICK_SCORE = 10;
const BEVEL = 3;

const LIVES = 3;

type Brick = { x: number; y: number; w: number; h: number };

type Colors = {
  background: string;
  foreground: string;
  muted: string;
  brick: string;
  highlight: string;
  shadow: string;
};

const FALLBACK: Colors = {
  background: "#09090b",
  foreground: "#fafafa",
  muted: "#71717a",
  brick: "#71717a",
  highlight: "rgba(255, 255, 255, 0.3)",
  shadow: "#3f3f46",
};

function readColors(): Colors {
  const style = getComputedStyle(document.documentElement);
  const get = (name: string, fallback: string) =>
    style.getPropertyValue(name).trim() || fallback;
  return {
    background: get("--dk-background", FALLBACK.background),
    foreground: get("--dk-foreground", FALLBACK.foreground),
    muted: get("--dk-muted-foreground", FALLBACK.muted),
    brick: get("--dk-brick", FALLBACK.brick),
    highlight: get("--dk-brick-highlight", FALLBACK.highlight),
    shadow: get("--dk-brick-shadow", FALLBACK.shadow),
  };
}

function buildBricks(levelIndex: number): Brick[] {
  const level = LEVELS[levelIndex % LEVELS.length];
  const rowScale = level.rowScale ?? 1;
  const colOffset = level.colOffset ?? 0;
  const rowOffset = level.rowOffset ?? 0;

  const bricks: Brick[] = [];
  level.pattern.forEach((row, py) => {
    [...row].forEach((char, px) => {
      if (char !== "#") return;
      for (let dy = 0; dy < rowScale; dy++) {
        bricks.push({
          x: (colOffset + px) * level.brickWidth,
          y: (rowOffset + py * rowScale + dy) * BRICK_HEIGHT,
          w: level.brickWidth,
          h: BRICK_HEIGHT,
        });
      }
    });
  });
  return bricks;
}

export function Boostnoid({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const colors = readColors();
    const soundsOn = !shouldReduceMotion;
    const play = (sound: () => void) => {
      if (soundsOn) sound();
    };

    let levelIndex = 0;
    let bricks = buildBricks(levelIndex);
    let score = 0;
    let lives = LIVES;
    let cleared = false;
    let gameOver = false;

    const paddle = { x: WIDTH / 2 - PADDLE_WIDTH / 2, y: HEIGHT - 40 };
    const ball = { x: 0, y: 0, vx: 0, vy: 0, speed: BALL_START_SPEED };
    let attached = true;

    const clampPaddle = (x: number) =>
      Math.min(Math.max(x, 8), WIDTH - PADDLE_WIDTH - 8);

    const placeOnPaddle = () => {
      ball.x = paddle.x + PADDLE_WIDTH / 2;
      ball.y = paddle.y - BALL_SIZE / 2 - 1;
    };

    const launch = () => {
      if (!attached) return;
      attached = false;
      ball.speed = BALL_START_SPEED;
      const angle = (Math.random() - 0.5) * (Math.PI / 4);
      ball.vx = ball.speed * Math.sin(angle);
      ball.vy = -ball.speed * Math.cos(angle);
    };

    const startLevel = (index: number, keepScore: boolean) => {
      levelIndex = index;
      bricks = buildBricks(levelIndex);
      if (!keepScore) score = 0;
      lives = LIVES;
      cleared = false;
      gameOver = false;
      attached = true;
    };

    const handleAction = () => {
      resumeSounds();
      if (cleared) {
        startLevel(levelIndex + 1, true);
      } else if (gameOver) {
        startLevel(levelIndex, false);
      } else {
        launch();
      }
    };

    const steerPaddle = (p: p5) => {
      if (p.mouseX <= 0 && p.mouseY <= 0) return;
      paddle.x = clampPaddle(p.mouseX - PADDLE_WIDTH / 2);
    };

    function drawBevelRect(p: p5, x: number, y: number, w: number, h: number) {
      p.fill(colors.brick);
      p.rect(x + 2, y + 2, w - 4, h - 4);
      p.fill(colors.highlight);
      p.rect(x + 2, y + 2, w - 4, BEVEL);
      p.rect(x + 2, y + 2 + BEVEL, BEVEL, h - 4 - BEVEL);
      p.fill(colors.shadow);
      p.rect(x + 2, y + h - 2 - BEVEL, w - 4, BEVEL);
      p.rect(x + w - 2 - BEVEL, y + 2, BEVEL, h - 4 - BEVEL);
    }

    function sketch(p: p5) {
      p.setup = () => {
        p.createCanvas(WIDTH, HEIGHT, p.P2D);
        p.textFont("monospace");
        p.noStroke();
        placeOnPaddle();
      };

      p.mouseMoved = () => {
        steerPaddle(p);
        return false;
      };

      p.touchMoved = () => {
        steerPaddle(p);
        return false;
      };

      p.mouseClicked = () => {
        handleAction();
        return false;
      };

      p.touchStarted = () => {
        handleAction();
        return false;
      };

      p.draw = () => {
        p.background(colors.background);

        if (cleared || gameOver) {
          p.fill(colors.foreground);
          p.textAlign(p.CENTER, p.CENTER);
          p.textSize(96);
          p.text("404", WIDTH / 2, HEIGHT / 2 - 40);
          p.fill(colors.muted);
          p.textSize(16);
          p.text(
            cleared
              ? `LEVEL ${LEVELS[levelIndex % LEVELS.length].name} CLEARED · SCORE ${score}`
              : `OUT OF LIVES · SCORE ${score}`,
            WIDTH / 2,
            HEIGHT / 2 + 30
          );
          p.text(
            cleared
              ? "CLICK OR SPACE FOR THE NEXT LEVEL"
              : "CLICK OR SPACE TO RETRY",
            WIDTH / 2,
            HEIGHT / 2 + 56
          );
          return;
        }

        if (p.keyIsDown(p.LEFT_ARROW))
          paddle.x = clampPaddle(paddle.x - PADDLE_SPEED);
        if (p.keyIsDown(p.RIGHT_ARROW))
          paddle.x = clampPaddle(paddle.x + PADDLE_SPEED);

        if (attached) {
          placeOnPaddle();
        } else {
          ball.x += ball.vx;
          ball.y += ball.vy;
          const r = BALL_SIZE / 2;

          if (ball.x < r || ball.x > WIDTH - r) {
            ball.x = Math.min(Math.max(ball.x, r), WIDTH - r);
            ball.vx *= -1;
            play(sounds.wall);
          }

          if (ball.y < r) {
            ball.y = r;
            ball.vy *= -1;
            play(sounds.wall);
          }

          if (
            ball.vy > 0 &&
            ball.y + r >= paddle.y &&
            ball.y + r <= paddle.y + PADDLE_HEIGHT &&
            ball.x >= paddle.x - r &&
            ball.x <= paddle.x + PADDLE_WIDTH + r
          ) {
            // Where the ball lands on the paddle decides the bounce angle.
            const offset =
              (ball.x - (paddle.x + PADDLE_WIDTH / 2)) / (PADDLE_WIDTH / 2);
            const angle = Math.max(-1, Math.min(1, offset)) * MAX_BOUNCE_ANGLE;
            ball.vx = ball.speed * Math.sin(angle);
            ball.vy = -ball.speed * Math.cos(angle);
            ball.y = paddle.y - r;
            play(sounds.paddle);
          }

          for (let i = bricks.length - 1; i >= 0; i--) {
            const b = bricks[i];
            if (
              ball.x + r > b.x &&
              ball.x - r < b.x + b.w &&
              ball.y + r > b.y &&
              ball.y - r < b.y + b.h
            ) {
              const overlapX = Math.min(
                ball.x + r - b.x,
                b.x + b.w - (ball.x - r)
              );
              const overlapY = Math.min(
                ball.y + r - b.y,
                b.y + b.h - (ball.y - r)
              );
              if (overlapX < overlapY) ball.vx *= -1;
              else ball.vy *= -1;

              bricks.splice(i, 1);
              score += BRICK_SCORE;
              ball.speed = Math.min(ball.speed + BALL_SPEEDUP, BALL_MAX_SPEED);
              const scale = ball.speed / Math.hypot(ball.vx, ball.vy);
              ball.vx *= scale;
              ball.vy *= scale;
              play(sounds.brick);
              break;
            }
          }

          if (bricks.length === 0) {
            cleared = true;
            play(sounds.levelClear);
          }

          if (ball.y - r > HEIGHT) {
            lives -= 1;
            play(sounds.lifeLost);
            if (lives <= 0) {
              gameOver = true;
            } else {
              attached = true;
            }
          }
        }

        for (const b of bricks) drawBevelRect(p, b.x, b.y, b.w, b.h);
        drawBevelRect(p, paddle.x, paddle.y, PADDLE_WIDTH, PADDLE_HEIGHT);

        p.fill(colors.foreground);
        p.rect(
          ball.x - BALL_SIZE / 2,
          ball.y - BALL_SIZE / 2,
          BALL_SIZE,
          BALL_SIZE
        );

        p.fill(colors.foreground);
        p.textSize(16);
        p.textAlign(p.LEFT, p.TOP);
        p.text(score.toString().padStart(4, "0"), 8, 6);

        p.textAlign(p.CENTER, p.TOP);
        p.fill(colors.muted);
        p.textSize(12);
        p.text(
          `BOOSTNOID · ${LEVELS[levelIndex % LEVELS.length].name}`,
          WIDTH / 2,
          8
        );

        p.textAlign(p.RIGHT, p.TOP);
        p.fill(colors.foreground);
        p.textSize(16);
        p.text("■ ".repeat(lives).trim(), WIDTH - 8, 6);

        if (attached) {
          p.fill(colors.muted);
          p.textAlign(p.CENTER, p.BOTTOM);
          p.textSize(12);
          p.text("ERR_404 · CLICK OR SPACE TO LAUNCH", WIDTH / 2, HEIGHT - 8);
        }
      };
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " ") {
        e.preventDefault();
        handleAction();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    const instance = new p5(sketch, container);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      instance.remove();
    };
  }, [shouldReduceMotion, resolvedTheme]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "h-150 w-200 ring-1 ring-border [&_canvas]:block [&_canvas]:size-full",
        className
      )}
      {...props}
    />
  );
}
