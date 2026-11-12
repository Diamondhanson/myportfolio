import { readFileSync } from 'node:fs';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { site } from '@/content/site';

/**
 * The link preview card, drawn in code rather than screenshotted.
 *
 * Satori (what next/og renders with) is not a browser: flexbox only, no CSS
 * variables, no grid, no pseudo-elements. So the blueprint ground is built from
 * absolutely positioned rules and the palette is inlined from globals.css. The
 * dark cyanotype theme is used deliberately: a link preview is a small bright
 * rectangle in somebody's chat window, and navy reads as an object rather than
 * as part of the page around it.
 */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';
export const ogAlt = `${site.name}, ${site.role} in ${site.location}`;

// Inlined from the dark theme in app/globals.css. Keep in step with it.
const PAPER = '#0b1a2b';
const INK = '#e8f2fa';
const DRAW = '#8dcbf0';
const FAINT = '#6d8aa3';
const ACCENT = '#ff7a45';
const RULE = 'rgba(141, 203, 240, 0.22)';
const GRID = 'rgba(141, 203, 240, 0.10)';
const PENS = ['#b794ff', '#6aa9ff', '#2ee6a8', '#ff79ab'];

const GRID_STEP = 60;

function fontFile(name: string) {
  return readFileSync(path.join(process.cwd(), 'assets', 'fonts', name));
}

/** The 60px drafting grid, as discrete rules. Cheaper to reason about than
 *  asking Satori for a repeating gradient, and it renders identically. */
function grid() {
  const lines = [];
  for (let x = GRID_STEP; x < ogSize.width; x += GRID_STEP) {
    lines.push(
      <div
        key={`v${x}`}
        style={{ position: 'absolute', left: x, top: 0, width: 1, height: ogSize.height, backgroundColor: GRID }}
      />,
    );
  }
  for (let y = GRID_STEP; y < ogSize.height; y += GRID_STEP) {
    lines.push(
      <div
        key={`h${y}`}
        style={{ position: 'absolute', left: 0, top: y, width: ogSize.width, height: 1, backgroundColor: GRID }}
      />,
    );
  }
  return lines;
}

export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          display: 'flex',
          width: ogSize.width,
          height: ogSize.height,
          backgroundColor: PAPER,
          fontFamily: 'Grotesk',
        }}
      >
        {grid()}

        {/* The drawing frame. */}
        <div style={{ position: 'absolute', left: 28, top: 28, right: 28, bottom: 28, border: `1px solid ${RULE}` }} />

        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            padding: '68px 76px',
          }}
        >
          {/* Title block, the way a sheet is labelled. */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'Mono',
              fontSize: 21,
              letterSpacing: 3,
              color: FAINT,
            }}
          >
            <div style={{ display: 'flex' }}>SHEET 00 / IDENTITY</div>
            <div style={{ display: 'flex', color: DRAW }}>
              {site.location.toUpperCase()} · OPEN TO REMOTE
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'stretch' }}>
              <div style={{ display: 'flex', width: 7, backgroundColor: ACCENT, marginRight: 34 }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', fontSize: 104, fontWeight: 700, color: INK, letterSpacing: -3, lineHeight: 1.04 }}>
                  Bambot Hanson
                </div>
                <div style={{ display: 'flex', fontSize: 104, fontWeight: 700, color: DRAW, letterSpacing: -3, lineHeight: 1.04 }}>
                  Ngongmun
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                marginTop: 34,
                marginLeft: 41,
                fontFamily: 'Mono',
                fontSize: 27,
                letterSpacing: 5,
                color: ACCENT,
              }}
            >
              {site.role.toUpperCase()}
            </div>
            <div
              style={{
                display: 'flex',
                marginTop: 14,
                marginLeft: 41,
                fontFamily: 'Mono',
                fontSize: 21,
                color: FAINT,
              }}
            >
              {site.discipline}
            </div>
          </div>

          {/* The same four measured facts the page opens with. */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', height: 1, width: '100%', backgroundColor: RULE, marginBottom: 26 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {site.metrics.map((m, i) => (
                <div key={m.label} style={{ display: 'flex', flexDirection: 'column', width: 240 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', color: PENS[i] }}>
                    <div style={{ display: 'flex', fontSize: 46, fontWeight: 700, letterSpacing: -1 }}>{m.value}</div>
                    <div style={{ display: 'flex', fontFamily: 'Mono', fontSize: 19, marginLeft: 8 }}>{m.unit}</div>
                  </div>
                  <div style={{ display: 'flex', fontFamily: 'Mono', fontSize: 16, color: FAINT, lineHeight: 1.35, marginTop: 4 }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: 'Grotesk', data: fontFile('SpaceGrotesk-Bold.ttf'), weight: 700, style: 'normal' },
        { name: 'Grotesk', data: fontFile('SpaceGrotesk-Medium.ttf'), weight: 500, style: 'normal' },
        { name: 'Mono', data: fontFile('IBMPlexMono-Regular.ttf'), weight: 400, style: 'normal' },
      ],
    },
  );
}
