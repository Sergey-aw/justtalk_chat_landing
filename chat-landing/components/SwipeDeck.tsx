'use client';

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { motion, animate, useMotionValue, useTransform, type PanInfo } from 'framer-motion';
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';

/**
 * The hero's swipeable card stack, without any idea of what the cards are for. The
 * home page's AgentDeck puts voice agents on it; the interview page's OfferDeck puts
 * links on it. Both get the same tilt, fly-out, swipe nudge and photo blur.
 */

// runs before paint on the client, no-op on the server — lets us reorder the deck
// after hydration but before the first visible frame, so there's no reshuffle flash
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Progressive blur over the bottom of the card.
 *
 * Deliberately blurs masked copies of the image with `filter` rather than using
 * `backdrop-filter`: a backdrop is sampled in screen space, so it detaches from the
 * card the moment the card is rotated or dragged. Blurring the card's own content
 * transforms with it.
 */
export function ProgressiveBlur({ src }: { src: string }) {
  // coverage = how far up the card (%) each layer reaches, blur grows as coverage shrinks
  const layers = [
    { blur: 3, coverage: 52 },
    { blur: 6, coverage: 42 },
    { blur: 12, coverage: 32 },
    { blur: 22, coverage: 23 },
    { blur: 36, coverage: 14 },
    { blur: 56, coverage: 7 },
  ];

  return (
    // rounded-[inherit] matters: in Safari, children with filter/mask escape an
    // ancestor's border-radius clip, which squares off the card's corners
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      {layers.map(({ blur, coverage }, i) => {
        const mask = `linear-gradient(to top, black 0%, transparent ${coverage}%)`;
        return (
          // mask and filter go on the SAME element — Safari composites that
          // reliably, whereas mask-on-parent + filter-on-child silently drops the blur
          <img
            key={i}
            src={src}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              filter: `blur(${blur}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
              transform: 'translateZ(0)',
            }}
          />
        );
      })}
      {/* scrim for text contrast — the blur alone doesn't guarantee it against a light photo */}
      <div className="absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
    </div>
  );
}

// The swipe nudge is touch-only and respects reduced motion. Read from media queries,
// which the server can't see, so it renders as "no nudge" and the client fills it in.
const noopSubscribe = () => () => {};
const readCanHint = () =>
  window.matchMedia('(max-width: 767px)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Deck state shared by every swipe deck: the card order, the card currently flying
 * out, and the one-time swipe nudge.
 */
export function useSwipeDeck<T>(items: T[], { onAdvance }: { onAdvance?: () => void } = {}) {
  const [deck, setDeck] = useState<T[]>(items);
  const [flyOut, setFlyOut] = useState<number | null>(null);
  // Enable the nudge only on touch-sized screens (desktop has visible arrows) and when
  // the user hasn't asked to reduce motion.
  const canHint = useSyncExternalStore(noopSubscribe, readCanHint, () => false);
  const [hintDone, setHintDone] = useState(false);

  // start the fly-out; the card calls back once it's off-screen
  const swipe = (dir: number) => {
    setHintDone(true); // any real navigation makes the affordance nudge unnecessary
    if (flyOut === null) setFlyOut(dir);
  };

  const handleExited = () => {
    // top card goes to the back of the deck
    setDeck((prev) => [...prev.slice(1), prev[0]]);
    setFlyOut(null);
    onAdvance?.();
  };

  return {
    deck,
    setDeck,
    flyOut,
    swipe,
    handleExited,
    showHint: canHint && !hintDone,
    endHint: () => setHintDone(true),
  };
}

interface SwipeCardProps {
  image: string;
  alt: string;
  index: number;
  /** non-null while this card should fly out; value is the direction (-1 | 1) */
  flyOut: number | null;
  onRequestSwipe: (dir: number) => void;
  onExited: () => void;
  /** whether the top card can be dragged right now (e.g. not during a call) */
  draggable: boolean;
  /** run the one-time "swipeable" nudge on this (top) card */
  hint: boolean;
  onHintDone: () => void;
  /** whatever sits on top of the photo: title, buttons, overlays */
  children: ReactNode;
}

/** One card in the stack: photo, blur, tilt, drag-to-swipe and fly-out. */
export function SwipeCard({
  image,
  alt,
  index,
  flyOut,
  onRequestSwipe,
  onExited,
  draggable,
  hint,
  onHintDone,
  children,
}: SwipeCardProps) {
  const isTop = index === 0;

  const x = useMotionValue(0);
  // base tilt for the cards sitting under the top one
  const baseRotate = index === 0 ? 0 : index % 2 === 1 ? -4 : 3.5;
  const rotate = useTransform(x, [-220, 0, 220], [-16, baseRotate, 16]);

  // One-time affordance nudge: after the top card settles, spring it to the right and
  // bounce it back so touch users see the deck is swipeable. Cancelled the moment the
  // user touches the card (their own gesture takes over).
  const hintCtrlRef = useRef<ReturnType<typeof animate> | null>(null);
  const hintActiveRef = useRef(false);

  useEffect(() => {
    if (!hint) return;
    hintActiveRef.current = true;
    const run = async () => {
      hintCtrlRef.current = animate(x, 66, { type: 'spring', stiffness: 280, damping: 15 });
      try {
        await hintCtrlRef.current.finished;
      } catch {
        return;
      }
      if (!hintActiveRef.current) return;
      // low damping on the return = a little bounce as it settles back to centre
      hintCtrlRef.current = animate(x, 0, { type: 'spring', stiffness: 240, damping: 9 });
      try {
        await hintCtrlRef.current.finished;
      } catch {
        return;
      }
      if (hintActiveRef.current) onHintDone();
    };
    const timer = setTimeout(run, 750);
    return () => {
      hintActiveRef.current = false;
      clearTimeout(timer);
      hintCtrlRef.current?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hint]);

  const interruptHint = () => {
    if (!hintActiveRef.current) return;
    hintActiveRef.current = false;
    hintCtrlRef.current?.stop();
    x.set(0);
    onHintDone();
  };

  // `x` is a MotionValue we own, so the fly-out has to be animated imperatively —
  // a declarative `exit` can't drive a value bound through `style`.
  useEffect(() => {
    if (!isTop || flyOut === null) return;
    const controls = animate(x, flyOut * 700, { duration: 0.32, ease: 'easeIn' });
    controls.then(() => onExited());
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flyOut, isTop]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const flicked = Math.abs(info.offset.x) > 110 || Math.abs(info.velocity.x) > 600;
    if (flicked) onRequestSwipe(info.offset.x > 0 ? 1 : -1);
  };

  return (
    <motion.div
      className="absolute inset-0"
      style={{ x, rotate, zIndex: 10 - index }}
      drag={isTop && draggable && flyOut === null ? 'x' : false}
      dragElastic={0.7}
      dragConstraints={{ left: 0, right: 0 }}
      onPointerDown={isTop ? interruptHint : undefined}
      onDragEnd={isTop ? handleDragEnd : undefined}
      initial={{ scale: 0.88, y: 44, opacity: 0 }}
      animate={{
        scale: 1 - index * 0.05,
        y: index * 14,
        // fade the card out as it flies off the deck
        opacity: flyOut !== null ? 0 : 1,
      }}
      transition={{
        // low damping = the card promoted to the top overshoots slightly before settling
        default: { type: 'spring', stiffness: 380, damping: 17, mass: 0.9 },
        // …but the fade should be a plain tween, not a springy one
        opacity: { duration: 0.28, ease: 'easeIn' },
      }}
      whileDrag={{ cursor: 'grabbing' }}
    >
      <div
        className={`relative h-full w-full overflow-hidden rounded-3xl bg-gray-100 shadow-[0_18px_50px_rgba(0,0,0,0.18)] ${
          // only promise a drag when one is possible
          isTop && draggable ? 'cursor-grab' : ''
        }`}
      >
        <img
          src={image}
          alt={alt}
          draggable={false}
          className="absolute inset-0 h-full w-full select-none object-cover"
        />

        <ProgressiveBlur src={image} />

        {children}
      </div>
    </motion.div>
  );
}

/**
 * Desktop-only deck controls, centred just under the stack. The cards' drop shadow
 * is painted by the cards themselves, so these have to sit above that layer to stay
 * legible — they're below the stack, so they never overlap a card anyway.
 * Wrapper is click-through so it can't steal a drag from the top card.
 */
export function DeckArrows({
  disabled,
  onSwipe,
  itemLabel,
}: {
  disabled: boolean;
  onSwipe: (dir: number) => void;
  /** what one card is, for the button labels: "agent", "offer" */
  itemLabel: string;
}) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-full z-20 hidden translate-y-5 justify-center gap-4 md:flex">
      <button
        type="button"
        aria-label={`Previous ${itemLabel}`}
        disabled={disabled}
        onClick={() => onSwipe(-1)}
        className="pointer-events-auto cursor-pointer text-just_cod-gray/60 transition-colors hover:text-just_cod-gray disabled:pointer-events-none disabled:opacity-25"
      >
        <CircleArrowLeft className="h-6 w-6" strokeWidth={1.5} />
      </button>
      <button
        type="button"
        aria-label={`Next ${itemLabel}`}
        disabled={disabled}
        onClick={() => onSwipe(1)}
        className="pointer-events-auto cursor-pointer text-just_cod-gray/60 transition-colors hover:text-just_cod-gray disabled:pointer-events-none disabled:opacity-25"
      >
        <CircleArrowRight className="h-6 w-6" strokeWidth={1.5} />
      </button>
    </div>
  );
}
