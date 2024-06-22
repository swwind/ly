// Users who only use Preact for SSR might not specify "dom" in their lib in tsconfig.json
/// <reference lib="dom" />

import type { ClassNames } from "./clsx.ts";
import type { MaybeComputed } from "./state.ts";
import type { CSSProperties } from "./styl.ts";
import type {
  ClassAttributes,
  ComponentType,
  LyDOMAttributes,
  VNode,
} from "./vnode.ts";

export namespace JSXInternal {
  export type Booleanish = boolean | "true" | "false";

  // deno-lint-ignore no-explicit-any
  export type ElementType<P = any> =
    | {
        [K in keyof IntrinsicElements]: P extends IntrinsicElements[K]
          ? K
          : never;
      }[keyof IntrinsicElements]
    | ComponentType<P>;
  export interface Element extends VNode {}
  export type ElementClass = ComponentType;

  export interface SVGAttributes<Target extends EventTarget = SVGElement>
    extends HTMLAttributes<Target> {
    accentHeight?: MaybeComputed<number | string | undefined>;
    accumulate?: MaybeComputed<"none" | "sum" | undefined>;
    additive?: MaybeComputed<"replace" | "sum" | undefined>;
    alignmentBaseline?: MaybeComputed<
      | "auto"
      | "baseline"
      | "before-edge"
      | "text-before-edge"
      | "middle"
      | "central"
      | "after-edge"
      | "text-after-edge"
      | "ideographic"
      | "alphabetic"
      | "hanging"
      | "mathematical"
      | "inherit"
      | undefined
    >;
    "alignment-baseline"?: MaybeComputed<
      | "auto"
      | "baseline"
      | "before-edge"
      | "text-before-edge"
      | "middle"
      | "central"
      | "after-edge"
      | "text-after-edge"
      | "ideographic"
      | "alphabetic"
      | "hanging"
      | "mathematical"
      | "inherit"
      | undefined
    >;
    allowReorder?: MaybeComputed<"no" | "yes" | undefined>;
    "allow-reorder"?: MaybeComputed<"no" | "yes" | undefined>;
    alphabetic?: MaybeComputed<number | string | undefined>;
    amplitude?: MaybeComputed<number | string | undefined>;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/arabic-form */
    arabicForm?: MaybeComputed<
      "initial" | "medial" | "terminal" | "isolated" | undefined
    >;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/arabic-form */
    "arabic-form"?: MaybeComputed<
      "initial" | "medial" | "terminal" | "isolated" | undefined
    >;
    ascent?: MaybeComputed<number | string | undefined>;
    attributeName?: MaybeComputed<string | undefined>;
    attributeType?: MaybeComputed<string | undefined>;
    autoReverse?: MaybeComputed<number | string | undefined>;
    azimuth?: MaybeComputed<number | string | undefined>;
    baseFrequency?: MaybeComputed<number | string | undefined>;
    baselineShift?: MaybeComputed<number | string | undefined>;
    "baseline-shift"?: MaybeComputed<number | string | undefined>;
    baseProfile?: MaybeComputed<number | string | undefined>;
    bbox?: MaybeComputed<number | string | undefined>;
    begin?: MaybeComputed<number | string | undefined>;
    bias?: MaybeComputed<number | string | undefined>;
    by?: MaybeComputed<number | string | undefined>;
    calcMode?: MaybeComputed<number | string | undefined>;
    capHeight?: MaybeComputed<number | string | undefined>;
    "cap-height"?: MaybeComputed<number | string | undefined>;
    clip?: MaybeComputed<number | string | undefined>;
    clipPath?: MaybeComputed<string | undefined>;
    "clip-path"?: MaybeComputed<string | undefined>;
    clipPathUnits?: MaybeComputed<number | string | undefined>;
    clipRule?: MaybeComputed<number | string | undefined>;
    "clip-rule"?: MaybeComputed<number | string | undefined>;
    colorInterpolation?: MaybeComputed<number | string | undefined>;
    "color-interpolation"?: MaybeComputed<number | string | undefined>;
    colorInterpolationFilters?: MaybeComputed<
      "auto" | "sRGB" | "linearRGB" | "inherit" | undefined
    >;
    "color-interpolation-filters"?: MaybeComputed<
      "auto" | "sRGB" | "linearRGB" | "inherit" | undefined
    >;
    colorProfile?: MaybeComputed<number | string | undefined>;
    "color-profile"?: MaybeComputed<number | string | undefined>;
    colorRendering?: MaybeComputed<number | string | undefined>;
    "color-rendering"?: MaybeComputed<number | string | undefined>;
    contentScriptType?: MaybeComputed<number | string | undefined>;
    "content-script-type"?: MaybeComputed<number | string | undefined>;
    contentStyleType?: MaybeComputed<number | string | undefined>;
    "content-style-type"?: MaybeComputed<number | string | undefined>;
    cursor?: MaybeComputed<number | string | undefined>;
    cx?: MaybeComputed<number | string | undefined>;
    cy?: MaybeComputed<number | string | undefined>;
    d?: MaybeComputed<string | undefined>;
    decelerate?: MaybeComputed<number | string | undefined>;
    descent?: MaybeComputed<number | string | undefined>;
    diffuseConstant?: MaybeComputed<number | string | undefined>;
    direction?: MaybeComputed<number | string | undefined>;
    display?: MaybeComputed<number | string | undefined>;
    divisor?: MaybeComputed<number | string | undefined>;
    dominantBaseline?: MaybeComputed<number | string | undefined>;
    "dominant-baseline"?: MaybeComputed<number | string | undefined>;
    dur?: MaybeComputed<number | string | undefined>;
    dx?: MaybeComputed<number | string | undefined>;
    dy?: MaybeComputed<number | string | undefined>;
    edgeMode?: MaybeComputed<number | string | undefined>;
    elevation?: MaybeComputed<number | string | undefined>;
    enableBackground?: MaybeComputed<number | string | undefined>;
    "enable-background"?: MaybeComputed<number | string | undefined>;
    end?: MaybeComputed<number | string | undefined>;
    exponent?: MaybeComputed<number | string | undefined>;
    externalResourcesRequired?: MaybeComputed<number | string | undefined>;
    fill?: MaybeComputed<string | undefined>;
    fillOpacity?: MaybeComputed<number | string | undefined>;
    "fill-opacity"?: MaybeComputed<number | string | undefined>;
    fillRule?: MaybeComputed<"nonzero" | "evenodd" | "inherit" | undefined>;
    "fill-rule"?: MaybeComputed<"nonzero" | "evenodd" | "inherit" | undefined>;
    filter?: MaybeComputed<string | undefined>;
    filterRes?: MaybeComputed<number | string | undefined>;
    filterUnits?: MaybeComputed<number | string | undefined>;
    floodColor?: MaybeComputed<number | string | undefined>;
    "flood-color"?: MaybeComputed<number | string | undefined>;
    floodOpacity?: MaybeComputed<number | string | undefined>;
    "flood-opacity"?: MaybeComputed<number | string | undefined>;
    focusable?: MaybeComputed<number | string | undefined>;
    fontFamily?: MaybeComputed<string | undefined>;
    "font-family"?: MaybeComputed<string | undefined>;
    fontSize?: MaybeComputed<number | string | undefined>;
    "font-size"?: MaybeComputed<number | string | undefined>;
    fontSizeAdjust?: MaybeComputed<number | string | undefined>;
    "font-size-adjust"?: MaybeComputed<number | string | undefined>;
    fontStretch?: MaybeComputed<number | string | undefined>;
    "font-stretch"?: MaybeComputed<number | string | undefined>;
    fontStyle?: MaybeComputed<number | string | undefined>;
    "font-style"?: MaybeComputed<number | string | undefined>;
    fontVariant?: MaybeComputed<number | string | undefined>;
    "font-variant"?: MaybeComputed<number | string | undefined>;
    fontWeight?: MaybeComputed<number | string | undefined>;
    "font-weight"?: MaybeComputed<number | string | undefined>;
    format?: MaybeComputed<number | string | undefined>;
    from?: MaybeComputed<number | string | undefined>;
    fx?: MaybeComputed<number | string | undefined>;
    fy?: MaybeComputed<number | string | undefined>;
    g1?: MaybeComputed<number | string | undefined>;
    g2?: MaybeComputed<number | string | undefined>;
    glyphName?: MaybeComputed<number | string | undefined>;
    "glyph-name"?: MaybeComputed<number | string | undefined>;
    glyphOrientationHorizontal?: MaybeComputed<number | string | undefined>;
    "glyph-orientation-horizontal"?: MaybeComputed<number | string | undefined>;
    glyphOrientationVertical?: MaybeComputed<number | string | undefined>;
    "glyph-orientation-vertical"?: MaybeComputed<number | string | undefined>;
    glyphRef?: MaybeComputed<number | string | undefined>;
    gradientTransform?: MaybeComputed<string | undefined>;
    gradientUnits?: MaybeComputed<string | undefined>;
    hanging?: MaybeComputed<number | string | undefined>;
    horizAdvX?: MaybeComputed<number | string | undefined>;
    "horiz-adv-x"?: MaybeComputed<number | string | undefined>;
    horizOriginX?: MaybeComputed<number | string | undefined>;
    "horiz-origin-x"?: MaybeComputed<number | string | undefined>;
    ideographic?: MaybeComputed<number | string | undefined>;
    imageRendering?: MaybeComputed<number | string | undefined>;
    "image-rendering"?: MaybeComputed<number | string | undefined>;
    in2?: MaybeComputed<number | string | undefined>;
    in?: MaybeComputed<string | undefined>;
    intercept?: MaybeComputed<number | string | undefined>;
    k1?: MaybeComputed<number | string | undefined>;
    k2?: MaybeComputed<number | string | undefined>;
    k3?: MaybeComputed<number | string | undefined>;
    k4?: MaybeComputed<number | string | undefined>;
    k?: MaybeComputed<number | string | undefined>;
    kernelMatrix?: MaybeComputed<number | string | undefined>;
    kernelUnitLength?: MaybeComputed<number | string | undefined>;
    kerning?: MaybeComputed<number | string | undefined>;
    keyPoints?: MaybeComputed<number | string | undefined>;
    keySplines?: MaybeComputed<number | string | undefined>;
    keyTimes?: MaybeComputed<number | string | undefined>;
    lengthAdjust?: MaybeComputed<number | string | undefined>;
    letterSpacing?: MaybeComputed<number | string | undefined>;
    "letter-spacing"?: MaybeComputed<number | string | undefined>;
    lightingColor?: MaybeComputed<number | string | undefined>;
    "lighting-color"?: MaybeComputed<number | string | undefined>;
    limitingConeAngle?: MaybeComputed<number | string | undefined>;
    local?: MaybeComputed<number | string | undefined>;
    markerEnd?: MaybeComputed<string | undefined>;
    "marker-end"?: MaybeComputed<string | undefined>;
    markerHeight?: MaybeComputed<number | string | undefined>;
    markerMid?: MaybeComputed<string | undefined>;
    "marker-mid"?: MaybeComputed<string | undefined>;
    markerStart?: MaybeComputed<string | undefined>;
    "marker-start"?: MaybeComputed<string | undefined>;
    markerUnits?: MaybeComputed<number | string | undefined>;
    markerWidth?: MaybeComputed<number | string | undefined>;
    mask?: MaybeComputed<string | undefined>;
    maskContentUnits?: MaybeComputed<number | string | undefined>;
    maskUnits?: MaybeComputed<number | string | undefined>;
    mathematical?: MaybeComputed<number | string | undefined>;
    mode?: MaybeComputed<number | string | undefined>;
    numOctaves?: MaybeComputed<number | string | undefined>;
    offset?: MaybeComputed<number | string | undefined>;
    opacity?: MaybeComputed<number | string | undefined>;
    operator?: MaybeComputed<number | string | undefined>;
    order?: MaybeComputed<number | string | undefined>;
    orient?: MaybeComputed<number | string | undefined>;
    orientation?: MaybeComputed<number | string | undefined>;
    origin?: MaybeComputed<number | string | undefined>;
    overflow?: MaybeComputed<number | string | undefined>;
    overlinePosition?: MaybeComputed<number | string | undefined>;
    "overline-position"?: MaybeComputed<number | string | undefined>;
    overlineThickness?: MaybeComputed<number | string | undefined>;
    "overline-thickness"?: MaybeComputed<number | string | undefined>;
    paintOrder?: MaybeComputed<number | string | undefined>;
    "paint-order"?: MaybeComputed<number | string | undefined>;
    panose1?: MaybeComputed<number | string | undefined>;
    "panose-1"?: MaybeComputed<number | string | undefined>;
    pathLength?: MaybeComputed<number | string | undefined>;
    patternContentUnits?: MaybeComputed<string | undefined>;
    patternTransform?: MaybeComputed<number | string | undefined>;
    patternUnits?: MaybeComputed<string | undefined>;
    pointerEvents?: MaybeComputed<number | string | undefined>;
    "pointer-events"?: MaybeComputed<number | string | undefined>;
    points?: MaybeComputed<string | undefined>;
    pointsAtX?: MaybeComputed<number | string | undefined>;
    pointsAtY?: MaybeComputed<number | string | undefined>;
    pointsAtZ?: MaybeComputed<number | string | undefined>;
    preserveAlpha?: MaybeComputed<number | string | undefined>;
    preserveAspectRatio?: MaybeComputed<string | undefined>;
    primitiveUnits?: MaybeComputed<number | string | undefined>;
    r?: MaybeComputed<number | string | undefined>;
    radius?: MaybeComputed<number | string | undefined>;
    refX?: MaybeComputed<number | string | undefined>;
    refY?: MaybeComputed<number | string | undefined>;
    renderingIntent?: MaybeComputed<number | string | undefined>;
    "rendering-intent"?: MaybeComputed<number | string | undefined>;
    repeatCount?: MaybeComputed<number | string | undefined>;
    "repeat-count"?: MaybeComputed<number | string | undefined>;
    repeatDur?: MaybeComputed<number | string | undefined>;
    "repeat-dur"?: MaybeComputed<number | string | undefined>;
    requiredExtensions?: MaybeComputed<number | string | undefined>;
    requiredFeatures?: MaybeComputed<number | string | undefined>;
    restart?: MaybeComputed<number | string | undefined>;
    result?: MaybeComputed<string | undefined>;
    rotate?: MaybeComputed<number | string | undefined>;
    rx?: MaybeComputed<number | string | undefined>;
    ry?: MaybeComputed<number | string | undefined>;
    scale?: MaybeComputed<number | string | undefined>;
    seed?: MaybeComputed<number | string | undefined>;
    shapeRendering?: MaybeComputed<number | string | undefined>;
    "shape-rendering"?: MaybeComputed<number | string | undefined>;
    slope?: MaybeComputed<number | string | undefined>;
    spacing?: MaybeComputed<number | string | undefined>;
    specularConstant?: MaybeComputed<number | string | undefined>;
    specularExponent?: MaybeComputed<number | string | undefined>;
    speed?: MaybeComputed<number | string | undefined>;
    spreadMethod?: MaybeComputed<string | undefined>;
    startOffset?: MaybeComputed<number | string | undefined>;
    stdDeviation?: MaybeComputed<number | string | undefined>;
    stemh?: MaybeComputed<number | string | undefined>;
    stemv?: MaybeComputed<number | string | undefined>;
    stitchTiles?: MaybeComputed<number | string | undefined>;
    stopColor?: MaybeComputed<string | undefined>;
    "stop-color"?: MaybeComputed<string | undefined>;
    stopOpacity?: MaybeComputed<number | string | undefined>;
    "stop-opacity"?: MaybeComputed<number | string | undefined>;
    strikethroughPosition?: MaybeComputed<number | string | undefined>;
    "strikethrough-position"?: MaybeComputed<number | string | undefined>;
    strikethroughThickness?: MaybeComputed<number | string | undefined>;
    "strikethrough-thickness"?: MaybeComputed<number | string | undefined>;
    string?: MaybeComputed<number | string | undefined>;
    stroke?: MaybeComputed<string | undefined>;
    strokeDasharray?: MaybeComputed<number | string | undefined>;
    "stroke-dasharray"?: MaybeComputed<number | string | undefined>;
    strokeDashoffset?: MaybeComputed<number | string | undefined>;
    "stroke-dashoffset"?: MaybeComputed<number | string | undefined>;
    strokeLinecap?: MaybeComputed<
      "butt" | "round" | "square" | "inherit" | undefined
    >;
    "stroke-linecap"?: MaybeComputed<
      "butt" | "round" | "square" | "inherit" | undefined
    >;
    strokeLinejoin?: MaybeComputed<
      "miter" | "round" | "bevel" | "inherit" | undefined
    >;
    "stroke-linejoin"?: MaybeComputed<
      "miter" | "round" | "bevel" | "inherit" | undefined
    >;
    strokeMiterlimit?: MaybeComputed<number | string | undefined>;
    "stroke-miterlimit"?: MaybeComputed<number | string | undefined>;
    strokeOpacity?: MaybeComputed<number | string | undefined>;
    "stroke-opacity"?: MaybeComputed<number | string | undefined>;
    strokeWidth?: MaybeComputed<number | string | undefined>;
    "stroke-width"?: MaybeComputed<number | string | undefined>;
    surfaceScale?: MaybeComputed<number | string | undefined>;
    systemLanguage?: MaybeComputed<number | string | undefined>;
    tableValues?: MaybeComputed<number | string | undefined>;
    targetX?: MaybeComputed<number | string | undefined>;
    targetY?: MaybeComputed<number | string | undefined>;
    textAnchor?: MaybeComputed<string | undefined>;
    "text-anchor"?: MaybeComputed<string | undefined>;
    textDecoration?: MaybeComputed<number | string | undefined>;
    "text-decoration"?: MaybeComputed<number | string | undefined>;
    textLength?: MaybeComputed<number | string | undefined>;
    textRendering?: MaybeComputed<number | string | undefined>;
    to?: MaybeComputed<number | string | undefined>;
    transform?: MaybeComputed<string | undefined>;
    u1?: MaybeComputed<number | string | undefined>;
    u2?: MaybeComputed<number | string | undefined>;
    underlinePosition?: MaybeComputed<number | string | undefined>;
    "underline-position"?: MaybeComputed<number | string | undefined>;
    underlineThickness?: MaybeComputed<number | string | undefined>;
    "underline-thickness"?: MaybeComputed<number | string | undefined>;
    unicode?: MaybeComputed<number | string | undefined>;
    unicodeBidi?: MaybeComputed<number | string | undefined>;
    "unicode-bidi"?: MaybeComputed<number | string | undefined>;
    unicodeRange?: MaybeComputed<number | string | undefined>;
    "unicode-range"?: MaybeComputed<number | string | undefined>;
    unitsPerEm?: MaybeComputed<number | string | undefined>;
    "units-per-em"?: MaybeComputed<number | string | undefined>;
    vAlphabetic?: MaybeComputed<number | string | undefined>;
    "v-alphabetic"?: MaybeComputed<number | string | undefined>;
    values?: MaybeComputed<string | undefined>;
    vectorEffect?: MaybeComputed<number | string | undefined>;
    "vector-effect"?: MaybeComputed<number | string | undefined>;
    version?: MaybeComputed<string | undefined>;
    vertAdvY?: MaybeComputed<number | string | undefined>;
    "vert-adv-y"?: MaybeComputed<number | string | undefined>;
    vertOriginX?: MaybeComputed<number | string | undefined>;
    "vert-origin-x"?: MaybeComputed<number | string | undefined>;
    vertOriginY?: MaybeComputed<number | string | undefined>;
    "vert-origin-y"?: MaybeComputed<number | string | undefined>;
    vHanging?: MaybeComputed<number | string | undefined>;
    "v-hanging"?: MaybeComputed<number | string | undefined>;
    vIdeographic?: MaybeComputed<number | string | undefined>;
    "v-ideographic"?: MaybeComputed<number | string | undefined>;
    viewBox?: MaybeComputed<string | undefined>;
    viewTarget?: MaybeComputed<number | string | undefined>;
    visibility?: MaybeComputed<number | string | undefined>;
    vMathematical?: MaybeComputed<number | string | undefined>;
    "v-mathematical"?: MaybeComputed<number | string | undefined>;
    widths?: MaybeComputed<number | string | undefined>;
    wordSpacing?: MaybeComputed<number | string | undefined>;
    "word-spacing"?: MaybeComputed<number | string | undefined>;
    writingMode?: MaybeComputed<number | string | undefined>;
    "writing-mode"?: MaybeComputed<number | string | undefined>;
    x1?: MaybeComputed<number | string | undefined>;
    x2?: MaybeComputed<number | string | undefined>;
    x?: MaybeComputed<number | string | undefined>;
    xChannelSelector?: MaybeComputed<string | undefined>;
    xHeight?: MaybeComputed<number | string | undefined>;
    "x-height"?: MaybeComputed<number | string | undefined>;
    xlinkActuate?: MaybeComputed<string | undefined>;
    "xlink:actuate"?: SVGAttributes["xlinkActuate"];
    xlinkArcrole?: MaybeComputed<string | undefined>;
    "xlink:arcrole"?: MaybeComputed<string | undefined>;
    xlinkHref?: MaybeComputed<string | undefined>;
    "xlink:href"?: MaybeComputed<string | undefined>;
    xlinkRole?: MaybeComputed<string | undefined>;
    "xlink:role"?: MaybeComputed<string | undefined>;
    xlinkShow?: MaybeComputed<string | undefined>;
    "xlink:show"?: MaybeComputed<string | undefined>;
    xlinkTitle?: MaybeComputed<string | undefined>;
    "xlink:title"?: MaybeComputed<string | undefined>;
    xlinkType?: MaybeComputed<string | undefined>;
    "xlink:type"?: MaybeComputed<string | undefined>;
    xmlBase?: MaybeComputed<string | undefined>;
    "xml:base"?: MaybeComputed<string | undefined>;
    xmlLang?: MaybeComputed<string | undefined>;
    "xml:lang"?: MaybeComputed<string | undefined>;
    xmlns?: MaybeComputed<string | undefined>;
    xmlnsXlink?: MaybeComputed<string | undefined>;
    xmlSpace?: MaybeComputed<string | undefined>;
    "xml:space"?: MaybeComputed<string | undefined>;
    y1?: MaybeComputed<number | string | undefined>;
    y2?: MaybeComputed<number | string | undefined>;
    y?: MaybeComputed<number | string | undefined>;
    yChannelSelector?: MaybeComputed<string | undefined>;
    z?: MaybeComputed<number | string | undefined>;
    zoomAndPan?: MaybeComputed<string | undefined>;
  }

