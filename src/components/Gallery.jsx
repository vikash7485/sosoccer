import { site } from '../config/site'
import { galleryImages } from '../config/images'
import { InstagramIcon, Reveal, SectionHeading, SmartImage } from './ui'
import { useLang } from '../i18n'

const aspect = { tall: 'aspect-[3/4]', wide: 'aspect-[4/3]', square: 'aspect-square' }

export default function Gallery() {
  const { t, f } = useLang()
  return (
    <section id="gallery" className="section" aria-labelledby="gallery-title">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow={t('Gallery', 'गैलरी')} title={<span id="gallery-title">{t('Inside School of Soccer', 'स्कूल ऑफ सॉकर की झलकियाँ')}</span>} />
          <Reveal>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="btn-outline">
              <InstagramIcon className="h-4 w-4" /> {t('View More on Instagram', 'इंस्टाग्राम पर और देखें')}
            </a>
          </Reveal>
        </div>

        {/* Masonry via CSS columns */}
        <div className="mt-12 columns-2 gap-3 sm:gap-4 lg:columns-3 xl:columns-4">
          {galleryImages.map((img, i) => (
            <Reveal key={img.file} as="figure" variant="zoom" delay={(i % 4) * 90} className="group relative mb-3 break-inside-avoid overflow-hidden rounded-2xl border border-line sm:mb-4">
              <SmartImage
                file={img.file}
                alt={img.alt}
                label="compact"
                sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, 50vw"
                className={`${aspect[img.shape]} w-full transition duration-700 ease-out group-hover:scale-110`}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-accent/35 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              <figcaption className="pointer-events-none absolute bottom-2 left-2 rounded-lg bg-white/95 px-2 py-1 text-ink shadow-lg sm:bottom-3 sm:left-3 sm:rounded-xl sm:px-3 sm:py-1.5">
                <span className="font-display text-[11px] font-bold uppercase leading-tight tracking-wide sm:text-lg">{f(img, 'caption')}</span>
                <span className="mt-1 block h-0.5 w-0 bg-accent transition-all duration-500 group-hover:w-10" aria-hidden="true" />
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
