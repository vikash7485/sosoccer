import { site } from '../config/site'
import { galleryImages } from '../config/images'
import { InstagramIcon, Reveal, SectionHeading, SmartImage } from './ui'

const aspect = { tall: 'aspect-[3/4]', wide: 'aspect-[4/3]', square: 'aspect-square' }

export default function Gallery() {
  return (
    <section id="gallery" className="section" aria-labelledby="gallery-title">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Gallery" title={<span id="gallery-title">Inside School of Soccer</span>} />
          <Reveal>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="btn-outline">
              <InstagramIcon className="h-4 w-4" /> View More on Instagram
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
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-70 transition group-hover:opacity-100" />
              <figcaption className="pointer-events-none absolute bottom-0 left-0 p-4 text-white">
                <span className="font-display text-lg font-bold uppercase tracking-wide sm:text-xl">{img.caption}</span>
                <span className="mt-1 block h-0.5 w-0 bg-accent transition-all duration-500 group-hover:w-10" aria-hidden="true" />
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