  export interface PathAttributes {
    d: string;
  }

  export type TargetedEvent<
    Target extends EventTarget = EventTarget,
    TypedEvent extends Event = Event
  > = Omit<TypedEvent, "currentTarget"> & {
    readonly currentTarget: Target;
  };

  export type TargetedAnimationEvent<Target extends EventTarget> =
    TargetedEvent<Target, AnimationEvent>;
  export type TargetedClipboardEvent<Target extends EventTarget> =
    TargetedEvent<Target, ClipboardEvent>;
  export type TargetedCompositionEvent<Target extends EventTarget> =
    TargetedEvent<Target, CompositionEvent>;
  export type TargetedDragEvent<Target extends EventTarget> = TargetedEvent<
    Target,
    DragEvent
  >;
  export type TargetedFocusEvent<Target extends EventTarget> = TargetedEvent<
    Target,
    FocusEvent
  >;
  export type TargetedInputEvent<Target extends EventTarget> = TargetedEvent<
    Target,
    InputEvent
  >;
  export type TargetedKeyboardEvent<Target extends EventTarget> = TargetedEvent<
    Target,
    KeyboardEvent
  >;
  export type TargetedMouseEvent<Target extends EventTarget> = TargetedEvent<
    Target,
    MouseEvent
  >;
  export type TargetedPointerEvent<Target extends EventTarget> = TargetedEvent<
    Target,
    PointerEvent
  >;
  export type TargetedSubmitEvent<Target extends EventTarget> = TargetedEvent<
    Target,
    SubmitEvent
  >;
  export type TargetedTouchEvent<Target extends EventTarget> = TargetedEvent<
    Target,
    TouchEvent
  >;
  export type TargetedTransitionEvent<Target extends EventTarget> =
    TargetedEvent<Target, TransitionEvent>;
  export type TargetedUIEvent<Target extends EventTarget> = TargetedEvent<
    Target,
    UIEvent
  >;
  export type TargetedWheelEvent<Target extends EventTarget> = TargetedEvent<
    Target,
    WheelEvent
  >;
  export type TargetedPictureInPictureEvent<Target extends EventTarget> =
    TargetedEvent<Target, PictureInPictureEvent>;

