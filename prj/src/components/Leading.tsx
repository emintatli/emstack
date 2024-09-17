import Link from 'next/link'
import React from 'react'

const LeadingImageLeft = ({
    title,
    description,
    buttonText,
    buttonLink,
    imageSrc,
    imageAlt,
}: {
    title: string
    description: string
    buttonText?: string
    buttonLink?: string
    imageSrc: string
    imageAlt: string
}) => {
    return (
        <section className='my-20'>
            <div className="px-4 mx-auto sm:px-6 lg:px-8">
                <div className="grid items-center md:grid-cols-2 gap-y-10 md:gap-x-20">
                    <div className="sm:pr-12 flex items-center w-full justify-center md:justify-start">
                        <div className="relative max-w-lg">
                            <img
                                className="object-bottom rounded-md"
                                src={imageSrc}
                                alt={imageAlt}
                                loading='lazy'
                            />
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                            {title}
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-gray-600">
                            {description}
                        </p>
                        {buttonText && buttonLink && (
                            <Link href={buttonLink}>
                                <button className="btn btn-primary mt-5 w-32">
                                    {buttonText}
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

const LeadingImageRight = ({
    title,
    description,
    buttonText,
    buttonLink,
    imageSrc,
    imageAlt,
}: {
    title: string
    description: string
    buttonText?: string
    buttonLink?: string
    imageSrc: string
    imageAlt: string
}) => {
    return (
        <section className='my-20'>
            <div className="px-4 mx-auto sm:px-6 lg:px-8">
                <div className="grid items-center md:grid-cols-2 gap-y-10 md:gap-x-20">
                    <div className="order-last md:order-first">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                            {title}
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-gray-600">
                            {description}
                        </p>
                        {buttonText && buttonLink && (
                            <Link href={buttonLink}>
                                <button className="btn btn-primary mt-5 w-32">
                                    {buttonText}
                                </button>
                            </Link>
                        )}
                    </div>
                    <div className="sm:pl-12 flex items-center w-full justify-center md:justify-end">
                        <div className="relative max-w-lg">
                            <img
                                className="object-bottom rounded-md"
                                src={imageSrc}
                                alt={imageAlt}
                                loading='lazy'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export { LeadingImageLeft, LeadingImageRight }
