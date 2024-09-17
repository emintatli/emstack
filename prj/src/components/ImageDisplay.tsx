'use client'
import { useMediaQuery, Modal, Box, Snackbar, Typography } from '@mui/material'
import React from 'react'
import { MdDownload, MdClose, MdContentCopy, MdShare } from 'react-icons/md'
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
} from 'react-share'
import {
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappIcon,
} from 'react-share'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const ImageDisplay = ({ image, key, tryItHandler }: any) => {
    const shareLink = `https://dreapic.com/generated?id=${image.generateId}`
    const [isHovered, setIsHovered] = React.useState(false)
    const [modalOpen, setModalOpen] = React.useState(false)
    const [snackbarOpen, setSnackbarOpen] = React.useState(false)
    const isMobile = useMediaQuery('(max-width:600px)')

    const downloadImage = async () => {
        // ... (unchanged)
    }

    const handleOpenModal = () => {
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setModalOpen(false)
    }

    const handleCopyLink = () => {
        setSnackbarOpen(true)
    }

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false)
    }

    return (
        <>
            <div
                onMouseEnter={() => {
                    setIsHovered(true)
                }}
                onMouseLeave={() => {
                    setIsHovered(false)
                }}
                className="m-1 rounded-xl relative"
                key={key}
            >
                <img
                    onClick={handleOpenModal}
                    src={image.img}
                    className="rounded-xl cursor-pointer"
                    alt={`${image.title}`}
                    loading="lazy"
                    style={{ width: '100%', height: 'auto' }}
                />
                {isHovered || isMobile ? (
                    <>
                        <div className="absolute bottom-0 right-0 left-0 h-16 bg-black bg-opacity-50 rounded-b-xl">
                            <div className="p-2 h-8">
                                <p className="text-white text-xs text-ellipsis truncate">
                                    {image.title}
                                </p>
                            </div>
                            {tryItHandler && (
                                <button
                                    onClick={() => {
                                        tryItHandler(image.title)
                                    }}
                                    className="btn btn-xs text-white btn-primary float-right mr-2 md:mr-5 glass"
                                >
                                    👉🏻 Try it
                                </button>
                            )}
                        </div>
                        <button
                            onClick={downloadImage}
                            className="btn absolute top-2 right-2 btn-xs text-white btn-primary float-right glass"
                        >
                            <MdDownload />
                        </button>
                    </>
                ) : null}
            </div>
            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                aria-labelledby="image-modal"
                aria-describedby="full-size-image"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 3,
                        width: '95vw',
                        maxWidth: '600px',
                        height: '95vh',
                        maxHeight: '800px',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '16px',
                        overflow: 'hidden',
                    }}
                >
                    <button
                        onClick={handleCloseModal}
                        className="btn btn-circle btn-sm absolute top-2 right-2 z-10"
                        style={{ backgroundColor: 'white', color: 'black' }}
                    >
                        <MdClose size={20} />
                    </button>
                    <Typography
                        className="line-clamp-3 mb-4"
                        variant="h6"
                        component="h2"
                        sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxHeight: '4.5em', // Approximately 3 lines of text
                        }}
                    >
                        <span className='text-sm'>{image.title}</span>
                    </Typography>
                    <Box sx={{ flexGrow: 1, overflow: 'auto', my: 2 }}>
                        <img
                            src={image.img}
                            alt={image.title}
                            style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'contain',
                                borderRadius: '8px',
                            }}
                        />
                    </Box>
                    {image.generateId && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle1" gutterBottom>
                                <MdShare /> Share this image
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    gap: '10px',
                                }}
                            >
                                <FacebookShareButton url={shareLink}>
                                    <FacebookIcon size={40} round />
                                </FacebookShareButton>
                                <TwitterShareButton url={shareLink}>
                                    <TwitterIcon size={40} round />
                                </TwitterShareButton>
                                <LinkedinShareButton url={shareLink}>
                                    <LinkedinIcon size={40} round />
                                </LinkedinShareButton>
                                <WhatsappShareButton url={shareLink}>
                                    <WhatsappIcon size={40} round />
                                </WhatsappShareButton>
                                <CopyToClipboard
                                    text={shareLink}
                                    onCopy={handleCopyLink}
                                >
                                    <button className="btn btn-circle">
                                        <MdContentCopy size={24} />
                                    </button>
                                </CopyToClipboard>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Modal>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message="Link copied to clipboard"
            />
        </>
    )
}

export default ImageDisplay