  export type EventHandler<E extends TargetedEvent> = {
    bivarianceHack(event: E): void;
  }["bivarianceHack"];

  export type AnimationEventHandler<Target extends EventTarget> = EventHandler<
    TargetedAnimationEvent<Target>
  >;
  export type ClipboardEventHandler<Target extends EventTarget> = EventHandler<
    TargetedClipboardEvent<Target>
  >;
  export type CompositionEventHandler<Target extends EventTarget> =
    EventHandler<TargetedCompositionEvent<Target>>;
  export type DragEventHandler<Target extends EventTarget> = EventHandler<
    TargetedDragEvent<Target>
  >;
  export type FocusEventHandler<Target extends EventTarget> = EventHandler<
    TargetedFocusEvent<Target>
  >;
  export type GenericEventHandler<Target extends EventTarget> = EventHandler<
    TargetedEvent<Target>
  >;
  export type InputEventHandler<Target extends EventTarget> = EventHandler<
    TargetedInputEvent<Target>
  >;
  export type KeyboardEventHandler<Target extends EventTarget> = EventHandler<
    TargetedKeyboardEvent<Target>
  >;
  export type MouseEventHandler<Target extends EventTarget> = EventHandler<
    TargetedMouseEvent<Target>
  >;
  export type PointerEventHandler<Target extends EventTarget> = EventHandler<
    TargetedPointerEvent<Target>
  >;
  export type SubmitEventHandler<Target extends EventTarget> = EventHandler<
    TargetedSubmitEvent<Target>
  >;
  export type TouchEventHandler<Target extends EventTarget> = EventHandler<
    TargetedTouchEvent<Target>
  >;
  export type TransitionEventHandler<Target extends EventTarget> = EventHandler<
    TargetedTransitionEvent<Target>
  >;
  export type UIEventHandler<Target extends EventTarget> = EventHandler<
    TargetedUIEvent<Target>
  >;
  export type WheelEventHandler<Target extends EventTarget> = EventHandler<
    TargetedWheelEvent<Target>
  >;
  export type PictureInPictureEventHandler<Target extends EventTarget> =
    EventHandler<TargetedPictureInPictureEvent<Target>>;

