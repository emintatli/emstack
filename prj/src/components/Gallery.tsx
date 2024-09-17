'use client'
import React from 'react'
import Masonry from 'react-masonry-css'
import { MdDownload } from 'react-icons/md'
import ImageDisplay from './ImageDisplay'
const ImageGallery = ({
    itemData,
    tryItHandler,
}: {
    itemData: Array<{ img: string; title: string }>
    tryItHandler: any
}) => {
    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 2,
    }

    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid w-full"
        >
            {itemData.map((image: any, index: any) => (
                <ImageDisplay
                    tryItHandler={tryItHandler}
                    key={index}
                    image={image}
                />
            ))}
        </Masonry>
    )
}

export default ImageGallery
