import { useSpaceSettingsStore, SPACE_SETTINGS_DEFAULTS } from './spaceSettingsStore'

type SliderRowProps = {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
  unit?: string
}

function SliderRow({ label, value, min, max, step, onChange, unit = '' }: SliderRowProps) {
  const id = label.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-baseline">
        <label htmlFor={id} className="text-xs font-medium text-white/60 uppercase tracking-wider">
          {label}
        </label>
        <span className="text-xs text-white/40 tabular-nums">
          {Number.isInteger(step) ? Math.round(value) : value.toFixed(2)}{unit}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer
          bg-white/10
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-3.5
          [&::-webkit-slider-thumb]:h-3.5
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-white
          [&::-webkit-slider-thumb]:shadow-sm
          [&::-moz-range-thumb]:w-3.5
          [&::-moz-range-thumb]:h-3.5
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-white
          [&::-moz-range-thumb]:border-0"
      />
    </div>
  )
}

type SectionProps = {
  title: string
  children: React.ReactNode
}

function Section({ title, children }: SectionProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[11px] font-semibold text-white/30 uppercase tracking-widest">{title}</p>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  )
}

type SpaceSettingsPanelProps = {
  open: boolean
  onClose: () => void
}

export function SpaceSettingsPanel({ open, onClose }: SpaceSettingsPanelProps) {
  const store = useSpaceSettingsStore()

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Space settings"
        className={`fixed top-0 right-0 bottom-0 z-40 w-72 flex flex-col
          bg-black/80 backdrop-blur-xl border-l border-white/10
          transition-transform duration-300 ease-in-out
          ${ open ? 'translate-x-0' : 'translate-x-full' }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h2 className="text-sm font-semibold text-white/80">Background settings</h2>
          <button
            onClick={onClose}
            aria-label="Close settings"
            className="p-1.5 rounded-md text-white/40 hover:text-white/80 hover:bg-white/10 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Sliders */}
        <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-6">
          <Section title="Comets — speed">
            <SliderRow
              label="Min speed"
              value={store.cometSpeedMin}
              min={50} max={2000} step={10}
              onChange={store.setCometSpeedMin}
              unit=" px/s"
            />
            <SliderRow
              label="Max speed"
              value={store.cometSpeedMax}
              min={50} max={2000} step={10}
              onChange={store.setCometSpeedMax}
              unit=" px/s"
            />
          </Section>

          <Section title="Comets — size">
            <SliderRow
              label="Min tail"
              value={store.cometSizeMin}
              min={20} max={600} step={5}
              onChange={store.setCometSizeMin}
              unit=" px"
            />
            <SliderRow
              label="Max tail"
              value={store.cometSizeMax}
              min={20} max={600} step={5}
              onChange={store.setCometSizeMax}
              unit=" px"
            />
          </Section>

          <Section title="Stars — size">
            <SliderRow
              label="Min radius"
              value={store.starSizeMin}
              min={0.2} max={5} step={0.1}
              onChange={store.setStarSizeMin}
              unit=" px"
            />
            <SliderRow
              label="Max radius"
              value={store.starSizeMax}
              min={0.2} max={5} step={0.1}
              onChange={store.setStarSizeMax}
              unit=" px"
            />
          </Section>
        </div>

        {/* Footer — reset */}
        <div className="px-5 py-4 border-t border-white/10">
          <button
            onClick={store.reset}
            className="w-full py-2 rounded-lg text-xs font-medium text-white/50
              border border-white/10 hover:border-white/20 hover:text-white/80
              hover:bg-white/5 transition-colors"
          >
            Reset to defaults
          </button>
        </div>
      </aside>
    </>
  )
}