  export interface DOMAttributes<Target extends EventTarget>
    extends LyDOMAttributes {
    // Image Events
    onLoad?: GenericEventHandler<Target> | undefined;
    onLoadCapture?: GenericEventHandler<Target> | undefined;
    onError?: GenericEventHandler<Target> | undefined;
    onErrorCapture?: GenericEventHandler<Target> | undefined;

    // Clipboard Events
    onCopy?: ClipboardEventHandler<Target> | undefined;
    onCopyCapture?: ClipboardEventHandler<Target> | undefined;
    onCut?: ClipboardEventHandler<Target> | undefined;
    onCutCapture?: ClipboardEventHandler<Target> | undefined;
    onPaste?: ClipboardEventHandler<Target> | undefined;
    onPasteCapture?: ClipboardEventHandler<Target> | undefined;

    // Composition Events
    onCompositionEnd?: CompositionEventHandler<Target> | undefined;
    onCompositionEndCapture?: CompositionEventHandler<Target> | undefined;
    onCompositionStart?: CompositionEventHandler<Target> | undefined;
    onCompositionStartCapture?: CompositionEventHandler<Target> | undefined;
    onCompositionUpdate?: CompositionEventHandler<Target> | undefined;
    onCompositionUpdateCapture?: CompositionEventHandler<Target> | undefined;

    // Details Events
    onToggle?: GenericEventHandler<Target> | undefined;

    // Dialog Events
    onClose?: GenericEventHandler<Target> | undefined;
    onCancel?: GenericEventHandler<Target> | undefined;

    // Focus Events
    onFocus?: FocusEventHandler<Target> | undefined;
    onFocusCapture?: FocusEventHandler<Target> | undefined;
    onFocusIn?: FocusEventHandler<Target> | undefined;
    onFocusInCapture?: FocusEventHandler<Target> | undefined;
    onFocusOut?: FocusEventHandler<Target> | undefined;
    onFocusOutCapture?: FocusEventHandler<Target> | undefined;
    onBlur?: FocusEventHandler<Target> | undefined;
    onBlurCapture?: FocusEventHandler<Target> | undefined;

    // Form Events
    onChange?: GenericEventHandler<Target> | undefined;
    onChangeCapture?: GenericEventHandler<Target> | undefined;
    onInput?: InputEventHandler<Target> | undefined;
    onInputCapture?: InputEventHandler<Target> | undefined;
    onBeforeInput?: InputEventHandler<Target> | undefined;
    onBeforeInputCapture?: InputEventHandler<Target> | undefined;
    onSearch?: GenericEventHandler<Target> | undefined;
    onSearchCapture?: GenericEventHandler<Target> | undefined;
    onSubmit?: SubmitEventHandler<Target> | undefined;
    onSubmitCapture?: SubmitEventHandler<Target> | undefined;
    onInvalid?: GenericEventHandler<Target> | undefined;
    onInvalidCapture?: GenericEventHandler<Target> | undefined;
    onReset?: GenericEventHandler<Target> | undefined;
    onResetCapture?: GenericEventHandler<Target> | undefined;
    onFormData?: GenericEventHandler<Target> | undefined;
    onFormDataCapture?: GenericEventHandler<Target> | undefined;

    // Keyboard Events
    onKeyDown?: KeyboardEventHandler<Target> | undefined;
    onKeyDownCapture?: KeyboardEventHandler<Target> | undefined;
    onKeyPress?: KeyboardEventHandler<Target> | undefined;
    onKeyPressCapture?: KeyboardEventHandler<Target> | undefined;
    onKeyUp?: KeyboardEventHandler<Target> | undefined;
    onKeyUpCapture?: KeyboardEventHandler<Target> | undefined;

    // Media Events
    onAbort?: GenericEventHandler<Target> | undefined;
    onAbortCapture?: GenericEventHandler<Target> | undefined;
    onCanPlay?: GenericEventHandler<Target> | undefined;
    onCanPlayCapture?: GenericEventHandler<Target> | undefined;
    onCanPlayThrough?: GenericEventHandler<Target> | undefined;
    onCanPlayThroughCapture?: GenericEventHandler<Target> | undefined;
    onDurationChange?: GenericEventHandler<Target> | undefined;
    onDurationChangeCapture?: GenericEventHandler<Target> | undefined;
    onEmptied?: GenericEventHandler<Target> | undefined;
    onEmptiedCapture?: GenericEventHandler<Target> | undefined;
    onEncrypted?: GenericEventHandler<Target> | undefined;
    onEncryptedCapture?: GenericEventHandler<Target> | undefined;
    onEnded?: GenericEventHandler<Target> | undefined;
    onEndedCapture?: GenericEventHandler<Target> | undefined;
    onLoadedData?: GenericEventHandler<Target> | undefined;
    onLoadedDataCapture?: GenericEventHandler<Target> | undefined;
    onLoadedMetadata?: GenericEventHandler<Target> | undefined;
    onLoadedMetadataCapture?: GenericEventHandler<Target> | undefined;
    onLoadStart?: GenericEventHandler<Target> | undefined;
    onLoadStartCapture?: GenericEventHandler<Target> | undefined;
    onPause?: GenericEventHandler<Target> | undefined;
    onPauseCapture?: GenericEventHandler<Target> | undefined;
    onPlay?: GenericEventHandler<Target> | undefined;
    onPlayCapture?: GenericEventHandler<Target> | undefined;
    onPlaying?: GenericEventHandler<Target> | undefined;
    onPlayingCapture?: GenericEventHandler<Target> | undefined;
    onProgress?: GenericEventHandler<Target> | undefined;
    onProgressCapture?: GenericEventHandler<Target> | undefined;
    onRateChange?: GenericEventHandler<Target> | undefined;
    onRateChangeCapture?: GenericEventHandler<Target> | undefined;
    onSeeked?: GenericEventHandler<Target> | undefined;
    onSeekedCapture?: GenericEventHandler<Target> | undefined;
    onSeeking?: GenericEventHandler<Target> | undefined;
    onSeekingCapture?: GenericEventHandler<Target> | undefined;
    onStalled?: GenericEventHandler<Target> | undefined;
    onStalledCapture?: GenericEventHandler<Target> | undefined;
    onSuspend?: GenericEventHandler<Target> | undefined;
    onSuspendCapture?: GenericEventHandler<Target> | undefined;
    onTimeUpdate?: GenericEventHandler<Target> | undefined;
    onTimeUpdateCapture?: GenericEventHandler<Target> | undefined;
    onVolumeChange?: GenericEventHandler<Target> | undefined;
    onVolumeChangeCapture?: GenericEventHandler<Target> | undefined;
    onWaiting?: GenericEventHandler<Target> | undefined;
    onWaitingCapture?: GenericEventHandler<Target> | undefined;

    // MouseEvents
    onClick?: MouseEventHandler<Target> | undefined;
    onClickCapture?: MouseEventHandler<Target> | undefined;
    onContextMenu?: MouseEventHandler<Target> | undefined;
    onContextMenuCapture?: MouseEventHandler<Target> | undefined;
    onDblClick?: MouseEventHandler<Target> | undefined;
    onDblClickCapture?: MouseEventHandler<Target> | undefined;
    onDrag?: DragEventHandler<Target> | undefined;
    onDragCapture?: DragEventHandler<Target> | undefined;
    onDragEnd?: DragEventHandler<Target> | undefined;
    onDragEndCapture?: DragEventHandler<Target> | undefined;
    onDragEnter?: DragEventHandler<Target> | undefined;
    onDragEnterCapture?: DragEventHandler<Target> | undefined;
    onDragExit?: DragEventHandler<Target> | undefined;
    onDragExitCapture?: DragEventHandler<Target> | undefined;
    onDragLeave?: DragEventHandler<Target> | undefined;
    onDragLeaveCapture?: DragEventHandler<Target> | undefined;
    onDragOver?: DragEventHandler<Target> | undefined;
    onDragOverCapture?: DragEventHandler<Target> | undefined;
    onDragStart?: DragEventHandler<Target> | undefined;
    onDragStartCapture?: DragEventHandler<Target> | undefined;
    onDrop?: DragEventHandler<Target> | undefined;
    onDropCapture?: DragEventHandler<Target> | undefined;
    onMouseDown?: MouseEventHandler<Target> | undefined;
    onMouseDownCapture?: MouseEventHandler<Target> | undefined;
    onMouseEnter?: MouseEventHandler<Target> | undefined;
    onMouseEnterCapture?: MouseEventHandler<Target> | undefined;
    onMouseLeave?: MouseEventHandler<Target> | undefined;
    onMouseLeaveCapture?: MouseEventHandler<Target> | undefined;
    onMouseMove?: MouseEventHandler<Target> | undefined;
    onMouseMoveCapture?: MouseEventHandler<Target> | undefined;
    onMouseOut?: MouseEventHandler<Target> | undefined;
    onMouseOutCapture?: MouseEventHandler<Target> | undefined;
    onMouseOver?: MouseEventHandler<Target> | undefined;
    onMouseOverCapture?: MouseEventHandler<Target> | undefined;
    onMouseUp?: MouseEventHandler<Target> | undefined;
    onMouseUpCapture?: MouseEventHandler<Target> | undefined;

    // Selection Events
    onSelect?: GenericEventHandler<Target> | undefined;
    onSelectCapture?: GenericEventHandler<Target> | undefined;

    // Touch Events
    onTouchCancel?: TouchEventHandler<Target> | undefined;
    onTouchCancelCapture?: TouchEventHandler<Target> | undefined;
    onTouchEnd?: TouchEventHandler<Target> | undefined;
    onTouchEndCapture?: TouchEventHandler<Target> | undefined;
    onTouchMove?: TouchEventHandler<Target> | undefined;
    onTouchMoveCapture?: TouchEventHandler<Target> | undefined;
    onTouchStart?: TouchEventHandler<Target> | undefined;
    onTouchStartCapture?: TouchEventHandler<Target> | undefined;

    // Pointer Events
    onPointerOver?: PointerEventHandler<Target> | undefined;
    onPointerOverCapture?: PointerEventHandler<Target> | undefined;
    onPointerEnter?: PointerEventHandler<Target> | undefined;
    onPointerEnterCapture?: PointerEventHandler<Target> | undefined;
    onPointerDown?: PointerEventHandler<Target> | undefined;
    onPointerDownCapture?: PointerEventHandler<Target> | undefined;
    onPointerMove?: PointerEventHandler<Target> | undefined;
    onPointerMoveCapture?: PointerEventHandler<Target> | undefined;
    onPointerUp?: PointerEventHandler<Target> | undefined;
    onPointerUpCapture?: PointerEventHandler<Target> | undefined;
    onPointerCancel?: PointerEventHandler<Target> | undefined;
    onPointerCancelCapture?: PointerEventHandler<Target> | undefined;
    onPointerOut?: PointerEventHandler<Target> | undefined;
    onPointerOutCapture?: PointerEventHandler<Target> | undefined;
    onPointerLeave?: PointerEventHandler<Target> | undefined;
    onPointerLeaveCapture?: PointerEventHandler<Target> | undefined;
    onGotPointerCapture?: PointerEventHandler<Target> | undefined;
    onGotPointerCaptureCapture?: PointerEventHandler<Target> | undefined;
    onLostPointerCapture?: PointerEventHandler<Target> | undefined;
    onLostPointerCaptureCapture?: PointerEventHandler<Target> | undefined;

    // UI Events
    onScroll?: UIEventHandler<Target> | undefined;
    onScrollEnd?: UIEventHandler<Target> | undefined;
    onScrollCapture?: UIEventHandler<Target> | undefined;

    // Wheel Events
    onWheel?: WheelEventHandler<Target> | undefined;
    onWheelCapture?: WheelEventHandler<Target> | undefined;

    // Animation Events
    onAnimationStart?: AnimationEventHandler<Target> | undefined;
    onAnimationStartCapture?: AnimationEventHandler<Target> | undefined;
    onAnimationEnd?: AnimationEventHandler<Target> | undefined;
    onAnimationEndCapture?: AnimationEventHandler<Target> | undefined;
    onAnimationIteration?: AnimationEventHandler<Target> | undefined;
    onAnimationIterationCapture?: AnimationEventHandler<Target> | undefined;

    // Transition Events
    onTransitionCancel?: TransitionEventHandler<Target>;
    onTransitionCancelCapture?: TransitionEventHandler<Target>;
    onTransitionEnd?: TransitionEventHandler<Target>;
    onTransitionEndCapture?: TransitionEventHandler<Target>;
    onTransitionRun?: TransitionEventHandler<Target>;
    onTransitionRunCapture?: TransitionEventHandler<Target>;
    onTransitionStart?: TransitionEventHandler<Target>;
    onTransitionStartCapture?: TransitionEventHandler<Target>;

    // PictureInPicture Events
    onEnterPictureInPicture?: PictureInPictureEventHandler<Target>;
    onEnterPictureInPictureCapture?: PictureInPictureEventHandler<Target>;
    onLeavePictureInPicture?: PictureInPictureEventHandler<Target>;
    onLeavePictureInPictureCapture?: PictureInPictureEventHandler<Target>;
    onResize?: PictureInPictureEventHandler<Target>;
    onResizeCapture?: PictureInPictureEventHandler<Target>;
  }

  // All the WAI-ARIA 1.1 attributes from https://www.w3.org/TR/wai-aria-1.1/
  export interface AriaAttributes {
    /** Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. */
    "aria-activedescendant"?: MaybeComputed<string | undefined>;
    /** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
    "aria-atomic"?: MaybeComputed<Booleanish | undefined>;
    /**
     * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
     * presented if they are made.
     */
    "aria-autocomplete"?: MaybeComputed<
      "none" | "inline" | "list" | "both" | undefined
    >;
    /**
     * Defines a string value that labels the current element, which is intended to be converted into Braille.
     * @see aria-label.
     */
    "aria-braillelabel"?: MaybeComputed<string | undefined>;
    /**
     * Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille.
     * @see aria-roledescription.
     */
    "aria-brailleroledescription"?: MaybeComputed<string | undefined>;
    /** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
    "aria-busy"?: MaybeComputed<Booleanish | undefined>;
    /**
     * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
     * @see aria-pressed
     * @see aria-selected.
     */
    "aria-checked"?: MaybeComputed<Booleanish | "mixed" | undefined>;
    /**
     * Defines the total number of columns in a table, grid, or treegrid.
     * @see aria-colindex.
     */
    "aria-colcount"?: MaybeComputed<number | undefined>;
    /**
     * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
     * @see aria-colcount
     * @see aria-colspan.
     */
    "aria-colindex"?: MaybeComputed<number | undefined>;
    /**
     * Defines a human readable text alternative of aria-colindex.
     * @see aria-rowindextext.
     */
    "aria-colindextext"?: MaybeComputed<string | undefined>;
    /**
     * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
     * @see aria-colindex
     * @see aria-rowspan.
     */
    "aria-colspan"?: MaybeComputed<number | undefined>;
    /**
     * Identifies the element (or elements) whose contents or presence are controlled by the current element.
     * @see aria-owns.
     */
    "aria-controls"?: MaybeComputed<string | undefined>;
    /** Indicates the element that represents the current item within a container or set of related elements. */
    "aria-current"?: MaybeComputed<
      Booleanish | "page" | "step" | "location" | "date" | "time" | undefined
    >;
    /**
     * Identifies the element (or elements) that describes the object.
     * @see aria-labelledby
     */
    "aria-describedby"?: MaybeComputed<string | undefined>;
    /**
     * Defines a string value that describes or annotates the current element.
     * @see related aria-describedby.
     */
    "aria-description"?: MaybeComputed<string | undefined>;
    /**
     * Identifies the element that provides a detailed, extended description for the object.
     * @see aria-describedby.
     */
    "aria-details"?: MaybeComputed<string | undefined>;
    /**
     * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
     * @see aria-hidden
     * @see aria-readonly.
     */
    "aria-disabled"?: MaybeComputed<Booleanish | undefined>;
    /**
     * Indicates what functions can be performed when a dragged object is released on the drop target.
     * @deprecated in ARIA 1.1
     */
    "aria-dropeffect"?: MaybeComputed<
      "none" | "copy" | "execute" | "link" | "move" | "popup" | undefined
    >;
    /**
     * Identifies the element that provides an error message for the object.
     * @see aria-invalid
     * @see aria-describedby.
     */
    "aria-errormessage"?: MaybeComputed<string | undefined>;
    /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
    "aria-expanded"?: MaybeComputed<Booleanish | undefined>;
    /**
     * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
     * allows assistive technology to override the general default of reading in document source order.
     */
    "aria-flowto"?: MaybeComputed<string | undefined>;
    /**
     * Indicates an element's "grabbed" state in a drag-and-drop operation.
     * @deprecated in ARIA 1.1
     */
    "aria-grabbed"?: MaybeComputed<Booleanish | undefined>;
    /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
    "aria-haspopup"?: MaybeComputed<
      Booleanish | "menu" | "listbox" | "tree" | "grid" | "dialog" | undefined
    >;
    /**
     * Indicates whether the element is exposed to an accessibility API.
     * @see aria-disabled.
     */
    "aria-hidden"?: MaybeComputed<Booleanish | undefined>;
    /**
     * Indicates the entered value does not conform to the format expected by the application.
     * @see aria-errormessage.
     */
    "aria-invalid"?: MaybeComputed<
      Booleanish | "grammar" | "spelling" | undefined
    >;
    /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
    "aria-keyshortcuts"?: MaybeComputed<string | undefined>;
    /**
     * Defines a string value that labels the current element.
     * @see aria-labelledby.
     */
    "aria-label"?: MaybeComputed<string | undefined>;
    /**
     * Identifies the element (or elements) that labels the current element.
     * @see aria-describedby.
     */
    "aria-labelledby"?: MaybeComputed<string | undefined>;
    /** Defines the hierarchical level of an element within a structure. */
    "aria-level"?: MaybeComputed<number | undefined>;
    /** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
    "aria-live"?: MaybeComputed<"off" | "assertive" | "polite" | undefined>;
    /** Indicates whether an element is modal when displayed. */
    "aria-modal"?: MaybeComputed<Booleanish | undefined>;
    /** Indicates whether a text box accepts multiple lines of input or only a single line. */
    "aria-multiline"?: MaybeComputed<Booleanish | undefined>;
    /** Indicates that the user may select more than one item from the current selectable descendants. */
    "aria-multiselectable"?: MaybeComputed<Booleanish | undefined>;
    /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
    "aria-orientation"?: MaybeComputed<"horizontal" | "vertical" | undefined>;
    /**
     * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
     * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
     * @see aria-controls.
     */
    "aria-owns"?: MaybeComputed<string | undefined>;
    /**
     * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
     * A hint could be a sample value or a brief description of the expected format.
     */
    "aria-placeholder"?: MaybeComputed<string | undefined>;
    /**
     * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
     * @see aria-setsize.
     */
    "aria-posinset"?: MaybeComputed<number | undefined>;
    /**
     * Indicates the current "pressed" state of toggle buttons.
     * @see aria-checked
     * @see aria-selected.
     */
    "aria-pressed"?: MaybeComputed<Booleanish | "mixed" | undefined>;
    /**
     * Indicates that the element is not editable, but is otherwise operable.
     * @see aria-disabled.
     */
    "aria-readonly"?: MaybeComputed<Booleanish | undefined>;
    /**
     * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
     * @see aria-atomic.
     */
    "aria-relevant"?: MaybeComputed<
      | "additions"
      | "additions removals"
      | "additions text"
      | "all"
      | "removals"
      | "removals additions"
      | "removals text"
      | "text"
      | "text additions"
      | "text removals"
      | undefined
    >;
    /** Indicates that user input is required on the element before a form may be submitted. */
    "aria-required"?: MaybeComputed<Booleanish | undefined>;
    /** Defines a human-readable, author-localized description for the role of an element. */
    "aria-roledescription"?: MaybeComputed<string | undefined>;
    /**
     * Defines the total number of rows in a table, grid, or treegrid.
     * @see aria-rowindex.
     */
    "aria-rowcount"?: MaybeComputed<number | undefined>;
    /**
     * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
     * @see aria-rowcount
     * @see aria-rowspan.
     */
    "aria-rowindex"?: MaybeComputed<number | undefined>;
    /**
     * Defines a human readable text alternative of aria-rowindex.
     * @see aria-colindextext.
     */
    "aria-rowindextext"?: MaybeComputed<string | undefined>;
    /**
     * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
     * @see aria-rowindex
     * @see aria-colspan.
     */
    "aria-rowspan"?: MaybeComputed<number | undefined>;
    /**
     * Indicates the current "selected" state of various widgets.
     * @see aria-checked
     * @see aria-pressed.
     */
    "aria-selected"?: MaybeComputed<Booleanish | undefined>;
    /**
     * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
     * @see aria-posinset.
     */
    "aria-setsize"?: MaybeComputed<number | undefined>;
    /** Indicates if items in a table or grid are sorted in ascending or descending order. */
    "aria-sort"?: MaybeComputed<
      "none" | "ascending" | "descending" | "other" | undefined
    >;
    /** Defines the maximum allowed value for a range widget. */
    "aria-valuemax"?: MaybeComputed<number | undefined>;
    /** Defines the minimum allowed value for a range widget. */
    "aria-valuemin"?: MaybeComputed<number | undefined>;
    /**
     * Defines the current value for a range widget.
     * @see aria-valuetext.
     */
    "aria-valuenow"?: MaybeComputed<number | undefined>;
    /** Defines the human readable text alternative of aria-valuenow for a range widget. */
    "aria-valuetext"?: MaybeComputed<string | undefined>;
  }

  // All the WAI-ARIA 1.2 role attribute values from https://www.w3.org/TR/wai-aria-1.2/#role_definitions
  type WAIAriaRole =
    | "alert"
    | "alertdialog"
    | "application"
    | "article"
    | "banner"
    | "blockquote"
    | "button"
    | "caption"
    | "cell"
    | "checkbox"
    | "code"
    | "columnheader"
    | "combobox"
    | "command"
    | "complementary"
    | "composite"
    | "contentinfo"
    | "definition"
    | "deletion"
    | "dialog"
    | "directory"
    | "document"
    | "emphasis"
    | "feed"
    | "figure"
    | "form"
    | "generic"
    | "grid"
    | "gridcell"
    | "group"
    | "heading"
    | "img"
    | "input"
    | "insertion"
    | "landmark"
    | "link"
    | "list"
    | "listbox"
    | "listitem"
    | "log"
    | "main"
    | "marquee"
    | "math"
    | "meter"
    | "menu"
    | "menubar"
    | "menuitem"
    | "menuitemcheckbox"
    | "menuitemradio"
    | "navigation"
    | "none"
    | "note"
    | "option"
    | "paragraph"
    | "presentation"
    | "progressbar"
    | "radio"
    | "radiogroup"
    | "range"
    | "region"
    | "roletype"
    | "row"
    | "rowgroup"
    | "rowheader"
    | "scrollbar"
    | "search"
    | "searchbox"
    | "section"
    | "sectionhead"
    | "select"
    | "separator"
    | "slider"
    | "spinbutton"
    | "status"
    | "strong"
    | "structure"
    | "subscript"
    | "superscript"
    | "switch"
    | "tab"
    | "table"
    | "tablist"
    | "tabpanel"
    | "term"
    | "textbox"
    | "time"
    | "timer"
    | "toolbar"
    | "tooltip"
    | "tree"
    | "treegrid"
    | "treeitem"
    | "widget"
    | "window"
    | "none presentation";

  // All the Digital Publishing WAI-ARIA 1.0 role attribute values from https://www.w3.org/TR/dpub-aria-1.0/#role_definitions
  type DPubAriaRole =
    | "doc-abstract"
    | "doc-acknowledgments"
    | "doc-afterword"
    | "doc-appendix"
    | "doc-backlink"
    | "doc-biblioentry"
    | "doc-bibliography"
    | "doc-biblioref"
    | "doc-chapter"
    | "doc-colophon"
    | "doc-conclusion"
    | "doc-cover"
    | "doc-credit"
    | "doc-credits"
    | "doc-dedication"
    | "doc-endnote"
    | "doc-endnotes"
    | "doc-epigraph"
    | "doc-epilogue"
    | "doc-errata"
    | "doc-example"
    | "doc-footnote"
    | "doc-foreword"
    | "doc-glossary"
    | "doc-glossref"
    | "doc-index"
    | "doc-introduction"
    | "doc-noteref"
    | "doc-notice"
    | "doc-pagebreak"
    | "doc-pagelist"
    | "doc-part"
    | "doc-preface"
    | "doc-prologue"
    | "doc-pullquote"
    | "doc-qna"
    | "doc-subtitle"
    | "doc-tip"
    | "doc-toc";

  type AriaRole = WAIAriaRole | DPubAriaRole;

  export interface HTMLAttributes<RefType extends EventTarget = EventTarget>
    extends ClassAttributes<RefType>,
      DOMAttributes<RefType>,
      AriaAttributes {
    // Standard HTML Attributes
    accept?: MaybeComputed<string | undefined>;
    acceptCharset?: MaybeComputed<string | undefined>;
    "accept-charset"?: HTMLAttributes["acceptCharset"];
    accessKey?: MaybeComputed<string | undefined>;
    accesskey?: HTMLAttributes["accessKey"];
    action?: MaybeComputed<string | undefined>;
    allow?: MaybeComputed<string | undefined>;
    allowFullScreen?: MaybeComputed<boolean | undefined>;
    allowTransparency?: MaybeComputed<boolean | undefined>;
    alt?: MaybeComputed<string | undefined>;
    as?: MaybeComputed<string | undefined>;
    async?: MaybeComputed<boolean | undefined>;
    autocomplete?: MaybeComputed<string | undefined>;
    autoComplete?: MaybeComputed<string | undefined>;
    autocorrect?: MaybeComputed<string | undefined>;
    autoCorrect?: MaybeComputed<string | undefined>;
    autofocus?: MaybeComputed<boolean | undefined>;
    autoFocus?: MaybeComputed<boolean | undefined>;
    autoPlay?: MaybeComputed<boolean | undefined>;
    autoplay?: MaybeComputed<boolean | undefined>;
    capture?: boolean | MaybeComputed<string | undefined>;
    cellPadding?: number | MaybeComputed<string | undefined>;
    cellSpacing?: number | MaybeComputed<string | undefined>;
    charSet?: MaybeComputed<string | undefined>;
    charset?: MaybeComputed<string | undefined>;
    challenge?: MaybeComputed<string | undefined>;
    checked?: MaybeComputed<boolean | undefined>;
    cite?: MaybeComputed<string | undefined>;
    class?: ClassNames;
    // className?: MaybeComputed<string | undefined>;
    cols?: MaybeComputed<number | undefined>;
    colSpan?: MaybeComputed<number | undefined>;
    colspan?: MaybeComputed<number | undefined>;
    content?: MaybeComputed<string | undefined>;
    contentEditable?: MaybeComputed<
      Booleanish | "" | "inherit" | "plaintext-only" | undefined
    >;
    contenteditable?: HTMLAttributes["contentEditable"];
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contextmenu */
    contextMenu?: MaybeComputed<string | undefined>;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contextmenu */
    contextmenu?: MaybeComputed<string | undefined>;
    controls?: MaybeComputed<boolean | undefined>;
    controlsList?: MaybeComputed<string | undefined>;
    coords?: MaybeComputed<string | undefined>;
    crossOrigin?: MaybeComputed<string | undefined>;
    crossorigin?: MaybeComputed<string | undefined>;
    data?: MaybeComputed<string | undefined>;
    dateTime?: MaybeComputed<string | undefined>;
    datetime?: MaybeComputed<string | undefined>;
    default?: MaybeComputed<boolean | undefined>;
    defaultChecked?: MaybeComputed<boolean | undefined>;
    defaultValue?: MaybeComputed<string | undefined>;
    defer?: MaybeComputed<boolean | undefined>;
    dir?: MaybeComputed<"auto" | "rtl" | "ltr" | undefined>;
    disabled?: MaybeComputed<boolean | undefined>;
    disableRemotePlayback?: MaybeComputed<boolean | undefined>;
    download?: MaybeComputed<boolean | string | undefined>;
    decoding?: MaybeComputed<"sync" | "async" | "auto" | undefined>;
    draggable?: MaybeComputed<boolean | undefined>;
    encType?: MaybeComputed<string | undefined>;
    enctype?: MaybeComputed<string | undefined>;
    enterkeyhint?: MaybeComputed<
      | "enter"
      | "done"
      | "go"
      | "next"
      | "previous"
      | "search"
      | "send"
      | undefined
    >;
    elementTiming?: MaybeComputed<string | undefined>;
    elementtiming?: HTMLAttributes["elementTiming"];
    exportparts?: MaybeComputed<string | undefined>;
    for?: MaybeComputed<string | undefined>;
    form?: MaybeComputed<string | undefined>;
    formAction?: MaybeComputed<string | undefined>;
    formaction?: MaybeComputed<string | undefined>;
    formEncType?: MaybeComputed<string | undefined>;
    formenctype?: MaybeComputed<string | undefined>;
    formMethod?: MaybeComputed<string | undefined>;
    formmethod?: MaybeComputed<string | undefined>;
    formNoValidate?: MaybeComputed<boolean | undefined>;
    formnovalidate?: MaybeComputed<boolean | undefined>;
    formTarget?: MaybeComputed<string | undefined>;
    formtarget?: MaybeComputed<string | undefined>;
    frameBorder?: MaybeComputed<number | string | undefined>;
    frameborder?: MaybeComputed<number | string | undefined>;
    headers?: MaybeComputed<string | undefined>;
    height?: MaybeComputed<number | string | undefined>;
    hidden?: MaybeComputed<boolean | "hidden" | "until-found" | undefined>;
    high?: MaybeComputed<number | undefined>;
    href?: MaybeComputed<string | undefined>;
    hrefLang?: MaybeComputed<string | undefined>;
    hreflang?: MaybeComputed<string | undefined>;
    // htmlFor?: MaybeComputed<string | undefined>;
    httpEquiv?: MaybeComputed<string | undefined>;
    "http-equiv"?: MaybeComputed<string | undefined>;
    icon?: MaybeComputed<string | undefined>;
    id?: MaybeComputed<string | undefined>;
    indeterminate?: MaybeComputed<boolean | undefined>;
    inert?: MaybeComputed<boolean | undefined>;
    inputMode?: MaybeComputed<string | undefined>;
    inputmode?: MaybeComputed<string | undefined>;
    integrity?: MaybeComputed<string | undefined>;
    is?: MaybeComputed<string | undefined>;
    keyParams?: MaybeComputed<string | undefined>;
    keyType?: MaybeComputed<string | undefined>;
    kind?: MaybeComputed<string | undefined>;
    label?: MaybeComputed<string | undefined>;
    lang?: MaybeComputed<string | undefined>;
    list?: MaybeComputed<string | undefined>;
    loading?: MaybeComputed<"eager" | "lazy" | undefined>;
    loop?: MaybeComputed<boolean | undefined>;
    low?: MaybeComputed<number | undefined>;
    manifest?: MaybeComputed<string | undefined>;
    marginHeight?: MaybeComputed<number | undefined>;
    marginWidth?: MaybeComputed<number | undefined>;
    max?: number | MaybeComputed<string | undefined>;
    maxLength?: MaybeComputed<number | undefined>;
    maxlength?: MaybeComputed<number | undefined>;
    media?: MaybeComputed<string | undefined>;
    mediaGroup?: MaybeComputed<string | undefined>;
    method?: MaybeComputed<string | undefined>;
    min?: number | MaybeComputed<string | undefined>;
    minLength?: MaybeComputed<number | undefined>;
    minlength?: MaybeComputed<number | undefined>;
    multiple?: MaybeComputed<boolean | undefined>;
    muted?: MaybeComputed<boolean | undefined>;
    name?: MaybeComputed<string | undefined>;
    nomodule?: MaybeComputed<boolean | undefined>;
    nonce?: MaybeComputed<string | undefined>;
    noValidate?: MaybeComputed<boolean | undefined>;
    novalidate?: MaybeComputed<boolean | undefined>;
    open?: MaybeComputed<boolean | undefined>;
    optimum?: MaybeComputed<number | undefined>;
    part?: MaybeComputed<string | undefined>;
    pattern?: MaybeComputed<string | undefined>;
    ping?: MaybeComputed<string | undefined>;
    placeholder?: MaybeComputed<string | undefined>;
    playsInline?: MaybeComputed<boolean | undefined>;
    playsinline?: MaybeComputed<boolean | undefined>;
    popover?: MaybeComputed<"auto" | "hint" | "manual" | boolean | undefined>;
    popovertarget?: MaybeComputed<string | undefined>;
    popoverTarget?: MaybeComputed<string | undefined>;
    popovertargetaction?: MaybeComputed<"hide" | "show" | "toggle" | undefined>;
    popoverTargetAction?: MaybeComputed<"hide" | "show" | "toggle" | undefined>;
    poster?: MaybeComputed<string | undefined>;
    preload?: MaybeComputed<string | undefined>;
    radioGroup?: MaybeComputed<string | undefined>;
    readonly?: MaybeComputed<boolean | undefined>;
    readOnly?: MaybeComputed<boolean | undefined>;
    referrerpolicy?: MaybeComputed<
      | "no-referrer"
      | "no-referrer-when-downgrade"
      | "origin"
      | "origin-when-cross-origin"
      | "same-origin"
      | "strict-origin"
      | "strict-origin-when-cross-origin"
      | "unsafe-url"
      | undefined
    >;
    rel?: MaybeComputed<string | undefined>;
    required?: MaybeComputed<boolean | undefined>;
    reversed?: MaybeComputed<boolean | undefined>;
    role?: MaybeComputed<AriaRole | undefined>;
    rows?: MaybeComputed<number | undefined>;
    rowSpan?: MaybeComputed<number | undefined>;
    rowspan?: MaybeComputed<number | undefined>;
    sandbox?: MaybeComputed<string | undefined>;
    scope?: MaybeComputed<string | undefined>;
    scoped?: MaybeComputed<boolean | undefined>;
    scrolling?: MaybeComputed<string | undefined>;
    seamless?: MaybeComputed<boolean | undefined>;
    selected?: MaybeComputed<boolean | undefined>;
    shape?: MaybeComputed<string | undefined>;
    size?: MaybeComputed<number | undefined>;
    sizes?: MaybeComputed<string | undefined>;
    slot?: MaybeComputed<string | undefined>;
    span?: MaybeComputed<number | undefined>;
    spellcheck?: MaybeComputed<boolean | undefined>;
    spellCheck?: MaybeComputed<boolean | undefined>;
    src?: MaybeComputed<string | undefined>;
    srcSet?: MaybeComputed<string | undefined>;
    srcset?: MaybeComputed<string | undefined>;
    srcDoc?: MaybeComputed<string | undefined>;
    srcdoc?: MaybeComputed<string | undefined>;
    srcLang?: MaybeComputed<string | undefined>;
    srclang?: MaybeComputed<string | undefined>;
    start?: MaybeComputed<number | undefined>;
    step?: MaybeComputed<number | string | undefined>;
    style?: CSSProperties;
    summary?: MaybeComputed<string | undefined>;
    tabIndex?: MaybeComputed<number | undefined>;
    tabindex?: MaybeComputed<number | undefined>;
    target?: MaybeComputed<string | undefined>;
    title?: MaybeComputed<string | undefined>;
    type?: MaybeComputed<string | undefined>;
    useMap?: MaybeComputed<string | undefined>;
    usemap?: MaybeComputed<string | undefined>;
    value?: MaybeComputed<string | string[] | number | undefined>;
    volume?: MaybeComputed<string | number | undefined>;
    width?: MaybeComputed<number | string | undefined>;
    wmode?: MaybeComputed<string | undefined>;
    wrap?: MaybeComputed<string | undefined>;

    // Non-standard Attributes
    autocapitalize?: MaybeComputed<
      "off" | "none" | "on" | "sentences" | "words" | "characters" | undefined
    >;
    autoCapitalize?: MaybeComputed<
      "off" | "none" | "on" | "sentences" | "words" | "characters" | undefined
    >;
    disablePictureInPicture?: MaybeComputed<boolean | undefined>;
    results?: MaybeComputed<number | undefined>;
    translate?: MaybeComputed<boolean | undefined>;

    // RDFa Attributes
    about?: MaybeComputed<string | undefined>;
    datatype?: MaybeComputed<string | undefined>;
    inlist?: any;
    prefix?: MaybeComputed<string | undefined>;
    property?: MaybeComputed<string | undefined>;
    resource?: MaybeComputed<string | undefined>;
    typeof?: MaybeComputed<string | undefined>;
    vocab?: MaybeComputed<string | undefined>;

    // Microdata Attributes
    itemProp?: MaybeComputed<string | undefined>;
    itemprop?: MaybeComputed<string | undefined>;
    itemScope?: MaybeComputed<boolean | undefined>;
    itemscope?: MaybeComputed<boolean | undefined>;
    itemType?: MaybeComputed<string | undefined>;
    itemtype?: MaybeComputed<string | undefined>;
    itemID?: MaybeComputed<string | undefined>;
    itemid?: MaybeComputed<string | undefined>;
    itemRef?: MaybeComputed<string | undefined>;
    itemref?: MaybeComputed<string | undefined>;
  }

  export type DetailedHTMLProps<
    HA extends HTMLAttributes<RefType>,
    RefType extends EventTarget = EventTarget
  > = HA;

  export interface HTMLMarqueeElement extends HTMLElement {
    behavior?: MaybeComputed<"scroll" | "slide" | "alternate" | undefined>;
    bgColor?: MaybeComputed<string | undefined>;
    direction?: MaybeComputed<"left" | "right" | "up" | "down" | undefined>;
    height?: MaybeComputed<number | string | undefined>;
    hspace?: MaybeComputed<number | string | undefined>;
    loop?: MaybeComputed<number | string | undefined>;
    scrollAmount?: MaybeComputed<number | string | undefined>;
    scrollDelay?: MaybeComputed<number | string | undefined>;
    trueSpeed?: MaybeComputed<boolean | undefined>;
    vspace?: MaybeComputed<number | string | undefined>;
    width?: MaybeComputed<number | string | undefined>;
  }

  export interface MathMLAttributes<Target extends EventTarget = MathMLElement>
    extends HTMLAttributes<Target> {
    dir?: MaybeComputed<"ltr" | "rtl" | undefined>;
    displaystyle?: MaybeComputed<boolean | undefined>;
    /** @deprecated This feature is non-standard. See https://developer.mozilla.org/en-US/docs/Web/MathML/Global_attributes/href  */
    href?: MaybeComputed<string | undefined>;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Global_attributes/mathbackground */
    mathbackground?: MaybeComputed<string | undefined>;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Global_attributes/mathcolor */
    mathcolor?: MaybeComputed<string | undefined>;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Global_attributes/mathsize */
    mathsize?: MaybeComputed<string | undefined>;
    nonce?: MaybeComputed<string | undefined>;
    scriptlevel?: MaybeComputed<string | undefined>;
  }

  export interface HTMLAnnotationElement extends MathMLElement {
    encoding?: MaybeComputed<string | undefined>;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/semantics#src */
    src?: MaybeComputed<string | undefined>;
  }

  export interface HTMLAnnotationXmlElement extends MathMLElement {
    encoding?: MaybeComputed<string | undefined>;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/semantics#src */
    src?: MaybeComputed<string | undefined>;
  }

  export interface HTMLMActionElement extends MathMLElement {
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/maction#actiontype */
    actiontype?: MaybeComputed<"statusline" | "toggle" | undefined>;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/maction#selection */
    selection?: MaybeComputed<string | undefined>;
  }

  export interface HTMLMathElement extends MathMLElement {
    display?: MaybeComputed<"block" | "inline" | undefined>;
  }

  export interface HTMLMEncloseElement extends MathMLElement {
    notation?: MaybeComputed<string | undefined>;
  }

  export interface HTMLMErrorElement extends MathMLElement {}

  export interface HTMLMFencedElement extends MathMLElement {
    close?: MaybeComputed<string | undefined>;
    open?: MaybeComputed<string | undefined>;
    separators?: MaybeComputed<string | undefined>;
  }

  export interface HTMLMFracElement extends MathMLElement {
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mfrac#denomalign */
    denomalign?: MaybeComputed<"center" | "left" | "right" | undefined>;
    linethickness?: MaybeComputed<string | undefined>;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mfrac#numalign */
    numalign?: MaybeComputed<"center" | "left" | "right" | undefined>;
  }

  export interface HTMLMiElement extends MathMLElement {
    /** The only value allowed in the current specification is normal (case insensitive)
     * See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mi#mathvariant */
    mathvariant?: MaybeComputed<
      | "normal"
      | "bold"
      | "italic"
      | "bold-italic"
      | "double-struck"
      | "bold-fraktur"
      | "script"
      | "bold-script"
      | "fraktur"
      | "sans-serif"
      | "bold-sans-serif"
      | "sans-serif-italic"
      | "sans-serif-bold-italic"
      | "monospace"
      | "initial"
      | "tailed"
      | "looped"
      | "stretched"
      | undefined
    >;
  }

  export interface HTMLMmultiScriptsElement extends MathMLElement {
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mmultiscripts#subscriptshift */
    subscriptshift?: MaybeComputed<string | undefined>;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mmultiscripts#superscriptshift */
    superscriptshift?: MaybeComputed<string | undefined>;
  }

  export interface HTMLMNElement extends MathMLElement {}

  export interface HTMLMOElement extends MathMLElement {
    /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mo#accent */
    accent?: MaybeComputed<boolean | undefined>;
    fence?: MaybeComputed<boolean | undefined>;
    largeop?: MaybeComputed<boolean | undefined>;
    lspace?: MaybeComputed<string | undefined>;
    maxsize?: MaybeComputed<string | undefined>;
    minsize?: MaybeComputed<string | undefined>;
    movablelimits?: MaybeComputed<boolean | undefined>;
    rspace?: MaybeComputed<string | undefined>;
    separator?: MaybeComputed<boolean | undefined>;
    stretchy?: MaybeComputed<boolean | undefined>;
    symmetric?: MaybeComputed<boolean | undefined>;
  }

  export interface HTMLMOverElement extends MathMLElement {
    accent?: MaybeComputed<boolean | undefined>;
  }

  export interface HTMLMPaddedElement extends MathMLElement {
    depth?: MaybeComputed<string | undefined>;
    height?: MaybeComputed<string | undefined>;
    lspace?: MaybeComputed<string | undefined>;
    voffset?: MaybeComputed<string | undefined>;
    width?: MaybeComputed<string | undefined>;
  }

  export interface HTMLMPhantomElement extends MathMLElement {}

  export interface HTMLMPrescriptsElement extends MathMLElement {}

  export interface HTMLMRootElement extends MathMLElement {}

  export interface HTMLMRowElement extends MathMLElement {}

  export interface HTMLMSElement extends MathMLElement {
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/ms#browser_compatibility */
    lquote?: MaybeComputed<string | undefined>;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/ms#browser_compatibility */
    rquote?: MaybeComputed<string | undefined>;
  }

  export interface HTMLMSpaceElement extends MathMLElement {
    depth?: MaybeComputed<string | undefined>;
    height?: MaybeComputed<string | undefined>;
    width?: MaybeComputed<string | undefined>;
  }

  export interface HTMLMSqrtElement extends MathMLElement {}

  export interface HTMLMStyleElement extends MathMLElement {
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mstyle#background */
    background?: MaybeComputed<string | undefined>;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mstyle#color */
    color?: MaybeComputed<string | undefined>;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mstyle#fontsize */
    fontsize?: MaybeComputed<string | undefined>;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mstyle#fontstyle */
    fontstyle?: MaybeComputed<string | undefined>;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mstyle#fontweight */
    fontweight?: MaybeComputed<string | undefined>;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mstyle#scriptminsize */
    scriptminsize?: MaybeComputed<string | undefined>;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mstyle#scriptsizemultiplier */
    scriptsizemultiplier?: MaybeComputed<string | undefined>;
  }

  export interface HTMLMSubElement extends MathMLElement {
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/msub#subscriptshift */
    subscriptshift?: MaybeComputed<string | undefined>;
  }

  export interface HTMLMSubsupElement extends MathMLElement {
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/msubsup#subscriptshift */
    subscriptshift?: MaybeComputed<string | undefined>;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/msubsup#superscriptshift */
    superscriptshift?: MaybeComputed<string | undefined>;
  }

  export interface HTMLMSupElement extends MathMLElement {
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/msup#superscriptshift */
    superscriptshift?: MaybeComputed<string | undefined>;
  }

  export interface HTMLMTableElement extends MathMLElement {
    /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#align */
    align?: MaybeComputed<
      "axis" | "baseline" | "bottom" | "center" | "top" | undefined
    >;
    /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#columnalign */
    columnalign?: MaybeComputed<"center" | "left" | "right" | undefined>;
    /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#columnlines */
    columnlines?: MaybeComputed<"dashed" | "none" | "solid" | undefined>;
    /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#columnspacing */
    columnspacing?: MaybeComputed<string | undefined>;
    /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#frame */
    frame?: MaybeComputed<"dashed" | "none" | "solid" | undefined>;
    /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#framespacing */
    framespacing?: MaybeComputed<string | undefined>;
    /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#rowalign */
    rowalign?: MaybeComputed<
      "axis" | "baseline" | "bottom" | "center" | "top" | undefined
    >;
    /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#rowlines */
    rowlines?: MaybeComputed<"dashed" | "none" | "solid" | undefined>;
    /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#rowspacing */
    rowspacing?: MaybeComputed<string | undefined>;
    /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#width */
    width?: MaybeComputed<string | undefined>;
  }

  export interface HTMLMTdElement extends MathMLElement {
    columnspan?: MaybeComputed<number | undefined>;
    rowspan?: MaybeComputed<number | undefined>;
    /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtd#columnalign */
    columnalign?: MaybeComputed<"center" | "left" | "right" | undefined>;
    /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtd#rowalign */
    rowalign?: MaybeComputed<
      "axis" | "baseline" | "bottom" | "center" | "top" | undefined
    >;
  }

  export interface HTMLMTextElement extends MathMLElement {}

  export interface HTMLMTrElement extends MathMLElement {
    /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtr#columnalign */
    columnalign?: MaybeComputed<"center" | "left" | "right" | undefined>;
    /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtr#rowalign */
    rowalign?: MaybeComputed<
      "axis" | "baseline" | "bottom" | "center" | "top" | undefined
    >;
  }

  export interface HTMLMUnderElement extends MathMLElement {
    accentunder?: MaybeComputed<boolean | undefined>;
  }

  export interface HTMLMUnderoverElement extends MathMLElement {
    accent?: MaybeComputed<boolean | undefined>;
    accentunder?: MaybeComputed<boolean | undefined>;
  }

  export interface HTMLSemanticsElement extends MathMLElement {}

  export interface IntrinsicElements {
    // HTML
    a: HTMLAttributes<HTMLAnchorElement>;
    abbr: HTMLAttributes<HTMLElement>;
    address: HTMLAttributes<HTMLElement>;
    area: HTMLAttributes<HTMLAreaElement>;
    article: HTMLAttributes<HTMLElement>;
    aside: HTMLAttributes<HTMLElement>;
    audio: HTMLAttributes<HTMLAudioElement>;
    b: HTMLAttributes<HTMLElement>;
    base: HTMLAttributes<HTMLBaseElement>;
    bdi: HTMLAttributes<HTMLElement>;
    bdo: HTMLAttributes<HTMLElement>;
    big: HTMLAttributes<HTMLElement>;
    blockquote: HTMLAttributes<HTMLQuoteElement>;
    body: HTMLAttributes<HTMLBodyElement>;
    br: HTMLAttributes<HTMLBRElement>;
    button: HTMLAttributes<HTMLButtonElement>;
    canvas: HTMLAttributes<HTMLCanvasElement>;
    caption: HTMLAttributes<HTMLTableCaptionElement>;
    cite: HTMLAttributes<HTMLElement>;
    code: HTMLAttributes<HTMLElement>;
    col: HTMLAttributes<HTMLTableColElement>;
    colgroup: HTMLAttributes<HTMLTableColElement>;
    data: HTMLAttributes<HTMLDataElement>;
    datalist: HTMLAttributes<HTMLDataListElement>;
    dd: HTMLAttributes<HTMLElement>;
    del: HTMLAttributes<HTMLModElement>;
    details: HTMLAttributes<HTMLDetailsElement>;
    dfn: HTMLAttributes<HTMLElement>;
    dialog: HTMLAttributes<HTMLDialogElement>;
    div: HTMLAttributes<HTMLDivElement>;
    dl: HTMLAttributes<HTMLDListElement>;
    dt: HTMLAttributes<HTMLElement>;
    em: HTMLAttributes<HTMLElement>;
    embed: HTMLAttributes<HTMLEmbedElement>;
    fieldset: HTMLAttributes<HTMLFieldSetElement>;
    figcaption: HTMLAttributes<HTMLElement>;
    figure: HTMLAttributes<HTMLElement>;
    footer: HTMLAttributes<HTMLElement>;
    form: HTMLAttributes<HTMLFormElement>;
    h1: HTMLAttributes<HTMLHeadingElement>;
    h2: HTMLAttributes<HTMLHeadingElement>;
    h3: HTMLAttributes<HTMLHeadingElement>;
    h4: HTMLAttributes<HTMLHeadingElement>;
    h5: HTMLAttributes<HTMLHeadingElement>;
    h6: HTMLAttributes<HTMLHeadingElement>;
    head: HTMLAttributes<HTMLHeadElement>;
    header: HTMLAttributes<HTMLElement>;
    hgroup: HTMLAttributes<HTMLElement>;
    hr: HTMLAttributes<HTMLHRElement>;
    html: HTMLAttributes<HTMLHtmlElement>;
    i: HTMLAttributes<HTMLElement>;
    iframe: HTMLAttributes<HTMLIFrameElement>;
    img: HTMLAttributes<HTMLImageElement>;
    input: HTMLAttributes<HTMLInputElement>;
    ins: HTMLAttributes<HTMLModElement>;
    kbd: HTMLAttributes<HTMLElement>;
    keygen: HTMLAttributes<HTMLUnknownElement>;
    label: HTMLAttributes<HTMLLabelElement>;
    legend: HTMLAttributes<HTMLLegendElement>;
    li: HTMLAttributes<HTMLLIElement>;
    link: HTMLAttributes<HTMLLinkElement>;
    main: HTMLAttributes<HTMLElement>;
    map: HTMLAttributes<HTMLMapElement>;
    mark: HTMLAttributes<HTMLElement>;
    marquee: HTMLAttributes<HTMLMarqueeElement>;
    menu: HTMLAttributes<HTMLMenuElement>;
    menuitem: HTMLAttributes<HTMLUnknownElement>;
    meta: HTMLAttributes<HTMLMetaElement>;
    meter: HTMLAttributes<HTMLMeterElement>;
    nav: HTMLAttributes<HTMLElement>;
    noscript: HTMLAttributes<HTMLElement>;
    object: HTMLAttributes<HTMLObjectElement>;
    ol: HTMLAttributes<HTMLOListElement>;
    optgroup: HTMLAttributes<HTMLOptGroupElement>;
    option: HTMLAttributes<HTMLOptionElement>;
    output: HTMLAttributes<HTMLOutputElement>;
    p: HTMLAttributes<HTMLParagraphElement>;
    param: HTMLAttributes<HTMLParamElement>;
    picture: HTMLAttributes<HTMLPictureElement>;
    pre: HTMLAttributes<HTMLPreElement>;
    progress: HTMLAttributes<HTMLProgressElement>;
    q: HTMLAttributes<HTMLQuoteElement>;
    rp: HTMLAttributes<HTMLElement>;
    rt: HTMLAttributes<HTMLElement>;
    ruby: HTMLAttributes<HTMLElement>;
    s: HTMLAttributes<HTMLElement>;
    samp: HTMLAttributes<HTMLElement>;
    script: HTMLAttributes<HTMLScriptElement>;
    search: HTMLAttributes<HTMLElement>;
    section: HTMLAttributes<HTMLElement>;
    select: HTMLAttributes<HTMLSelectElement>;
    slot: HTMLAttributes<HTMLSlotElement>;
    small: HTMLAttributes<HTMLElement>;
    source: HTMLAttributes<HTMLSourceElement>;
    span: HTMLAttributes<HTMLSpanElement>;
    strong: HTMLAttributes<HTMLElement>;
    style: HTMLAttributes<HTMLStyleElement>;
    sub: HTMLAttributes<HTMLElement>;
    summary: HTMLAttributes<HTMLElement>;
    sup: HTMLAttributes<HTMLElement>;
    table: HTMLAttributes<HTMLTableElement>;
    tbody: HTMLAttributes<HTMLTableSectionElement>;
    td: HTMLAttributes<HTMLTableCellElement>;
    template: HTMLAttributes<HTMLTemplateElement>;
    textarea: HTMLAttributes<HTMLTextAreaElement>;
    tfoot: HTMLAttributes<HTMLTableSectionElement>;
    th: HTMLAttributes<HTMLTableCellElement>;
    thead: HTMLAttributes<HTMLTableSectionElement>;
    time: HTMLAttributes<HTMLTimeElement>;
    title: HTMLAttributes<HTMLTitleElement>;
    tr: HTMLAttributes<HTMLTableRowElement>;
    track: HTMLAttributes<HTMLTrackElement>;
    u: HTMLAttributes<HTMLElement>;
    ul: HTMLAttributes<HTMLUListElement>;
    var: HTMLAttributes<HTMLElement>;
    video: HTMLAttributes<HTMLVideoElement>;
    wbr: HTMLAttributes<HTMLElement>;

    //SVG
    svg: SVGAttributes<SVGSVGElement>;
    animate: SVGAttributes<SVGAnimateElement>;
    circle: SVGAttributes<SVGCircleElement>;
    animateMotion: SVGAttributes<SVGAnimateMotionElement>;
    animateTransform: SVGAttributes<SVGAnimateTransformElement>;
    clipPath: SVGAttributes<SVGClipPathElement>;
    defs: SVGAttributes<SVGDefsElement>;
    desc: SVGAttributes<SVGDescElement>;
    ellipse: SVGAttributes<SVGEllipseElement>;
    feBlend: SVGAttributes<SVGFEBlendElement>;
    feColorMatrix: SVGAttributes<SVGFEColorMatrixElement>;
    feComponentTransfer: SVGAttributes<SVGFEComponentTransferElement>;
    feComposite: SVGAttributes<SVGFECompositeElement>;
    feConvolveMatrix: SVGAttributes<SVGFEConvolveMatrixElement>;
    feDiffuseLighting: SVGAttributes<SVGFEDiffuseLightingElement>;
    feDisplacementMap: SVGAttributes<SVGFEDisplacementMapElement>;
    feDistantLight: SVGAttributes<SVGFEDistantLightElement>;
    feDropShadow: SVGAttributes<SVGFEDropShadowElement>;
    feFlood: SVGAttributes<SVGFEFloodElement>;
    feFuncA: SVGAttributes<SVGFEFuncAElement>;
    feFuncB: SVGAttributes<SVGFEFuncBElement>;
    feFuncG: SVGAttributes<SVGFEFuncGElement>;
    feFuncR: SVGAttributes<SVGFEFuncRElement>;
    feGaussianBlur: SVGAttributes<SVGFEGaussianBlurElement>;
    feImage: SVGAttributes<SVGFEImageElement>;
    feMerge: SVGAttributes<SVGFEMergeElement>;
    feMergeNode: SVGAttributes<SVGFEMergeNodeElement>;
    feMorphology: SVGAttributes<SVGFEMorphologyElement>;
    feOffset: SVGAttributes<SVGFEOffsetElement>;
    fePointLight: SVGAttributes<SVGFEPointLightElement>;
    feSpecularLighting: SVGAttributes<SVGFESpecularLightingElement>;
    feSpotLight: SVGAttributes<SVGFESpotLightElement>;
    feTile: SVGAttributes<SVGFETileElement>;
    feTurbulence: SVGAttributes<SVGFETurbulenceElement>;
    filter: SVGAttributes<SVGFilterElement>;
    foreignObject: SVGAttributes<SVGForeignObjectElement>;
    g: SVGAttributes<SVGGElement>;
    image: SVGAttributes<SVGImageElement>;
    line: SVGAttributes<SVGLineElement>;
    linearGradient: SVGAttributes<SVGLinearGradientElement>;
    marker: SVGAttributes<SVGMarkerElement>;
    mask: SVGAttributes<SVGMaskElement>;
    metadata: SVGAttributes<SVGMetadataElement>;
    mpath: SVGAttributes<SVGMPathElement>;
    path: SVGAttributes<SVGPathElement>;
    pattern: SVGAttributes<SVGPatternElement>;
    polygon: SVGAttributes<SVGPolygonElement>;
    polyline: SVGAttributes<SVGPolylineElement>;
    radialGradient: SVGAttributes<SVGRadialGradientElement>;
    rect: SVGAttributes<SVGRectElement>;
    set: SVGAttributes<SVGSetElement>;
    stop: SVGAttributes<SVGStopElement>;
    switch: SVGAttributes<SVGSwitchElement>;
    symbol: SVGAttributes<SVGSymbolElement>;
    text: SVGAttributes<SVGTextElement>;
    textPath: SVGAttributes<SVGTextPathElement>;
    tspan: SVGAttributes<SVGTSpanElement>;
    use: SVGAttributes<SVGUseElement>;
    view: SVGAttributes<SVGViewElement>;

    // MathML See https://developer.mozilla.org/en-US/docs/Web/MathML
    "annotation-xml": MathMLAttributes<HTMLAnnotationXmlElement>;
    annotation: MathMLAttributes<HTMLAnnotationElement>;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/maction */
    maction: MathMLAttributes<HTMLMActionElement>;
    math: MathMLAttributes<HTMLMathElement>;
    /** This feature is non-standard. See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/menclose  */
    menclose: MathMLAttributes<HTMLMEncloseElement>;
    merror: MathMLAttributes<HTMLMErrorElement>;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mfenced */
    mfenced: HTMLAttributes<HTMLMFencedElement>;
    mfrac: MathMLAttributes<HTMLMFracElement>;
    mi: MathMLAttributes<HTMLMiElement>;
    mmultiscripts: MathMLAttributes<HTMLMmultiScriptsElement>;
    mn: MathMLAttributes<HTMLMNElement>;
    mo: MathMLAttributes<HTMLMOElement>;
    mover: MathMLAttributes<HTMLMOverElement>;
    mpadded: MathMLAttributes<HTMLMPaddedElement>;
    mphantom: MathMLAttributes<HTMLMPhantomElement>;
    mprescripts: MathMLAttributes<HTMLMPrescriptsElement>;
    mroot: MathMLAttributes<HTMLMRootElement>;
    mrow: MathMLAttributes<HTMLMRowElement>;
    ms: MathMLAttributes<HTMLMSElement>;
    mspace: MathMLAttributes<HTMLMSpaceElement>;
    msqrt: MathMLAttributes<HTMLMSqrtElement>;
    mstyle: MathMLAttributes<HTMLMStyleElement>;
    msub: MathMLAttributes<HTMLMSubElement>;
    msubsup: MathMLAttributes<HTMLMSubsupElement>;
    msup: MathMLAttributes<HTMLMSupElement>;
    mtable: MathMLAttributes<HTMLMTableElement>;
    mtd: MathMLAttributes<HTMLMTdElement>;
    mtext: MathMLAttributes<HTMLMTextElement>;
    mtr: MathMLAttributes<HTMLMTrElement>;
    munder: MathMLAttributes<HTMLMUnderElement>;
    munderover: MathMLAttributes<HTMLMUnderoverElement>;
    semantics: MathMLAttributes<HTMLSemanticsElement>;
  }
}
